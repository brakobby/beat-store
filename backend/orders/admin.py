from django.contrib import admin
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id','customer','beat','license','total_amount','status','created_at']
    list_filter = ['status']
    search_fields = ['customer__email', 'beat__title']
    readonly_fields = ['created_at','updated_at']