// Navigation state
const screens = Array.from(document.querySelectorAll(".screen"));
const navBackBtn = document.querySelector('[data-action="back"]');
const navHomeBtn = document.querySelector('[data-action="home"]');

const state = {
  history: [],
  current: "language",
  language: localStorage.getItem("pss_language") || null,
  userId: null,
  fromLanguageChange: false,
  payment: {
    currency: "USDT",
    network: null,
  },
  secondPayment: {
    currency: "USDT",
    network: null,
  },
};

// Telegram WebApp initialization
const tg = window.Telegram ? window.Telegram.WebApp : null;

if (tg) {
  tg.ready();
  tg.expand();
  if (tg.setBackgroundColor) {
    tg.setBackgroundColor("#050509");
  }
}

// Localization system
function t(key) {
  const lang = state.language || "en";
  const keys = key.split(".");
  let value = LOCALES[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
}

function updateTexts() {
  const lang = state.language || "en";
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const text = t(key);
    if (text && text !== key) {
      if (el.tagName === "INPUT") {
        el.value = text;
      } else {
        el.textContent = text;
      }
    }
  });

  // Update list items
  document.querySelectorAll("[data-i18n-list]").forEach((container) => {
    const key = container.getAttribute("data-i18n-list");
    const items = t(key);
    if (Array.isArray(items)) {
      const listItems = container.querySelectorAll("li");
      items.forEach((text, index) => {
        if (listItems[index]) {
          listItems[index].textContent = text;
        }
      });
    }
  });

  // Update payment button amounts (only if language is set)
  if (state.language) {
    document.querySelectorAll("[data-payment-amount]").forEach((btn) => {
      const amount = btn.getAttribute("data-payment-amount");
      const payText = t("payment.payButton");
      if (payText && payText !== "payment.payButton") {
        btn.textContent = `${payText} $${amount}`;
      }
    });
  }
}

function setActiveScreen(name, options = { pushHistory: true }) {
  if (state.current === name) return;

  const prev = state.current;
  state.current = name;

  if (options.pushHistory && prev) {
    state.history.push(prev);
  }

  screens.forEach((screen) => {
    const id = screen.getAttribute("data-screen");
    screen.classList.toggle("screen--active", id === name);
  });

  // Update texts when screen changes
  updateTexts();
}

function goBack() {
  if (!state.history.length) return;
  const prev = state.history.pop();
  state.current = prev;
  screens.forEach((screen) => {
    const id = screen.getAttribute("data-screen");
    screen.classList.toggle("screen--active", id === prev);
  });
  updateTexts();
}

function goHome() {
  state.history = [];
  setActiveScreen("home", { pushHistory: false });
}

navBackBtn.addEventListener("click", () => {
  if (state.current === "language") return;
  goBack();
});

navHomeBtn.addEventListener("click", () => {
  if (state.current === "language") return;
  goHome();
});

// Language selection logic
const languageButtons = document.querySelectorAll("[data-lang]");

languageButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang");
    state.language = lang;
    localStorage.setItem("pss_language", lang);
    updateTexts();
    if (state.fromLanguageChange) {
      state.fromLanguageChange = false;
      setActiveScreen("home", { pushHistory: false });
      state.history = [];
    } else {
      setActiveScreen("onboarding");
    }
  });
});

// Onboarding slider
const onboardingTrack = document.querySelector("[data-onboarding-track]");
const dots = document.querySelectorAll("[data-dot]");
let currentSlide = 0;

function setSlide(index) {
  currentSlide = Math.max(0, Math.min(1, index));
  const offset = -currentSlide * 50;
  if (onboardingTrack) {
    onboardingTrack.style.transform = `translateX(${offset}%)`;
  }

  dots.forEach((dot, i) => {
    dot.classList.toggle("dot--active", i === currentSlide);
  });
}

let touchStartX = null;

if (onboardingTrack) {
  onboardingTrack.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );

  onboardingTrack.addEventListener(
    "touchend",
    (e) => {
      if (touchStartX == null) return;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchStartX - touchEndX;

      if (deltaX > 40 && currentSlide === 0) {
        setSlide(1);
      } else if (deltaX < -40 && currentSlide === 1) {
        setSlide(0);
      }
      touchStartX = null;
    },
    { passive: true }
  );
}

// Start button
const startBtn = document.querySelector('[data-action="start"]');
if (startBtn) {
  startBtn.addEventListener("click", () => {
    initUserId();
    setActiveScreen("home");
  });
}

// User ID — уникальный для каждого пользователя Telegram
const userIdEl = document.querySelector("[data-user-id]");

function initUserId() {
  const telegramUserId = tg?.initDataUnsafe?.user?.id;
  if (telegramUserId != null) {
    state.userId = String(telegramUserId);
  }
  if (!state.userId) {
    const stored = localStorage.getItem("pss_user_id");
    if (stored) state.userId = stored;
    else state.userId = "—";
  }
  if (userIdEl) {
    userIdEl.textContent = state.userId;
  }
}

