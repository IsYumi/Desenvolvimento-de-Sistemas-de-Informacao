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
    
# Coloque no seu arquivo de rotas da matéria (ex: materia.py dentro de routes)
@materia_bp.route('/get/<int:id>', methods=['GET', 'OPTIONS'])
def get_materia(id):
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    try:
        from app.services.product import materia as materia_service
        materia_data = materia_service.get_by_id(id)
        if materia_data:
            return jsonify({"ok": True, "materia": materia_data}), 200
        return jsonify({"ok": False, "mensagem": "Matéria não encontrada"}), 404
    except Exception as e:
        return jsonify({"ok": False, "mensagem": str(e)}), 500