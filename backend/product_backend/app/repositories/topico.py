import app.models.topico as Topico

class TopicoRepository:
    def __init__(self, session):
        self.bd = session

    def create(self, descricao: str, materia_id: int):
        topico = Topico(descricao=descricao, materia_id=materia_id)
        try:
            self.bd.add(topico)
            self.bd.commit()
            return topico
        except Exception:
            self.bd.rollback()
            raise

    def remove(self, topico_id: int):
        topico = self.bd.get(Topico, topico_id)
        if topico is None:
            return None
        try:
            self.bd.delete(topico)
            self.bd.commit()
            return True
        except Exception:
            self.bd.rollback()
            raise

    def update(self, topico_id: int, data: dict):
        topico = self.bd.get(Topico, topico_id)
        if topico is None:
            return None
        for k, v in data.items():
            setattr(topico, k, v)
        try:
            self.bd.commit()
            return topico
        except Exception:
            self.bd.rollback()
            raise

    def get(self, topico_id: int):
        return self.bd.get(Topico, topico_id)