from datetime import datetime
from typing import List

from fastapi.testclient import TestClient
from pydantic import create_model
from pytest import approx
from starlette.status import HTTP_200_OK


def test_index_transactions(
    client: TestClient, auth_headers, create_transaction
):
    right_now = datetime.utcnow().timestamp()

    for _ in range(10):
        create_transaction({
            'ticker': 'AAPL',
            'quantity': 100,
            'total_value': 35000,
            'timestamp': right_now
        })

    response = client.get('/transactions', headers=auth_headers, params={
        'ticker': 'AAPL'
    })

    assert response.status_code == HTTP_200_OK

    transaction_model = create_model('transaction', **{
        'ticker': (str, ...),
        'quantity': (int, ...),
        'total_value': (float, ...),
        'timestamp': (int, ...),
        'average_price': (float, ...),
    })

    index_model = create_model('index',  **{
        'transactions': (List[transaction_model], ...)
    })

    assert index_model.validate(response.json())

    data = index_model.parse_obj(response.json())

    for transaction in data.transactions:
        assert transaction.ticker == 'AAPL'
        assert transaction.quantity == 100
        assert transaction.total_value == 35000
        assert transaction.average_price == 350
        assert approx(right_now, transaction.timestamp)


def test_deleting_all_records_when_soldout(
    client: TestClient, auth_headers, create_transaction
):
    create_transaction({
        'ticker': 'AAPL',
        'quantity': 100,
        'total_value': 35000,
        'timestamp': datetime.utcnow().timestamp()
    })

    create_transaction({
        'ticker': 'AAPL',
        'quantity': -100,
        'total_value': -50000,
        'timestamp': datetime.utcnow().timestamp()
    })

    response = client.get('/transactions', headers=auth_headers, params={
        'ticker': 'AAPL'
    })

    assert response.status_code == HTTP_200_OK
    assert response.json() == {'transactions': []}
