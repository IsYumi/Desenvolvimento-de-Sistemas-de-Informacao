from flask import Flask, jsonify
from flask_cors import CORS
from app.user_database import load_users
from app.product_database import load_products
from app.utils.exceptions import AppError
from app.routes.user.user import user_bp
from app.routes.user.auth import auth_bp
from sqlalchemy.exc import SQLAlchemyError

def create_app():
    app = Flask(__name__)
    CORS(app,
     resources={r"/*": {"origins": "http://localhost:5173"}},
     supports_credentials=True,
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
    def handle_app_error(e):
        return jsonify({"error": f"{e}"}), e.status_code
    
    def handle_db_error(e):
        return jsonify({"error": f"{e}"}), 500

    
    app.register_error_handler(AppError, handle_app_error)
    app.register_error_handler(SQLAlchemyError, handle_db_error)

    app.register_blueprint(user_bp)
    app.register_blueprint(auth_bp)
    return app


def start():
    load_users()
    load_products()
    app = create_app()
    return app