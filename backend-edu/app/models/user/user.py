from app.user_database import Base
from sqlalchemy import Column, Integer, String, DateTime, CHAR
from datetime import datetime, UTC

class User(Base):
    __tablename__ = "users"
    __exclude__ = {'senha_hash'}
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    nome = Column(String(255), nullable=False)
    sobrenome = Column(String(255), nullable=False)
    genero = Column(CHAR(1), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    telefone = Column(String(25), nullable=True)
    senha_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(UTC))
    updated_at = Column(DateTime, nullable=False, default=lambda: datetime.now(UTC), onupdate=lambda: datetime.now(UTC))

    def to_dict(self):
        data = {
            column.name: getattr(self, column.name)
            for column in self.__table__.columns if column.name not in self.__exclude__
        }
        return data