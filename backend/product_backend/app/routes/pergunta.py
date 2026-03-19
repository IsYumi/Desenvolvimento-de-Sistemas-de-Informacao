from flask import Blueprint, jsonify, request
from app.utils.exceptions import BadRequest
import app.services.pergunta as pergunta_service
import app.services.incorreta as incorretas_service

pergunta_bp = Blueprint('pergunta', __name__, url_prefix='/pergunta')

@pergunta_bp.route('/', methods=['POST'])
def create():
    data = request.get_json()
    if not data:
        raise BadRequest("No data provided")
    try:
        pergunta = pergunta_service.add(dificuldade=data['dificuldade'], pergunta=data['pergunta'], resposta=data['resposta'])
        return jsonify(pergunta.to_dict()), 201
    except KeyError as err:
        raise BadRequest(f"Missing argument: {err.args[0]}")

@pergunta_bp.route('/<int:pergunta_id>', methods=['GET'])
def get(pergunta_id):
    pergunta = pergunta_service.get(pergunta_id)
    return jsonify(pergunta.to_dict()), 200

@pergunta_bp.route('/<int:pergunta_id>', methods=['PUT'])
def update(pergunta_id):
    data = request.get_json()
    if not data:
        raise BadRequest("No data provided")
    try:
        pergunta = pergunta_service.update(pergunta_id, dificuldade=data.get('dificuldade'), pergunta=data.get('pergunta'), resposta=data.get('resposta'))
        return jsonify(pergunta.to_dict()), 200
    except KeyError as err:
        raise BadRequest(f"Missing argument: {err.args[0]}")

@pergunta_bp.route('/<int:pergunta_id>', methods=['DELETE'])
def delete(pergunta_id):
    pergunta_service.remove(pergunta_id)
    return '', 204

@pergunta_bp.route('/<int:pergunta_id>/incorretas', methods=['GET'])
def get_incorretas(pergunta_id):
    incorretas = incorretas_service.get_by_question(pergunta_id)
    return jsonify([incorreta.to_dict() for incorreta in incorretas]), 200
