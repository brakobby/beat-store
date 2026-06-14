from rest_framework import generics, permissions
from .models import License
from .serializers import LicenseSerializer


class BeatLicenseListView(generics.ListAPIView):
    serializer_class = LicenseSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        beat_id = self.kwargs['beat_id']
        return License.objects.filter(beat__id = beat_id, is_available = True)
