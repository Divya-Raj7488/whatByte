from django.contrib import admin
from django.urls import path
from . import views
from .views import (
    signup_view,
    login_view,
    dashboard_view,
    profile_view,
    change_password_view,
    forgot_password_view,
)

urlpatterns = [
    path("", views.home, name="home"),
    path("signup/", signup_view, name="signup"),
    path("login/", login_view, name="login"),
    path("dashboard/", dashboard_view, name="dashboard"),
    path("profile/", profile_view, name="profile"),
    path("change-password/", change_password_view, name="change_password"),
    path("forgot-password/", forgot_password_view, name="forgot_password"),
]