function hydrateInitialScreen() {
  // Update texts first (will use "en" as fallback if no language selected)
  updateTexts();
  
  if (state.language) {
    // Language already selected, go to onboarding
    setActiveScreen("onboarding", { pushHistory: false });
  } else {
    // No language selected, show language selection
    setActiveScreen("language", { pushHistory: false });
  }
}

hydrateInitialScreen();

// Copy ID button
const copyBtn = document.querySelector('[data-action="copy-id"]');
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    if (!state.userId) initUserId();
    try {
      await navigator.clipboard.writeText(state.userId);
      if (tg && tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred("light");
      }
    } catch (e) {
      console.error("Failed to copy ID", e);
    }
  });
}

// Open payment screen — ensure networks are rendered so currency+network are set
const openPaymentBtn = document.querySelector('[data-action="open-payment"]');
if (openPaymentBtn) {
  openPaymentBtn.addEventListener("click", () => {
    if (networkGroup) renderNetworks(state.payment.currency, networkGroup, state.payment);
    setActiveScreen("payment");
  });
}

// Change language from main menu
const openLanguageBtn = document.querySelector('[data-action="open-language"]');
if (openLanguageBtn) {
  openLanguageBtn.addEventListener("click", () => {
    state.fromLanguageChange = true;
    setActiveScreen("language");
  });
}

// Currency and network selection
const currencyGroup = document.querySelector("[data-currency-group]");
const networkGroup = document.querySelector("[data-network-group]");
const currencyGroup2 = document.querySelector("[data-currency-group-2]");
const networkGroup2 = document.querySelector("[data-network-group-2]");

const networksByCurrency = {
  USDT: ["TRC20", "ERC20", "BEP20"],
  TON: ["TON"],
  BTC: ["Bitcoin"],
  TRX: ["TRON"],
};

function renderNetworks(currency, networkGroupEl, paymentState) {
  if (!networkGroupEl) return;
  const networks = networksByCurrency[currency] || [];
  networkGroupEl.innerHTML = "";

  networks.forEach((net, idx) => {
    const btn = document.createElement("button");
    btn.className = "pill-btn pill-btn--select" + (idx === 0 ? " pill-btn--active" : "");
    btn.textContent = net;
    btn.dataset.network = net;
    btn.addEventListener("click", () => {
      paymentState.network = net;
      Array.from(networkGroupEl.children).forEach((child) =>
        child.classList.toggle("pill-btn--active", child === btn)
      );
    });
    networkGroupEl.appendChild(btn);
  });

  paymentState.network = networks[0] || null;
}

if (currencyGroup) {
  currencyGroup.addEventListener("click", (e) => {
    const target = e.target.closest("[data-currency]");
    if (!target) return;

    const currency = target.getAttribute("data-currency");
    state.payment.currency = currency;

    Array.from(currencyGroup.children).forEach((btn) =>
      btn.classList.toggle("pill-btn--active", btn === target)
    );

    renderNetworks(currency, networkGroup, state.payment);
  });
}

if (currencyGroup2) {
  currencyGroup2.addEventListener("click", (e) => {
    const target = e.target.closest("[data-currency]");
    if (!target) return;

    const currency = target.getAttribute("data-currency");
    state.secondPayment.currency = currency;

    Array.from(currencyGroup2.children).forEach((btn) =>
      btn.classList.toggle("pill-btn--active", btn === target)
    );

    renderNetworks(currency, networkGroup2, state.secondPayment);
  });
}

// Initialize networks
if (networkGroup) {
  renderNetworks(state.payment.currency, networkGroup, state.payment);
}
if (networkGroup2) {
  renderNetworks(state.secondPayment.currency, networkGroup2, state.secondPayment);
}

// Payment function
async function createPayment(amountUsd, currency, network, paymentState) {
  const telegramUserId = tg?.initDataUnsafe?.user?.id;
  if (!telegramUserId) {
    alert(t("payment.error") || "Error: Failed to get user data. Please reload the app.");
    return false;
  }

  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/api/create-invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: telegramUserId,
        currency: currency,
        network: network,
        amount_usd: amountUsd,
      }),
    });

    let data = {};
    try {
      const text = await response.text();
      if (text) data = JSON.parse(text);
    } catch (_) {
      data = { success: false, error: "Invalid server response" };
    }

    if (!response.ok) {
      const errorMsg = data.error || `Server error ${response.status}`;
      alert(errorMsg);
      return false;
    }

    if (!data.success || !data.invoice_url) {
      const errorMsg = data.error || t("payment.error") || "Failed to create invoice";
      alert(errorMsg);
      return false;
    }

    const invoiceUrl = data.invoice_url;
    if (tg && tg.openTelegramLink) {
      tg.openTelegramLink(invoiceUrl);
    } else if (tg && tg.openLink) {
      tg.openLink(invoiceUrl);
    } else {
      window.location.href = invoiceUrl;
    }
    return true;
  } catch (error) {
    console.error("Payment error:", error);
    alert(t("payment.error") || "Connection error. Check internet and try again.");
    return false;
  }
}

