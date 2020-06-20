from fastapi import APIRouter, Depends, Response
from pymongo.client_session import ClientSession
from starlette.status import HTTP_204_NO_CONTENT

from ...crud import crud_stocks
from ...models.stock import Stock, StocksResponse
from ...models.user import UserPublic
from ...services.yahoo_finance import get_stock_info
from ..dependencies import get_current_user, get_db

router = APIRouter()


@router.get('/stocks', response_model=StocksResponse)
def list_stocks(
    user: UserPublic = Depends(get_current_user),
    session: ClientSession = Depends(get_db)
):
    stocks = crud_stocks.index(user.username, session=session)

    stocks_info = get_stock_info(stocks.keys())

    return {'stocks': [
        {
            **stocks[stock],
            **stocks_info[stock].dict()
        }
        for stock in stocks.keys()
    ]}


@router.post('/stocks', status_code=HTTP_204_NO_CONTENT)
def register_stock(
    stock: Stock,
    user: UserPublic = Depends(get_current_user),
    session: ClientSession = Depends(get_db)
):
    crud_stocks.create(stock, user.username, session=session)
    return Response(status_code=HTTP_204_NO_CONTENT)
