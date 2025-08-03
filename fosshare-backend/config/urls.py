
from django.contrib import admin
from django.urls import path, include
from core.views import GoogleLogin, get_user_profile

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/auth/", include("dj_rest_auth.urls")),
    path("api/auth/registration/", include("dj_rest_auth.registration.urls")),
    path("api/auth/social/", include("allauth.socialaccount.urls")),
    path("api/auth/social/login/", GoogleLogin.as_view(), name="google_login"),
    path('api/user/profile/', get_user_profile),
]
