from app.user_database import Base
from sqlalchemy import Column, Integer, String, DateTime, CHAR
from datetime import datetime, UTC

class Cartao(Base):
    __tablename__ = "cartoes"
    __exclude__ = {'senha_hash'}
    id = Column(Integer, primary_key=True, autoincrement=False, index=False)
    nome = Column(String(255), nullable=False)
    sobrenome = Column(String(255), nullable=False)
    numero_cartao = Column(String(255), nullable=False)
    data_validade = Column(String(255), nullable=False)
    cvv = Column(String(255), nullable=False)
    registered_at = Column(DateTime, nullable=False, default=lambda: datetime.now(UTC), onupdate=lambda: datetime.now(UTC))

    def to_dict(self):
        data = {
            column.name: getattr(self, column.name)
            for column in self.__table__.columns if column.name not in self.__exclude__
        }
        return data