from typing import List

from pymongo.client_session import ClientSession

from ..database.collections import get_users_collection
from ..models.transaction import Transaction


def index(
    username: str, ticker: str, start: int, end: int, session: ClientSession
) -> List[Transaction]:
    users = get_users_collection(session)

    transactions, = users.find(
        filter={'username': username},
        projection={'transactions': 1},
        session=session
    )

    # Filtering the transactions in Python. This is not ideal, later look into:
    # https://docs.mongodb.com/manual/reference/operator/aggregation/filter/#exp._S_filter
    # https://docs.mongodb.com/manual/reference/operator/aggregation/project/

    def filters(transaction: dict):
        ticker_filter = transaction.get('ticker') == ticker

        time_filters = (
            (transaction.get('timestamp') >= start) if start else True
            and
            (transaction.get('timestamp') <= end) if end else True
        )

        return ticker_filter and time_filters

    filtered_transactions = filter(filters, transactions)

    return [
        Transaction.parse_obj(transaction)
        for transaction in filtered_transactions
    ]


def create(transaction: Transaction, session: ClientSession):
    ...
