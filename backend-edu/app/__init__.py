from flask import Flask, jsonify
from flask_cors import CORS
from app.database import load_users
from app.utils.exceptions import AppError
from app.routes.user import user_bp
from app.routes.auth import auth_bp
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
    app = create_app()

    @app.after_request
    def after_request(response):
        response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
        response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
        return response
    app.after_request(after_request)
    return app