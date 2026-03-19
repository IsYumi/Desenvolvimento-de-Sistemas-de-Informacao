from flask import Flask, app, jsonify
from flask_cors import CORS
from app.database import load_products
from app.utils.exceptions import AppError
from sqlalchemy.exc import SQLAlchemyError
from app.routes.incorreta import incorreta_bp
from app.routes.materia import materia_bp
from app.routes.pergunta import pergunta_bp
from app.routes.topico import topico_bp

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

    app.register_blueprint(incorreta_bp)
    app.register_blueprint(materia_bp)
    app.register_blueprint(pergunta_bp)
    app.register_blueprint(topico_bp)

    return app


def start():
    load_products()
    app = create_app()
    return app