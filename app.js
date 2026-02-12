const tg = window.Telegram.WebApp;
tg.expand();

let currentLang = null;
let currentScreen = "language";

function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const container = document.createElement("div");
  container.className = "container";

  if (currentScreen === "language") {
    const title = document.createElement("div");
    title.className = "title";
    title.innerText = "PRIVATE SIGNAL SYSTEM";

    const subtitle = document.createElement("div");
    subtitle.className = "title";
    subtitle.innerText = "Select your language";

    const grid = document.createElement("div");
    grid.className = "grid";

    const langs = [
      "🇷🇺 Русский",
      "🇬🇧 English",
      "🇮🇳 हिन्दी",
      "🇵🇹 Português",
      "🇺🇿 O'zbek",
      "🇹🇷 Türkçe",
    ];

    langs.forEach((lang, index) => {
      const btn = document.createElement("div");
      btn.className = "button";
      btn.innerText = lang;
      btn.onclick = () => {
        currentLang = index;
        currentScreen = "onboarding";
        render();
      };
      grid.appendChild(btn);
    });

    container.appendChild(title);
    container.appendChild(subtitle);
    container.appendChild(grid);
  }

  if (currentScreen === "onboarding") {
    const title = document.createElement("div");
    title.className = "title";
    title.innerText = "PRIVATE SIGNAL SYSTEM";

    const text = document.createElement("div");
    text.className = "block";
    text.innerText = "Персональные сигнальные боты с точностью 100%";

    const btn = document.createElement("div");
    btn.className = "button primary";
    btn.innerText = "Начать";
    btn.onclick = () => {
      currentScreen = "main";
      render();
    };

    container.appendChild(title);
    container.appendChild(text);
    container.appendChild(btn);
  }

  if (currentScreen === "main") {
    const title = document.createElement("div");
    title.className = "title";
    title.innerText = "PRIVATE SIGNAL SYSTEM";

    const block = document.createElement("div");
    block.className = "block";
    block.innerHTML = "Ваш ID: <b>482731</b>";

    const btn = document.createElement("div");
    btn.className = "button primary";
    btn.innerText = "CryptoPay";
    btn.onclick = () => {
      currentScreen = "payment";
      render();
    };

    container.appendChild(title);
    container.appendChild(block);
    container.appendChild(btn);
  }

  if (currentScreen === "payment") {
    const title = document.createElement("div");
    title.className = "title";
    title.innerText = "Payment";

    const selectCrypto = document.createElement("select");
    ["USDT", "TON", "BTC", "ETH"].forEach((c) => {
      const option = document.createElement("option");
      option.value = c;
      option.text = c;
      selectCrypto.appendChild(option);
    });

    const selectNetwork = document.createElement("select");
    ["TRC20", "ERC20", "TON"].forEach((n) => {
      const option = document.createElement("option");
      option.value = n;
      option.text = n;
      selectNetwork.appendChild(option);
    });

    const payBtn = document.createElement("div");
    payBtn.className = "button primary";
    payBtn.innerText = "Оплатить";
    payBtn.onclick = () => {
      window.location.href = `https://t.me/xrocket`;
    };

    container.appendChild(title);
    container.appendChild(selectCrypto);
    container.appendChild(selectNetwork);
    container.appendChild(payBtn);
  }

  app.appendChild(container);
}

render();
