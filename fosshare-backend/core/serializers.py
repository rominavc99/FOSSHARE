# serializers.py
from rest_framework import serializers
from .models import Post, Tag, PostSecondary, Rating, Comment
from django.contrib.auth import get_user_model

User = get_user_model()

class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'profile_picture']  

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']
        
    
class CommentSerializer(serializers.ModelSerializer):
    user = UserMiniSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'content', 'created_at']
        

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'user', 'post', 'score']
        read_only_fields = ['user']
        

class PostSerializer(serializers.ModelSerializer):
    user = UserMiniSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Tag.objects.all(), write_only=True, source='tags'
    )
    likes_count = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    user_rating = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'tags', 'tag_ids', 'created_at', 'user', 'likes_count', 'comments', 'average_rating', 'user_rating']

    def create(self, validated_data):
        return super().create(validated_data)
    
    def get_likes_count(self, obj):
        return obj.total_likes()
    
    def get_average_rating(self, obj):
        ratings = obj.ratings.all()
        if ratings.exists():
            return round(sum(r.score for r in ratings) / ratings.count(), 2)
        return None

    def get_user_rating(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            rating = obj.ratings.filter(user=request.user).first()
            if rating:
                return rating.score
        return None

class PostSecondarySerializer(serializers.ModelSerializer):
    user = UserMiniSerializer(read_only=True)
    
    class Meta:
        model = PostSecondary
        fields = '__all__'
        


