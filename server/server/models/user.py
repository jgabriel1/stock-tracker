from typing import List

from pydantic import BaseModel, EmailStr

from .stock import Stock


class User(BaseModel):
    username: str
    email: EmailStr


class UserInDB(User):
    password: str


class UserStocks(User):
    stocks: List[Stock] = []
