from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer
from licenses.models import License


class CreateOrderView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        license = serializer.validate_data['license']

        # Handled free download here
        if license.license_type == License.LicenseTypeChoices.FREE_DOWNLOAD:
            serializer.save(customer=self.request.user, status = Order.StatusChoice.PAID)
        else:
            serializer.save(customer = self.request.user, status = Order.StatusChoice.PENDING)

class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user).order_by('-created_at')
    

class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user)
        