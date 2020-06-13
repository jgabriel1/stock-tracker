from typing import Optional

from pydantic import BaseModel
from pymongo.client_session import ClientSession

from ..database.collections import get_users_collection
from ..security.hash import hash_password, verify_password
from ..models.user import UserInDB


class User(BaseModel):
    username: str
    password: str


def register(user: UserInDB, session: ClientSession) -> None:
    users = get_users_collection(session=session)

    users.insert_one({
        'username': user.username,
        'email': user.email,
        'password': hash_password(user.password)
    })


def get_info(username: str, session: ClientSession) -> Optional[UserInDB]:
    users = get_users_collection(session=session)

    user = users.find_one({'username': username})
    if user is not None:
        return UserInDB.parse_obj(user)


def authenticate(
    username: str, password: str, session: ClientSession
) -> Optional[User]:

    user = get_info(username, session=session)
    if user is None:
        return False
    if not verify_password(password, user.password):
        return False

    return user


def unregister():
    raise NotImplementedError


def change_password():
    raise NotImplementedError
