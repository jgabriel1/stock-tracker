import pytest
from requests import Response
from starlette.testclient import TestClient
from starlette.status import HTTP_204_NO_CONTENT


class CreateNewTransactionCase:
    client: TestClient
    user_data: dict
    transaction_data: dict
    token: str

    def __init__(self, client: TestClient, user_data: dict, transaction_data: dict):
        self.client = client
        self.user_data = user_data
        self.transaction_data = transaction_data

    def register_user(self) -> None:
        self.client.post('auth/register', json=self.user_data)

    def authenticate_user(self) -> None:
        response = self.client.post('auth/token', data={
            'username': self.user_data.get('username'),
            'password': self.user_data.get('password'),
        })

        self.token = response.json().get('access_token')

    def create_transaction(self) -> Response:
        return self.client.post(
            'transactions',
            json=self.transaction_data,
            headers={
                'Authorization': f'Bearer {self.token}'
            }
        )


@pytest.fixture(scope='module')
def case(client: TestClient, user_data: dict, transaction_data: dict):
    case = CreateNewTransactionCase(client, user_data, transaction_data)

    case.register_user()
    case.authenticate_user()

    return case


@pytest.fixture(scope='module')
def transaction_creation_response(case) -> Response:
    return case.create_transaction()


def test_response_status_code(transaction_creation_response):
    assert transaction_creation_response.status_code == HTTP_204_NO_CONTENT


def test_response_has_no_content(transaction_creation_response):
    assert not transaction_creation_response.content
