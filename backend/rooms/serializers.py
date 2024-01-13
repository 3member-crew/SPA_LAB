from rest_framework import serializers 
from .models import Messages, Room, Member, Video 
from .utils import generate_unique_token
 
import os, sys 
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))) 
from users.serializers import UserSerializer 
 
class RoomSerializer(serializers.ModelSerializer): 
    creator = UserSerializer(read_only=True)
    access_token = serializers.CharField(read_only=True)
    class Meta: 
        model = Room 
        fields = ('__all__') 
 
        extra_kwargs = { 
            'password': {'write_only':True},
            'access_token': {'write_only':True} 
        } 
     
    def create(self, validated_data): 
        request = self.context.get('request') 
        creator = request.user 
        access_token = generate_unique_token(Room, "access_token")
        room = Room.objects.create(creator=creator, access_token=access_token, **validated_data) 
        Member.objects.create(user=creator, room=room) 
        return room 
 
class MessagesSerializer(serializers.ModelSerializer): 
    user = UserSerializer(read_only=True) 
 
    room = RoomSerializer(read_only=True) 
 
    class Meta: 
        model = Messages 
        fields = '__all__' 
     
class MembersSerializer(serializers.ModelSerializer): 
    user = UserSerializer(read_only=True) 
    room = RoomSerializer(read_only=True) 
    class Meta: 
        model = Member 
        fields = ('user') 

 
class VideoSerializer(serializers.ModelSerializer): 
    room = RoomSerializer(read_only=True) 
    class Meta: 
        model = Video 
        fields = '__all__'