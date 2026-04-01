from datetime import datetime, timedelta, UTC
import jwt
from app.repositories.user.otp import OtpRepository
from app.utils.password import password_verify
from app.user_database import SessionLocal
from app.repositories.user.user import UserRepository
from app.utils.exceptions import OtpNotFound, UserNotFound, InvalidCredentials, InvalidOtp
from config import settings
        
def login(email: str, senha: str):
    with SessionLocal() as bd:
        user = UserRepository(bd).find_by_email(email)
        if user is None:
            raise UserNotFound()
        if not password_verify(senha, user.senha_hash):
            raise InvalidCredentials()
        return True
       
    
def validarOtp(email:str , otp_code: str):
    with SessionLocal() as bd:
        user_repo = UserRepository(bd)
        user = user_repo.find_by_email(email)
        if user is None:
            raise UserNotFound()
        otp = OtpRepository(bd).find_by_user(user.id)
        if otp is None:
            raise OtpNotFound()
        now =  datetime.now(UTC)
        token = jwt.encode(
                    {
                        "sub": str(user.id),
                        "iat": now,
                        "exp": now + timedelta(hours=24)
                    },
                    settings.JWT_SECRET,
                    algorithm="HS256"
                )
        return token