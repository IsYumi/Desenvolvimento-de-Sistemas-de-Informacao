from datetime import datetime, timedelta, UTC
import jwt
from app.repositories.otp import OtpRepository
from app.utils.password import password_verify
from app.database import SessionLocal
from app.repositories.user import UserRepository
from app.utils.exceptions import OtpNotFound, UserNotFound, InvalidCredentials, InvalidOtp
from config import settings
        
def login(email: str, password: str, otp_code: str):
    with SessionLocal() as bd:
        user = UserRepository(bd).find_by_email(email)
        if user is None:
            raise UserNotFound()
        otp = OtpRepository(bd).find_by_user(user.id)
        if otp is None:
            raise OtpNotFound()
        if not password_verify(password, user.password_hash):
            raise InvalidCredentials()
        now =  datetime.now(UTC)
        if otp_code != otp.code or otp.valid_at < now:
            raise InvalidOtp()
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