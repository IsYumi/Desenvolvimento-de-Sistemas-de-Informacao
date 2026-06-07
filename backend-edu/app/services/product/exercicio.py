from app.product_database import SessionLocal
from app.repositories.product.exercicio import ExercicioRepository

def add(pacote_id, titulo, pergunta, resposta, nivel):
    with SessionLocal() as session:
        repo = ExercicioRepository(session)
        return repo.create(pacote_id, titulo, pergunta, resposta, nivel).to_dict()
    
def update(exercicio_id, data):
    with SessionLocal() as bd:
        exercicio_repo = ExercicioRepository(bd)
        data = {k: v for k, v in data.items()}
        exercicio = exercicio_repo.update(exercicio_id=exercicio_id, data=data)
        if exercicio is None:
            raise Exception("Exercício não encontrado")
        return exercicio.to_dict() 
    
def delete(exercicio_id):
    with SessionLocal() as bd:
        exercicio_repo = ExercicioRepository(bd)
        return exercicio_repo.delete(exercicio_id)
    
def get(exercicio_id):
    with SessionLocal() as bd:
        exercicio_repo = ExercicioRepository(bd)
        exercicio = exercicio_repo.get(exercicio_id)
        if exercicio is None:
            raise Exception("Exercício não encontrado")
        return exercicio.to_dict()

def get_by_pacote(pacote_id):
    with SessionLocal() as bd:
        exercicio_repo = ExercicioRepository(bd)
        exercicios = exercicio_repo.get_by_pacote(pacote_id)
        return [exercicio.to_dict() for exercicio in exercicios]