from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db import models


class NextCustomUser(AbstractUser):
    email = models.EmailField(unique=True)


# Create your models here.
