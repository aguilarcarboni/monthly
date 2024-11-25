from flask import Flask
from flask_cors import CORS
import os
from flask import jsonify
from app.helpers.logger import logger
from dotenv import load_dotenv
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

load_dotenv()

def create_app():
    app = Flask(__name__)
    cors = CORS(app, resources={r"/*": {"origins": "*"}})
    app.config['CORS_HEADERS'] = 'Content-Type'

    from app.routes import user_routes, bill_routes
    app.register_blueprint(bill_routes.bp, url_prefix='/bill_service')
    app.register_blueprint(user_routes.bp, url_prefix='/user_service')

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