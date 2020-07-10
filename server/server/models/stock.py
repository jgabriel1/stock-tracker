from typing import Dict

from pydantic import BaseModel, validator


class Stock(BaseModel):
    ticker: str
    total_invested: float
    total_sold: float
    currently_owned_shares: int
    average_bought_price: float

    @validator('ticker')
    def uppercase_any_ticker(cls, value: str):
        return value.upper()


class StocksResponse(BaseModel):
    stocks: Dict[str, Stock]
    total_applied: float = None

    @validator('total_applied', always=True)
    def calculate_applied(cls, value, values, **kwargs):
        stocks = values['stocks']
        return sum(
            stock.currently_owned_shares * stock.average_bought_price
            for stock in stocks.values()
        )
