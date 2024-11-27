from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordResetForm
from django.contrib import messages
from .forms import CustomUserCreationForm, LoginForm, PasswordChangeFormCustom
# from .models import NextCustomUser

def home(request):
    return render(request, "home.html")
def signup_view(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Account created successfully! Please log in.")
            return redirect("login")
    else:
        form = CustomUserCreationForm()
    return render(request, "signup.html", {"form": form})


def login_view(request):
    if request.method == "POST":
        form = LoginForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                return redirect("dashboard")
    else:
        form = LoginForm()
    return render(request, "login.html", {"form": form})


@login_required
def dashboard_view(request):
    return render(request, "dashboard.html")


@login_required
def profile_view(request):
    user = request.user
    return render(request, "profile.html", {"user": user})


@login_required
def change_password_view(request):
    if request.method == "POST":
        form = PasswordChangeFormCustom(request.user, request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Password updated successfully!")
            return redirect("dashboard")
    else:
        form = PasswordChangeFormCustom(request.user)
    return render(request, "change_password.html", {"form": form})


def forgot_password_view(request):
    if request.method == "POST":
        form = PasswordResetForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Password reset email sent!")
            return redirect("login")
    else:
        form = PasswordResetForm()
    return render(request, "forgot_password.html", {"form": form})


# Create your views here.
