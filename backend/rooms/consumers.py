import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Video, Room

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
        # Отключение от комнаты
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # Обработка приема сообщений
        text_data_json = json.loads(text_data)

        if 'message' in text_data_json:
            message = text_data_json['message']
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message
                }
            )
        
        if 'current_time' in text_data_json:
            current_time = text_data_json['current_time']

            video = Video.objects.get(room=self.room_name)
            video.current_time = current_time
            video.save()

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'video_update',
                    'current_time': current_time
                }
            )

    async def chat_message(self, event):
        # Отправка сообщения в WebSocket
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))
    
    async def video_update(self, event):
        current_time = event['current_time']

        await self.send(text_data=json.dumps({
            'current_time': current_time
        }))
    