# Dependencies with bill repository

from app.helpers.logger import logger
from app.repositories.bill_repository import create, update, read, delete
from app.types.bill import Bill
from app.helpers.response import Response

logger.announcement('Initializing Bill Service', 'info')
logger.announcement('Bill Service initialized', 'success')

class BillService:
    def __init__(self):
        pass

    def createBill(self, bill: Bill):
        create(table='bills', data=bill)
        return Response.success('Bill created successfully')

    def updateBill(self, bill: Bill):
        return Response.success('Bill updated successfully')

    def deleteBill(self, billID: str):
        return Response.success('Bill deleted successfully')

    def scheduleBillReminder(self, billID: str, highPriority: bool):
        return Response.success('Bill reminder scheduled successfully') 

    def processBillPayment(self, billID: str):
        return Response.success('Bill payment processed successfully')