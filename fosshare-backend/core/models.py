from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


# -------------------------
# Custom User Model Manager
# -------------------------
class CustomUserManager(BaseUserManager):
    def create_user(self, email, name=None, password=None, **extra_fields):
        if not email:
            raise ValueError("El correo electrónico es obligatorio")
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_unusable_password()  # Para evitar uso de contraseña si es login por Google
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, name, password, **extra_fields)


# -------------------------
# Custom User Model
# -------------------------
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    username = models.CharField(max_length=150, unique=True, blank=True, null=True)
    profile_picture = models.URLField(blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


# -------------------------
# Tags
# -------------------------
class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


# -------------------------
# Posts
# -------------------------
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, related_name='posts', blank=True)

    def __str__(self):
        return self.title
    
class PostSecondary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# -------------------------
# Ratings
# -------------------------
class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='ratings')
    score = models.IntegerField()  # Puedes usar de 1 a 5

    class Meta:
        unique_together = ('user', 'post')  # Un usuario solo puede calificar una vez

    def __str__(self):
        return f"{self.user.email} → {self.post.title} = {self.score}"