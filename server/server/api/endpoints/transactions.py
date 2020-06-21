from fastapi import APIRouter, Depends
from pymongo.client_session import ClientSession

from ...crud import crud_transactions
from ...models.transaction import TransactionHistory
from ...models.user import UserOutDB
from ..dependencies import get_current_user, get_db

router = APIRouter()


@router.get('/transactions', response_model=TransactionHistory)
def show_history(
    ticker: str = None,
    start: int = None,
    end: int = None,
    user: UserOutDB = Depends(get_current_user),
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
