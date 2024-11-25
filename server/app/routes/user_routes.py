from flask import Blueprint, request
from app.services.user_service import UserService

bp = Blueprint('user_service', __name__)
UserService = UserService()

@bp.route('/createUser', methods=['POST'])
def create_user_route():
    payload = request.get_json()
    user = payload['user']
    return UserService.createUser(user)

@bp.route('/deleteUser', methods=['POST'])
def delete_user_route():
    payload = request.get_json()
    userID = payload['userID']
    return UserService.deleteUser(userID)

@bp.route('/findAll', methods=['GET'])
def find_all_route():
    return UserService.findAll()