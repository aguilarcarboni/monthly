from flask import Blueprint
from app.modules.database import Database

bp = Blueprint('database', __name__)

database = Database()

@bp.route("/interests", methods=['GET'])
def get_interests_route():
    return database.get_interests()

@bp.route("/add", methods=['POST'])
def add_interest_route():
    return database.add_interest()

@bp.route("/remove", methods=['POST'])
def remove_interest_route():
    return database.remove_interest()