from typing import List

from pydantic import BaseModel, EmailStr

from .stock import Stock


class User(BaseModel):
    username: str
    email: EmailStr


class UserPublic(User):
    stocks: List[Stock] = []


class UserInDB(User):
    password: str


class UserOutDB(UserInDB):
    stocks: List[Stock] = []
