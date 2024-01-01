from rest_framework.authtoken.models import Token

def create_token(user):
    token, created = Token.objects.create(user=user)
    return token


def get_token(user):
    token, created = Token.objects.get_or_create(user=user)
    return token