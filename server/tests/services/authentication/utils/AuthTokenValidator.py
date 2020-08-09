import os

import jwt
from dotenv import load_dotenv


class AuthTokenValidator:

    def __init__(self):
        load_dotenv()
        self.SECRET_KEY = os.getenv('SECRET_KEY')
        self.ALGORITHM = os.getenv('ALGORITHM')

    def validate(self, access_token: str) -> bool:
        try:
            jwt.decode(
                jwt=access_token,
                key=self.SECRET_KEY,
                algorithms=[self.ALGORITHM]
            )
            return True
        except jwt.PyJWTError:
            return False
