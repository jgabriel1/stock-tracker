import pytest
from starlette.testclient import TestClient
from starlette.status import HTTP_201_CREATED


class RegisterUserCase:

    def __init__(self, client: TestClient, user_data: dict):
        self.client = client
        self.user_data = user_data

    def register(self):
        return self.client.post('auth/register', json={
            **self.user_data
        })


@pytest.fixture(scope='module')
def case(client: TestClient, user_data: dict) -> RegisterUserCase:
    return RegisterUserCase(client, user_data)


def test_register_request_is_successful(case: RegisterUserCase):
    response = case.register()

    assert response.status_code == HTTP_201_CREATED


def test_is_returning_user_data(case: RegisterUserCase, user_data: dict):
    response = case.register()

    assert response.json()

    username = response.json().get('username')
    email = response.json().get('email')

    assert username == user_data.get('username')
    assert email == user_data.get('email')
