from sqlalchemy import Integer, String, Column
from app.product_database import Base

class Materia(Base):
    __tablename__ = "materia"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    nome = Column(String(255), nullable=False)
    
    def to_dict(self):
        data = {
            column.name: getattr(self, column.name)
            for column in self.__table__.columns
        }
        return data