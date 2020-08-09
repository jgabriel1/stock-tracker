import pytest
from fastapi.testclient import TestClient
from starlette.status import HTTP_200_OK,  HTTP_201_CREATED
from requests import Response
from .utils import AuthTokenValidator


class AuthenticateUserCase:

    def __init__(self, client: TestClient, user_data: dict) -> None:
        self.client = client
        self.user_data = user_data

    def register_user(self) -> Response:
        return self.client.post('auth/register', json=self.user_data)

    def authenticate_user(self) -> Response:
        return self.client.post('auth/token', data={
            'username': self.user_data.get('username'),
            'password': self.user_data.get('password'),
        })


@pytest.fixture(scope='module')
def case(client: TestClient, user_data: dict):
    c = AuthenticateUserCase(client, user_data)
    return c


@pytest.fixture(scope='function')
def token_validator():
    return AuthTokenValidator()


def test_if_user_was_registered(case, user_data):
    register_response = case.register_user()

    assert register_response.status_code == HTTP_201_CREATED
    assert register_response.json() == {
        'username': user_data.get('username'),
        'email': user_data.get('email')
    }


def test_if_user_recieved_token(case, user_data):
    case.register_user()
    token_response = case.authenticate_user()

    assert token_response.status_code == HTTP_200_OK

    token_type = token_response.json().get('token_type')
    access_token = token_response.json().get('access_token')

    assert token_type == 'bearer'
    assert isinstance(access_token, str)


def test_if_token_is_valid(case, token_validator):
    case.register_user()
    token_response = case.authenticate_user()

    access_token = token_response.json().get('access_token')

    assert token_validator.validate(access_token)
