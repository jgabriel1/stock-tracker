from pydantic import BaseModel


class Stock(BaseModel):
    ticker: str
    price_bought: float
    price_sold: float
