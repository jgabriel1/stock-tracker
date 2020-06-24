from fastapi.testclient import TestClient
from starlette.status import HTTP_201_CREATED, HTTP_409_CONFLICT
from pydantic import create_model


def test_register_user(client: TestClient):
    user = {
        'username': 'testuser123',
        'password': 'password123',
        'email': 'testemail@domain.com'
    }

    response = client.post('/auth/register', json=user)

    assert response.status_code == HTTP_201_CREATED

    user_model = create_model('user', **{
        'username': (str, ...),
        'email': (str, ...),
    })

    assert user_model.validate(response.json())

    data = user_model.parse_obj(response.json())

    assert data.username == user.get('username')
    assert data.email == user.get('email')


def test_register_username_already_taken(client: TestClient, register_user):
    repeated_username = 'reallygoodusername'

    register_user({
        'username': repeated_username,
        'password': 'password1',
        'email': 'email1@domain.com',
    })

    response = client.post('/auth/register', json={
        'username': repeated_username,
        'password': 'password2',
        'email': 'email2@domain.com',
    })

    assert response.status_code == HTTP_409_CONFLICT

    error_message = response.json().get('detail')

    assert error_message == 'Username or email already taken!'


def test_register_email_already_taken(client: TestClient, register_user):
    repeated_email = 'awesome_email@domain.com'

    register_user({
        'username': 'username1',
        'password': 'password1',
        'email': repeated_email,
    })

    response = client.post('/auth/register', json={
        'username': 'username2',
        'password': 'password2',
        'email': repeated_email,
    })

    assert response.status_code == HTTP_409_CONFLICT

    error_message = response.json().get('detail')

    assert error_message == 'Username or email already taken!'
