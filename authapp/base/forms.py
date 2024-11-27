from django import forms
from django.contrib.auth.forms import (
    UserCreationForm,
    AuthenticationForm,
    PasswordChangeForm,
)
from .models import NextCustomUser


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = NextCustomUser
        fields = ["username", "email", "password1", "password2"]


class LoginForm(AuthenticationForm):
    username = forms.CharField(label="Username or Email")


class PasswordChangeFormCustom(PasswordChangeForm):
    pass
