from rest_framework import generics, permissions, filters
from .models import Genre, Beat
from .serializers import BeatSerializer, GenreSerializer


class BeatListView(generics.ListAPIView):
    serializer_class = BeatSerializer
    permission_class = [permissions.AllowAny]
    filter_backends = [filters.searchFilter]
    search_fields = ['title', 'genre__name','mood']