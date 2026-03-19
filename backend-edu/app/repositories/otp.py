from app.models.otp import Otp
from app.utils.token import generate_token
from datetime import UTC, datetime, timedelta

class OtpRepository:
    def __init__(self, session):
        self.bd = session
        
    def create(self, user_id: int):
        self._clean_user(user_id=user_id)
        token = generate_token()
        valid_at = datetime.now(UTC) + timedelta(minutes=10)
        otp = Otp (user_id=user_id, code=token, valid_at=valid_at)
        try:
            self.bd.add(otp)
            self.bd.commit()
            return otp
        except Exception:
            self.bd.rollback()
            raise

    def remove(self, id: int):
        otp = self.bd.get(Otp, id)
        if otp is None:
            return None
        try:
            self.bd.delete(otp)
            self.bd.commit()
            return True
        except Exception:
            self.bd.rollback()
            raise
    
    def find_by_user(self, user_id):
        return self.bd.query(Otp).filter_by(user_id=user_id).first()
    
    def _clean_user(self, user_id: int):
        try:
            otps = self.bd.query(Otp).filter_by(user_id=user_id).all()
            for otp in otps:
                self.bd.delete(otp)
            self.bd.commit()
            return True
        except Exception:
            self.bd.rollback()
            raise

