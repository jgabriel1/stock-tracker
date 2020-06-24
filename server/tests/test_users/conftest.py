from typing import Callable

import pytest
from fastapi.testclient import TestClient
from starlette.status import HTTP_201_CREATED


@pytest.fixture
def mock_user() -> dict:
    return {
        'username': 'testuser',
        'password': 'secretpassword123',
        'email': 'test@email.com'
    }


@pytest.fixture
def register_user(client: TestClient) -> Callable:

    def user_created(user: dict) -> None:
        response = client.post('/auth/register', json=user)
        assert response.status_code == HTTP_201_CREATED

    return user_created


@pytest.fixture
def auth_headers(client: TestClient, register_user, mock_user) -> dict:
    register_user(mock_user)

    token_response = client.post('/auth/token', data={
        'username': mock_user.get('username'),
        'password': mock_user.get('password'),
    })

    token = token_response.json().get('access_token')

    return {'Authorization': f'Bearer {token}'}
