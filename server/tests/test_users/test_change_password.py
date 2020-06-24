from fastapi.testclient import TestClient
from starlette.status import HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED


def test_change_user_password(client: TestClient, mock_user, auth_headers):
    current_password = mock_user.get('password')
    new_password = 'supersecretdifferentpassword123'

    assert new_password != current_password

    response = client.put('/users/password', headers=auth_headers, json={
        'current_password': current_password,
        'new_password': new_password
    })

    assert response.status_code == HTTP_204_NO_CONTENT
    assert not response.content


def test_change_with_wrong_password_passed_in_request(
    client: TestClient, mock_user, auth_headers
):
    current_password = mock_user.get('password')
    wrong_current_password = 'wrongpassword123'

    assert current_password != wrong_current_password

    new_password = 'supersecretdifferentpassword123'

    assert new_password != current_password

    response = client.put('/users/password', headers=auth_headers, json={
        'current_password': wrong_current_password,
        'new_password': new_password
    })

    assert response.status_code == HTTP_401_UNAUTHORIZED
