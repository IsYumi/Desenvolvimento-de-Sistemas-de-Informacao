from flask import Blueprint, jsonify, request
import app.services.auth as auth_service
import app.services.otp as otp_service
import app.services.user as user_service
from app.utils.exceptions import BadRequest

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/', methods = ['POST', 'OPTIONS'])
def IniciarLogin():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    data = request.get_json()
    email = data.get('email')
    password = data.get('senha')
    if auth_service.login(email, password):
        otp_service.create(user_id=user_service.find_by_email(email))
        return jsonify({'message': 'OTP enviado para o email'}), 200
    return jsonify({'message': 'Falha no login'}), 401