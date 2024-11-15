from flask import Flask, request
from flask_cors import CORS
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_jwt_extended import JWTManager, verify_jwt_in_request, create_access_token, exceptions
import os
import logging
from flask import jsonify
from logging.handlers import RotatingFileHandler

from app.helpers.logger import logger

from dotenv import load_dotenv
load_dotenv()

def create_app():
    app = Flask(__name__)
    cors = CORS(app, resources={r"/*": {"origins": "*"}})
    app.config['CORS_HEADERS'] = 'Content-Type'

    from app.routes import bill_service
    app.register_blueprint(bill_service.bp, url_prefix='/bill_service')

    @app.route('/', methods=['GET'])
    def index():
        logger.info('User accessed the root route.')
        data = {
            'title': 'index',
        }
        return jsonify(data)
    
    @app.errorhandler(404)
    def not_found_error(error):
        return {"error": "Not found"}, 404

    @app.errorhandler(500)
    def internal_error(error):
        return {"error": "Internal server error"}, 500 

    return app

app = create_app()
logger.announcement('API initialized', 'success')