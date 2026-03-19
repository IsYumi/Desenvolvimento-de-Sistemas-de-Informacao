from app.database import SessionLocal
from app.repositories.materia import MateriaRepository

def add(descricao: str):
    with SessionLocal() as db:
        materia_repository = MateriaRepository(db)
        materia = materia_repository.create(descricao=descricao)
        return materia

def remove(materia_id: int):
    with SessionLocal() as db:
        materia_repository = MateriaRepository(db)
        materia_repository.remove(materia_id)

def get(materia_id: int):
    with SessionLocal() as db:
        materia_repository = MateriaRepository(db)
        return materia_repository.get(materia_id)
    
def update(materia_id: int, descricao: str):
    with SessionLocal() as db:
        materia_repository = MateriaRepository(db)
        return materia_repository.update(materia_id, descricao=descricao)
