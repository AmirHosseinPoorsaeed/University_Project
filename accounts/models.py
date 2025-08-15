from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = models.CharField(max_length=150, blank=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to='profile_pics/')

    def __str__(self):
        return f'{self.user.email} Profile'
