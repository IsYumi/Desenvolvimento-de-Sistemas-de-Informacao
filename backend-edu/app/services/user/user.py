from app.repositories.user.user import UserRepository
from app.user_database import SessionLocal
from app.utils.exceptions import EmailAlreadyRegistered, UserNotFound
from app.utils.password import password_hash

blacklist = {"id", "created_at"}

def add(nome, sobrenome, email, senha, genero, telefone):
    with SessionLocal() as bd:
        user_repo = UserRepository(bd)
        if user_repo.find_by_email(email=email) is not None:
            raise EmailAlreadyRegistered()
        return user_repo.create(nome=nome, sobrenome=sobrenome, email=email, senha=senha, genero=genero, telefone=telefone).to_dict()  

def get(user_id):
    with SessionLocal() as bd:
        user_repo = UserRepository(bd)
        user = user_repo.get(user_id)
        if user is None:
            raise UserNotFound()
        return user.to_dict()  
    
def update(user_id, data):
    with SessionLocal() as bd:
        user_repo = UserRepository(bd)
        if "senha" in data:
            data["senha_hash"] = password_hash(data["senha"])
            del data["senha"]
        data = {k: v for k, v in data.items() if k not in blacklist}
        user = user_repo.update(user_id=user_id, data=data)
        if user is None:
            raise UserNotFound()
        return user.to_dict()  
    
def delete(user_id):
    with SessionLocal() as bd:
        user_repo = UserRepository(bd)
        user = user_repo.remove(user_id=user_id)
        if user is None:
            raise UserNotFound()
        return True

def find_by_email(email):
    with SessionLocal() as bd:
        user_repo = UserRepository(bd)
        user = user_repo.find_by_email(email=email)
        if user is None:
            raise UserNotFound()
        return user