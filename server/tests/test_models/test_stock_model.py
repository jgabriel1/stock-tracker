import pytest

from server.models.stock import Stock

test_stock_insertion = pytest.fixture(lambda: {
    'ticker': 'embr3.sa',
    'price_bought': 8.82,
    'quantity': 100,
})


def test_stock_model_parse(test_stock_insertion):
    assert Stock.validate(test_stock_insertion)

    serialized = Stock.parse_obj(test_stock_insertion)

    assert serialized.ticker == 'EMBR3.SA'
    assert serialized.price_bought == 8.82
    assert serialized.quantity == 100

    assert serialized.total_value == (100 * 8.82)


def test_stock_model_instantiate(test_stock_insertion):
    assert Stock.validate(test_stock_insertion)

    serialized = Stock(**test_stock_insertion)

    assert serialized.ticker == 'EMBR3.SA'
    assert serialized.price_bought == 8.82
    assert serialized.quantity == 100

    assert serialized.total_value == (100 * 8.82)
