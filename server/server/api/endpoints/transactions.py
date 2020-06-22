from fastapi import APIRouter, Depends, Response
from pymongo.client_session import ClientSession
from starlette.status import HTTP_204_NO_CONTENT

from ...crud import crud_transactions
from ...models.transaction import Transaction, TransactionHistory
from ...models.user import User
from ..dependencies import get_current_user, get_db

router = APIRouter()


@router.get('/transactions', response_model=TransactionHistory)
def show_history(
    ticker: str = None,
    start: int = None,
    end: int = None,
    user: User = Depends(get_current_user),
    session: ClientSession = Depends(get_db),
):
    transactions = crud_transactions.index(
        username=user.username,
        ticker=ticker,
        start=start,
        end=end,
        session=session
    )

    return {'transactions': transactions}


@router.post('/transactions', status_code=HTTP_204_NO_CONTENT)
def new_transaction(
    transaction: Transaction,
    user: User = Depends(get_current_user),
    session: ClientSession = Depends(get_db)
):
    crud_transactions.create(transaction, user.username, session=session)

    return Response(status_code=HTTP_204_NO_CONTENT)
