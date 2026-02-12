"""
HTTP API сервер для WebApp.
Создает инвойсы через xRocket API по запросу от WebApp.
"""
import asyncio
import json
import logging

import aiohttp
from aiohttp import web
from aiohttp.web_request import Request
from aiohttp.web_response import Response

from config import settings
from handlers.payment import (
    amount_in_currency,
    get_usd_rates,
    xrocket_create_invoice,
)

logger = logging.getLogger(__name__)

# Маппинг сетей на валюты (для будущего использования)
NETWORK_TO_CURRENCY = {
    "TRC20": "USDT",
    "ERC20": "USDT",
    "BEP20": "USDT",
    "TON": "TON",
    "Bitcoin": "BTC",
}


async def create_invoice_handler(request: Request) -> Response:
    """
    POST /api/create-invoice
    Body: {
        "user_id": int,
        "currency": "USDT" | "TON" | "BTC" | "ETH",
        "network": "TRC20" | "ERC20" | "BEP20" | "TON" | "Bitcoin" (опционально)
    }
    """
    # CORS заголовки для WebApp
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }
    
    # Обработка preflight запросов
    if request.method == "OPTIONS":
        return web.Response(headers=headers)
    
    try:
        data = await request.json()
    except Exception as e:
        logger.error("Invalid JSON in create_invoice: %s", e)
        return web.json_response(
            {"success": False, "error": "Invalid JSON"}, status=400, headers=headers
        )

    user_id = data.get("user_id")
    currency = data.get("currency", "USDT").upper()
    network = data.get("network")  # опционально, пока не используется в API

    if not user_id:
        return web.json_response(
            {"success": False, "error": "user_id is required"}, status=400, headers=headers
        )

    if currency not in ["USDT", "TON", "BTC", "ETH", "LTC"]:
        return web.json_response(
            {"success": False, "error": f"Unsupported currency: {currency}"}, status=400, headers=headers
        )

    try:
        user_id = int(user_id)
    except (ValueError, TypeError):
        return web.json_response(
            {"success": False, "error": "user_id must be an integer"}, status=400, headers=headers
        )

    # Получаем курсы валют
    rates = await get_usd_rates()

    # Конвертируем 50 USD в выбранную валюту
    usd_amount = float(settings.first_payment_usd)
    amount_in_cur = amount_in_currency(usd_amount, currency, rates)

    # Описание инвойса
    description = (
        f"Оплата доступа к PRIVATE SIGNAL SYSTEM — {settings.first_payment_usd} USD"
    )

    # Создаем инвойс через xRocket API
    inv_id, pay_url, error = await xrocket_create_invoice(
        user_id=user_id,
        amount=amount_in_cur,
        currency=currency,
        description=description,
    )

    if not inv_id or not pay_url:
        logger.error(
            "Failed to create invoice for user %s, currency %s: %s",
            user_id,
            currency,
            error,
        )
        return web.json_response(
            {
                "success": False,
                "error": error or "Failed to create invoice",
            },
            status=500,
            headers=headers,
        )

    logger.info(
        "Created invoice %s for user %s, currency %s, amount %s",
        inv_id,
        user_id,
        currency,
        amount_in_cur,
    )

    return web.json_response(
        {
            "success": True,
            "invoice_id": inv_id,
            "invoice_url": pay_url,
            "amount": amount_in_cur,
            "currency": currency,
        },
        headers=headers,
    )


async def health_handler(request: Request) -> Response:
    """GET /health — проверка работоспособности API."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
    }
    return web.json_response({"status": "ok"}, headers=headers)


def create_app() -> web.Application:
    """Создает aiohttp приложение с маршрутами."""
    app = web.Application()
    app.router.add_post("/api/create-invoice", create_invoice_handler)
    app.router.add_get("/health", health_handler)
    return app


async def run_api_server(port: int = 8080) -> None:
    """Запускает HTTP API сервер."""
    app = create_app()
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "0.0.0.0", port)
    await site.start()
    logger.info("API server started on http://0.0.0.0:%s", port)
    # Бесконечный цикл, чтобы сервер работал
    try:
        while True:
            await asyncio.sleep(3600)
    except asyncio.CancelledError:
        pass
    finally:
        await runner.cleanup()


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    asyncio.run(run_api_server())
