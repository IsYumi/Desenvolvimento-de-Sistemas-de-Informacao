import app.models.pergunta as Pergunta

class PerguntaRepository:
    def __init__(self, session):
        self.bd = session
        
    def create(self, dificuldade, pergunta, resposta):
        nova_pergunta = Pergunta(
            pergunta=pergunta,
            resposta=resposta,
            dificuldade=dificuldade,
        )
        self.bd.add(nova_pergunta)
        self.bd.commit()
        self.bd.refresh(nova_pergunta)
        return nova_pergunta

    def remove(self, pergunta_id):
        pergunta = self.bd.get(Pergunta, pergunta_id)
        if pergunta:
            self.bd.delete(pergunta)
            self.bd.commit()
            return True
        return False

    def update(self, id: int, data: dict):
        pergunta = self.bd.get(Pergunta, id)
        if pergunta is None:
            return None
        for k, v in data.items():
            setattr(pergunta, k, v)
        try:
            self.bd.commit()
            return pergunta
        except Exception:
            self.bd.rollback()
            raise

    def get(self, pergunta_id):
        return self.bd.get(Pergunta, pergunta_id)