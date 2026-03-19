from app.database import Base
from sqlalchemy import Column, ForeignKey, Integer, String

class Incorreta(Base):
    __tablename__ = "incorretas"
  
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    pergunta_id = Column(Integer, ForeignKey("perguntas.id"), nullable=False)
    resposta = Column(String(255), nullable=False)

    def to_dict(self):
        data = {
            column.name: getattr(self, column.name)
            for column in self.__table__.columns
        }
        return data