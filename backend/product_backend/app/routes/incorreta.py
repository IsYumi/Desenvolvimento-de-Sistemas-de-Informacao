from flask import Blueprint, jsonify, request
from app.utils.exceptions import BadRequest
import app.services.incorreta as incorreta_service

incorreta_bp = Blueprint('incorreta', __name__, url_prefix='/incorreta')

@incorreta_bp.route('/', methods=['POST'])
def create():
    data = request.get_json()
    if not data:
        raise BadRequest("No data provided")
    try:
        incorreta = incorreta_service.add(pergunta_id=data['pergunta_id'], resposta=data['resposta'])
        return jsonify(incorreta.to_dict()), 201
    except KeyError as err:
        raise BadRequest(f"Missing argument: {err.args[0]}") 

@incorreta_bp.route('/<int:incorreta_id>', methods = ['GET'])
def get(incorreta_id):
    incorreta = incorreta_service.get(incorreta_id)
    return jsonify(incorreta.to_dict()), 200

@incorreta_bp.route('/<int:incorreta_id>', methods = ['PUT'])
def update(incorreta_id):
    data = request.get_json()
    if not data:
        raise BadRequest("No data provided")
    try:
        incorreta = incorreta_service.update(incorreta_id, data)
        return jsonify(incorreta.to_dict()), 200
    except KeyError as err:
        raise BadRequest(f"Missing argument: {err.args[0]}")

@incorreta_bp.route('/<int:incorreta_id>', methods = ['DELETE'])
def delete(incorreta_id):
    incorreta_service.delete_by_id(incorreta_id)
    return '', 204