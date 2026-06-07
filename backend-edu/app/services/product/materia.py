from app.product_database import SessionLocal
from app.repositories.product.materia import MateriaRepository

def add(nome):
    with SessionLocal() as db:
        repo = MateriaRepository(db)
        materia = repo.create(nome=nome)
        return materia.to_dict()

def update(materia_id, data):
    with SessionLocal() as db:
        materia_repo = MateriaRepository(db)
        data = {k: v for k, v in data.items()}
        materia = materia_repo.update(materia_id=materia_id, data=data)
        if materia is None:
            raise Exception("Materia não encontrada")
        return materia.to_dict()

def delete(materia_id):
    with SessionLocal() as db:
        materia_repo = MateriaRepository(db)
        return materia_repo.delete(materia_id)
    
def get_by_id(materia_id):
    with SessionLocal() as db:
        repo = MateriaRepository(db)
        materia = repo.get(materia_id)
        return materia.to_dict() if materia else None
    
def get_all():
    with SessionLocal() as db:
        repo = MateriaRepository(db)
        materias = repo.get_all()
        return [m.to_dict() for m in materias]