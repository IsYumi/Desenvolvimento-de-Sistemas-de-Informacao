from app.models.product.materia import Materia

class MateriaRepository:
    def __init__(self, session):
        self.bd = session

    def create(self, nome):
        materia = Materia(nome=nome)
        try:
            self.bd.add(materia)
            self.bd.commit()
            return materia
        except Exception:
            self.bd.rollback()
            raise

    def get(self, materia_id):
        return self.bd.get(Materia, materia_id)

    def update(self, materia_id, data):
        materia = self.bd.get(Materia, materia_id)
        if materia is None:
            return None
        for k, v in data.items():
            setattr(materia, k, v)
        try:
            self.bd.commit()
            return materia
        except Exception:
            self.bd.rollback()
            raise

    def delete(self, materia_id):
        materia = self.bd.get(Materia, materia_id)
        if materia is None:
            return None
        try:
            self.bd.delete(materia)
            self.bd.commit()
            return True
        except Exception:
            self.bd.rollback()
            raise
        
    def get_all(self):
        from app.models.product.materia import Materia
        return self.bd.query(Materia).all()