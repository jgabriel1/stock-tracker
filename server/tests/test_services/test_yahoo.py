import pytest

from server.services.yahoo_finance import get_stock_info, YahooStockModel

test_stock = pytest.fixture(lambda: {
    'chart': {
        'result': [
            {
                'meta': {
                    'currency': 'BRL',
                    'symbol': 'EMBR3.SA',
                    'regularMarketPrice': 8.82,
                    'previousClose': 9.33
                }
            }
        ]
    }
})


def test_stock_model(test_stock):
    serialized_stock = YahooStockModel.serialize_stock(test_stock)

    assert serialized_stock.currency == 'BRL'
    assert serialized_stock.symbol == 'EMBR3.SA'
    assert serialized_stock.regularMarketPrice == 8.82
    assert serialized_stock.previousClose == 9.33


def test_get_stock_info():
    stock = get_stock_info('embr3.sa')

    assert type(stock) == YahooStockModel

    assert stock.symbol == 'EMBR3.SA'
    assert stock.currency == 'BRL'

    assert type(stock.regularMarketPrice) == float
    assert type(stock.previousClose) == float
