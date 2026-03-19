from app.database import Base
from sqlalchemy import CHAR, Column, ForeignKey, Integer, String

class Pergunta(Base):
    __tablename__ = "perguntas"
  
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    topico_id = Column(Integer, ForeignKey("topicos.id"), nullable=False)
    pergunta = Column(String(255), nullable=False)
    resposta = Column(String(255), nullable=False)
    dificuldade = Column(Integer, nullable=False)
    plano = Column(CHAR(1), nullable=False, default='P') #F - Free, P - Premium
    def to_dict(self):
        data = {
            column.name: getattr(self, column.name)
            for column in self.__table__.columns
        }
        return data