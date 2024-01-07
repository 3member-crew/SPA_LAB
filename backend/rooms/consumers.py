import json 
from channels.generic.websocket import AsyncWebsocketConsumer, AsyncConsumer
from .models import Video, Room 
from asgiref.sync import sync_to_async 
 
class RoomConsumer(AsyncConsumer): 
    async def websocket_connect(self, event):
        await self.send({"type": "websocket.accept"})
 

    async def websocket_disconnect(self, event):
        pass
 
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
     
 
    async def websocket_receive(self, text_data):
        await self.send({
            "type": "websocket.send",
            "text": "Hello from Django socket"
        })
 
 
 
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

