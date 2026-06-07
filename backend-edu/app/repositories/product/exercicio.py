from app.models.product.exercicio import Exercicio

class ExercicioRepository:
    def __init__(self, session):
        self.bd = session

    def create(self, pacote_id, titulo, pergunta, resposta, nivel):
        exercicio = Exercicio(pacote_id=pacote_id, titulo=titulo, pergunta=pergunta, resposta=resposta, nivel=nivel)
        try:
            self.bd.add(exercicio)
            self.bd.commit()
            return exercicio
        except Exception:
            self.bd.rollback()
            raise

    def get(self, exercicio_id):
        return self.bd.get(Exercicio, exercicio_id)

    def update(self, exercicio_id, data):
        exercicio = self.bd.get(Exercicio, exercicio_id)
        if exercicio is None:
            return None
        for k, v in data.items():
            setattr(exercicio, k, v)
        try:
            self.bd.commit()
            return exercicio
        except Exception:
            self.bd.rollback()
            raise

    def delete(self, exercicio_id):
        exercicio = self.bd.get(Exercicio, exercicio_id)
        if exercicio is None:
            return None
        try:
            self.bd.delete(exercicio)
            self.bd.commit()
            return True
        except Exception:
            self.bd.rollback()
            raise
    
    def get_by_pacote(self, pacote_id):
        return self.bd.query(Exercicio).filter_by(pacote_id=pacote_id).all( ) 