from pymongo.client_session import ClientSession

# from ..database.collections import get_users_collection
from ..models.stock import Stock


def create(stock: Stock, username: str, session: ClientSession):
    ...


def destroy(stock: Stock, username: str, session: ClientSession):
    ...
