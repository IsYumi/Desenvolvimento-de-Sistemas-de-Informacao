from flask import Blueprint, jsonify, make_response, request
import app.services.user.user as user_service
import app.services.user.cartao as cartao_service
from app.utils.exceptions import BadRequest
from config import settings
import jwt
user_bp = Blueprint('user', __name__, url_prefix='/user')

@user_bp.route('', methods = ['POST', 'OPTIONS'])
@user_bp.route('/', methods = ['POST', 'OPTIONS'])
def add():
    if request.method == 'OPTIONS':
        return '', 200
    data = request.get_json()
    if not data:
        raise BadRequest("No data provided")
    try:
        return jsonify({
            "ok": True,
            "usuario": user_service.add(nome=data['nome'], sobrenome=data['sobrenome'], email=data['email'], senha=data['senha'], genero=data['genero'], telefone=data['telefone'])
        }), 201
    except KeyError as err:
        raise BadRequest(f"Missing argument: {err.args[0]}")

@user_bp.route('', methods = ['GET', 'OPTIONS'])
@user_bp.route('/', methods = ['GET', 'OPTIONS'])
def get():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    token = request.cookies.get('token')
    if not token:
        return jsonify({"ok": False, "mensagem": "Não autenticado"}), 401
    payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
    user_id = int(payload.get("sub"))
    user = user_service.get(user_id)
    return jsonify(user), 200
    

@user_bp.route('/update', methods = ['PUT', 'OPTIONS'])
@user_bp.route('/update/', methods = ['PUT', 'OPTIONS'])
def update():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    token = request.cookies.get('token')
    if not token:
        return jsonify({"ok": False, "mensagem": "Não autenticado"}), 401
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        user_id = int(payload.get("sub"))
        data = request.get_json()
        if not data:
            raise BadRequest("No data provided")
        user = user_service.update(user_id, data)
        return jsonify({"ok": True, "usuario": user}), 200
    except Exception as e:
        print("Erro update:", e)
        return jsonify({"ok": False, "mensagem": "Erro ao atualizar"}), 500

@user_bp.route('/delete', methods = ['DELETE', 'OPTIONS'])
@user_bp.route('/delete/', methods = ['DELETE', 'OPTIONS'])
def delete():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    token = request.cookies.get('token')
    if not token:
        return jsonify({"ok": False, "mensagem": "Não autenticado"}), 401
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        user_id = int(payload.get("sub"))
        user_service.delete(user_id)
        response = make_response(jsonify({"ok": True, "mensagem": "Usuário deletado com sucesso"}))
        response.delete_cookie(
            "token",
            path="/",
            samesite="Lax"
        )
        return response, 200
    except Exception as e:
        return jsonify({"ok": False, "mensagem": "Erro ao deletar"}), 500
    
@user_bp.route('/logout', methods = ['POST', 'OPTIONS'])
@user_bp.route('/logout/', methods = ['POST', 'OPTIONS'])
def logout():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    token = request.cookies.get('token')
    if not token:
        return jsonify({"ok": False, "mensagem": "Não autenticado"}), 401
    try:
        response = make_response(jsonify({"ok": True, "mensagem": "Usuário deslogado com sucesso"}))
        response.delete_cookie(
            "token",
            path="/",
            samesite="Lax"
        )
        return response, 200
    except Exception as e:
        return jsonify({"ok": False, "mensagem": "Erro ao deletar"}), 500
    
@user_bp.route('/name/', methods = ['GET', 'OPTIONS'])
@user_bp.route('/name', methods=['GET', 'OPTIONS'])
def get_name():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    token = request.cookies.get('token')
    if not token:
        return jsonify({"nome": "Usuário"}), 200
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        user_id = payload.get("sub")
        
        if not user_id:
            return jsonify({"nome": "Usuário"}), 200

        user = user_service.get(int(user_id))

        return jsonify({"nome": user["nome"], "genero": user.get("genero", "M")}), 200

    except Exception as e:
        print("Erro no token:", e)
        return jsonify({"nome": "Usuário"}), 200
    
@user_bp.route('/cartao', methods=['POST', 'OPTIONS'])
@user_bp.route('/cartao/', methods=['POST', 'OPTIONS'])
def add_cartao():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    token = request.cookies.get('token')
    if not token:
        return jsonify({"ok": False, "mensagem": "Não autenticado"}), 401
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        user_id = int(payload.get("sub"))
        data = request.get_json()
        if not data:
            raise BadRequest("No data provided")
        cartao = cartao_service.add(user_id, nome=data['nome'], sobrenome=data['sobrenome'], numero_cartao=data['numero_cartao'], data_validade=data['data_validade'], cvv=data['cvv'])
        return jsonify({"ok": True, "cartao": cartao}), 201
    except KeyError as err:
        raise BadRequest(f"Missing argument: {err.args[0]}")
    except Exception as e:
        print("Erro ao adicionar cartão:", e)
        return jsonify({"ok": False, "mensagem": "Erro ao adicionar cartão"}), 500