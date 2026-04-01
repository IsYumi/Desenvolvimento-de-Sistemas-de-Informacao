from sqlalchemy import Integer, String, Column, Text, ForeignKey
from app.product_database import Base

class Pacote(Base):
    __tablename__ = "pacote"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    materia_id = Column(Integer, ForeignKey("materia.id"), nullable=False)
    nome = Column(String(255), nullable=False)
    descricao = Column(Text, nullable=False)
    imagem_caminho  = Column(String(255), nullable=False)

    def to_dict(self):
        data = {
            column.name: getattr(self, column.name)
            for column in self.__table__.columns
        }
        return data