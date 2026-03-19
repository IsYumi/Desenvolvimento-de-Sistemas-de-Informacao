import bcrypt

def password_hash(text: str):
    return bcrypt.hashpw(text.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def password_verify(attempt: str, hashed_password: str):
    return bcrypt.checkpw(attempt.encode('utf-8'), hashed_password.encode('utf-8'))      