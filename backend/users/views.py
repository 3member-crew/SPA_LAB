from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User
from .serializers import UserSerializer
from .utils import create_token, get_token
from rest_framework.authentication import TokenAuthentication

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        
        token = create_token(user)

        response = Response()
        response.data = ({
            'token': token.key,
        })
        return response
    
    return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def login(request):
#     print(request.data)
#     username = request.data['username']
#     password = request.data['password']

#     user = User.objects.filter(username=username).first()

#     if user and user.check_password(password):
#         token = get_token(user)
#         print(token.key)
#         return Response({
#             'token':token.key})
    
#     return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    request.auth.delete()
    return Response({'detail': 'Successfully logged out'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)
