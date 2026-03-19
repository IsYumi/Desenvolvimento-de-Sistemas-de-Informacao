from app.database import SessionLocal
from app.repositories.otp import OtpRepository
from app.repositories.user import UserRepository
from app.utils.email import send_token
from app.utils.exceptions import UserNotFound, InvalidOtp 

def create(user_id):
    with SessionLocal() as bd:
        otp_repo = OtpRepository(bd)
        user_repo = UserRepository(bd)
        user = user_repo.get_by_id(user_id=user_id)
        if user is None:
            raise UserNotFound()
        otp = otp_repo.create(user_id)
        send_token(user.email, otp.code)
        return True

def remove(user_id):
    with SessionLocal() as bd:
        otp_repo = OtpRepository(bd)
        otp = otp_repo.remove_by_user_id(user_id)
        if otp is None:
            raise InvalidOtp()
        return True