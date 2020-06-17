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

stock_list_model = pytest.fixture(lambda: create_model('index_stocks_list', **{
    'stocks': list
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
    stock_model,
    stock_list_model
):
    response = client.get('/stocks', headers={
        'Authorization': f'Bearer {registered_user_token}'
    })

    assert response.status_code == HTTP_200_OK
    assert stock_list_model.validate(response.json())

    stocks_list = response.json().get('stocks')

    assert type(stocks_list) == list
    assert len(stocks_list) == 1

    for stock in stocks_list:
        assert stock_model.validate(stock)

    stock_tickers = {stock['ticker'] for stock in stocks_list}

    assert sample_stock.get('ticker') in stock_tickers
