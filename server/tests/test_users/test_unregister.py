from fastapi.testclient import TestClient
from starlette.status import HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED


def test_unregister_user(client: TestClient, mock_user, auth_headers):
    current_password = mock_user.get('password')

    unregister_response = client.delete('/users', headers=auth_headers, json={
        'current_password': current_password
    })

    assert unregister_response.status_code == HTTP_204_NO_CONTENT
    assert not unregister_response.content

    # Try to login with unregistered user:
    login_attempt = client.post('/auth/token', data={
        'username': mock_user.get('username'),
        'password': mock_user.get('password'),
    })

    assert login_attempt.status_code == HTTP_401_UNAUTHORIZED
