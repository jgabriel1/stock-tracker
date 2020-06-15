from typing import Dict

from fastapi import APIRouter, Depends, Response
from pymongo.client_session import ClientSession
from starlette.status import HTTP_204_NO_CONTENT

from ..crud import crud_stocks
from ..models.stock import Stock
from ..models.user import UserPublic
from .dependencies import get_current_user, get_db

router = APIRouter()


@router.get('/stocks', response_model=Dict[str, Stock])
def list_stocks(
    user: UserPublic = Depends(get_current_user),
    session: ClientSession = Depends(get_db)
):
    stocks = crud_stocks.index(user.username, session=session)
    return stocks


@router.post('/stocks', status_code=HTTP_204_NO_CONTENT)
def register_stock(
    stock: Stock,
    user: UserPublic = Depends(get_current_user),
    session: ClientSession = Depends(get_db)
):
    crud_stocks.create(stock, user.username, session=session)
    return Response(HTTP_204_NO_CONTENT)
