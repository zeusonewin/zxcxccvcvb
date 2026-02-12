// Локализация для WebApp
const LOCALES = {
  en: {
    language: {
      title: "PRIVATE SIGNAL SYSTEM",
      subtitle: "Select interface language",
      hint: "You can change the language later. Your choice will be saved for future visits.",
    },
    onboarding: {
      slide1: {
        title: "PRIVATE SIGNAL SYSTEM",
        text: "Personal signal bots for our partners with 100% accuracy.",
        swipeHint: "Swipe left to continue",
      },
      slide2: {
        personalTitle: "Personal Bot Benefits",
        personalItems: [
          "Bot installation exclusively for you",
          "Guaranteed 100% accuracy",
          "No accuracy fluctuations",
        ],
        freeTitle: "Free Bot Drawbacks",
        freeItems: [
          "Large number of users",
          "Logical accuracy decrease under load",
          "Limited number of games",
          "Need to register a new account",
        ],
        startButton: "Start",
      },
    },
    home: {
      title: "PRIVATE SIGNAL SYSTEM",
      idLabel: "Your personal ID:",
      copyButton: "Copy",
      accessTitle: "Access Requirements",
      accessText1:
        "To prevent unauthorized users from accessing our product, we have implemented a security measure. You need to pay a one-time fee of",
      accessText2: "This amount will cover server rental for your personal bot for a period of",
      accessText3: "Payment is made in cryptocurrency.",
      payButton: "CryptoPay",
    },
    payment: {
      title: "Payment",
      subtitle: "Select cryptocurrency and network for transfer.",
      currencyLabel: "Select cryptocurrency",
      networkLabel: "Select network",
      hint: "After confirmation, you will be redirected to @xrocket with filled payment details.",
      payButton: "Pay",
      creating: "Creating invoice...",
      error: "Error: Failed to create invoice",
    },
    loading: {
      title: "Server Preparation",
      subtitle: "Your personal server is being prepared",
      readyTitle: "Your Server is Ready",
      readyText: "Your personal server has been successfully prepared and is ready to use.",
      okButton: "OK",
    },
    secondPayment: {
      title: "Bot Rental",
      subtitle: "Monthly bot rental will cost",
      description:
        "This amount covers the rental of your personal bot server for 1 month.",
      payButton: "Pay",
      hint: "After confirmation, you will be redirected to @xrocket with filled payment details.",
    },
    final: {
      title: "All Set",
      message: "Everything is ready. Please wait.",
    },
    nav: {
      back: "← Back",
      home: "Main Menu",
    },
  },
  ru: {
    language: {
      title: "PRIVATE SIGNAL SYSTEM",
      subtitle: "Выберите язык интерфейса",
      hint: "Язык можно будет изменить позднее. Выбор сохраняется для последующих входов.",
    },
    onboarding: {
      slide1: {
        title: "PRIVATE SIGNAL SYSTEM",
        text: "Персональные сигнальные боты для наших партнёров с точностью в 100%.",
        swipeHint: "Листните влево, чтобы продолжить",
      },
      slide2: {
        personalTitle: "Плюсы персонального бота",
        personalItems: [
          "Установка бота только для вас",
          "Гарантированная точность 100%",
          "Без колебаний точности",
        ],
        freeTitle: "Минусы бесплатного",
        freeItems: [
          "Большое количество пользователей",
          "Логичное снижение точности под нагрузкой",
          "Малое количество игр",
          "Необходимость регистрации нового аккаунта",
        ],
        startButton: "Начать",
      },
    },
    home: {
      title: "PRIVATE SIGNAL SYSTEM",
      idLabel: "Ваш персональный ID:",
      copyButton: "Скопировать",
      accessTitle: "Условие получения доступа",
      accessText1:
        "Чтобы не допустить случайных пользователей в наш продукт, мы вводим меру безопасности. Вам необходимо оплатить единоразовый счёт в размере",
      accessText2:
        "Эта сумма пойдёт на аренду сервера для вашего персонального бота сроком на",
      accessText3: "Оплата проводится в криптовалюте.",
      payButton: "CryptoPay",
    },
    payment: {
      title: "Оплата доступа",
      subtitle: "Выберите криптовалюту и сеть для перевода.",
      currencyLabel: "Выбор криптовалюты",
      networkLabel: "Выбор сети отправки",
      hint: "После подтверждения вы будете перенаправлены в @xrocket с заполненными реквизитами платежа.",
      payButton: "Оплатить",
      creating: "Создание счёта...",
      error: "Ошибка: Не удалось создать счёт",
    },
    loading: {
      title: "Подготовка сервера",
      subtitle: "Ваш персональный сервер готовится",
      readyTitle: "Ваш сервер готов",
      readyText: "Ваш персональный сервер успешно подготовлен и готов к использованию.",
      okButton: "ОК",
    },
    secondPayment: {
      title: "Аренда бота",
      subtitle: "Аренда бота сроком на 1 месяц будет стоить",
      description: "Эта сумма покрывает аренду сервера вашего персонального бота на 1 месяц.",
      payButton: "Оплатить",
      hint: "После подтверждения вы будете перенаправлены в @xrocket с заполненными реквизитами платежа.",
    },
    final: {
      title: "Всё готово",
      message: "Всё готово. Ожидайте.",
    },
    nav: {
      back: "← Назад",
      home: "Главное меню",
    },
  },
  hi: {
    language: {
      title: "PRIVATE SIGNAL SYSTEM",
      subtitle: "इंटरफ़ेस भाषा चुनें",
      hint: "आप बाद में भाषा बदल सकते हैं। आपकी पसंद भविष्य के दौरे के लिए सहेजी जाएगी।",
    },
    onboarding: {
      slide1: {
        title: "PRIVATE SIGNAL SYSTEM",
        text: "हमारे भागीदारों के लिए 100% सटीकता के साथ व्यक्तिगत सिग्नल बॉट्स।",
        swipeHint: "जारी रखने के लिए बाएं स्वाइप करें",
      },
      slide2: {
        personalTitle: "व्यक्तिगत बॉट के फायदे",
        personalItems: [
          "केवल आपके लिए बॉट स्थापना",
          "100% सटीकता की गारंटी",
          "कोई सटीकता उतार-चढ़ाव नहीं",
        ],
        freeTitle: "मुफ्त बॉट के नुकसान",
        freeItems: [
          "बड़ी संख्या में उपयोगकर्ता",
          "लोड के तहत तार्किक सटीकता में कमी",
          "सीमित संख्या में गेम",
          "नया खाता पंजीकृत करने की आवश्यकता",
        ],
        startButton: "शुरू करें",
      },
    },
    home: {
      title: "PRIVATE SIGNAL SYSTEM",
      idLabel: "आपका व्यक्तिगत ID:",
      copyButton: "कॉपी करें",
      accessTitle: "एक्सेस आवश्यकताएं",
      accessText1:
        "अनधिकृत उपयोगकर्ताओं को हमारे उत्पाद तक पहुंचने से रोकने के लिए, हमने एक सुरक्षा उपाय लागू किया है। आपको एक बार की फीस का भुगतान करना होगा",
      accessText2:
        "यह राशि आपके व्यक्तिगत बॉट के लिए सर्वर किराए को कवर करेगी",
      accessText3: "भुगतान क्रिप्टोकरेंसी में किया जाता है।",
      payButton: "CryptoPay",
    },
    payment: {
      title: "भुगतान",
      subtitle: "स्थानांतरण के लिए क्रिप्टोकरेंसी और नेटवर्क चुनें।",
      currencyLabel: "क्रिप्टोकरेंसी चुनें",
      networkLabel: "नेटवर्क चुनें",
      hint: "पुष्टि के बाद, आपको भरे हुए भुगतान विवरण के साथ @xrocket पर पुनर्निर्देशित किया जाएगा।",
      payButton: "भुगतान करें",
      creating: "इनवॉइस बनाया जा रहा है...",
      error: "त्रुटि: इनवॉइस बनाने में विफल",
    },
    loading: {
      title: "सर्वर तैयारी",
      subtitle: "आपका व्यक्तिगत सर्वर तैयार किया जा रहा है",
      readyTitle: "आपका सर्वर तैयार है",
      readyText: "आपका व्यक्तिगत सर्वर सफलतापूर्वक तैयार किया गया है और उपयोग के लिए तैयार है।",
      okButton: "ठीक",
    },
    secondPayment: {
      title: "बॉट किराया",
      subtitle: "1 महीने के लिए बॉट किराया होगा",
      description: "यह राशि 1 महीने के लिए आपके व्यक्तिगत बॉट सर्वर के किराए को कवर करती है।",
      payButton: "भुगतान करें",
      hint: "पुष्टि के बाद, आपको भरे हुए भुगतान विवरण के साथ @xrocket पर पुनर्निर्देशित किया जाएगा।",
    },
    final: {
      title: "सब तैयार है",
      message: "सब कुछ तैयार है। कृपया प्रतीक्षा करें।",
    },
    nav: {
      back: "← वापस",
      home: "मुख्य मेनू",
    },
  },
  br: {
    language: {
      title: "PRIVATE SIGNAL SYSTEM",
      subtitle: "Selecione o idioma da interface",
      hint: "Você pode alterar o idioma mais tarde. Sua escolha será salva para visitas futuras.",
    },
    onboarding: {
      slide1: {
        title: "PRIVATE SIGNAL SYSTEM",
        text: "Bots de sinais pessoais para nossos parceiros com 100% de precisão.",
        swipeHint: "Deslize para a esquerda para continuar",
      },
      slide2: {
        personalTitle: "Benefícios do Bot Pessoal",
        personalItems: [
          "Instalação do bot exclusivamente para você",
          "Precisão garantida de 100%",
          "Sem flutuações de precisão",
        ],
        freeTitle: "Desvantagens do Bot Gratuito",
        freeItems: [
          "Grande número de usuários",
          "Redução lógica de precisão sob carga",
          "Número limitado de jogos",
          "Necessidade de registrar uma nova conta",
        ],
        startButton: "Começar",
      },
    },
    home: {
      title: "PRIVATE SIGNAL SYSTEM",
      idLabel: "Seu ID pessoal:",
      copyButton: "Copiar",
      accessTitle: "Requisitos de Acesso",
      accessText1:
        "Para impedir que usuários não autorizados acessem nosso produto, implementamos uma medida de segurança. Você precisa pagar uma taxa única de",
      accessText2:
        "Este valor cobrirá o aluguel do servidor para seu bot pessoal por um período de",
      accessText3: "O pagamento é feito em criptomoeda.",
      payButton: "CryptoPay",
    },
    payment: {
      title: "Pagamento",
      subtitle: "Selecione a criptomoeda e a rede para transferência.",
      currencyLabel: "Selecione a criptomoeda",
      networkLabel: "Selecione a rede",
      hint: "Após a confirmação, você será redirecionado para @xrocket com os detalhes de pagamento preenchidos.",
      payButton: "Pagar",
      creating: "Criando fatura...",
      error: "Erro: Falha ao criar fatura",
    },
    loading: {
      title: "Preparação do Servidor",
      subtitle: "Seu servidor pessoal está sendo preparado",
      readyTitle: "Seu Servidor Está Pronto",
      readyText: "Seu servidor pessoal foi preparado com sucesso e está pronto para uso.",
      okButton: "OK",
    },
    secondPayment: {
      title: "Aluguel do Bot",
      subtitle: "O aluguel mensal do bot custará",
      description: "Este valor cobre o aluguel do servidor do seu bot pessoal por 1 mês.",
      payButton: "Pagar",
      hint: "Após a confirmação, você será redirecionado para @xrocket com os detalhes de pagamento preenchidos.",
    },
    final: {
      title: "Tudo Pronto",
      message: "Tudo está pronto. Por favor, aguarde.",
    },
    nav: {
      back: "← Voltar",
      home: "Menu Principal",
    },
  },
  uz: {
    language: {
      title: "PRIVATE SIGNAL SYSTEM",
      subtitle: "Interfeys tilini tanlang",
      hint: "Siz keyinroq tilni o'zgartirishingiz mumkin. Tanlovingiz kelajakdagi tashriflar uchun saqlanadi.",
    },
    onboarding: {
      slide1: {
        title: "PRIVATE SIGNAL SYSTEM",
        text: "Bizning hamkorlarimiz uchun 100% aniqlik bilan shaxsiy signal botlari.",
        swipeHint: "Davom etish uchun chapga silang",
      },
      slide2: {
        personalTitle: "Shaxsiy Botning Afzalliklari",
        personalItems: [
          "Bot faqat siz uchun o'rnatiladi",
          "100% aniqlik kafolati",
          "Aniqlik o'zgarishlari yo'q",
        ],
        freeTitle: "Bepul Botning Kamchiliklari",
        freeItems: [
          "Ko'p sonli foydalanuvchilar",
          "Yuk ostida mantiqiy aniqlik pasayishi",
          "Cheklangan o'yinlar soni",
          "Yangi hisob yaratish zarurati",
        ],
        startButton: "Boshlash",
      },
    },
    home: {
      title: "PRIVATE SIGNAL SYSTEM",
      idLabel: "Sizning shaxsiy ID:",
      copyButton: "Nusxalash",
      accessTitle: "Kirish Talablari",
      accessText1:
        "Ruxsatsiz foydalanuvchilarning mahsulotimizga kirishini oldini olish uchun biz xavfsizlik chorasini joriy qildik. Siz bir martalik to'lovni to'lashingiz kerak",
      accessText2:
        "Bu summa sizning shaxsiy botingiz uchun server ijarasini qoplaydi",
      accessText3: "To'lov kriptovalyutada amalga oshiriladi.",
      payButton: "CryptoPay",
    },
    payment: {
      title: "To'lov",
      subtitle: "O'tkazma uchun kriptovalyuta va tarmoqni tanlang.",
      currencyLabel: "Kriptovalyutani tanlang",
      networkLabel: "Tarmoqni tanlang",
      hint: "Tasdiqlangandan so'ng, siz to'ldirilgan to'lov ma'lumotlari bilan @xrocket ga yo'naltirilasiz.",
      payButton: "To'lash",
      creating: "Hisob-faktura yaratilmoqda...",
      error: "Xatolik: Hisob-faktura yaratib bo'lmadi",
    },
    loading: {
      title: "Server Tayyorlash",
      subtitle: "Sizning shaxsiy serveringiz tayyorlanmoqda",
      readyTitle: "Sizning Serveringiz Tayyor",
      readyText: "Sizning shaxsiy serveringiz muvaffaqiyatli tayyorlandi va foydalanishga tayyor.",
      okButton: "OK",
    },
    secondPayment: {
      title: "Bot Ijarasi",
      subtitle: "1 oy uchun bot ijara narxi",
      description: "Bu summa 1 oy davomida sizning shaxsiy bot serveringizning ijara narxini qoplaydi.",
      payButton: "To'lash",
      hint: "Tasdiqlangandan so'ng, siz to'ldirilgan to'lov ma'lumotlari bilan @xrocket ga yo'naltirilasiz.",
    },
    final: {
      title: "Hammasi Tayyor",
      message: "Hammasi tayyor. Iltimos, kuting.",
    },
    nav: {
      back: "← Orqaga",
      home: "Asosiy Menyu",
    },
  },
  tr: {
    language: {
      title: "PRIVATE SIGNAL SYSTEM",
      subtitle: "Arayüz dilini seçin",
      hint: "Dili daha sonra değiştirebilirsiniz. Seçiminiz gelecekteki ziyaretler için kaydedilecektir.",
    },
    onboarding: {
      slide1: {
        title: "PRIVATE SIGNAL SYSTEM",
        text: "Ortaklarımız için %100 doğrulukla kişisel sinyal botları.",
        swipeHint: "Devam etmek için sola kaydırın",
      },
      slide2: {
        personalTitle: "Kişisel Botun Avantajları",
        personalItems: [
          "Bot yalnızca sizin için kurulum",
          "%100 doğruluk garantisi",
          "Doğruluk dalgalanmaları yok",
        ],
        freeTitle: "Ücretsiz Botun Dezavantajları",
        freeItems: [
          "Çok sayıda kullanıcı",
          "Yük altında mantıklı doğruluk azalması",
          "Sınırlı oyun sayısı",
          "Yeni hesap kaydetme ihtiyacı",
        ],
        startButton: "Başla",
      },
    },
    home: {
      title: "PRIVATE SIGNAL SYSTEM",
      idLabel: "Kişisel ID'niz:",
      copyButton: "Kopyala",
      accessTitle: "Erişim Gereksinimleri",
      accessText1:
        "Yetkisiz kullanıcıların ürünümüze erişmesini önlemek için bir güvenlik önlemi uyguladık. Tek seferlik bir ücret ödemeniz gerekiyor",
      accessText2:
        "Bu tutar, kişisel botunuz için sunucu kiralama maliyetini karşılayacaktır",
      accessText3: "Ödeme kripto para birimiyle yapılır.",
      payButton: "CryptoPay",
    },
    payment: {
      title: "Ödeme",
      subtitle: "Transfer için kripto para birimi ve ağı seçin.",
      currencyLabel: "Kripto para birimini seçin",
      networkLabel: "Ağı seçin",
      hint: "Onaydan sonra, doldurulmuş ödeme detaylarıyla @xrocket'e yönlendirileceksiniz.",
      payButton: "Öde",
      creating: "Fatura oluşturuluyor...",
      error: "Hata: Fatura oluşturulamadı",
    },
    loading: {
      title: "Sunucu Hazırlığı",
      subtitle: "Kişisel sunucunuz hazırlanıyor",
      readyTitle: "Sunucunuz Hazır",
      readyText: "Kişisel sunucunuz başarıyla hazırlandı ve kullanıma hazır.",
      okButton: "Tamam",
    },
    secondPayment: {
      title: "Bot Kiralama",
      subtitle: "1 aylık bot kiralama maliyeti",
      description: "Bu tutar, kişisel bot sunucunuzun 1 aylık kiralama maliyetini karşılar.",
      payButton: "Öde",
      hint: "Onaydan sonra, doldurulmuş ödeme detaylarıyla @xrocket'e yönlendirileceksiniz.",
    },
    final: {
      title: "Her Şey Hazır",
      message: "Her şey hazır. Lütfen bekleyin.",
    },
    nav: {
      back: "← Geri",
      home: "Ana Menü",
    },
  },
};
