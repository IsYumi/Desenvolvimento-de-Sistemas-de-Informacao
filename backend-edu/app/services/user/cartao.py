from app.user_database import SessionLocal
from app.repositories.user.cartao import CartaoRepository

def add(user_id, nome, sobrenome, numero_cartao, data_validade, cvv):
    with SessionLocal() as db:
        repo = CartaoRepository(db)
        cartao = repo.create(id=user_id, nome=nome, sobrenome=sobrenome, numero_cartao=numero_cartao, data_validade=data_validade, cvv=cvv)
        return cartao.to_dict()

def update(cartao_id, data):
    with SessionLocal() as db:
        cartao_repo = CartaoRepository(db)
        data = {k: v for k, v in data.items()}
        cartao = cartao_repo.update(cartao_id=cartao_id, data=data)
        if cartao is None:
            raise Exception("Cartão não encontrado")
        return cartao.to_dict()

def delete(cartao_id):
    with SessionLocal() as db:
        cartao_repo = CartaoRepository(db)
        return cartao_repo.delete(cartao_id)