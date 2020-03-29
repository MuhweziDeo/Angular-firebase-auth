from django.contrib import admin
from django.urls import path
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view()
def home(request):
    return Response({"message": "Welcome to emere 0.001. To access the api use api/v1"})
    
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home)
]
