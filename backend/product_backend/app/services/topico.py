from app.database import SessionLocal
from app.repositories.topico import TopicoRepository

def add(descricao: str, materia_id: int):
    with SessionLocal() as db:
        topico_repository = TopicoRepository(db)
        topico = topico_repository.create(descricao=descricao, materia_id=materia_id)
        return topico

def remove(topico_id: int):
    with SessionLocal() as db:
        topico_repository = TopicoRepository(db)
        topico_repository.remove(topico_id)

def get(topico_id: int):
    with SessionLocal() as db:
        topico_repository = TopicoRepository(db)
        return topico_repository.get(topico_id)
    
def update(topico_id: int, descricao: str, materia_id: int):
    with SessionLocal() as db:
        topico_repository = TopicoRepository(db)
        return topico_repository.update(topico_id, descricao=descricao, materia_id=materia_id)
