import jwt
import datetime
import uuid

def create_jwt_token(id, room_name):
    payload = {
            "id": id,
            "username": room_name,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=2),
            "iat": datetime.datetime.utcnow()
        }
    token = jwt.encode(payload, 'secret', algorithm='HS256')
    return token

def generate_unique_token(Model,
                      token_field="token",
                      token_function=lambda: uuid.uuid4().hex[:8]):

    unique_token_found = False
    while not unique_token_found:
        token = token_function()
        if Model.objects.filter(**{token_field:token}).count() is 0:
            unique_token_found = True
    return token