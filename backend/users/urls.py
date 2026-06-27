from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    ProfileView,
    LogoutView,
    AdminTokenObtainPairView,
    UserTokenObtainPairView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', AdminTokenObtainPairView.as_view(), name='login'),
    path('user-login/', UserTokenObtainPairView.as_view(), name='user_login'),
    path('token/refresh/',TokenRefreshView.as_view(), name ='token_refresh'),
    path('logout/', LogoutView.as_view(), name ='logout'),
    path('profile/', ProfileView.as_view(), name ='profile')
]