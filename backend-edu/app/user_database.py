from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

basedir = os.path.abspath(os.path.dirname(__file__))
db_folder = os.path.join(basedir, '..', 'database')
if not os.path.exists(db_folder):
    os.makedirs(db_folder)

DATABASE_URL = 'sqlite:///' + os.path.join(db_folder, "users.db")
engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)

Base = declarative_base()

def load_users():
    from app.models.user.user import User
    from app.models.user.otp import Otp
    Base.metadata.create_all(bind=engine)