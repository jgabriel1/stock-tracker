from pydantic import BaseModel, validator


class Stock(BaseModel):
    '''
    TODO: Look into the _ vs . conversion and how to do it better.
    '''
    ticker: str
    price_bought: float
    n_shares: int

    total_invested: float = None

    @validator('ticker')
    def turn_dots_into_undersores(cls, value: str):
        return value.replace('.', '_')

    @validator('total_invested', always=True)
    def calculate_total_invested(cls, value, values, **kwargs):
        return values['price_bought'] * values['n_shares']


class StockOutInfo(BaseModel):
    '''
    TODO: Look into the _ vs . conversion and how to do it better.
    '''
    # From Stock model:
    ticker: str
    price_bought: float
    n_shares: int
    total_invested: float

    # From Yahoo Finance stock model:
    regularMarketPrice: float
    previousClose: float

    @validator('ticker')
    def turn_underscores_into_dots_and_uppercase(cls, value: str):
        return value.replace('_', '.').upper()
