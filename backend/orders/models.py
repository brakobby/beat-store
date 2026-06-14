from django.db import models
from django.contrib.auth import get_user_model
from beats.models import Beat
from licenses.models import License


User = get_user_model()


class Order(models.Model):
    class StatusChoice(models.TextChoices):
        PENDING = 'pending', 'Pending'
        PAID = 'paid', 'Paid'
        FAILED = 'failed', 'Failed'

    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    beat = models.ForeignKey(Beat, on_delete=models.CASCADE, related_name='orders')
    license = models.ForeignKey(License, on_delete=models.CASCADE, related_name='orders')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices = StatusChoice, default = StatusChoice.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"Order #{self.id} - {self.customer.email} - {self.beat.title}"