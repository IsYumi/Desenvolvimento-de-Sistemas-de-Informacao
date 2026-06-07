from app.product_database import SessionLocal
from app.repositories.product.pacote import PacoteRepository

def add(materia_id, nome, descricao, imagem_caminho):
    with SessionLocal() as session:
        repo = PacoteRepository(session)
        return repo.create(materia_id, nome, descricao, imagem_caminho).to_dict()
    
def update(pacote_id, data):
    with SessionLocal() as bd:
        pacote_repo = PacoteRepository(bd)
        data = {k: v for k, v in data.items()}
        pacote = pacote_repo.update(pacote_id=pacote_id, data=data)
        if pacote is None:
            raise Exception("Pacote não encontrado")
        return pacote.to_dict() 
    
def delete(pacote_id):
    with SessionLocal() as bd:
        pacote_repo = PacoteRepository(bd)
        return pacote_repo.delete(pacote_id)