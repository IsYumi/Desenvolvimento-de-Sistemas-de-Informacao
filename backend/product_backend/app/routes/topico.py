from flask import Blueprint, jsonify, request
from app.utils.exceptions import BadRequest
import app.services.topico as topico_service

topico_bp = Blueprint('topico', __name__, url_prefix='/topico')

@topico_bp.route('/', methods=['POST'])
def create():
    data = request.get_json()
    if not data:
        raise BadRequest("No data provided")
    try:
        topico = topico_service.add(descricao=data['descricao'], materia_id=data['materia_id'])
        return jsonify(topico.to_dict()), 201
    except KeyError as err:
        raise BadRequest(f"Missing argument: {err.args[0]}")

@topico_bp.route('/<int:topico_id>', methods=['GET'])
def get(topico_id):
    topico = topico_service.get(topico_id)
    return jsonify(topico.to_dict()), 200

@topico_bp.route('/<int:topico_id>', methods=['PUT'])
def update(topico_id):
    data = request.get_json()
    if not data:
        raise BadRequest("No data provided")
    try:
        topico = topico_service.update(topico_id, descricao=data['descricao'], materia_id=data['materia_id'])
        return jsonify(topico.to_dict()), 200
    except KeyError as err:
        raise BadRequest(f"Missing argument: {err.args[0]}")

@topico_bp.route('/<int:topico_id>', methods=['DELETE'])
def delete(topico_id):
    topico_service.remove(topico_id)
    return '', 204