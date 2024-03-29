import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Video, Room, Member
from .serializers import MembersSerializer
from asgiref.sync import sync_to_async
from rest_framework.authtoken.models import Token
from channels.db import database_sync_to_async


@database_sync_to_async
def updateRoomVideo(room, url):
    try:
        room.url = url
        room.save()
        return room
    except Room.DoesNotExist:
        return None


class RoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = self.room_name
        self.user = await self.get_user(self.scope["query_string"])
        self.room = await self.get_room(self.room_name)

        if self.user is not None:
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)

            await self.accept()

            if self.creator != self.user:
                print("new member")
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "handleNewMember",
                    },
                )

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "handleGetMembers",
                },
            )

        else:
            await self.close()

    @database_sync_to_async
    def get_user(self, query_string):
        token_key = query_string.decode().split("=")[1]
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
            members = room.members.all()
            serializer = MembersSerializer(members, many=True)

            user_list = []
            for item in serializer.data:
                username = item["user"]["username"]
                user_list.append(username)

            # return serializer.data
            return user_list
        except:
            print("Нет мемберов или комната удалена")

    async def disconnect(self, close_code):
        print("disconnected - ", self.user)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "handleGetMembers",
            },
        )

        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    @database_sync_to_async
    def close_room(self, room_name):
        try:
            room = (Room.objects.get)(name=room_name)
            room.delete()
        except Room.DoesNotExist:
            pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        signal = text_data_json["signal"]

        is_admin = self.user == self.creator


        if signal == "play":
            current_time = text_data_json["currentTime"]

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "handlePlay",
                    "signal": signal,
                    "is_admin": is_admin,
                    "currentTime": current_time,
                },
            )

        if signal == "url_change":
            url = text_data_json["new_url"]

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "handleURL",
                    "signal": signal,
                    "url": url,
                },
            )

        if signal == "pause":
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "handlePause",
                    "signal": signal,
                    "is_admin": is_admin,
                },
            )
        if is_admin and signal == "disconnect":
            await self.close_all_connections()
        elif signal == "disconnect":
            pass

        if signal == "chat":
            text = text_data_json["text"]
            sender = text_data_json["sender"]

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "handleChat",
                    "signal": signal,
                    "message": text,
                    "sender": sender,
                },
            )

        if signal == "room_state":

            current_time = text_data_json["current_time"]
            current_video_state = text_data_json["current_video_state"]

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "handleUpdate",
                    "signal": signal,
                    "current_time": current_time,
                    "current_video_state": current_video_state,
                },
            )

    async def handleGetMembers(self, event):
        members = self.get_members()

        await self.send(
            text_data=json.dumps({
                "signal": "user_list",
                  "members": await members
                  })
        )

    # Video handlers
    async def handlePlay(self, event):
        signal = event["signal"]
        is_admin = event["is_admin"]
        current_time = event["currentTime"]

        if is_admin:
            await self.send(
                text_data=json.dumps({"signal": signal, "currentTime": current_time})
            )

    async def handleURL(self, event):
        signal = event["signal"]
        url = event["url"]

        await self.send(text_data=json.dumps({"signal": signal, "new_url": url}))

        await updateRoomVideo(self.room, url)

    async def handlePause(self, event):
        signal = event["signal"]
        is_admin = event["is_admin"]

        if is_admin:
            await self.send(
                text_data=json.dumps(
                    {
                        "signal": signal,
                    }
                )
            )

    # Chat handle

    async def handleChat(self, event):
        signal = event["signal"]
        text = event["message"]
        sender = event["sender"]

        await self.send(
            text_data=json.dumps(
                {
                    "signal": signal,
                    "text": text,
                    "sender": sender,
                }
            )
        )

    async def handleNewMember(self, event):
        await self.send(
            text_data=json.dumps(
                {
                    "signal": "get_room_state",
                }
            )
        )

    async def handleUpdate(self, event):
        current_time = event["current_time"]
        current_video_state = event["current_video_state"]
        signal = event["signal"]

        await self.send(
            text_data=json.dumps(
                {
                    "signal": signal,
                    "currentTime": current_time,
                    "currentVideoState": current_video_state,
                }
            )
        )

    # Connection close

    async def close_all_connections(self):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "close_connections",
            },
        )

    async def close_connections(self, event):
        if self.user != self.creator:
            await self.send(
                text_data=json.dumps(
                    {
                        "signal": "disconnect",
                    }
                )
            )

            await self.close()

            
