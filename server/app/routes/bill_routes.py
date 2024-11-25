from flask import Blueprint, request
from app.services.bill_service import BillService
from app.helpers.response import Response

bp = Blueprint('bill_service', __name__)
BillService = BillService()

# Route to create a bill
@bp.route('/create', methods=['POST'])
def create_bill_route():
    payload = request.get_json()
    bill = payload['bill']
    return BillService.createBill(bill)

@bp.route('/updateBill', methods=['POST'])
def update_bill_route():
    payload = request.get_json()
    billID = payload['billID']
    updatedBill = payload['updatedBill']  # Extract the updated bill data from the request
    return BillService.updateBill(billID, updatedBill)

# Route to delete a bill
@bp.route('/deleteBill', methods=['POST'])
def delete_bill_route():
    payload = request.get_json()
    billID = payload['billID']
    return BillService.deleteBill(billID)

# Route to get all bills
@bp.route('/findAll', methods=['GET'])
def find_all_route():
    return BillService.findAll()

# Route to schedule a bill reminder
@bp.route('/scheduleBillReminder', methods=['POST'])
def schedule_bill_reminder_route():
    payload = request.get_json()
    billID = payload['billID']
    highPriority = payload['highPriority']
    return BillService.scheduleBillReminder(billID, highPriority)

# Route to initiate a payment for a bill
@bp.route('/initiatePayment', methods=['POST'])
def initiate_payment_route():
    payload = request.get_json()
    billID = payload['billID']
    return BillService.processBillPayment(billID)