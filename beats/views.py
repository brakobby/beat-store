from rest_framework import generics, permissions, filters
from .models import Genre, Beat
from .serializers import BeatSerializer, GenreSerializer


class BeatListView(generics.ListAPIView):
    serializer_class = BeatSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'genre__name','mood']
    
    def get_queryset(self):
        queryset = Beat.objects.filter(is_active=True).order_by('-created_at')
        genre = self.request.query_params.get('genre')
        mood = self.request.query_params.get('mood')
        if genre:
            queryset = queryset.filter(genre__name__icontains=genre)
        
        if mood:
            queryset =queryset.filter(mood__icontains=mood)
        return queryset
    
class BeatDetailView(generics.RetrieveAPIView):
    serializer_class = BeatSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Beat.objects.filter(is_active=True)

class GenreListView(generics.ListAPIView):
    serializer_class = GenreSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Genre.objects.all()