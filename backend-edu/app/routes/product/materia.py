from flask import Blueprint, jsonify, request, make_response
import app.services.product.materia as materia_service
from app.utils.exceptions import BadRequest
materia_bp = Blueprint('materia', __name__, url_prefix='/materia')

@materia_bp.route('add', methods=['POST', 'OPTIONS'])
@materia_bp.route('add/', methods=['POST', 'OPTIONS'])
def create():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    data = request.get_json()
    nome = data.get('nome')
    materia = materia_service.add(nome)
    return jsonify({"ok": True, "materia": materia}), 201

@materia_bp.route('/update', methods = ['PUT', 'OPTIONS'])
@materia_bp.route('/update/', methods = ['PUT', 'OPTIONS'])
def update():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    try:
        data = request.get_json()
        if not data:
            raise BadRequest("No data provided")
        materia = materia_service.update(data.get('id'), data)
        return jsonify({"ok": True, "materia": materia}), 200
    except Exception as e:
        print("Erro update:", e)
        return jsonify({"ok": False, "mensagem": "Erro ao atualizar"}), 500
    
@materia_bp.route('/delete', methods = ['DELETE', 'OPTIONS'])
@materia_bp.route('/delete/', methods = ['DELETE', 'OPTIONS'])
def delete():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    try:
        data = request.get_json()
        if not data:
            raise BadRequest("No data provided")
        materia_id = int(data.get('id'))
        materia_service.delete(materia_id)
        return jsonify({"ok": True, "mensagem": "Materia deletado com sucesso"}), 200
    except Exception as e:
        return jsonify({"ok": False, "mensagem": "Erro ao deletar"}), 500