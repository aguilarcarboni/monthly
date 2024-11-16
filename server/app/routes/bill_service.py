from flask import Blueprint, request, Flask, jsonify
from app.modules.bill_service import BillService
from app.helpers.response import Response
from app.helpers.logger import logger
from modules.calendar_service import CalendarService
from modules.notification_service import NotificationService
from modules.payment_service import PaymentService
from modules.reminder_service import ReminderService

app = Flask(__name__)
calendar_service = CalendarService()
notification_service = NotificationService()
payment_service = PaymentService()
reminder_service = ReminderService(notification_service, calendar_service)

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

# Route to update a bill
@bp.route('/updateBill', methods=['POST'])
def update_bill_route():
    payload = request.get_json()
    billID = payload['billID']
    updatedBill = payload['updatedBill']
    try:
        response = BillService.updateBill(billID, updatedBill)
        return response
    except Exception as e:
        return Response.error(e)

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

@app.route('/calendar_service/addEvent', methods=['POST'])
def add_event():
    data = request.json
    reminder = data['reminder']
    calendar_service.addEvent(reminder)
    return jsonify({'status': 'success'})

@app.route('/notification_service/send', methods=['POST'])
def send_notification():
    data = request.json
    notification = data['notification']
    notification_service.sendNotification(notification)
    return jsonify({'status': 'success'})

@app.route('/payment_service/initiate', methods=['POST'])
def initiate_payment():
    data = request.json
    payment_info = data['payment_info']
    transaction_id = payment_service.initiateSecurePayment(payment_info)
    return jsonify({'status': 'success', 'transaction_id': transaction_id})

@app.route('/reminder_service/schedule', methods=['POST'])
def schedule_reminder():
    data = request.json
    reminder = data['reminder']
    reminder_service.scheduleReminder(reminder)
    return jsonify({'status': 'success'})