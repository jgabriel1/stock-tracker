from datetime import datetime

from fastapi.testclient import TestClient
from starlette.status import HTTP_200_OK


def test_list_stocks(
    client: TestClient,
    auth_headers,
    create_transaction,
    stocks_list_model
):
    # Buy some from Apple:
    create_transaction({
        'ticker': 'AAPL',
        'quantity': 100,
        'total_value': 35000,
        'timestamp': datetime.utcnow().timestamp()
    })

    # Sell some from Apple:
    create_transaction({
        'ticker': 'AAPL',
        'quantity': -50,
        'total_value': -50000,
        'timestamp': datetime.utcnow().timestamp()
    })

    # Buy some from Tesla:
    create_transaction({
        'ticker': 'TSLA',
        'quantity': 50,
        'total_value': 47500,
        'timestamp': datetime.utcnow().timestamp()
    })

    # Buy some more from Tesla:
    create_transaction({
        'ticker': 'TSLA',
        'quantity': 50,
        'total_value': 49000,
        'timestamp': datetime.utcnow().timestamp()
    })

    response = client.get('/stocks', headers=auth_headers)

    assert response.status_code == HTTP_200_OK
    assert stocks_list_model.validate(response.json())

    data = stocks_list_model.parse_obj(response.json())

    assert len(data.stocks) == 2

    for stock in data.stocks:
        if stock.ticker == 'AAPL':
            assert stock.total_invested == 35000
            assert stock.average_bought_price == (35000 / 100)
            assert stock.total_sold == -50000
            assert stock.currently_owned_shares == (100 - 50)

        if stock.ticker == 'TSLA':
            assert stock.total_invested == (47500 + 49000)
            assert stock.average_bought_price == ((47500 + 49000) / (50 + 50))
            assert stock.total_sold == 0
            assert stock.currently_owned_shares == (50 + 50)

    assert data.total_applied == (
        # currently_owned_shares * average_bought_price

        # For Apple:
        (100 - 50) * (35000 / 100)
        +
        # For Tesla:
        (50 + 50) * ((47500 + 49000) / (50 + 50))
    )
