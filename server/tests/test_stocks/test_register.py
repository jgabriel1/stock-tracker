import pytest
from fastapi.testclient import TestClient
from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT

sample_stock = pytest.fixture(lambda: {
    'ticker': 'petr4.sa',
    'price_bought': 20.05,
    'n_shares': 100
})


@pytest.fixture
def registered_user_token(client: TestClient) -> str:
    response = client.post('/auth/register', json={
        'username': 'testuser123',
        'email': 'test@test.com',
        'password': 'password123',
    })
    assert response.status_code == HTTP_201_CREATED

    token = response.json().get('access_token')
    return token


def test_register_bought_stock(
    client: TestClient, sample_stock, registered_user_token
):
    response = client.post('/stocks', json=sample_stock, headers={
        'Authorization': f'Bearer {registered_user_token}'
    })

    assert response.status_code == HTTP_204_NO_CONTENT
    assert not response.content
