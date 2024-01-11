import json 
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Video, Room, Member
from .serializers import MembersSerializer
from asgiref.sync import sync_to_async 
from rest_framework.authtoken.models import Token
from channels.db import database_sync_to_async

@database_sync_to_async
def get_user(self, query_string):
    token_key = query_string.decode().split('=')[1]
    try:
        token = Token.objects.get(key=token_key)
        return token.user
    except Token.DoesNotExist:
        return None

class RoomConsumer(AsyncWebsocketConsumer): 
    async def connect(self): 
        self.room_name = self.scope['url_route']['kwargs']['room_name'] 
        self.room_group_name = self.room_name
        self.user = await self.get_user(self.scope['query_string'])
        self.room = await self.get_room(self.room_name)

        await self.get_members()
        if self.user is not None:
            await self.channel_layer.group_add( 
                    self.room_group_name, 
                    self.channel_name 
                ) 
                
            await self.accept()
        else:
            await self.close()
    
    @database_sync_to_async
    def get_user(self, query_string):
        token_key = query_string.decode().split('=')[1]
        try:
            token = Token.objects.get(key=token_key)
            return token.user
        except Token.DoesNotExist:
            return None
    
    @database_sync_to_async
    def get_room(self, room_name):
        room = Room.objects.get(name=room_name)
        self.creator = room.creator
        return room
    
    @database_sync_to_async
    def get_members(self):
        room = self.room
        try:
            members = Member.objects.filter(room=room).all()
            print(members)
        except:
            print("Нет мемберов")

    async def disconnect(self, close_code): 
  
        print(self.user)
        await self.channel_layer.group_discard( 
                self.room_group_name, 
                self.channel_name 
            ) 
         

    @database_sync_to_async 
    def close_room(self, room_name): 
        try: 
            room = (Room.objects.get)(name=room_name) 
            room.delete() 
        except Room.DoesNotExist: 
            pass 
     
 
    async def receive(self, text_data): 
        text_data_json = json.loads(text_data)

        signal = text_data_json['signal']

        is_admin = self.user == self.creator

        print(text_data_json)
        is_admin = True
    

        if signal == 'play':

            current_time = text_data_json['currentTime']

            await self.channel_layer.group_send( 
                self.room_group_name,
                { 
                    'type': 'handlePlay', 
                    'signal': signal,
                    'is_admin': is_admin,
                    'currentTime': current_time
                } 
            )


        if signal == 'url_change':
            url = text_data_json['new_url']
        
            await self.channel_layer.group_send( 
                self.room_group_name, 
                { 
                    'type': 'handleURL', 
                    'signal': signal,
                    'is_admin': is_admin,
                    'url': url,
                } 
            )


        if signal == 'pause':
            await self.channel_layer.group_send( 
                self.room_group_name, 
                { 
                    'type': 'handlePause', 
                    'signal': signal,
                    'is_admin': is_admin,
                } 
            )
        if is_admin and signal == 'disconnect':
            self.close_all_connections
        elif signal == 'disconnect':
            self.close()
        

        if signal == 'chat':
            text = text_data_json['text']
            sender = text_data_json['sender']

            self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'handleChat',
                    'message': text,
                    'sender': sender
                }
            )

 
    # Video handlers
    async def handlePlay(self, event):
        print('check') 
        signal = event['signal']
        is_admin = event['is_admin']
        current_time = event['currentTime']

        if is_admin:
            print('play')
            await self.send(text_data=json.dumps({ 
                'signal': signal,
                'currentTime': current_time
            })
            )
    
    async def handleURL(self, event):
        signal = event['signal']
        is_admin = event['is_admin']
        url = event['url']

        if is_admin:
            self.send(text_data=json.dumps({ 
                'signal': signal,
                'new_url': url
            })
            )
    
    async def handlePause(self, event):
        signal = event['signal']
        is_admin = event['is_admin']

        if is_admin:
            print('pause')
            await self.send(text_data=json.dumps({ 
                'signal': signal,
            }))
    
    # Chat handle
            
    async def handleChat(self, event): 
        text = event['message'] 
        sender = event['sender'] 
        members = await self.get_members()
        serializer = MembersSerializer(members, many=True)

        await self.send(text_data=json.dumps({ 
            'text': text, 
            'sender': sender,
            'members': serializer 
        }))
    # Connection close
            
    async def close_all_connections(self):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'close_connections',
            }
        )

    async def close_connections(self, event):
        await self.close()

