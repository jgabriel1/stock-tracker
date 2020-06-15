from typing import Dict

from pymongo.client_session import ClientSession

from ..database.collections import get_users_collection
from ..models.stock import Stock


def index(username: str, session: ClientSession) -> Dict[str, dict]:
    users = get_users_collection(session=session)

    user = users.find_one({'username': username}, session=session)

    stocks: dict = user.get('stocks')
    return stocks


def create(stock: Stock, username: str, session: ClientSession) -> None:
    users = get_users_collection(session=session)

    users.find_one_and_update(
        filter={'username': username},
        update={
            '$set': {
                'stocks', {stock.ticker, stock.dict()}
            }
        },
        session=session
    )


def update(stock: Stock, username: str, session: ClientSession) -> None:
    users = get_users_collection(session=session)

    users.find_one_and_update(
        filter={'username': username},
        update={
            '$set': {
                'stocks', {f'{stock.ticker}': stock.dict()}
            }
        },
        session=session
    )


def destroy(stock: Stock, username: str, session: ClientSession) -> None:
    users = get_users_collection(session=session)

    users.find_one_and_update(
        filter={'username': username},
        update={
            '$unset': {f'stocks.{stock.ticker}': ''}
        },
        session=session
    )
