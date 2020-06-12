from pymongo.client_session import ClientSession
from pymongo.database import Collection, Database


def get_users_collection(session: ClientSession) -> Collection:
    db: Database = session.client.get_database()
    users: Collection = db.users
    return users


def get_stocks_collection(session: ClientSession) -> Collection:
    db: Database = session.client.get_database()
    stocks: Collection = db.stocks
    return stocks
