import pytest
from fastapi.testclient import TestClient
from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT

sample_user = pytest.fixture(lambda: {
    'username': 'testuser123',
    'email': 'test@email.com',
    'password': 'password123'
})


@pytest.fixture(autouse=True)
def created_user_token(client: TestClient, sample_user) -> str:
    response = client.post('/auth/register', json=sample_user)

    assert response.status_code == HTTP_201_CREATED

    return response.json().get('access_token')


def test_unregister_user(client: TestClient, sample_user, created_user_token):
    current_password = sample_user.get('password')

    response = client.delete('/users', json={
        'current_password': current_password
    }, headers={
        'Authorization': f'Bearer {created_user_token}'
    })

    assert response.status_code == HTTP_204_NO_CONTENT
    assert not response.content
