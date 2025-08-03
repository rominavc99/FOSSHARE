
from django.contrib import admin
from django.urls import path, include
from core.views import GoogleLogin, get_user_profile,create_post_secondary, create_post, list_tags

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
]
