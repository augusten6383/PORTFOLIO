from django.db import models

class Service(models.Model):
    title = models.CharField(max_length=200)
    about = models.TextField()
    pricing = models.TextField()

def __str__(self) :
    return self.title