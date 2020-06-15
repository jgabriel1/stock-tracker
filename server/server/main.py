from fastapi import FastAPI
from .api import auth, users, stocks

app = FastAPI()

app.include_router(auth.router, prefix='/auth')
app.include_router(users.router)
app.include_router(stocks.router)
