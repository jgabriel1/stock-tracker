from typing import Dict

from pydantic import BaseModel, EmailStr

from .stock import Stock


class User(BaseModel):
    username: str
    email: EmailStr


class UserPublic(User):
    stocks: Dict[str, Stock] = {}


class UserInDB(User):
    password: str


class UserOutDB(UserInDB):
    stocks: Dict[str, Stock] = {}