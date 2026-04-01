import os
from dotenv import load_dotenv

class Settings:
    def __init__(self):
        load_dotenv()
        self.GMAIL_EMAIL = os.getenv("GMAIL_EMAIL")
        self.GMAIL_SENHA = os.getenv("GMAIL_SENHA")
        self.JWT_SECRET = os.getenv("JWT_SECRET", "TEST_SECRET")
settings = Settings()