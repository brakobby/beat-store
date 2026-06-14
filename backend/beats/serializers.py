from rest_framework import serializers
from .models import Beat, Genre

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']


class BeatSerializer(serializers.ModelSerializer):
    genre = GenreSerializer(read_only=True)
    genre_id = serializers.PrimaryKeyRelatedField(
        queryset = Genre.objects.all(),
        source='genre',
        write_only= True
    )

    class Meta:
        model = Beat
        fields = [
            'id', 'title','description','genre', 'genre_id', 'mood', 'bpm', 'key', 'cover_image','preview_file', 'is_active', 'created_at'
        ]