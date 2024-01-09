import os
from channels.routing import get_default_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import rooms.routing


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'watch_together_api.settings')

application = get_default_application()

application = ProtocolTypeRouter({
    "http": get_default_application(),
    'websocket': AuthMiddlewareStack(
        URLRouter(
            rooms.routing.websocket_urlpatterns
        )
    ),
})