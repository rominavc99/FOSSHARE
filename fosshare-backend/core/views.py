from django.shortcuts import render
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.core.exceptions import ImproperlyConfigured
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from core.models import PostSecondary, Post, Tag, Rating, Comment
from rest_framework import status
from .serializers import PostSerializer, TagSerializer, PostSecondarySerializer, PostSecondary, CommentSerializer, RatingSerializer
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.db.models import Count
from django.conf import settings


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = settings.GOOGLE_CALLBACK_URL
    
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
    print("EL USER ID ES", data['user'])
    print("EL USER ID ES", request.user.id)
    serializer = PostSerializer(data=data, context={'request': request})
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        posts = Post.objects.all().order_by("-created_at")
        serializer = PostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)

class PostSecondaryListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        posts = PostSecondary.objects.all().order_by("-created_at")
        serializer = PostSecondarySerializer(posts, many=True)
        return Response(serializer.data)
    

    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    user = request.user
    if user in post.likes.all():
        post.likes.remove(user)
        return Response({'liked': False})
    else:
        post.likes.add(user)
        return Response({'liked': True})
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rate_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    score = request.data.get('score')

    if not score or not (1 <= int(score) <= 5):
        return Response({'error': 'Score must be between 1 and 5'}, status=400)

    rating, created = Rating.objects.update_or_create(
        user=request.user, post=post, defaults={'score': score}
    )
    return Response({'success': True, 'score': rating.score})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    content = request.data.get('content')
    if content:
        comment = Comment.objects.create(post=post, user=request.user, content=content)
        return Response(CommentSerializer(comment).data, status=201)
    return Response({'error': 'Content is required'}, status=400)

@api_view(['GET'])
def top_tags(request):
    tags = Tag.objects.annotate(post_count=Count('posts')).order_by('-post_count')[:6]
    data = [{"name": tag.name, "count": tag.post_count} for tag in tags]
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def post_detail(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    serializer = PostSerializer(post, context={"request": request})
    return Response(serializer.data)