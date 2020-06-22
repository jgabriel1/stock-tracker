from fastapi import APIRouter

from .endpoints import auth, stocks, users, transactions

router = APIRouter()

router.include_router(auth.router, prefix='/auth')
router.include_router(users.router)
router.include_router(stocks.router)
router.include_router(transactions.router)
