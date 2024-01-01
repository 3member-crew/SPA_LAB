from rest_framework import serializers
from .models import Messages, Room, Member
from ..users.serializers import UserSerializer

class RoomSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)

    class Meta:
        model = Room
        fields = '__all__'

        extra_kwargs = {
            'password': {'write_only':True}
        }

class MessagesSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    room = RoomSerializer(read_only=True)

    class Meta:
        fields = '__all__'
    
class MembersSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    room = RoomSerializer(read_only=True)
    class Meta:
        model = Member
        fields = '__all__'
