from datetime import datetime

from fastapi.testclient import TestClient
from starlette.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST


def test_buy_transaction(client: TestClient, mock_transaction, auth_headers):
    response = client.post(
        '/transactions', json=mock_transaction, headers=auth_headers
    )

    assert response.status_code == HTTP_204_NO_CONTENT
    assert not response.content


def test_sell_transaction(
    client: TestClient, auth_headers, create_transaction
):
    create_transaction({
        'ticker': 'AAPL',
        'quantity': 100,
        'total_value': 35000,
        'timestamp': datetime.utcnow().timestamp()
    })

    response = client.post('/transactions', headers=auth_headers, json={
        'ticker': 'AAPL',
        'quantity': -80,
        'total_value': -30000,
        'timestamp': datetime.utcnow().timestamp()
    })

    assert response.status_code == HTTP_204_NO_CONTENT
    assert not response.content


def test_sell_transaction_more_than_owned(
    client: TestClient, auth_headers, create_transaction
):
    create_transaction({
        'ticker': 'AAPL',
        'quantity': 100,
        'total_value': 35000,
        'timestamp': datetime.utcnow().timestamp()
    })

    response = client.post('/transactions', headers=auth_headers, json={
        'ticker': 'AAPL',
        'quantity': -200,
        'total_value': -100000,
        'timestamp': datetime.utcnow().timestamp()
    })

    assert response.status_code == HTTP_400_BAD_REQUEST
