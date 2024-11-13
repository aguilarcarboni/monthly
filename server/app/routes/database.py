from flask import Blueprint, request
from app.modules.database import read
import json

bp = Blueprint('database', __name__)

@bp.route('/read', methods=['POST'])
def read_route():
    payload = request.get_json(force=True)
    if isinstance(payload, str):
        try:
            payload = json.loads(payload)
        except json.JSONDecodeError:
            return {"error": "Invalid JSON string"}, 400
    response = read(table=payload['table'], params=payload['params'])
    return response
