from typing import Dict

from pymongo.client_session import ClientSession

from ..database.collections import get_users_collection


def index(username: str, session: ClientSession) -> Dict[str, dict]:
    users = get_users_collection(session=session)

    stocks = users.aggregate([
        {'$match': {'username': username}},
        {'$unwind': '$transactions'},
        {'$group': {
            '_id': '$transactions.ticker',
            'total_value': {'$sum': '$transactions.total_value'},
            'quantity': {'$sum': '$transactions.quantity'}
        }},
        {'$project': {
            'ticker': '$_id',
            '_id': 0,
            'total_value': 1,
            'quantity': 1
        }}
    ], session=session)

    return {stock.get('ticker'): stock for stock in stocks}


def show(ticker: str, username: str,  session: ClientSession) -> dict:
    users = get_users_collection(session=session)

    stock, = users.aggregate([
        {'$match': {'username': username}},
        {'$unwind': '$transactions'},
        {'$match': {'transactions.ticker': ticker}},
        {'$group': {
            '_id': '$transactions.ticker',
            'total_value': {'$sum': '$transactions.total_value'},
            'quantity': {'$sum': '$transactions.quantity'}
        }},
        {'$project': {
            'ticker': '$_id',
            '_id': 0,
            'total_value': 1,
            'quantity': 1
        }}
    ], session=session)

    return stock