from sqlalchemy import Integer, String, Column, Text, ForeignKey
from app.product_database import Base

class Exercicio(Base):
    __tablename__ = "exercicio"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    pacote_id = Column(Integer, ForeignKey("pacote.id"), nullable=False)
    titulo = Column(String(255), nullable=False)
    pergunta = Column(Text, nullable=False)
    resposta = Column(String(255), nullable=False)
    nivel = Column(Integer, nullable=False)

    def to_dict(self):
        data = {
            column.name: getattr(self, column.name)
            for column in self.__table__.columns
        }
        return data