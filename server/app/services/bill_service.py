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
            logger.info(f'Creating bill: {bill}')
            response = db.create(table='bills', data=bill)
            logger.success(f'Bill created successfully: {response}')
            return Response.success(response)
        except Exception as e:
            logger.error(f'Error creating bill: {e}')
            return Response.error(e)

    # Update an existing bill
    def updateBill(self, billID: str, updatedBill: dict):
        try:
            logger.info(f'Updating bill: {billID} with {updatedBill}')
            response = db.update(table='bills', params={"id": billID}, data=updatedBill)
            logger.success(f'Bill updated successfully: {response}')
            return Response.success(response)
        except Exception as e:
            logger.error(f'Error updating bill: {e}')
            return Response.error(e)

    # Delete a bill by ID
    def deleteBill(self, billID: str):
        try:
            logger.info(f'Deleting bill: {billID}')
            response = db.delete(table='bills', params={"id": billID})
            logger.success(f'Bill deleted successfully: {response}')
            return Response.success(response)
        except Exception as e:
            logger.error(f'Error deleting bill: {e}')
            return Response.error(e)

    # Schedule a bill reminder (set priority)
    def scheduleBillReminder(self, billID: str, highPriority: bool):
        # Placeholder for actual scheduling logic
        try:
            logger.info(f'Scheduling bill reminder: {billID} with high priority: {highPriority}')
            return Response.success('Bill reminder scheduled successfully')
        except Exception as e:
            logger.error(f'Error scheduling bill reminder: {e}')
            return Response.error(e)

    # Process a bill payment
    def processBillPayment(self, billID: str):
        # Placeholder for actual payment processing logic
        try:
            logger.info(f'Processing bill payment: {billID}')
            return Response.success('Bill payment processed successfully')
        except Exception as e:
            logger.error(f'Error processing bill payment: {e}')
            return Response.error(e)

    # Retrieve all bills
    def findAll(self):
        try:
            logger.info(f'Finding all bills')
            response = db.read(table='bills')
            return Response.success(response)
        except Exception as e:
            logger.error(f'Error finding all bills: {e}')
            return Response.error(e)

    def pause_reminders(self, bill_id: str):
        bill = db.session.query(Bill).filter(Bill.id == bill_id).first()
        if bill:
            bill.isAlertEnabled = False  # Pause alerts
            db.session.commit()
            return {"status": "success"}
        return {"status": "error", "message": "Bill not found"}