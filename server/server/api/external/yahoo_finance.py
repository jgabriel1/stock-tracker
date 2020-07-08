from aiohttp import ClientSession
from fastapi import APIRouter, HTTPException, Request
from starlette.status import HTTP_424_FAILED_DEPENDENCY

router = APIRouter()


@router.get('/info')
async def yahoo_stock_info(request: Request):
    params = request.query_params
    url = 'https://query1.finance.yahoo.com/v7/finance/spark'

    async with ClientSession() as session:
        async with session.get(url, params=params) as response:
            if response.status >= 400:
                raise HTTPException(
                    status_code=HTTP_424_FAILED_DEPENDENCY,
                    detail='Yahoo Finance is currently unavailable.'
                )

            return await response.json()


@router.get('/search')
async def yahoo_stock_search(request: Request):
    params = request.query_params
    url = 'https://query1.finance.yahoo.com/v1/finance/search'

    async with ClientSession() as session:
        async with session.get(url, params=params) as response:
            if response.status >= 400:
                raise HTTPException(
                    status_code=HTTP_424_FAILED_DEPENDENCY,
                    detail='Yahoo Finance is currently unavailable.'
                )

            return await response.json()
