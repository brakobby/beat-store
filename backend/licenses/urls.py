from django.urls import path 
from .views import BeatLicenseListView


urlpatterns =[
    path('<int:beat_id>/licenses/', BeatLicenseListView.as_view(), name='beat-licenses'),
]