from flask import Blueprint, jsonify, request
from app.utils.exceptions import BadRequest
import app.services.auth as auth_service
import app.services.otp as otp_service
import app.services.user as user_service

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/', methods=['POST'])
def auth():
    data = request.get_json()
    if not data:
        raise BadRequest("No data provided")
    email = data.get("email")
    senha = data.get("senha")
    otp = data.get("otp")
    if not email or not senha:
        raise BadRequest("Missing fields")
    result = auth_service.login(email, senha, otp)
    return jsonify({
                "token": result
            }), 200

@auth_bp.route('/otp', methods=['POST'])
def generate_otp():
    data = request.get_json()
    if not data:
        raise BadRequest("No data provided")
    email = data.get("email")
    if not email:
        raise BadRequest("Missing email")
    user = user_service.get_by_email(email)
    token = otp_service.create(user.id)
    user_service.send_token(user.id, token)
    return jsonify({"otp": token}), 201

@auth_bp.route('/verificar-otp', methods=['POST'])
def validate_otp():
    data = request.get_json()
    if not data:
        raise BadRequest("No data provided")
    email = data.get("email")
    otp = data.get("codigo")
    if not email or not otp:
        raise BadRequest("Missing fields")
    user = user_service.get_by_email(email)
    if not user:
        raise BadRequest("User not found")
    if not otp_service.validate(user.id, otp):
        raise BadRequest("Invalid OTP")
    return True, 200
