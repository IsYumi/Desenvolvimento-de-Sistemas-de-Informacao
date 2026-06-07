from flask import Blueprint, jsonify, request, make_response
from app.utils.exceptions import BadRequest
import app.services.product.exercicio as exercicio_service

exercicio_bp = Blueprint('exercicio', __name__, url_prefix='/exercicio')

@exercicio_bp.route('add', methods=['POST', 'OPTIONS'])
@exercicio_bp.route('add/', methods=['POST', 'OPTIONS'])
def create():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    data = request.get_json()
    pacote_id = data.get('pacote_id')
    titulo = data.get('titulo')
    pergunta = data.get('pergunta')
    resposta = data.get('resposta')
    nivel = data.get('nivel')
    exercicio = exercicio_service.add(pacote_id=pacote_id, titulo=titulo, pergunta=pergunta, resposta=resposta, nivel=nivel)
    return jsonify({"ok": True, "exercicio": exercicio}), 201


@exercicio_bp.route('/update', methods = ['PUT', 'OPTIONS'])
@exercicio_bp.route('/update/', methods = ['PUT', 'OPTIONS'])
def update():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    try:
        data = request.get_json()
        if not data:
            raise BadRequest("No data provided")
        exercicio = exercicio_service.update(data.get('id'), data)
        return jsonify({"ok": True, "exercicio": exercicio}), 200
    except Exception as e:
        print("Erro update:", e)
        return jsonify({"ok": False, "mensagem": "Erro ao atualizar"}), 500

@exercicio_bp.route('/delete', methods = ['DELETE', 'OPTIONS'])
@exercicio_bp.route('/delete/', methods = ['DELETE', 'OPTIONS'])
def delete():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    try:
        data = request.get_json()
        if not data:
            raise BadRequest("No data provided")
        exercicio_id = int(data.get('id'))
        exercicio_service.delete(exercicio_id)
        return jsonify({"ok": True, "mensagem": "Exercício deletado com sucesso"}), 200
    except Exception as e:
        return jsonify({"ok": False, "mensagem": "Erro ao deletar"}), 500
    
@exercicio_bp.route('/get', methods = ['GET', 'OPTIONS'])
@exercicio_bp.route('/get/', methods = ['GET', 'OPTIONS'])
def get():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    try:
        exercicio_id = int(request.args.get('id'))
        exercicio = exercicio_service.get(exercicio_id)
        return jsonify({"ok": True, "exercicio": exercicio}), 200
    except Exception as e:
        print("Erro get:", e)
        return jsonify({"ok": False, "mensagem": "Erro ao buscar exercício"}), 500
    
@exercicio_bp.route('/get_by_pacote', methods = ['GET', 'OPTIONS'])
@exercicio_bp.route('/get_by_pacote/', methods = ['GET', 'OPTIONS'])
def get_by_pacote():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    try:
        pacote_id = int(request.args.get('pacote_id'))
        exercicios = exercicio_service.get_by_pacote(pacote_id)
        return jsonify({"ok": True, "exercicios": exercicios}), 200
    except Exception as e:
        print("Erro get_by_pacote:", e)
        return jsonify({"ok": False, "mensagem": "Erro ao buscar exercícios por pacote"}), 500