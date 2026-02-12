/**
 * Vercel Serverless Function: create invoice via xRocket Pay API
 * Docs: https://pay.xrocket.tg/api
 * Set env var: XROCKET_API_KEY (from @xrocket → Rocket Pay → Create App → API token)
 */

const XROCKET_BASE = "https://pay.xrocket.tg";
const COINGECKO_IDS = {
  BTC: "bitcoin",
  TRX: "tron",
  TON: "the-open-network",
};

// xRocket API использует TONCOIN для TON (GET /currencies/available)
const XROCKET_CURRENCY = { USDT: "USDT", TON: "TONCOIN", BTC: "BTC", TRX: "TRX" };

function roundCryptoAmount(amount, currency) {
  if (currency === "USDT") return Math.round(amount * 100) / 100;
  if (currency === "BTC") return Math.round(amount * 1e8) / 1e8;
  if (currency === "TRX") return Math.round(amount * 100) / 100;
  if (currency === "TON") return Math.round(amount * 100) / 100;
  return Math.round(amount * 100) / 100;
}

async function getUsdRates() {
  const ids = Object.values(COINGECKO_IDS).join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) return {};
  const data = await res.json();
  const rev = {};
  for (const [k, v] of Object.entries(COINGECKO_IDS)) rev[v] = k;
  const rates = {};
  for (const [cgId, obj] of Object.entries(data)) {
    if (obj && typeof obj.usd === "number" && rev[cgId]) {
      rates[rev[cgId]] = obj.usd;
    }
  }
  return rates;
}

function amountInCurrency(usdAmount, currency, rates) {
  if (currency === "USDT") return usdAmount;
  const rate = rates[currency];
  if (!rate || rate <= 0) return usdAmount;
  return usdAmount / rate;
}

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const apiKey = (process.env.XROCKET_API_KEY || "").trim().replace(/\r|\n/g, "").trim();
  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: "XROCKET_API_KEY is not set. Add it in Vercel → Project → Settings → Environment Variables.",
    });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch {
    return res.status(400).json({ success: false, error: "Invalid JSON" });
  }

  const userId = body.user_id;
  let currency = (body.currency || "USDT").toUpperCase();
  const network = body.network;

  if (!userId) {
    return res.status(400).json({ success: false, error: "user_id is required" });
  }

  const allowed = ["USDT", "TON", "BTC", "TRX"];
  if (!allowed.includes(currency)) {
    return res.status(400).json({ success: false, error: `Unsupported currency: ${currency}` });
  }

  const usdAmount = typeof body.amount_usd === "number" ? body.amount_usd : 50;

  let rates = {};
  try {
    rates = await getUsdRates();
  } catch (e) {
    console.error("CoinGecko error:", e.message);
  }

  const amountInCur = amountInCurrency(usdAmount, currency, rates);
  const amount = roundCryptoAmount(amountInCur, currency);
  const description = (body.description || `PRIVATE SIGNAL SYSTEM — ${usdAmount} USD`).slice(0, 1024);
  const apiCurrency = XROCKET_CURRENCY[currency] || currency;

  const payload = {
    amount,
    currency: apiCurrency,
    description,
    payload: String(userId),
    numPayments: 1,
    expiredIn: 7200,
    commentsEnabled: false,
  };

  try {
    const xRes = await fetch(`${XROCKET_BASE}/tg-invoices`, {
      method: "POST",
      headers: {
        "Rocket-Pay-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await xRes.json().catch(() => ({}));

    if (xRes.status !== 200 && xRes.status !== 201) {
      const msg = data.message || data.error || data.msg || JSON.stringify(data);
      return res.status(xRes.status >= 500 ? 502 : 400).json({
        success: false,
        error: msg,
      });
    }

    const invData = data.data || data;
    const invId = invData.id;
    const payUrl =
      invData.botInvoiceUrl ||
      invData.invoiceUrl ||
      invData.link ||
      invData.url ||
      (typeof invId === "string" && invId.startsWith("http") ? invId : null) ||
      (invId ? `https://t.me/xrocket?start=inv_${invId}` : null);

    if (!payUrl) {
      return res.status(502).json({
        success: false,
        error: "xRocket did not return payment URL",
      });
    }

    return res.status(200).json({
      success: true,
      invoice_id: invId,
      invoice_url: payUrl,
      amount,
      currency,
    });
  } catch (err) {
    console.error("xRocket create-invoice error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to create invoice",
    });
  }
}
