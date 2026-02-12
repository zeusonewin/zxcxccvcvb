const tg = window.Telegram.WebApp;
tg.expand();

let currentLang = null;

const cryptoNetworks = {
  USDT: ["TRC20","ERC20","BEP20"],
  BTC: ["BTC"],
  ETH: ["ERC20"],
  TON: ["TON"],
  SOL: ["SOL"],
  BNB: ["BEP20"],
  XRP: ["XRP"]
};

function t(key){
  return LOCALES[currentLang]?.[key] || key;
}

function renderLanguage(){
  const app = document.getElementById("app");
  app.innerHTML = "";

  const container = document.createElement("div");
  container.className="container";

  const title = document.createElement("div");
  title.className="title";
  title.innerText="PRIVATE SIGNAL SYSTEM";

  const sub = document.createElement("div");
  sub.className="subtitle";
  sub.innerText="Select your language";

  const grid = document.createElement("div");
  grid.className="grid";

  const langs = [
    {code:"ru",label:"🇷🇺 Русский"},
    {code:"en",label:"🇬🇧 English"},
    {code:"hi",label:"🇮🇳 हिन्दी"},
    {code:"pt",label:"🇵🇹 Português"},
    {code:"uz",label:"🇺🇿 O'zbek"},
    {code:"tr",label:"🇹🇷 Türkçe"}
  ];

  langs.forEach(l=>{
    const btn=document.createElement("div");
    btn.className="button";
    btn.innerText=l.label;
    btn.onclick=()=>{
      currentLang=l.code;
      renderMain();
    };
    grid.appendChild(btn);
  });

  container.appendChild(title);
  container.appendChild(sub);
  container.appendChild(grid);
  app.appendChild(container);
}

function renderMain(){
  const app=document.getElementById("app");
  app.innerHTML="";

  const container=document.createElement("div");
  container.className="container";

  const title=document.createElement("div");
  title.className="title";
  title.innerText="PRIVATE SIGNAL SYSTEM";

  const card=document.createElement("div");
  card.className="card";

  const id=document.createElement("div");
  id.className="id";
  id.innerText="Loading...";

  fetch(`/api/generate-id?userId=${tg.initDataUnsafe?.user?.id}`)
  .then(r=>r.json())
  .then(d=>id.innerText=d.personalId);

  const cryptoSelect=document.createElement("select");
  Object.keys(cryptoNetworks).forEach(c=>{
    const o=document.createElement("option");
    o.value=c;
    o.text=c;
    cryptoSelect.appendChild(o);
  });

  const networkSelect=document.createElement("select");

  function updateNetworks(){
    networkSelect.innerHTML="";
    cryptoNetworks[cryptoSelect.value].forEach(n=>{
      const o=document.createElement("option");
      o.value=n;
      o.text=n;
      networkSelect.appendChild(o);
    });
  }

  cryptoSelect.onchange=updateNetworks;
  updateNetworks();

  const payBtn=document.createElement("div");
  payBtn.className="button primary";
  payBtn.innerText=t("pay");

  payBtn.onclick=()=>{
    const crypto=cryptoSelect.value;
    const network=networkSelect.value;
    const link=`https://t.me/xrocket?start=${crypto}_${network}`;
    window.location.href=link;
  };

  card.appendChild(id);
  card.appendChild(cryptoSelect);
  card.appendChild(networkSelect);
  card.appendChild(payBtn);

  container.appendChild(title);
  container.appendChild(card);
  app.appendChild(container);
}

renderLanguage();

