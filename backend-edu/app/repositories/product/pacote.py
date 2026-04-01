from app.models.product.pacote import Pacote

class PacoteRepository:
    def __init__(self, session):
        self.bd = session

    def create(self, materia_id, nome, descricao, imagem_caminho):
        pacote = Pacote(materia_id=materia_id, nome=nome, descricao=descricao, imagem_caminho=imagem_caminho)
        try:
            self.bd.add(pacote)
            self.bd.commit()
            return pacote
        except Exception:
            self.bd.rollback()
            raise

    def get(self, pacote_id):
        return self.bd.get(Pacote, pacote_id)

    def update(self, pacote_id, data):
        pacote = self.bd.get(Pacote, pacote_id)
        if pacote is None:
            return None
        for k, v in data.items():
            setattr(pacote, k, v)
        try:
            self.bd.commit()
            return pacote
        except Exception:
            self.bd.rollback()
            raise

    def delete(self, pacote_id):
        pacote = self.bd.get(Pacote, pacote_id)
        if pacote is None:
            return None
        try:
            self.bd.delete(pacote)
            self.bd.commit()
            return True
        except Exception:
            self.bd.rollback()
            raise