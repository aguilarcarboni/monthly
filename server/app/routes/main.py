from flask import Blueprint

bp = Blueprint('main', __name__)

@bp.route('/', methods=['GET'])
def index():
    response = {'Hello': 'World'}
    return response