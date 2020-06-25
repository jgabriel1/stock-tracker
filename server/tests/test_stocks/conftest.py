from typing import Callable, List

import pytest
from fastapi.testclient import TestClient
from pydantic import create_model
from starlette.status import HTTP_200_OK, HTTP_201_CREATED


@pytest.fixture
def auth_headers(client: TestClient) -> str:
    register_response = client.post('/auth/register', json={
        'username': 'testuser',
        'email': 'test@email.com',
        'password': 'password123'
    })

    assert register_response.status_code == HTTP_201_CREATED

    token_response = client.post('/auth/token', data={
        'username': 'testuser',
        'password': 'password123'
    })

    assert token_response.status_code == HTTP_200_OK

    token = token_response.json().get('access_token')

    return {'Authorization': f'Bearer {token}'}


@pytest.fixture
def create_transaction(client: TestClient, auth_headers) -> Callable:

    def transaction_created(transaction: dict) -> None:
        client.post('/transactions', json=transaction, headers=auth_headers)

    return transaction_created


@pytest.fixture
def stocks_list_model():
    stock_model = create_model('stock', **{
        'ticker': (str, ...),
        'total_invested': (float, ...),
        'total_sold': (float, ...),
        'currently_owned_shares': (int, ...),
        'average_bought_price': (float, ...),
        'regularMarketPrice': (float, ...),
        'chartPreviousClose': (float, ...),
    })

    list_model = create_model('stocks_list', **{
        'total_applied': (float, ...),
        'stocks': (List[stock_model], ...)
    })

    return list_model
