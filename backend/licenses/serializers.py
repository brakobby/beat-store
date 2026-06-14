from rest_framework import serializers
from .models import License



class LicenseSerializer(serializers.ModelSerializer):
    license_type_display = serializers.CharField(source='get_license_type_display',read_only=True)
    file_format_display = serializers.CharField(source = 'get_file_format_display', read_only=True)

    class Meta:
        model = License
        fields = ['id', 'beat', 'license_type', 'license_type_display','price', 'file_format_display', 'terms', 'is_available', 'created_at']
        