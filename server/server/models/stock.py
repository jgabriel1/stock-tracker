from typing import List

from pydantic import BaseModel, validator


class Stock(BaseModel):
    ticker: str
    price_bought: float
    n_shares: int

    total_invested: float = None

    @validator('ticker')
    def uppercase_any_ticker(cls, value: str):
        return value.upper()

    @validator('total_invested', always=True)
    def calculate_total_invested(cls, value, values, **kwargs):
        return values['price_bought'] * values['n_shares']


class StockOutInfo(BaseModel):
    # From Stock model:
    ticker: str
    price_bought: float
    n_shares: int
    total_invested: float

    # From Yahoo Finance stock model:
    regularMarketPrice: float
    chartPreviousClose: float


class StocksResponse(BaseModel):
    stocks: List[StockOutInfo]
