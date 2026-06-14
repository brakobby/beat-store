from django.db import models
from beats.models import Beat


class License(models.Model):
    class LicenseTypeChoices(models.TextChoices):
        NON_EXCLUSIVE = 'non_exclusive', 'Non Exclusive'
        EXCLUSIVE = 'exclusive', 'Exclusive'
        BUYOUTS = 'buyouts', 'Buyouts'
        FREE_DOWNLOAD = 'free_download', 'Free Download'


    class FileFormatChoice(models.TextChoices):
        MP3 = 'mp3', 'MP3'
        WAV = 'wav', 'WAV'
        STEMS = 'stems', 'Stems (ZIP)'
    
    beat = models.ForeignKey(Beat, on_delete=models.CASCADE, related_name='licenses')
    license_type = models.CharField(max_length=50, choices = LicenseTypeChoices, default = LicenseTypeChoices.FREE_DOWNLOAD)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    file_format = models.CharField(max_length=10, choices=FileFormatChoice, default=FileFormatChoice.MP3)
    terms = models.TextField(blank=True, null=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('beat', 'license_type')

    def __str__(self):
        return f"{self.beat.title} - {self.license_type}" 