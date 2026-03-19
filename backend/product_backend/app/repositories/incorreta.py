import app.models.incorreta as Incorreta

class IncorretaRepository:
    def __init__(self, session):
        self.bd = session

    def create(self, pergunta_id: int, resposta: str):
        incorreta = Incorreta(pergunta_id=pergunta_id, resposta=resposta)
        try:
            self.bd.add(incorreta)
            self.bd.commit()
            return incorreta
        except Exception:
            self.bd.rollback()
            raise

    def remove(self, incorreta_id: int):
        incorreta = self.bd.get(Incorreta, incorreta_id)
        if incorreta is None:
            return None
        try:
            self.bd.delete(incorreta)
            self.bd.commit()
            return True
        except Exception:
            self.bd.rollback()
            raise

    def update(self, pergunta_id: int, resposta: str):
        incorreta = self.bd.get(Incorreta, pergunta_id)
        if incorreta is None:
            return None
        try:
            incorreta.resposta = resposta
            self.bd.commit()
            return incorreta
        except Exception:
            self.bd.rollback()
            raise

    def get(self, incorreta_id: int):
        return self.bd.get(Incorreta, incorreta_id)
    
    def get_by_question(self, pergunta_id: int):
        return self.bd.query(Incorreta).filter(Incorreta.pergunta_id == pergunta_id).all()