from rest_framework import serializers
from .models import Messages, Room, Member, Video


import os, sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from users.serializers import UserSerializer

class RoomSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)

    class Meta:
        model = Room
        fields = ('__all__')

        extra_kwargs = {
            'password': {'write_only':True}
        }
    
    def create(self, validated_data):
        request = self.context.get('request')
        creator = request.user

        room = Room.objects.create(creator=creator, **validated_data)
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
        fields = '__all__'


class VideoSerializer(serializers.ModelSerializer):
    room = RoomSerializer(read_only=True)
    class Meta:
        model = Video
        fields = '__all__'