from flask import Flask, jsonify
from flask_cors import CORS
from app.database import load_users
from app.utils.exceptions import AppError
from app.routes.user import user_bp
from app.routes.auth import auth_bp

from sqlalchemy.exc import SQLAlchemyError

def create_app():
    app = Flask(__name__)
    CORS(app)
    def handle_app_error(e):
        return jsonify({"error": e.message}), e.status_code
    
    def handle_db_error(e):
        return jsonify({"error": "Database error"}), 500

    def handle_unexpected(e):
        return jsonify({"error": "Unexpected server error"}), 500
    
    app.register_error_handler(AppError, handle_app_error)
    app.register_error_handler(SQLAlchemyError, handle_db_error)
    app.register_error_handler(Exception, handle_unexpected)

    app.register_blueprint(user_bp)
    app.register_blueprint(auth_bp)
    return app


def start():
    load_users()
    app = create_app()
    return app