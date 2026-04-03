export type Lang = "en" | "lv" | "ru";

export const dictionaries = {
  en: {
    nav: {
      services: "Services",
      about: "About",
      testimonials: "Testimonials",
      contact: "Contact",
      bookNow: "Book Now",
    },
    hero: {
      tagline: "Your personal beauty ritual",
      headline1: "Where Beauty",
      headline2: "Becomes Art",
      subtext:
        "Step into a world of pure indulgence. Every visit is your moment — unhurried, considered, and entirely devoted to you.",
      cta1: "Reserve Your Visit",
      cta2: "Explore Services",
      stat1: "Years of Experience",
      stat2: "Clients Served",
      scroll: "Scroll",
    },
    services: {
      ornament: "Our Offerings",
      title: "Curated Services",
      subtitle:
        "Each treatment is a considered experience — from the first touch to the final flourish.",
      bookBtn: "Book a Treatment",
      items: [
        {
          title: "Signature Facial",
          description:
            "A bespoke treatment tailored to your skin's unique needs, using rare botanical extracts and gold-infused serums.",
          duration: "90 min",
        },
        {
          title: "Precision Hair Artistry",
          description:
            "Cut, color, and style curated by our master colorists trained in Parisian ateliers.",
          duration: "120 min",
        },
        {
          title: "Ritual Body Sculpt",
          description:
            "A full-body contouring experience combining deep-tissue techniques with warm amber oil therapy.",
          duration: "75 min",
        },
        {
          title: "Lash & Brow Design",
          description:
            "Architectural precision meets softness — defining your gaze with an artist's eye.",
          duration: "60 min",
        },
        {
          title: "Bridal Atelier",
          description:
            "An all-day luxury preparation ritual for your most important chapter, tailored from first consultation to final veil.",
          duration: "Full Day",
        },
        {
          title: "The Laurify Ritual",
          description:
            "Our signature three-hour immersive experience — face, body, and spirit restored in sequence.",
          duration: "180 min",
        },
      ],
    },
    about: {
      ornament: "Our Philosophy",
      headline1: "Beauty as a",
      headline2: "Daily Ceremony",
      p1: "Beauty is not just a result — it is a feeling, a confidence and care for yourself. In our studio, every procedure becomes an experience where aesthetics meet technology and professional expertise.",
      p2: "We specialise in RF lifting, laser epilation and body treatments that help reveal your natural beauty. Every client receives an individual approach, top-quality equipment and visible, long-lasting results.",
      cta: "Book a Visit",
      tag: "Natural Results",
    },
    testimonials: {
      ornament: "Client Words",
      title: "What Our Guests Say",
      items: [
        {
          quote:
            "Laurify is unlike any salon I have visited in Europe. The quiet luxury, the attention to every micro-detail — I felt sculpted, not just styled.",
          name: "Isabelle M.",
          role: "Fashion Director, Paris",
          initials: "IM",
        },
        {
          quote:
            "My skin has never looked this way before. The Signature Facial changed how I understand self-care. I will not go anywhere else.",
          name: "Elara V.",
          role: "Entrepreneur, Riga",
          initials: "EV",
        },
        {
          quote:
            "From the moment I walked in, everything was considered. The scent, the light, the touch. This is what true luxury feels like.",
          name: "Natasha R.",
          role: "Interior Designer, Stockholm",
          initials: "NR",
        },
      ],
    },
    contact: {
      ornament: "Reserve Your Visit",
      title: "Begin Your Ritual",
      infoTitle: "Contact & Hours",
      formTitle: "Send a Message",
      address: "Address",
      phone: "Phone",
      email: "Email",
      hours: "Hours",
      hoursValue: "Mon–Fri: 11:00–19:00\nSat: By appointment\nSun: Closed",
      firstName: "First Name",
      lastName: "Last Name",
      emailPlaceholder: "Email Address",
      phonePlaceholder: "Phone Number",
      selectService: "Select a Service",
      notes: "Any additional notes or requests...",
      submitBtn: "Book an Appointment",
      bookingDesc: "Choose your preferred service, date and time directly in our online booking system. Your appointment will be confirmed immediately.",
      formName: "Name",
      formContact: "Phone or Email",
      formMessage: "Message",
      formSend: "Send Message",
      formSending: "Sending...",
      formSuccess: "Thank you! Message sent. We'll be in touch soon.",
      formError: "Failed to send. Please try again or write directly to beauty@laurify.lv",
      formOr: "or",
      whatsapp: "Message on WhatsApp",
      badgeRole: "Laurify Brand Owner & Creator",
      badgeCert: "Certified Specialist",
      gallery: "Our Gallery",
      galleryTitle: "Aizkulises",
      googleReviews: "Google Reviews",
    },
    footer: {
      tagline:
        "An intimate luxury beauty atelier in the heart of Riga. Beauty as a ceremony.",
      col1: {
        title: "Services",
        links: ["Signature Facial", "Hair Artistry", "Body Sculpt", "Bridal Atelier"],
      },
      col3: {
        title: "Follow",
        links: ["Instagram", "Pinterest", "LinkedIn", "Newsletter"],
      },
      copyright: "© 2026 Laurify. All rights reserved.",
      legal: "Privacy · Terms · Cookie Policy",
    },
  },

  lv: {
    nav: {
      services: "Pakalpojumi",
      about: "Par mums",
      testimonials: "Atsauksmes",
      contact: "Kontakti",
      bookNow: "Rezervēt",
    },
    hero: {
      tagline: "Tavs personīgais skaistuma rituāls",
      headline1: "Kur skaistums",
      headline2: "Kļūst par mākslu",
      subtext:
        "Ienāc pasaulē, kur viss ir par tevi. Katrs apmeklējums — bez steigas, ar rūpību un pilnīgu veltījumu tavam labsajūtam.",
      cta1: "Rezervē savu vizīti",
      cta2: "Apskatīt pakalpojumus",
      stat1: "Pieredzes gadi",
      stat2: "Apkalpotie klienti",
      scroll: "Ritināt",
    },
    services: {
      ornament: "Mūsu piedāvājums",
      title: "Kurētie pakalpojumi",
      subtitle:
        "Katra procedūra ir pārdomāta pieredze — no pirmā pieskāriena līdz pēdējam akcentam.",
      bookBtn: "Rezervēt procedūru",
      items: [
        {
          title: "Signatūras Sejas Kopšana",
          description:
            "Individuāla procedūra, kas pielāgota jūsu ādas unikālajām vajadzībām, izmantojot retāk sastopamus botāniskos ekstraktus un ar zeltu bagātinātus serumus.",
          duration: "90 min",
        },
        {
          title: "Precīzā Matu Māksla",
          description:
            "Griezums, krāsošana un stilizācija, kuru veic mūsu meistari, kas apmācīti Parīzes ateljejos.",
          duration: "120 min",
        },
        {
          title: "Rituāls Ķermeņa Skulptūra",
          description:
            "Pilna ķermeņa kontūrēšanas pieredze, kas apvieno dziļo audu tehniku ar siltu dzintara eļļas terapiju.",
          duration: "75 min",
        },
        {
          title: "Skropstu un Uzacu Dizains",
          description:
            "Arhitektoniska precizitāte satiekas ar maigumu — definē tavu skatienu ar mākslinieka aci.",
          duration: "60 min",
        },
        {
          title: "Kāzu Ateljē",
          description:
            "Visu dienu ilgs luksusa sagatavošanās rituāls tavam svarīgākajam brīdim, kas pielāgots no pirmās konsultācijas līdz pēdējam plīvuram.",
          duration: "Visa diena",
        },
        {
          title: "Laurify Rituāls",
          description:
            "Mūsu signatūras trīs stundu iegremdēšanās pieredze — seja, ķermenis un gars atjaunoti secīgi.",
          duration: "180 min",
        },
      ],
    },
    about: {
      ornament: "Mūsu Filozofija",
      headline1: "Skaistums kā",
      headline2: "Ikdienas Ceremonija",
      p1: "Skaistums nav tikai rezultāts — tā ir sajūta, pārliecība un rūpes par sevi. Mūsu studijā katra procedūra kļūst par pieredzi, kur estētika apvienojas ar tehnoloģijām un profesionālu pieeju.",
      p2: "Mēs specializējamies RF liftingā, lāzerepilācijā un ķermeņa procedūrās, kas palīdz izcelt dabisko skaistumu. Katram klientam nodrošinām individuālu pieeju, augstākās kvalitātes aprīkojumu un redzamus, ilgnoturīgus rezultātus.",
      cta: "Rezervēt vizīti",
      tag: "Dabīgie rezultāti",
    },
    testimonials: {
      ornament: "Klientu vārdi",
      title: "Ko saka mūsu viesi",
      items: [
        {
          quote:
            "Laurify nav līdzīgs nevienam salonam, ko esmu apmeklējusi Eiropā. Klusā luksusa un uzmanību katrai detaļai — es jutos izkopta, ne tikai sakārtota.",
          name: "Isabelle M.",
          role: "Fashion Director, Parīze",
          initials: "IM",
        },
        {
          quote:
            "Mana āda nekad nav izskatījusies tik labi. Signatūras sejas kopšana mainīja manu izpratni par pašaprūpi. Es vairs neiešu nekur citur.",
          name: "Elara V.",
          role: "Uzņēmēja, Rīga",
          initials: "EV",
        },
        {
          quote:
            "Kopš brīža, kad ienācu, viss bija pārdomāts. Smarža, gaisma, pieskāriens. Tā izskatās patiesais luksuss.",
          name: "Natasha R.",
          role: "Interjera dizainere, Stokholma",
          initials: "NR",
        },
      ],
    },
    contact: {
      ornament: "Rezervē savu vizīti",
      title: "Sāc savu rituālu",
      infoTitle: "Kontakti & Darba laiks",
      formTitle: "Sūtīt ziņojumu",
      address: "Adrese",
      phone: "Tālrunis",
      email: "E-pasts",
      hours: "Darba laiks",
      hoursValue: "P–Pk: 11:00–19:00\nSestd: Pēc pierakstiem\nSv: Brīvs",
      firstName: "Vārds",
      lastName: "Uzvārds",
      emailPlaceholder: "E-pasta adrese",
      phonePlaceholder: "Tālruņa numurs",
      selectService: "Izvēlies pakalpojumu",
      notes: "Jebkādas papildu piezīmes vai lūgumi...",
      submitBtn: "Rezervēt vizīti",
      bookingDesc: "Izvēlies vēlamo pakalpojumu, datumu un laiku tieši mūsu tiešsaistes rezervācijas sistēmā. Vizīte tiks apstiprināta uzreiz.",
      formName: "Vārds",
      formContact: "Tālrunis vai e-pasts",
      formMessage: "Ziņojums",
      formSend: "Nosūtīt ziņojumu",
      formSending: "Sūta...",
      formSuccess: "Paldies! Ziņojums nosūtīts. Sazināsimies drīzumā.",
      formError: "Neizdevās nosūtīt. Lūdzu mēģini vēlreiz vai raksti tieši uz beauty@laurify.lv",
      formOr: "vai",
      whatsapp: "Rakstīt WhatsApp",
      badgeRole: "Zīmola Laurify īpašniece & radītāja",
      badgeCert: "Sertificēta speciāliste",
      gallery: "Mūsu Galerija",
      galleryTitle: "Aizkulises",
      googleReviews: "Google Atsauksmes",
    },
    footer: {
      tagline:
        "Intīms luksusa skaistuma ateljē Rīgas sirdī. Skaistums kā ceremonija.",
      col1: {
        title: "Pakalpojumi",
        links: ["Signatūras Sejas", "Matu Māksla", "Ķermeņa Skulptūra", "Kāzu Ateljē"],
      },
      col3: {
        title: "Sekot",
        links: ["Instagram", "Pinterest", "LinkedIn", "Biļetens"],
      },
      copyright: "© 2026 Laurify. Visas tiesības aizsargātas.",
      legal: "Privātums · Noteikumi · Sīkdatņu Politika",
    },
  },

  ru: {
    nav: {
      services: "Услуги",
      about: "О нас",
      testimonials: "Отзывы",
      contact: "Контакты",
      bookNow: "Записаться",
    },
    hero: {
      tagline: "Ваш личный ритуал красоты",
      headline1: "Где красота",
      headline2: "Становится искусством",
      subtext:
        "Войдите в мир, где всё посвящено вам. Каждый визит — без спешки, с заботой и полным вниманием к вашему удовольствию.",
      cta1: "Забронировать визит",
      cta2: "Изучить услуги",
      stat1: "Лет опыта",
      stat2: "Клиентов обслужено",
      scroll: "Прокрутить",
    },
    services: {
      ornament: "Наши предложения",
      title: "Изысканные услуги",
      subtitle:
        "Каждая процедура — это продуманный опыт, от первого прикосновения до последнего штриха.",
      bookBtn: "Забронировать процедуру",
      items: [
        {
          title: "Фирменный Уход за Лицом",
          description:
            "Индивидуальная процедура, адаптированная к уникальным потребностям вашей кожи, с использованием редких ботанических экстрактов и сывороток, обогащённых золотом.",
          duration: "90 мин",
        },
        {
          title: "Прецизионное Искусство Причёски",
          description:
            "Стрижка, окрашивание и укладка, созданные нашими мастерами, прошедшими обучение в парижских ателье.",
          duration: "120 мин",
        },
        {
          title: "Ритуальное Моделирование Тела",
          description:
            "Комплексный контурный опыт, сочетающий техники глубокого массажа тканей с терапией тёплым янтарным маслом.",
          duration: "75 мин",
        },
        {
          title: "Дизайн Ресниц и Бровей",
          description:
            "Архитектурная точность встречается с мягкостью — определяет ваш взгляд с мастерством художника.",
          duration: "60 мин",
        },
        {
          title: "Свадебное Ателье",
          description:
            "Роскошный ритуал подготовки на весь день для самой важной главы вашей жизни, подобранный от первой консультации до последней фаты.",
          duration: "Весь день",
        },
        {
          title: "Ритуал Laurify",
          description:
            "Наш фирменный трёхчасовой иммерсивный опыт — лицо, тело и дух восстанавливаются последовательно.",
          duration: "180 мин",
        },
      ],
    },
    about: {
      ornament: "Наша Философия",
      headline1: "Красота как",
      headline2: "Ежедневный Ритуал",
      p1: "Красота — это не просто результат, это ощущение, уверенность и забота о себе. В нашей студии каждая процедура становится опытом, где эстетика сочетается с технологиями и профессиональным подходом.",
      p2: "Мы специализируемся на RF-лифтинге, лазерной эпиляции и процедурах для тела, которые помогают раскрыть естественную красоту. Каждому клиенту — индивидуальный подход, оборудование высшего качества и заметный долгосрочный результат.",
      cta: "Записаться на визит",
      tag: "Натуральные результаты",
    },
    testimonials: {
      ornament: "Слова клиентов",
      title: "Что говорят наши гости",
      items: [
        {
          quote:
            "Laurify не похож ни на один салон, который я посещала в Европе. Тихая роскошь, внимание к каждой детали — я чувствовала себя скульптурой, а не просто причёсанной.",
          name: "Isabelle M.",
          role: "Fashion Director, Париж",
          initials: "IM",
        },
        {
          quote:
            "Моя кожа никогда не выглядела так. Фирменный уход за лицом изменил моё понимание заботы о себе. Я больше никуда не пойду.",
          name: "Elara V.",
          role: "Предприниматель, Рига",
          initials: "EV",
        },
        {
          quote:
            "С момента, как я вошла, всё было продумано. Аромат, свет, прикосновение. Вот что такое настоящая роскошь.",
          name: "Natasha R.",
          role: "Дизайнер интерьеров, Стокгольм",
          initials: "NR",
        },
      ],
    },
    contact: {
      ornament: "Забронировать визит",
      title: "Начните ваш ритуал",
      infoTitle: "Контакты и часы работы",
      formTitle: "Отправить сообщение",
      address: "Адрес",
      phone: "Телефон",
      email: "Эл. почта",
      hours: "Часы работы",
      hoursValue: "Пн–Пт: 11:00–19:00\nСб: По записи\nВс: Выходной",
      firstName: "Имя",
      lastName: "Фамилия",
      emailPlaceholder: "Эл. почта",
      phonePlaceholder: "Номер телефона",
      selectService: "Выберите услугу",
      notes: "Любые дополнительные пожелания...",
      submitBtn: "Забронировать визит",
      bookingDesc: "Выберите желаемую услугу, дату и время прямо в нашей системе онлайн-записи. Визит будет подтверждён немедленно.",
      formName: "Имя",
      formContact: "Телефон или эл. почта",
      formMessage: "Сообщение",
      formSend: "Отправить сообщение",
      formSending: "Отправка...",
      formSuccess: "Спасибо! Сообщение отправлено. Свяжемся с вами в ближайшее время.",
      formError: "Не удалось отправить. Попробуйте снова или напишите на beauty@laurify.lv",
      formOr: "или",
      whatsapp: "Написать в WhatsApp",
      badgeRole: "Владелец & создатель бренда Laurify",
      badgeCert: "Сертифицированный специалист",
      gallery: "Наша Галерея",
      galleryTitle: "Aizkulises",
      googleReviews: "Отзывы Google",
    },
    footer: {
      tagline:
        "Уютное ателье роскошной красоты в сердце Риги. Красота как ритуал.",
      col1: {
        title: "Услуги",
        links: [
          "Фирменный Уход",
          "Парикмахерское Искусство",
          "Моделирование Тела",
          "Свадебное Ателье",
        ],
      },
      col3: {
        title: "Следите",
        links: ["Instagram", "Pinterest", "LinkedIn", "Рассылка"],
      },
      copyright: "© 2026 Laurify. Все права защищены.",
      legal: "Конфиденциальность · Условия · Политика Cookies",
    },
  },
} as const;

export type Dict = typeof dictionaries.en;
