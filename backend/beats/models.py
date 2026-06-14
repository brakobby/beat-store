from django.db import models

class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Beat(models.Model):
    class MoodChoices(models.TextChoices):
        DARK = 'dark', 'Dark'
        HAPPY = 'happy', 'Happy'
        ROMATIC = 'romantic', 'Romantic'
        AGGRESSIVE = 'aggressive', 'Aggressive'
        CHILL = 'chill', 'Chill'
        MOTIVATIONAL = 'motivational', 'Motivational'


    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    genre = models.ForeignKey(Genre, on_delete=models.SET_NULL, null=True)
    mood = models.CharField(max_length=255, choices = MoodChoices, blank=True)
    bpm = models.PositiveIntegerField(blank=True, null=True)
    key = models.CharField(max_length=10, blank=True, null=True)
    cover_image = models.ImageField(upload_to='covers/', blank=True, null=True)
    preview_file = models.FileField(upload_to='previews/')
    full_file = models.FileField(upload_to='fulltracks/')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title