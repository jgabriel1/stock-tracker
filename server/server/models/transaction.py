from typing import List

from pydantic import BaseModel


class Transaction(BaseModel):
    ticker: str
    quantity: float
    total_value: float
    timestamp: int


class TransactionHistory(BaseModel):
    transactions: List[Transaction]
