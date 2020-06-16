from pydantic import BaseModel, validator


class Stock(BaseModel):
    ticker: str
    price_bought: float
    n_shares: int

    total_invested: float = None

    @validator('total_invested', always=True)
    def calculate_total_invested(cls, value, values, **kwargs):
        return values['price_bought'] * values['n_shares']


class StockOutInfo(BaseModel):
    # From Stock model:
    price_bought: float
    n_shares: int
    total_invested: float

    # From Yahoo Finance stock model:
    regularMarketPrice: float
    chartPreviousClose: float
