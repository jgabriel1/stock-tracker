import pytest

from server.services.yahoo_finance import get_stock_info, YahooStockModel

test_result = pytest.fixture(lambda: {
    'spark': {
        # result is the list of all stocks queried to the API:
        'result': [
            # Stock Schema starts here #
            {
                'symbol': 'petr3.sa',
                'response': [
                    {
                        'meta': {
                            'symbol': 'PETR3.SA',
                            'currency': 'BRL',
                            'regularMarketPrice': 21.49,
                            'chartPreviousClose': 21.24
                        }
                    }
                ]
            },
            # First Stock Schema ends #
            {
                'symbol': 'embr3.sa',
                'response': [
                    {
                        'meta': {
                            'symbol': 'EMBR3.SA',
                            'currency': 'BRL',
                            'regularMarketPrice': 8.63,
                            'chartPreviousClose': 8.82
                        }
                    }
                ]
            },
            # Second Stock Schema ends #
        ]
    }
})


def test_stock_model(test_result):
    test_stock1, test_stock2 = test_result.get('spark').get('result')

    serialized_stock1 = YahooStockModel.serialize_stock(test_stock1)

    assert serialized_stock1.currency == 'BRL'
    assert serialized_stock1.symbol == 'PETR3.SA'
    assert serialized_stock1.regularMarketPrice == 21.49
    assert serialized_stock1.chartPreviousClose == 21.24

    serialized_stock2 = YahooStockModel.serialize_stock(test_stock2)

    assert serialized_stock2.currency == 'BRL'
    assert serialized_stock2.symbol == 'EMBR3.SA'
    assert serialized_stock2.regularMarketPrice == 8.63
    assert serialized_stock2.chartPreviousClose == 8.82


def test_get_stock_info():
    searched_stocks = ['petr4.sa', 'embr3.sa', 'petr3.sa']

    stocks_result = get_stock_info(searched_stocks)
    assert type(stocks_result) == dict

    tickers = stocks_result.keys()
    assert len(searched_stocks) == len(tickers)
    assert set(searched_stocks) == set(tickers)

    stocks = stocks_result.values()
    for stock in stocks:
        assert isinstance(stock, YahooStockModel)
