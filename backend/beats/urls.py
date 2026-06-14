from django.urls import path
from .views import BeatListView, BeatDetailView, GenreListView

urlpatterns =[
    path('',BeatListView.as_view(), name='beat-list'),
    path('<int:pk>/', BeatDetailView.as_view(), name='beat-detail'),
    path('genres/', GenreListView.as_view(), name='genre-list')
]