from django.contrib import admin
from .models import License

# Register your models here

@admin.register(License)
class LicenseAdmin(admin.ModelAdmin):
    list_display = ['beat', 'license_type', 'price', 'file_format','is_available','created_at']
    list_filter = ['license_type', 'file_format', 'is_available']
    search_fields = ['beat__title']