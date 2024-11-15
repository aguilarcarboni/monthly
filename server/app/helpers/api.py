import requests
import os

url = f"http://127.0.0.1:8000"

def access_api(endpoint, method='GET', data=None):
    response = requests.request(method, url + endpoint, json=data)
    try:
        return response.json()
    except:
        return response.content