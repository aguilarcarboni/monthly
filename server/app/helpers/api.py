import requests
import os

url = f"0.0.0.0:{os.getenv('LF_API_PORT')}"

def access_api(endpoint, method='GET', data=None):
    response = requests.request(method, url + endpoint, json=data)
    try:
        return response.json()
    except:
        return response.content