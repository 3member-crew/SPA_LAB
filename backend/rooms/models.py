from django.db import models


class Room(models.Model):
    name = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.OneToOneField('users.User', related_name='created_room', on_delete=models.CASCADE)

    url = models.URLField()
    password = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self) -> str:
        return self.name

class Member(models.Model):
    user = models.OneToOneField('users.User', on_delete=models.CASCADE)

    room = models.ForeignKey(Room, related_name='members', on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.user.username
    

class Messages(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)

    message = models.CharField(max_length=100)

    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self) -> str:
        return super().__str__()

