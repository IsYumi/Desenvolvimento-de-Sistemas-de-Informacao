from flask import Blueprint, jsonify, request, make_response
import app.services.product.pacote as pacote_service
from app.utils.exceptions import BadRequest

pacote_bp = Blueprint('pacote', __name__, url_prefix='/pacote')

@pacote_bp.route('add', methods=['POST', 'OPTIONS'])
@pacote_bp.route('add/', methods=['POST', 'OPTIONS'])
def create():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    data = request.get_json()
    materia_id = data.get('materia_id')
    nome = data.get('nome')
    descricao = data.get('descricao')
    imagem_caminho = data.get('imagem_caminho')
    pacote = pacote_service.add(materia_id, nome, descricao, imagem_caminho)
    return jsonify({"ok": True, "pacote": pacote}), 201


@pacote_bp.route('/update', methods = ['PUT', 'OPTIONS'])
@pacote_bp.route('/update/', methods = ['PUT', 'OPTIONS'])
def update():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    try:
        data = request.get_json()
        if not data:
            raise BadRequest("No data provided")
        pacote = pacote_service.update(data.get('id'), data)
        return jsonify({"ok": True, "pacote": pacote}), 200
    except Exception as e:
        print("Erro update:", e)
        return jsonify({"ok": False, "mensagem": "Erro ao atualizar"}), 500
    
@pacote_bp.route('/delete', methods = ['DELETE', 'OPTIONS'])
@pacote_bp.route('/delete/', methods = ['DELETE', 'OPTIONS'])
def delete():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    try:
        data = request.get_json()
        if not data:
            raise BadRequest("No data provided")
        pacote_id = int(data.get('id'))
        pacote_service.delete(pacote_id)
        return jsonify({"ok": True, "mensagem": "Pacote deletado com sucesso"}), 200
    except Exception as e:
        return jsonify({"ok": False, "mensagem": "Erro ao deletar"}), 500