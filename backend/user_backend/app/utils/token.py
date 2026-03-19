import secrets

def generate_token():
    return ''.join(secrets.choice('1234567890') for _ in range(6))
