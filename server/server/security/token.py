import os
from datetime import datetime, timedelta

import jwt
from dotenv import load_dotenv
from fastapi.exceptions import HTTPException
from pydantic import BaseModel
from starlette.status import HTTP_401_UNAUTHORIZED

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
ACCESS_TOKEN_EXPIRE_DAYS = int(os.getenv('ACCESS_TOKEN_EXPIRE_DAYS'))


class Token(BaseModel):
    access_token: str
    token_type: str


def create_access_token(
        data: dict,
        expires_delta: timedelta = timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
) -> str:
    expire: datetime = datetime.utcnow() + expires_delta

    to_encode = data.copy()
    to_encode.update({'exp': expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token=SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail='Invalid authentication credentials.',
            headers={'WWW-Authenticate': 'Bearer'}
        )
