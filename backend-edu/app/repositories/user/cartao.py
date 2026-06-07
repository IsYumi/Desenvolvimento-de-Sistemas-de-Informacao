from app.models.user.cartao import Cartao

class CartaoRepository:
    def __init__(self, session):
        self.bd = session
        
    def create(self, id: int, nome: str, sobrenome: str, numero_cartao: str, data_validade: str, cvv: str):
        cartao = Cartao(id= id, nome=nome, sobrenome=sobrenome, numero_cartao=numero_cartao, data_validade=data_validade, cvv=cvv)
        try:
            self.bd.add(cartao)
            self.bd.commit()
            return cartao
        except Exception:
            self.bd.rollback()
            raise
    
    def get_by_id(self, cartao_id: int):
        return self.bd.query(Cartao).filter(Cartao.id == cartao_id).first()
    
    def delete(self, cartao_id: int):
        cartao = self.get_by_id(cartao_id)
        if cartao:
            try:
                self.bd.delete(cartao)
                self.bd.commit()
                return True
            except Exception:
                self.bd.rollback()
                raise
        return False
    
    def update(self, cartao_id: int, data: dict):
        cartao = self.get_by_id(cartao_id)
        if cartao:
            for key, value in data.items():
                setattr(cartao, key, value)
            try:
                self.bd.commit()
                return cartao
            except Exception:
                self.bd.rollback()
                raise
        return None
