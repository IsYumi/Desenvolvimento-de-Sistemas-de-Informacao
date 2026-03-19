from app.database import SessionLocal
from app.repositories.incorreta import IncorretaRepository

def add(pergunta_id: int, resposta: str):
    with SessionLocal() as db:
        incorreta_repository = IncorretaRepository(db)
        incorreta = incorreta_repository.create(pergunta_id=pergunta_id, resposta=resposta)
        return incorreta

def remove(pergunta_id: int):
    with SessionLocal() as db:
        incorreta_repository = IncorretaRepository(db)
        incorreta_repository.remove(pergunta_id)

def get(pergunta_id: int):
    with SessionLocal() as db:
        incorreta_repository = IncorretaRepository(db)
        return incorreta_repository.get(pergunta_id)
    
def update(pergunta_id: int, resposta: str):
    with SessionLocal() as db:
        incorreta_repository = IncorretaRepository(db)
        return incorreta_repository.update(pergunta_id, resposta=resposta)

def get_by_question(pergunta_id: int):
    with SessionLocal() as db:
        incorreta_repository = IncorretaRepository(db)
        return incorreta_repository.get_by_question(pergunta_id)