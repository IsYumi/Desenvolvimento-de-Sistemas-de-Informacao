from app.repositories.user import UserRepository
from app.database import SessionLocal
from app.utils.exceptions import EmailAlreadyRegistered, UserNotFound
from app.utils.password import password_hash

blacklist = {"id", "created_at"}

def add(nome, email, password):
    with SessionLocal() as bd:
        user_repo = UserRepository(bd)
        if user_repo.find_by_email(email=email) is not None:
            raise EmailAlreadyRegistered()
        return user_repo.create(nome=nome, email=email, password=password)

def get(user_id):
    with SessionLocal() as bd:
        user_repo = UserRepository(bd)
        user = user_repo.get(user_id)
        if user is None:
            raise UserNotFound()
        return user
    
def update(user_id, data):
    with SessionLocal() as bd:
        user_repo = UserRepository(bd)
        data = {k: v for k, v in data.items() if k not in blacklist}
        if "password" in data:
            data["password_hash"] = password_hash(data["password"])
            del data["password"]
        user = user_repo.update(user_id=user_id, data=data)
        if user is None:
            raise UserNotFound()
        return user
    
def delete(user_id):
    with SessionLocal() as bd:
        user_repo = UserRepository(bd)
        user = user_repo.remove(user_id=user_id)
        if user is None:
            raise UserNotFound()
        return user
