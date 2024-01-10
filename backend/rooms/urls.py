from django.urls import path 
from . import views 
 
urlpatterns = [ 
    path('rooms/', views.RoomView.as_view({'get': 'get_all'})), 
    path('rooms/get/', views.RoomView.as_view({'get': 'get_room'})), 
    path('rooms/create/', views.RoomView.as_view({'post': 'create_room'})), 
    path('rooms/delete/', views.RoomView.as_view({'delete': 'delete_room'})), 
 
    path('rooms/members/', views.MemberView.as_view({'get': 'get_members'})), 
    path('rooms/join_room/', views.MemberView.as_view({'post': 'join_room'})), 
    path('rooms/leave/', views.MemberView.as_view({'delete': 'remove_member'})), 
    path('rooms/close_room/', views.MemberView.as_view({'delete': 'close_room'})), 
 
    path('rooms/videos/', views.VideoView.as_view({'get': 'get_all_video'})), 
    path('rooms/videos/get/', views.VideoView.as_view({'get': 'get_video'})), 
    path('rooms/videos/add/', views.VideoView.as_view({'post': 'add_video'})), 
]