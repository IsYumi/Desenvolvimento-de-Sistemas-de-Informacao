from app.database import SessionLocal
from app.repositories.pergunta import PerguntaRepository

def add(dificuldade: str, pergunta: str, resposta: str):
    with SessionLocal() as db:
        pergunta_repository = PerguntaRepository(db)
        pergunta = pergunta_repository.create(dificuldade=dificuldade, pergunta=pergunta, resposta=resposta)
        return pergunta

def remove(pergunta_id: int):
    with SessionLocal() as db:
        pergunta_repository = PerguntaRepository(db)
        pergunta_repository.remove(pergunta_id)

def get(pergunta_id: int):
    with SessionLocal() as db:
        pergunta_repository = PerguntaRepository(db)
        return pergunta_repository.get(pergunta_id)
    
def update(pergunta_id: int, dificuldade: str = None, pergunta: str = None, resposta: str = None):
    with SessionLocal() as db:
        pergunta_repository = PerguntaRepository(db)
        return pergunta_repository.update(pergunta_id, dificuldade=dificuldade, pergunta=pergunta, resposta=resposta)
