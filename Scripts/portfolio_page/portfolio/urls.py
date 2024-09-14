from django.urls import path, include
from . import views

app_name = 'portfolio'

urlpatterns = [
    path("", views.index, name="index"),
    path("resume/", views.resume, name="resume"),
    path("photo/", views.photo, name="photo"),
    path("car/", views.car, name="car"),
    path("phone/", views.phone, name="phone"),
    path("login/", views.login, name="login"),
]