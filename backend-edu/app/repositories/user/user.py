from app.models.user.user import User
from app.utils.password import password_hash

class UserRepository:
    def __init__(self, session):
        self.bd = session

    def create(self, nome: str, sobrenome: str, email: str, senha: str, genero: str, telefone: str):
        user = User(nome=nome, sobrenome=sobrenome, email=email, senha_hash=password_hash(senha), genero=genero, telefone=telefone)
        try:
            self.bd.add(user)
            self.bd.commit()
            return user
        except Exception:
            self.bd.rollback()
            raise

    def remove(self, user_id: int):
        user = self.bd.get(User, user_id)
        if user is None:
            return None
        try:
            self.bd.delete(user)
            self.bd.commit()
            return True
        except Exception:
            self.bd.rollback()
            raise

    def update(self, user_id: int, data: dict):
        user = self.bd.get(User, user_id)
        if user is None:
            return None
        for k, v in data.items():
            setattr(user, k, v)
        try:
            self.bd.commit()
            return user
        except Exception:
            self.bd.rollback()
            raise

    def get(self, id: int):
        return self.bd.get(User, id)

    def find_by_email(self , email: str):
        return self.bd.query(User).filter_by(email=email).first()

