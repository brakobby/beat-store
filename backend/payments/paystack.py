import requests
import uuid
from django.conf import settings

PAYSTACK_SECRET_KEY = settings.PAYSTACK_SECRET_KEY
BASE_URL = 'https://api.paystack.co'

HEADERS = {
    'Authorization': f'Bearer {PAYSTACK_SECRET_KEY}',
    'Content_Type': 'application/json',
}

def generate_reference():
    return str(uuid.uuid4().replace('-',''))[:20]

def initialize_payment(email, amount_in_cedis, reference, callback_url):
    url = f"{BASE_URL}/transaction/initialize"
    payload = {
        'email': email,
        'amount':int(amount_in_cedis * 100),
        'reference':reference,
        'callback_url':callback_url,
        'currency': 'GHS',
    }

    response =requests.post(url, json=payload, headers=HEADERS)
    return response.json()

def verify_payment(reference):
    url = f'{BASE_URL}/transaction/verify/{reference}'
    response = requests.post(url, headers=HEADERS)
    return response.json()

