import pytest
from fastapi.testclient import TestClient
from pydantic import create_model
from starlette.status import HTTP_201_CREATED, HTTP_409_CONFLICT

sample_user = pytest.fixture(lambda: {
    'username': 'testuser123',
    'email': 'test@email.com',
    'password': 'password123'
})

register_model = pytest.fixture(lambda: create_model('register', **{
    'access_token': (str, ...),
    'token_type': (str, ...)
}))


def test_register_user(client: TestClient, sample_user, register_model):
    response = client.post('/auth/register', json=sample_user)

    assert response.status_code == HTTP_201_CREATED
    assert register_model.validate(response.json())

    serialized_response = register_model.parse_obj(response.json())

    assert serialized_response.token_type == 'bearer'


def test_register_already_taken_username(client: TestClient, sample_user):
    first_response = client.post('/auth/register', json=sample_user)

    assert first_response.status_code == HTTP_201_CREATED

    second_response = client.post('/auth/register', json=sample_user)

    assert second_response.status_code == HTTP_409_CONFLICT
    assert second_response.json().get('detail') == \
        'Username or email already taken!'
