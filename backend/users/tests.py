from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase

User = get_user_model()


class AdminAuthTests(APITestCase):
	def setUp(self):
		self.admin_user = User.objects.create_user(
			username='admin',
			email='admin@example.com',
			password='password123',
			is_staff=True,
		)
		self.normal_user = User.objects.create_user(
			username='user',
			email='user@example.com',
			password='password123',
		)

	def test_non_staff_user_cannot_obtain_admin_tokens(self):
		url = reverse('login')
		response = self.client.post(
			url,
			{'email': 'user@example.com', 'password': 'password123'},
			format='json',
		)

		self.assertEqual(response.status_code, 403)
		self.assertIn('detail', response.data)

	def test_staff_user_can_obtain_tokens(self):
		url = reverse('login')
		response = self.client.post(
			url,
			{'email': 'admin@example.com', 'password': 'password123'},
			format='json',
		)

		self.assertEqual(response.status_code, 200)
		self.assertIn('access', response.data)
		self.assertIn('refresh', response.data)

class UserAuthTests(APITestCase):
    def setUp(self):
        self.normal_user = User.objects.create_user(
            username='user',
            email='user@example.com',
            password='password123',
        )
        self.admin_user = User.objects.create_user(
            username='admin',
            email='admin@example.com',
            password='password123',
            is_staff=True,
        )

    def test_non_staff_user_can_login_via_user_login(self):
        url = reverse('user_login')
        response = self.client.post(
            url,
            {'email': 'user@example.com', 'password': 'password123'},
            format='json',
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_staff_user_can_login_via_user_login(self):
        url = reverse('user_login')
        response = self.client.post(
            url,
            {'email': 'admin@example.com', 'password': 'password123'},
            format='json',
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)