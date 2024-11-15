# Dependencies with bill repository

from app.helpers.logger import logger
from app.repositories.bill_repository import create, update, read, delete
from app.helpers.response import Response
from app.repositories.bill_repository import Bill

logger.announcement('Initializing Bill Service', 'info')
logger.announcement('Bill Service initialized', 'success')

class BillService:
    def __init__(self):
        pass

    # TODO Get next ID?

    def create(self, bill: Bill):
        response = create(data=bill)
        return Response.success(response)

    def update(self, bill: Bill):
        return Response.success('Bill updated successfully')

    def delete(self, billID: str):
        return Response.success('Bill deleted successfully')

    def scheduleBillReminder(self, billID: str, highPriority: bool):
        return Response.success('Bill reminder scheduled successfully') 

    def processBillPayment(self, billID: str):
        return Response.success('Bill payment processed successfully')
    
    def findAll(self):
        return Response.success(read())