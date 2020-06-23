from datetime import datetime
from typing import Callable

import pytest
from fastapi.testclient import TestClient
from starlette.status import HTTP_200_OK, HTTP_201_CREATED

mock_transaction = pytest.fixture(lambda: {
    'ticker': 'AAPL',
    'quantity': 100,
    'total_value': 35000,
    'timestamp': datetime.utcnow().timestamp()
})


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
