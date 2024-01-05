import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Video, Room
from asgiref.sync import sync_to_async

class RoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'room_{self.room.name}'
        user =self.scope['user']

        # Присоединение к комнате
        if user.is_authenticated:
            await self.channel_layer.group_add(
                    self.room_group_name,
                    self.channel_name
                )
        
            await self.accept()
        else:
            await self.close()

    async def disconnect(self, close_code):

        user = self.scope['user']
        is_admin = await self.check_admin(user)

        await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )
        
        if is_admin:
            room_id = self.scope['url_route']['kwargs']['room_id']
            await self.close_room(room_id)

    async def check_admin(self, user):
        room_id = self.scope['url_route']['kwargs']['room_id']
        try:
            room = await sync_to_async(Room.objects.get)(id=room_id)
            return user == room.creator
        except Room.DoesNotExist:
            return False
    
    async def close_room(self, room_id):
         
        try:
            room = await sync_to_async(Room.objects.get)(id=room_id)
            # Дополнительная логика закрытия комнаты
            room.delete()
        except Room.DoesNotExist:
            pass
    
    async def forward_signal(self, event):
        signal_data = event['signal_data']
        await self.send(text_data=json.dumps(signal_data))

    
    async def handle_signal(self, room_id, data):
        await self.channel_layer.group_send(self.room_group_name, {
            'type': 'forward_signal',
            'signal_data': data,
        })

    async def receive(self, text_data):
        data = json.loads(text_data)
        signal_type = data.get('signal_type')

        user = self.scope['user']
        is_admin = await self.check_admin(user)
        if is_admin:
            data = json.loads(text_data)
            signal_type = data.get('signal_type')

            if signal_type in ['offer', 'answer', 'ice_candidate']:
                await self.handle_signal(data)