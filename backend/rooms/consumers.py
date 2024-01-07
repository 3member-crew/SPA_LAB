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
            await self.close_room(self.room_name) 
 
    async def check_admin(self, user): 
        room_name = self.scope['url_route']['kwargs']['room_name'] 
        try: 
            room = await sync_to_async(Room.objects.get)(name=room_name) 
            return user == room.creator 
        except Room.DoesNotExist: 
            return False 
     
    async def close_room(self, room_name): 
          
        try: 
            room = await sync_to_async(Room.objects.get)(name=room_name) 
            room.delete() 
        except Room.DoesNotExist: 
            pass 
     
 
    async def receive(self, text_data): 
        text_data_json = json.loads(text_data) 
        signal = text_data_json['signal_type'] 
        sender = text_data_json['sender'] 
 
        await self.channel_layer.group_send( 
            self.room_group_name, 
            { 
                'type': 'handleSignal', 
                'signal': signal, 
                'sender': sender 
            } 
        ) 
 
 
 
    async def handleSignal(self, event): 
        user = self.scope['user'] 
        signal = event['signal'] 
 
        if self.check_admin(user): 
 
            self.send(text_data=json.dump({ 
                'signal':signal 
            })) 
 
    async def handleUpdateVideo(self, event): 
        pass 
 
    async def handleChat(self, event): 
        text = event['message'] 
        sender = event['sender'] 
         
        self.send(text_data=json.dumps({ 
            'text': text, 
            'sender': sender 
        }))

