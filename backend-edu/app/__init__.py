from flask import Flask, jsonify
from flask_cors import CORS
from app.database import load_users
from app.utils.exceptions import AppError
from app.routes.user import user_bp
from sqlalchemy.exc import SQLAlchemyError

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:5173"], supports_credentials=True)
    def handle_app_error(e):
        return jsonify({"error": f"{e}"}), e.status_code
    
    def handle_db_error(e):
        return jsonify({"error": f"{e}"}), 500

    def handle_unexpected(e):
        return jsonify({"error": f"{e}"}), 500
    
    app.register_error_handler(AppError, handle_app_error)
    app.register_error_handler(SQLAlchemyError, handle_db_error)
    app.register_error_handler(Exception, handle_unexpected)

    app.register_blueprint(user_bp)
    return app


def start():
    load_users()
    app = create_app()
    return app