from typing import Dict

from pymongo.client_session import ClientSession

from ..database.collections import get_users_collection
from ..models.stock import Stock


def index(username: str, session: ClientSession) -> Dict[str, dict]:
    users = get_users_collection(session=session)

    user = users.find_one({'username': username}, session=session)

    stocks: dict = user.get('stocks')
    return {
        _underscores_to_dots(ticker): stock for ticker, stock in stocks.items()
    }


def create(stock: Stock, username: str, session: ClientSession) -> None:
    users = get_users_collection(session=session)

    ticker = _dots_to_underscores(stock.ticker)

    users.find_one_and_update(
        filter={'username': username},
        update={
            '$set': {f'stocks.{ticker}': stock.dict()}
        },
        session=session
    )


def _dots_to_underscores(ticker: str):
    '''
    MongoDB doesn't allow keys for documents to have dots in them.
    This function converts dots to underscores so that the information can be
    saved into the database.
    '''
    return ticker.replace('.', '_').upper()


def _underscores_to_dots(ticker: str):
    '''
    Reverse operation of _dots_to_underscores.
    '''
    return ticker.replace('_', '.').upper()
