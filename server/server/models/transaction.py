from typing import List

from pydantic import BaseModel, validator


class Transaction(BaseModel):
    ticker: str
    quantity: int
    total_value: float
    timestamp: int

    average_price: float = None

    @validator('average_price', always=True)
    def calculate_average_price(cls, value, values, **kwargs):
        return values['total_value'] / values['quantity']


class TransactionHistory(BaseModel):
    transactions: List[Transaction]
