from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import auth, users, stocks

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_methods=['*'],
    allow_headers=['*'],
    allow_credentials=True
)

app.include_router(auth.router, prefix='/auth')
app.include_router(users.router)
app.include_router(stocks.router)
