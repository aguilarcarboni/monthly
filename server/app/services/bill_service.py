from app.helpers.logger import logger
from backend.repositories.bill_repository import Bill, db
from app.helpers.response import Response

logger.announcement('Initializing Bill Service', 'info')
logger.announcement('Bill Service initialized', 'success')

class BillService:
    def __init__(self):
        pass

    # Create a new bill
    def createBill(self, bill: Bill):
        try:
            response = db.create(table='bills', data=bill)
            return Response.success(response)
        except Exception as e:
            return Response.error(e)

    # Update an existing bill
    def updateBill(self, billID: str, updatedBill: dict):
        try:
            response = db.update(table='bills', params={"id": billID}, data=updatedBill)
            return Response.success(response)
        except Exception as e:
            return Response.error(e)

    # Delete a bill by ID
    def deleteBill(self, billID: str):
        try:
            response = db.delete(table='bills', params={"id": billID})
            return Response.success(response)
        except Exception as e:
            return Response.error(e)

    # Schedule a bill reminder (set priority)
    def scheduleBillReminder(self, billID: str, highPriority: bool):
        # Placeholder for actual scheduling logic
        try:
            return Response.success('Bill reminder scheduled successfully')
        except Exception as e:
            return Response.error(e)

    # Process a bill payment
    def processBillPayment(self, billID: str):
        # Placeholder for actual payment processing logic
        try:
            return Response.success('Bill payment processed successfully')
        except Exception as e:
            return Response.error(e)

    # Retrieve all bills
    def findAll(self):
        try:
            response = db.read(table='bills')
            return Response.success(response)
        except Exception as e:
            return Response.error(e)