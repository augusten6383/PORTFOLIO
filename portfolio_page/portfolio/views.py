from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.db import models
from django.urls import reverse
from portfolio.models import Service

def index(request):
    services = Service.objects.all()
    return render(request, 'index.html', {'services': services, 'photo_portfolio': photo, 'car_portfolio': car})

def resume(request):
    return render(request, 'resume.html')

def photo(request):
    return render(request, 'projects/photo-landing.html')

def car(request):
    return render(request, 'projects/car.html')

def phone(request):
    return render(request, 'projects/samsung.html')

def login(request):
    return render(request, 'projects/login.html')