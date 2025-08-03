# serializers.py
from rest_framework import serializers
from .models import Post, Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class PostSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Tag.objects.all()
    )

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'tags', 'created_at']

    def create(self, validated_data):
        tags = validated_data.pop('tags', [])
        post = Post.objects.create(**validated_data)
        post.tags.set(tags)
        return post
