from app.helpers.api import access_api

bill = {
    'name': 'New Bill',
    'keywords': 'new, bill'
}

response = access_api('/bill_service/create', 'POST', data={'bill': bill})
print(response)