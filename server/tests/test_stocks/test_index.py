import pytest
from fastapi.testclient import TestClient
from pydantic import create_model
from starlette.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT

sample_stock = pytest.fixture(lambda: {
    'ticker': 'PETR4.SA',
    'price_bought': 20.05,
    'n_shares': 100
})

stock_model = pytest.fixture(lambda: create_model('index_stocks_unit', **{
    'price_bought': (float, ...),
    'n_shares': (int, ...),
    'total_invested': (float, ...),
    'regularMarketPrice': (float, ...),
    'chartPreviousClose': (float, ...),
}))


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


@pytest.fixture
def register_stock(
    client: TestClient, sample_stock, registered_user_token
) -> None:
    response = client.post('/stocks', json=sample_stock, headers={
        'Authorization': f'Bearer {registered_user_token}'
    })
    assert response.status_code == HTTP_204_NO_CONTENT


def test_index_all_stocks(
    client: TestClient,
    sample_stock,
    registered_user_token,
    register_stock,
    stock_model
):
    response = client.get('/stocks', headers={
        'Authorization': f'Bearer {registered_user_token}'
    })

    assert response.status_code == HTTP_200_OK

    stocks_index = response.json()

    assert sample_stock.get('ticker') in stocks_index.keys()

    owned_stock = stocks_index.get(sample_stock.get('ticker'))
    assert stock_model.validate(owned_stock)

    owned_stock = stock_model.parse_obj(owned_stock)

    assert owned_stock.price_bought == sample_stock.get('price_bought')
    assert owned_stock.n_shares == sample_stock.get('n_shares')
    assert owned_stock.total_invested == \
        sample_stock.get('price_bought') * sample_stock.get('n_shares')
