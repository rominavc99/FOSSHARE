from django.shortcuts import render
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.core.exceptions import ImproperlyConfigured
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from core.models import PostSecondary, Post, Tag
from rest_framework import status
from .serializers import PostSerializer, TagSerializer

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = "http://localhost:3000"
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    return Response({
        "username": user.username,
        "full_name": user.name,
        "profile_picture": user.profile_picture  
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post_secondary(request):
    content = request.data.get("content")
    title = request.data.get("title", content[:50])

    if not content:
        return Response({"error": "Content is required."}, status=400)

    post = PostSecondary.objects.create(
        user=request.user,
        title=title,
        content=content
    )
    return Response({
    "id": post.id,
    "title": post.title,
    "content": post.content,
    "created_at": post.created_at.isoformat(),
    "user": {
        "name": request.user.name,
        "profile_picture": request.user.profile_picture,
    }
}, status=201)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_tags(request):
    tags = Tag.objects.all()
    serializer = TagSerializer(tags, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    data = request.data.copy()
    data['user'] = request.user.id  # Assign user from the session
    serializer = PostSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)