import uuid

def generate_unique_token(Model,
                      token_field="token",
                      token_function=lambda: uuid.uuid4().hex[:8]):

    unique_token_found = False
    while not unique_token_found:
        token = token_function()
        if Model.objects.filter(**{token_field:token}).count() is 0:
            unique_token_found = True
    return token