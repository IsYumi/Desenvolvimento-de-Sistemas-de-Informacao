from flask import Blueprint, jsonify, request, make_response
import app.services.user.auth as auth_service
import app.services.user.otp as otp_service
import app.services.user.user as user_service
from app.utils.exceptions import BadRequest

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('', methods=['POST', 'OPTIONS'])
@auth_bp.route('/', methods=['POST', 'OPTIONS'])
def IniciarLogin():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    data = request.get_json()
    if not data:
        raise BadRequest("No data provided")
    email = data.get('email')
    senha = data.get('senha')
    user = user_service.find_by_email(email)
    auth_service.login(email, senha)
    otp_service.create(user_id=user.id)
    return jsonify({"ok": True, 'message': 'OTP enviado para o email'}), 200

@auth_bp.route('/verificar-otp', methods=['POST', 'OPTIONS'])
@auth_bp.route('/verificar-otp/', methods=['POST', 'OPTIONS'])
def verificarotp():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    data = request.get_json()
    if not data:
        raise BadRequest("No data provided")
    email = data.get('email')
    otp_code = data.get('codigo')
    token = auth_service.validarOtp(email, otp_code) 
    resposta = make_response(jsonify({"ok": True, "token": token}), 200)
    resposta.set_cookie(
        'token',
        token,
        httponly=True,
        secure=False, #Localhost é HTTP e não HTTPS
        samesite='Lax',
    )
    return resposta