import os

import requests
from dotenv import load_dotenv
from fastapi import HTTPException
from pydantic import BaseModel, validator
from starlette.status import HTTP_404_NOT_FOUND

load_dotenv()

BASE_URL = os.getenv('YAHOO_API_URL')


class YahooStockModel(BaseModel):
    '''
    TODO: Look into the _ vs . conversion and how to do it better.
    '''
    symbol: str
    currency: str
    regularMarketPrice: float
    previousClose: float

    @validator('symbol')
    def turn_dots_into_underscores(cls, value: str):
        return value.replace('.', '_')

    @classmethod
    def serialize_stock(cls, response_json: dict):
        serialized = response_json \
            .get('chart')          \
            .get('result')[0]      \
            .get('meta')

        return cls.parse_obj(serialized)


def get_stock_info(ticker: str, _range='5d', interval='5m') -> YahooStockModel:
    '''
    TODO: Look into the _ vs . conversion and how to do it better.
    '''
    url = f"{BASE_URL}{ticker.replace('_', '.')}"
    query = {
        'range': _range,
        'interval': interval
    }

    response = requests.get(url, params=query)

    if not response.ok:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail='Yahoo Finance is currently unavailable.'
        )

    return YahooStockModel.serialize_stock(response.json())
