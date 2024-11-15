from flask import Blueprint, request
from app.modules.bill_service import BillService
from app.helpers.response import Response

bp = Blueprint('bill_service', __name__)
BillService = BillService()

@bp.route('/create', methods=['POST'])
def create_bill_route():
    payload = request.get_json()
    try:
        bill = payload['bill']
        response = BillService.create(bill)
        return response
    except Exception as e:
        return Response.error(e)

@bp.route('/updateBill', methods=['POST'])
def update_bill_route():
    response = BillService.updateBill()
    return response

@bp.route('/deleteBill', methods=['POST'])
def delete_bill_route():
    response = BillService.deleteBill()
    return response
