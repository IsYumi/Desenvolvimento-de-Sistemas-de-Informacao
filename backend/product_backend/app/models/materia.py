from app.database import Base
from sqlalchemy import Column, Integer, String
class Materia(Base):
    __tablename__ = "materias"
  
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    descricao = Column(String(255), nullable=False)


    def to_dict(self):
        data = {
            column.name: getattr(self, column.name)
            for column in self.__table__.columns
        }
        return data