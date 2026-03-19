import app.models.materia as Materia

class MateriaRepository:
    def __init__(self, session):
        self.bd = session

    def create(self, descricao):
        materia = Materia(descricao=descricao)
        try:
            self.bd.add(materia)
            self.bd.commit()
            return materia
        except Exception:
            self.bd.rollback()
            raise

    def remove(self, materia_id: int):
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

    def update(self, materia_id: int, descricao: str):
        materia = self.bd.get(Materia, materia_id)
        if materia is None:
            return None
        try:
            materia.descricao = descricao
            self.bd.commit()
            return materia
        except Exception:
            self.bd.rollback()
            raise

    def get(self, materia_id: int):
        return self.bd.get(Materia, materia_id)