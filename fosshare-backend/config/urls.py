
from django.contrib import admin
from django.urls import path, include
from core.views import GoogleLogin, get_user_profile,create_post_secondary, create_post, list_tags, PostSecondaryListView, PostListView, like_post, rate_post, add_comment, top_tags, post_detail

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/auth/", include("dj_rest_auth.urls")),
    path("api/auth/registration/", include("dj_rest_auth.registration.urls")),
    path("api/auth/social/", include("allauth.socialaccount.urls")),
    path("api/auth/social/login/", GoogleLogin.as_view(), name="google_login"),
    path('api/user/profile/', get_user_profile),
    path("api/postsecondary/create/", create_post_secondary, name="create_post_secondary"),
    path('api/posts/create/', create_post, name='create-post'),
    path('api/tags/', list_tags, name='list-tags'),
    path("api/posts/", PostListView.as_view(), name="post-list"),
    path("api/posts-secondary/", PostSecondaryListView.as_view(), name="post-secondary-list"),
    path('api/posts/<int:post_id>/like/', like_post, name='like_post'),
    path('api/posts/<int:post_id>/rate/', rate_post, name='rate_post'),
    path('api/posts/<int:post_id>/comment/', add_comment, name='add_comment'),
    path("api/tags/top/", top_tags, name="top-tags"),
    path('api/posts/<int:post_id>/', post_detail, name='post-detail'),
]
