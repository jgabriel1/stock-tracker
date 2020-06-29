import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api import routes

load_dotenv()

FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:3000')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_methods=['*'],
    allow_headers=['*'],
    allow_credentials=True
)

app.include_router(routes.router)
