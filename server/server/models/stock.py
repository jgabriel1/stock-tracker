from typing import List

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


class StockOutInfo(BaseModel):
    # From Stock model:
    ticker: str
    total_invested: float
    average_bought_price: float
    total_sold: float
    currently_owned_shares: int

    # From Yahoo Finance stock model:
    regularMarketPrice: float
    chartPreviousClose: float


class StocksResponse(BaseModel):
    stocks: List[StockOutInfo]
    total_applied: float = None

    @validator('total_applied', always=True)
    def calculate_applied(cls, value, values, **kwargs):
        stocks = values['stocks']
        return sum(
            stock.currently_owned_shares * stock.average_bought_price
            for stock in stocks
        )
