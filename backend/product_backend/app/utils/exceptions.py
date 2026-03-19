class AppError(Exception):
    def __init__(self, message: str, status_code: int):
        self.message = message
        self.status_code = status_code
        super().__init__(message)

class BadRequest(AppError):
    def __init__(self, message="Invalid request"):
        super().__init__(message, 400)
