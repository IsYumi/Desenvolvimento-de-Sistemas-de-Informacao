from flask import Blueprint, jsonify, request
import app.services.auth as auth_service
import app.services.otp as otp_service
import app.services.user as user_service
from app.utils.exceptions import BadRequest

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')
@auth_bp.route('/', methods=['POST', 'OPTIONS'])
def IniciarLogin():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    data = request.get_json()
    if not data:
        raise BadRequest("No data provided")
    email = data.get('email')
    password = data.get('senha')
    user = user_service.find_by_email(email)
    auth_service.login(email, password)
    otp_service.create(user_id=user.id)
    return jsonify({"ok": True, 'message': 'OTP enviado para o email'}), 200

@auth_bp.route('/verificar-otp/', methods=['POST', 'OPTIONS'])
def verificarotp():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    data = request.get_json()
    if not data:
        raise BadRequest("No data provided")
    email = data.get('email')
    otp_code = data.get('otp')
    user = user_service.find_by_email(email)
    token = auth_service.validarOtp(user.id, otp_code)
    return jsonify({"ok": True, "token": token}), 200