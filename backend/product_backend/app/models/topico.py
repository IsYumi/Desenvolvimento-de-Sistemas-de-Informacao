from app.database import Base
from sqlalchemy import Column, ForeignKey, Integer, String

class Topico(Base):
    __tablename__ = "topicos"
  
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    descricao = Column(String(255), nullable=False)
    materia_id = Column(Integer, ForeignKey("materias.id"), nullable=False)
    
    def to_dict(self):
        data = {
            column.name: getattr(self, column.name)
            for column in self.__table__.columns
        }
        return data