// Ensure payment state has network (fallback to first available for currency)
function ensurePaymentNetwork(paymentState) {
  if (paymentState.network) return;
  const nets = networksByCurrency[paymentState.currency] || [];
  paymentState.network = nets[0] || null;
}

// First payment button — always create invoice on Pay click
const payBtn = document.querySelector('[data-action="pay"]');
if (payBtn) {
  payBtn.addEventListener("click", async () => {
    ensurePaymentNetwork(state.payment);
    const { currency, network } = state.payment;
    if (!currency) return;
    if (!network) {
      alert(t("payment.error") || "Please select a network.");
      return;
    }

    payBtn.disabled = true;
    payBtn.textContent = t("payment.creating") || "Creating invoice...";

    const success = await createPayment(50, currency, network, state.payment);
    
    if (success) {
      setActiveScreen("after-payment");
      const errEl = document.getElementById("after-payment-error");
      if (errEl) errEl.classList.add("hidden");
    } else {
      payBtn.disabled = false;
      payBtn.textContent = `${t("payment.payButton") || "Pay"} $50`;
    }
  });
}

// After payment: "I've paid" — check payment, then show loading only if paid
const checkPaymentBtn = document.querySelector('[data-action="check-payment"]');
if (checkPaymentBtn) {
  checkPaymentBtn.addEventListener("click", async () => {
    const telegramUserId = tg?.initDataUnsafe?.user?.id;
    if (!telegramUserId) {
      alert(t("payment.error") || "Error: user data not available.");
      return;
    }
    checkPaymentBtn.disabled = true;
    checkPaymentBtn.textContent = "...";
    const apiUrl = getApiUrl();
    try {
      const res = await fetch(`${apiUrl}/api/check-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: telegramUserId }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.paid) {
        setActiveScreen("loading");
        startProgressAnimation();
      } else {
        const errEl = document.getElementById("after-payment-error");
        if (errEl) errEl.classList.remove("hidden");
        checkPaymentBtn.textContent = t("afterPayment.checkButton") || "I've paid — check";
      }
    } catch (e) {
      const errEl = document.getElementById("after-payment-error");
      if (errEl) {
        errEl.textContent = t("payment.error") || "Connection error.";
        errEl.classList.remove("hidden");
      }
      checkPaymentBtn.textContent = t("afterPayment.checkButton") || "I've paid — check";
    }
    checkPaymentBtn.disabled = false;
  });
}

// Progress animation
function startProgressAnimation() {
  const progressFill = document.querySelector(".progress-fill");
  const progressText = document.querySelector("[data-progress-text]");
  
  if (!progressFill || !progressText) return;

  const duration = 120000; // 2 minutes
  const steps = 100;
  const stepDuration = duration / steps;
  let currentStep = 0;

  const interval = setInterval(() => {
    currentStep++;
    const progress = Math.min(currentStep, 100);
    
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        setActiveScreen("server-ready");
      }, 500);
    }
  }, stepDuration);
}

// Server ready OK button — open second payment and ensure networks are set
const serverReadyBtn = document.querySelector('[data-action="server-ready-ok"]');
if (serverReadyBtn) {
  serverReadyBtn.addEventListener("click", () => {
    if (networkGroup2) renderNetworks(state.secondPayment.currency, networkGroup2, state.secondPayment);
    setActiveScreen("second-payment");
  });
}

// Second payment button — always create invoice on Pay click
const paySecondBtn = document.querySelector('[data-action="pay-second"]');
if (paySecondBtn) {
  paySecondBtn.addEventListener("click", async () => {
    ensurePaymentNetwork(state.secondPayment);
    const { currency, network } = state.secondPayment;
    if (!currency) return;
    if (!network) {
      alert(t("payment.error") || "Please select a network.");
      return;
    }

    paySecondBtn.disabled = true;
    paySecondBtn.textContent = t("payment.creating") || "Creating invoice...";

    const success = await createPayment(80, currency, network, state.secondPayment);
    
    if (success) {
      setTimeout(() => {
        setActiveScreen("final");
      }, 1000);
    } else {
      paySecondBtn.disabled = false;
      paySecondBtn.textContent = `${t("payment.payButton") || "Pay"} $80`;
    }
  });
}

// Get API URL: приоритет — сервер бота (data-api-url), иначе текущий домен (Vercel) или localhost
function getApiUrl() {
  const apiUrlAttr = document.documentElement.getAttribute("data-api-url");
  if (apiUrlAttr && apiUrlAttr.trim()) {
    return apiUrlAttr.trim();
  }
  if (window.location.protocol === "https:") {
    return window.location.origin;
  }
  return "http://localhost:8080";
}
