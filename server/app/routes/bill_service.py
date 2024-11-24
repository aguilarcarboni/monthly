from flask import Blueprint, request, Flask, jsonify
from app.modules.bill_service import BillService
from app.helpers.response import Response
from app.helpers.logger import logger

bp = Blueprint('bill_service', __name__)
BillService = BillService()

# Route to create a bill
@bp.route('/create', methods=['POST'])
def create_bill_route():
    payload = request.get_json()
    try:
        bill = payload['bill']
        response = BillService.create(bill)
        return response
    except Exception as e:
        return Response.error(e)

@bp.route('/updateBill', methods=['PUT'])
def update_bill_route():
    payload = request.get_json()
    billID = payload['billID']
    updatedBill = payload['updatedBill']  # Extract the updated bill data from the request
    try:
        response = BillService.updateBill(billID, updatedBill)
        return response
    except Exception as e:
        error_message = str(e)  # Convertir el error a cadena
        return Response.error(error_message)

# Route to delete a bill
@bp.route('/deleteBill', methods=['POST'])
def delete_bill_route():
    payload = request.get_json()
    billID = payload['billID']
    try:
        response = BillService.deleteBill(billID)
        return response
    except Exception as e:
        return Response.error(e)

# Route to get all bills
@bp.route('/findAll', methods=['GET'])
def find_all_route():
    try:
        response = BillService.findAll()
        return response
    except Exception as e:
        return Response.error(e)

# Route to schedule a bill reminder
@bp.route('/scheduleBillReminder', methods=['POST'])
def schedule_bill_reminder_route():
    payload = request.get_json()
    billID = payload['billID']
    highPriority = payload['highPriority']
    try:
        response = BillService.scheduleBillReminder(billID, highPriority)
        return response
    except Exception as e:
        return Response.error(e)

# Route to initiate a payment for a bill
@bp.route('/initiatePayment', methods=['POST'])
def initiate_payment_route():
    payload = request.get_json()
    billID = payload['billID']
    try:
        response = BillService.processBillPayment(billID)
        return response
    except Exception as e:
        return Response.error(e)
