from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.socialaccount.models import SocialAccount

class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def populate_user(self, request, sociallogin, data):
        user = super().populate_user(request, sociallogin, data)

        # Extrae los datos del perfil de Google
        extra_data = sociallogin.account.extra_data
        user.name = extra_data.get('given_name', '')

        # Si tienes un campo personalizado para la foto de perfil:
        if hasattr(user, 'profile_picture') and extra_data.get('picture'):
            user.profile_picture = extra_data['picture']

        return user
