from typing import Dict

from fastapi import APIRouter, Depends, Response
from pymongo.client_session import ClientSession
from starlette.status import HTTP_204_NO_CONTENT

from ..crud import crud_stocks
from ..models.stock import Stock, StockOutInfo
from ..models.user import UserPublic
from .dependencies import get_current_user, get_db
from ..services.yahoo_finance import get_stock_info

router = APIRouter()


@router.get('/stocks', response_model=Dict[str, StockOutInfo])
def list_stocks(
    user: UserPublic = Depends(get_current_user),
    session: ClientSession = Depends(get_db)
):
    '''
    TODO: Look into the _ vs . conversion and how to do it better.
    '''
    stocks = crud_stocks.index(user.username, session=session)

    return {
        stock.replace('_', '.').upper(): {
            **stocks.get(stock),
            **get_stock_info(stock).dict()
        }
        for stock in stocks.keys()
    }


@router.post('/stocks', status_code=HTTP_204_NO_CONTENT)
def register_stock(
    stock: Stock,
    user: UserPublic = Depends(get_current_user),
    session: ClientSession = Depends(get_db)
):
    crud_stocks.create(stock, user.username, session=session)
    return Response(status_code=HTTP_204_NO_CONTENT)
