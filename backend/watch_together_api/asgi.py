import os
import django
from channels.routing import get_default_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import rooms.routing
from rooms.consumers import RoomConsumer
from django.urls import path, re_path
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'watch_together_api.settings')

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    'websocket': AuthMiddlewareStack(
        URLRouter([
            re_path(r'ws/room/(?P<room_name>\w+)/$', RoomConsumer.as_asgi())
        ]
        )
    ),
})