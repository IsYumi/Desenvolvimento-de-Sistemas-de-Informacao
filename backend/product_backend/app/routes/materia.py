from flask import Blueprint, jsonify, request
from app.utils.exceptions import BadRequest
import app.services.materia as materia_service

materia_bp = Blueprint('materia', __name__, url_prefix='/materia')

@materia_bp.route('/', methods=['POST'])
def create():
    data = request.get_json()
    if not data:
        raise BadRequest("No data provided")
    try:
        materia = materia_service.add(descricao=data['descricao'])
        return jsonify(materia.to_dict()), 201
    except KeyError as err:
        raise BadRequest(f"Missing argument: {err.args[0]}")

@materia_bp.route('/<int:materia_id>', methods=['GET'])
def get(materia_id):
    materia = materia_service.get(materia_id)
    return jsonify(materia.to_dict()), 200

@materia_bp.route('/<int:materia_id>', methods=['PUT'])
def update(materia_id):
    data = request.get_json()
    if not data:
        raise BadRequest("No data provided")
    try:
        materia = materia_service.update(materia_id, data['descricao'])
        return jsonify(materia.to_dict()), 200
    except KeyError as err:
        raise BadRequest(f"Missing argument: {err.args[0]}")

@materia_bp.route('/<int:materia_id>', methods=['DELETE'])
def delete(materia_id):
    materia_service.remove(materia_id)
    return '', 204