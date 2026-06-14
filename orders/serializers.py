from rest_framework import serializers
from .models import Order
from beats.serializers import BeatSerializer
from licenses.serializers import LicenseSerializer


class OrderSerializer(serializers.ModelSerializer):
    beat = BeatSerializer(read_only=True)
    license = LicenseSerializer(read_only=True)
    beat_id = serializers.IntegerField(write_only=True)
    license_id = serializers.IntegerField(write_only=True)

    class Meta: 
        model = Order
        fields = ['id', 'beat','beat_id', 'license', 'license_id', 'total_amount', 'status', 'created_at']
        read_only_fields = ['total_amount','status','created_at']

    # Validation
    def validate(self, data):
        from beats.models import Beat
        from licenses.models import License

        # Beat Validation
        try:
            
            beat = Beat.objects.get(id=data['beat_id'], is_active=True)
        
        except Beat.DoesNotExist:

            raise serializers.ValidationError('Beat not found or is not active')
        # Validate License

        try: 
            license = License.objects.get(id=data['license_id'], beat = beat, is_available = True)

        except License.DoesNotExist:
            raise serializers.ValidationError('License not found or not available for this beat')
        
        data['beat'] = beat
        data['license'] = license
        data['total_amount'] = license.price
        return data
    
    def create(self, validated_data):
        validated_data.pop('beat_id')
        validated_data.pop('license_id')
        return super().create(validated_data)