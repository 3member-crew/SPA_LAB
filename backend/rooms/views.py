from rest_framework import generics 
from .models import Room, Member, Messages, Video 
from .serializers import RoomSerializer, MembersSerializer, MessagesSerializer, VideoSerializer 
from rest_framework.permissions import IsAuthenticated 
from rest_framework.viewsets import ViewSet 
from rest_framework import status 
from rest_framework.response import Response 
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
import os, sys 
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))) 
from users.serializers import UserSerializer 
from users.models import User 
 

class RoomView(ViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer 
    permission_classes = [IsAuthenticated]
 
    def get_room(self, request):

        room_name = request.query_params.get('name')
        password = request.query_params.get('password')

        room = Room.objects.get(name=room_name) 
        if room.password == password:
            serializer = RoomSerializer(room) 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'details' : 'bad password'}, status=status.HTTP_400_BAD_REQUEST) 
     
    def create_room(self, request):
        print(request.data)
        serializer = RoomSerializer(data=request.data, context={'request': request}) 
        serializer.is_valid(raise_exception=True) 
        serializer.save() 
        return Response(serializer.data, status=status.HTTP_201_CREATED) 
     
    def get_all(self, request):
        rooms = Room.objects.all() 
        serializer = RoomSerializer(rooms, many=True) 
        return Response(serializer.data, status=status.HTTP_201_CREATED) 
     
    def delete_room(self, request):
        print(request)
        room_id = request.query_params.get('name') 
        try: 
            room = Room.objects.get(name=room_id) 
            room.delete() 
            return Response({'message': 'Room deleted'}, status=200) 
        except Room.DoesNotExist: 
            return Response({'message': 'Room not found'}, status=404)
        

class VideoView(ViewSet): 
    serializer_class = VideoSerializer 
 
    def get_video(self, request): 
        room_id = request.query_params.get('room_id') 
        video_url = request.query_params.get('video_url') 
 
        video = Video.objects.filter(room_id=room_id, video_url=video_url).first() 
        if video: 
            serializer = VideoSerializer(video) 
            return Response(serializer.data) 
        else: 
            return Response({'message': 'Видео не найдено'}, status=status.HTTP_404_NOT_FOUND) 
 
    def get_all_video(self, request): 
        room_id = request.data.get('room_id') 
 
        videos = Video.objects.filter(room_id=room_id) 
        serializer = VideoSerializer(videos, many=True) 
        return Response(serializer.data) 
 
    def add_video(self, request): 
        room_id = request.data.get('room_id') 
        video_url = request.data.get('video_url') 
 
        room = Room.objects.get(id=room_id) 
        video = Video.objects.create(room=room, video_url=video_url) 
        serializer = VideoSerializer(video) 
        return Response(serializer.data, status=status.HTTP_201_CREATED) 
     
 
class MemberView(ViewSet): 
    serializer_class = MembersSerializer 
 
    def get_member(self, request): 
        room_id = request.query_params.get('room_id') 
 
        room = Room.objects.get(id=room_id) 
        members = room.members.all() 
        serializer = MembersSerializer(members, many=True) 
        return Response(serializer.data) 
 
    def add_member(self, request): 
        room_id = request.query_params.get('room_id') 
 
        room = Room.objects.get(id=room_id) 
        user = request.user 
        member, created = Member.objects.get_or_create(room=room, user=user) 
        if created: 
            return Response({'message': 'Пользователь успешно добавлен в комнату'}, status=status.HTTP_201_CREATED) 
        else: 
            return Response({'message': 'Пользователь уже присутствует в комнате'}, status=status.HTTP_400_BAD_REQUEST) 
 
    def remove_member(self, request): 
        room_id = request.query_params.get('room_id') 
        user_id = request.query_params.get('user_id') 
 
 
        room = Room.objects.get(id=room_id) 
        user = User.objects.get(id=user_id) 
        #user = request.user 
 
        member = Member.objects.filter(room=room, user=user) 
        if member.exists(): 
            member.delete() 
            if user == room.creator: 
                room.delete() 
                return Response({'message': 'Создатель комнаты вышел, комната удалена'}, status=status.HTTP_200_OK) 
             
            return Response({'message': 'Пользователь удален из комнаты'}, status=status.HTTP_200_OK) 
        else: 
            return Response({'message': 'Пользователь не найден в комнате'}, status=status.HTTP_404_NOT_FOUND) 
 
    def remove_all_members(self, request): 
        room_id = request.query_params.get('room_id') 
 
        room = Room.objects.get(id=room_id) 
        room.members.all().delete() 
        room.delete() 
        return Response({'message': 'Все пользователи удалены из комнаты'}, status=status.HTTP_200_OK)
    
    
