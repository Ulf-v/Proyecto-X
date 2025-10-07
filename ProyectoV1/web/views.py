from django.shortcuts import render

# Create your views here.
# blog/views.py

from django.http import HttpResponse

def inicio(request):
    return HttpResponse("Hola, esta es mi primera vista en Django.")
