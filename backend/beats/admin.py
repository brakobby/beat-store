from django.contrib import admin
from .models import Genre, Beat

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']

@admin.register(Beat)
class BeatAdmin(admin.ModelAdmin):
    list_display = ['title','genre','mood','bpm', 'key', 'is_active','created_at']
    list_filter = ['genre','mood','is_active']
    search_fields = ['title']