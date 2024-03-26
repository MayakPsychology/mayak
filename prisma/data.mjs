/* eslint-disable sonarjs/no-duplicate-string */
// needed to seed therapies correctly

export const districts = [
  'Личаківський',
  'Шевченківський',
  'Франківський',
  'Залізничний',
  'Галицький',
  'Сихівський',
].map(name => ({ name }));

export const specializations = ['Психолог', 'Психотерапевт', 'Психіатр', 'Сексолог', 'Соціальний працівник'].map(
  name => ({
    name,
  }),
);

export const organizationTypes = ['Психологічний центр', 'Соціальна служба', 'Лікарня'].map(name => ({ name }));

export const therapies = [
  {
    isActive: true,
    type: 'individual',
    title: 'Індивідуальна',
    description: 'для тебе',
    imagePath: '/assets/images/therapy_individual.svg',
    priority: 6,
    requests: [
      'Абʼюзивні стосунки',
      'Агресивна поведінка',
      'Батьківське ставлення',
      'Бойова психологічна травма',
      'Виховання дитини',
      'Відстороненість',
      'Вікова криза',
      'Впевненість в собі',
      'Відірваність від реальності',
      'Втома',
      'Втрата близької людини',
      'Втрата колишнього життя',
      'Втрата концентрації уваги',
      'Втрата майна',
      'Депресія',
      'Емоційне вигорання',
      'Емоційні гойдалки',
      'Життєва криза',
      'Ізоляція',
      'Інвалідизація',
      'Інтимність та сексуальність',
      'Мазохізм',
      'Матеріальна залежність',
      'Навʼязливі думки та ритуали',
      'Невпевненість в собі',
      'Ненависть до жінок',
      'Ненавість до чоловіків',
      'Неприйняття себе',
      'Нерозуміння себе',
      'Особисті кордони',
      'Особисті цілі та саморозвиток',
      'Панічні атаки',
      'Пережите насилля',
      'Поведінкова залежність',
      'Пошук опори в житті',
      'Пошук ресурсу',
      'Пошук сенсу життя',
      'Прийняття сексуальної орієнтації',
      'Проблеми з роботою',
      'Проблеми зі сном',
      'Проблеми у сексуальному житті',
      'Проблеми у стосунках',
      'Прокрастинація',
      'Психологічна залежність',
      'Психологічна травма',
      'ПТСР',
      'Садизм',
      'Самоідентифікація',
      'Самооцінка та самоцінність',
      'Самореалізація та вираження себе',
      'Самотність',
      'Селфхарм',
      'Спроби самогубства',
      'Страх невідомого',
      'Страх чужої думки',
      'Стрес',
      'Суїцидальні думки',
      'Тривожність',
      'Труднощі в комунікації',
      'Фобії та страхи',
      'Хімічні залежності (алкоголь, наркотичні р-ни)',
      'Хронічні захворювання',
    ],
  },
  {
    isActive: true,
    type: 'kids',
    title: 'Для дітей і підлітків',
    description: 'для найрідніших',
    imagePath: '/assets/images/therapy_kids.svg',
    priority: 5,
    requests: [
      'Абʼюзивні стосунки',
      'Агресивна поведінка',
      'Булінг',
      'Відстороненість',
      'Вікова криза',
      'Впевненість в собі',
      'Втрата близьких',
      'Втрата друзів',
      'Депресія',
      'Емоційне вигорання',
      'Емоційне насилля',
      'Емоційні гойдалки',
      'Життєва криза',
      'Замкнутість',
      'Ізоляція',
      'Інтимні стосунки',
      'Інтимність та сексуальність',
      'Конфлікти з однолітками',
      'Матеріальна залежність',
      'Навʼязливі думки та ритуали',
      'Надмірна агресивність',
      'Невпевненість в собі',
      'Нерозуміння батьків',
      'Нерозуміння себе',
      'Особисті кордони',
      'Особисті цілі та саморозвиток',
      'Панічні атаки',
      'Пережите насилля',
      'Поведінкова залежність',
      'Порушення уваги та памʼяті',
      'Пошук сенсу життя',
      'Прийняття сексуальної орієнтації',
      'Проблема самоідентифікації',
      'Проблеми адаптації',
      'Проблеми з моторикою',
      'Проблеми зі сном',
      'Прокрастинація',
      'Прокрастинація',
      'Профорієнтаційна невизначеність',
      'Психологічна залежність',
      'Психологічна травма',
      'Психосоматичні порушення',
      'ПТСР',
      'РДУГ',
      'Розлади особистості',
      'Розлади харчування',
      'Розлучення батьків',
      'Романтичні стосунки',
      'Самовизначення та самоідентифікація',
      'Самооцінка та самоцінність',
      'Самооцінка',
      'Самореалізація та вираження себе',
      'Самотність',
      'Селфхарм',
      'Спроби самогубства',
      'Стрес через навчання',
      'Суїцидальні думки',
      'Тривожність',
      'Труднощі в комунікації',
      'Фобії та страхи',
      'Харчові розлади (анорексія, булімія)',
      'Хімічні залежності (алкоголь, наркотичні р-ни)',
    ],
  },
  {
    isActive: true,
    type: 'family',
    title: 'Сімейна',
    description: 'для всієї родини',
    imagePath: '/assets/images/therapy_family.svg',
    priority: 4,
    requests: [
      'Абʼюзивні стосунки',
      'Агресивна поведінка',
      'Виховання дітей',
      'Втрата взаєморозуміння',
      'Емоційне вигорання',
      'Емоційне насилля',
      'Емоційні гойдалки',
      'Зрада',
      'Ізоляція',
      "Конфлікти в сім'ї",
      'Матеріальна залежність родини',
      'Невизначені зони відповідальності',
      'Невиправдані очікування',
      'Поведінкова залежність члена сімʼї',
      'Прийняття сексуальної орієнтації',
      'Проблеми у сексуальному житті',
      'Проблеми у стосунках',
      'Проблеми у фінансових питаннях',
      'Психологічна залежність члена сімʼї',
      'Розлучення',
      'Самотність',
      'Сімейна криза',
      'Стрес',
      'Суїцидальні думки',
      'Труднощі в комунікації',
      'Труднощі у взаємодії батьків та дітей',
      'Труднощі у прийняті спільних рішень',
      'Хімічні залежності члена сімʼї (алкоголь, наркотичні р-ни)',
    ],
  },
  {
    isActive: true,
    type: 'group',
    title: 'Групова',
    description: 'для людей з однаковими потребами',
    imagePath: '/assets/images/therapy_group.svg',
    priority: 3,
    requests: [
      'Абʼюзивні стосунки',
      'Агресивна поведінка',
      'Батьківське ставлення',
      'Важкі життєві обставини',
      'Відстороненість',
      'Впевненість в собі',
      'Втома',
      'Втрата близької людини',
      'Втрата колишнього життя',
      'Втрата майна',
      'Депресія',
      'Емоційне вигорання',
      'Ізоляція',
      'Мазохізм',
      'Матеріальна залежність',
      'Навʼязливі думки та ритуали',
      'Невпевненість в собі',
      'Ненависть до жінок',
      'Ненавість до чоловіків',
      'Особисті кордони',
      'Особисті цілі та саморозвиток',
      'Панічні атаки',
      'Пережите насилля',
      'Поведінкова залежність',
      'Поведінкові розлади',
      'Пошук опори в житті',
      'Пошук ресурсу',
      "Проблеми із сім'єю",
      'Проблеми міжособистісних відносин',
      'Проблеми у стосунках',
      'Психологічна залежність',
      'Психологічна травма',
      'ПТСР',
      'Садизм',
      'Самооцінка та самоцінність',
      'Самореалізація та вираження себе',
      'Самотність',
      'Селфхарм',
      'Соціальна тривога',
      'Страх невідомого',
      'Стрес',
      'Суїцидальні думки',
      'Тривожність',
      'Труднощі в комунікації',
      'Туга',
      'Фобії та страхи',
      'Хімічні залежності (алкоголь, наркотичні р-ни)',
    ],
  },
  {
    isActive: true,
    type: 'pair',
    title: 'Для пар',
    description: 'для тебе і партнера',
    imagePath: '/assets/images/therapy_pair.svg',
    priority: 2,
    requests: [
      '"Застій"" в стосунках',
      'Абʼюзивні стосунки',
      'Агресивна поведінка',
      'Буденність та втрата пристрасті',
      'Виховання дітей',
      'Віктимна поведінка',
      'Втрата взаєморозуміння',
      'Втрата інтимної близкості',
      'Емоційне вигорання',
      'Емоційне насилля',
      'Емоційні гойдалки',
      'Життєва криза партнера',
      'Зрада',
      'Ізоляція',
      'Криза стосунків',
      'Мазохізм',
      'Матеріальна залежність',
      'Можливість розлучення',
      'Неадекватні вимоги до партнера',
      'Невдачі у спільних планах',
      'Невизначені зони відповідальності',
      'Невизначені цілі',
      'Невірність та ревнощі',
      'Неспівпадання в цінностях та цілях',
      'Особисті кордони',
      'Партнер має психологічні проблеми',
      'Поведінкова залежність',
      'Подружня зрада',
      'Пошук сенсу стосунків',
      'Проблеми у сексуальному житті',
      'Проблеми у стосунках',
      'Проблеми у фінансових питаннях',
      'Психологічна залежність',
      'Розбіжні цілі',
      'Розбіжність у цінностях',
      'Розлучення',
      'Садизм',
      'Самотність',
      'Страх невідомого',
      'Стрес',
      'Токсична поведінка',
      'Труднощі в комунікації',
      'Труднощі у прийняті спільних рішень',
      'Хімічні залежності (алкоголь, наркотичні р-ни)',
    ],
  },
  {
    isActive: true,
    type: 'business',
    title: 'Для бізнесу',
    description: 'для співробітників',
    imagePath: '/assets/images/therapy_business.svg',
    priority: 1,
    requests: [
      'Агресивна поведінка',
      'Вигорання на роботі',
      'Впевненість в собі',
      'Втрата мотивації',
      'Емоційне вигорання',
      'Емоційні гойдалки',
      'Ізоляція',
      'Конфлікти в колективі',
      'Навички управління стресом',
      'Особисті кордони',
      'Особисті цілі та саморозвиток',
      'Проблеми з управлінням робочих відносин',
      'Проблеми зі сном',
      'Профдеформація',
      'Самооцінка та самоцінність',
      'Самореалізація та вираження себе',
      'Стагнація бізнесу',
      'Страх невідомого',
      'Стрес та перевантаження на роботі',
      'Тренінги для компанії',
      'Тренінги з командотворення',
      'Формування корпоративної культури',
    ],
  },
];

export const psychotherapyMethods = [
  {
    title: 'Арт-терапія',
    description:
      'Арт-терапія - використання творчості в психотерапії. Фокус на процесі, не на результаті. Допомагає виявити емоції та підвищити самосвідомість',
  },
  {
    title: 'Гештальт терапія',
    description:
      'Гештальт-терапія - це метод, де психолог фокусується на потребах клієнта. Вміє слухати, спостерігати, ділитися власними почуттями.',
  },
  {
    title: 'Десенсибілізація та репроцесуалізація рухом очей (EMDR)',
    description: 'EMDR - спеціальна травматерапія, що поєднує рухи очей зі спогадами про травму.',
  },
  {
    title: 'Діалектично-поведінкова терапія',
    description:
      'Діалектично-поведінкова терапія - комплексна система КПТ, що працює з важкими особистісними розладами.',
  },
  {
    title: 'Емоційно фокусована терапія',
    description:
      'Емоційно фокусована терапія - це метод, який допомагає розбиратися у власних почуттях та вміти краще розуміти, як вони впливають на наші стосунки та наше життя.',
  },
  {
    title: 'Інтерперсональна терапія (ІРТ)',
    description:
      'ІПТ - допомагає розбиратися у відносинах з іншими та поліпшувати якість спілкування. Цей підхід спрямований на розвиток навичок ефективної комунікації та вирішення конфліктів.',
  },
  {
    title: 'Когнітивно-поведінкова терапія',
    description:
      'Когнітивно-поведінкова терапія не тільки лікує психічні розлади, але й вчить керувати стресом. Вона ефективна і структурована, зазвичай потребує менше сеансів.',
  },
  {
    title: 'Клієнт-центрована терапія / особистісно-центрована терапія',
    description:
      'Клієнт-центрована терапія - ставить акцент на взаємовідносинах клієнта та психотерапевта, створюючи атмосферу довіри.',
  },
  {
    title: 'Логотерапія та екзистенційна терапія',
    description:
      'Екзистенційна терапія пропонує відмінну від позитивної психології перспективу, розглядаючи глибокі питання про сенс життя. Логотерапія, в свою чергу, ґрунтується на концепціях свободи, волі до сенсу та сенсі життя.',
  },
  {
    title: 'Майндфулнес-базований для підхід',
    description:
      'Майндфулнес-базований підхід поєднує когнітивно-поведінкову терапію з медитаційними практиками для зменшення стресу та профілактики депресії.',
  },
  {
    title: 'Мотиваційна терапія',
    description:
      'Мотиваційна терапія (MET) використовує стратегії для підвищення бажання клієнта змінювати свою поведінку, особливо для тих, хто виявляє амбівалентність або сумніви стосовно змін.',
  },
  {
    title: 'Наративна терапія',
    description:
      'Наративна терапія допомагає клієнтам розуміти, як їхні історії формують їхнє сприйняття себе і світу. Вона використовує записи та завдання, щоб допомогти клієнтам переписати свої життєві наративи та переосмислити їх.',
  },
  {
    title: 'Нейро-лінгвістична психотерапія',
    description:
      'Нейро-лінгвістична психотерапія використовує мову і сигнали тіла для зміни поведінки та досягнення особистісного розвитку',
  },
  {
    title: 'Позитивна психотерапія',
    description:
      'Позитивна психотерапія - фокус на ресурсах, цілісності особистості та реальності, вчить приймати як позитивні сторони, так і життєві виклики',
  },
  {
    title: 'Психодинамічний підхід',
    description:
      "Его, несвідоме, Фройд - це про психодинамічний підхід. Розв'язання внутрішніх конфліктів, виявлення несвідомих патернів поведінки та її мотивів для особистісного зростання",
  },
  {
    title: 'Психодраматична терапія (= Психодрама)',
    description:
      "Психодраматична терапія використовує театралізацію та рольову гру для для вираження та розв'язання психічних конфліктів та проблем.",
  },
  {
    title: 'Символдрама / Кататимно-імагінативна психотерапія',
    description:
      'Символдрама - чуттєве переживання образів за допомогою уяви. Образи допомагають представити внутрішній світ клієнта у всій його повноті та прожити неусвідомлені конфлікти та реакції.',
  },
  {
    title: 'Системна сімейна психотерапія',
    description:
      'Системна сімейна психотерапія фокусується на звʼязках та динаміці системи сімʼї для розвʼязання проблем та покращення спілкування. Зміна в 1 елементі призводить до змін у всій системі',
  },
  {
    title: 'Схема терапія',
    description: 'Схема терапія - модифікація КПТ, яка працює не лише на поведінковому, а й на особистісному рівні.',
  },
  {
    title: 'Танце-рухова терапія',
    description:
      'Танце-рухова терапія використовує рухи та музику для вираження та обробки емоційних та психологічних проблем. Це альтернативний шлях до розмови',
  },
  {
    title: 'Терапія базована на менталізації',
    description:
      'Терапія базована на менталізації сконцентрована на розвитку вміння розуміти причинно-наслідкові звʼязки та фізичну реальність довкола, а також співпереживати емоції та думки інших',
  },
  {
    title: 'Терапія прийняття та зобов’язання (ACT)',
    description:
      'АСТ - зосередження на цінностях, прийнятті емоцій та дійсності як вона є, а також відповідальності за зміни для покращення життя. Головна мета - оптимізувати внутрішній потенціал.',
  },
  {
    title: 'Транзакційний аналіз',
    description:
      'Транзакційний аналіз розглядає поведінку людини через взаємодію її Его-станів: Дитини, Батьків та Дорослого, тому мета - навчити свідомо керувати та утримувати баланс між ними.',
  },
  {
    title: 'Короткотермінова терапія зосереджена на рішенні (BSFT)',
    description:
      'BSFT - акцент на вирішенні конкретних проблем, актуалізації ресурсів. Фокус завжди спрямований на мету, а не на проблеми довкола',
  },
  {
    title: 'Інші',
  },
];

export const psychologyMethods = [
  {
    title: 'Клінічна психологія',
    description:
      'Фахівець з діагностики та корекції психічних порушень, працює з особами з соматичними (тілесними) хворобами, психічними розладами, а також зі здоровими людьми.',
  },
  {
    title: 'Психологія управління',
    description:
      'Фахівець з вирішення складних управлінських завдань. Розуміє закономірності людської взаємодії та застосовує психологічні знання у професійній управлінській діяльності.',
  },
  {
    title: 'Педагогічна психологія',
    description:
      'Фахівець з діагностики, корекції та розвитку якостей здобувачів освіти. Розуміє вікові особливості дітей, навчально-виховного процесу та педагогічного впливу.',
  },
  {
    title: 'Практична психологія',
    description:
      'Фахівець з психологічного супроводу особистості, психологічної допомоги, психодіагностики та психокорекції, володіють компетентностями для комплексного вирішення психологічних проблем.',
  },
  {
    title: 'Коуч',
    description:
      'Фахівець з розкриття внутрішнього потенціалу клієнта, що сприяє глибокому усвідомленню ситуації та досягненню поставлених цілей.',
  },
  {
    title: 'Військова психологія',
    description:
      "Фахівець з надання допомоги військовослужбовцям та їх сім'ям, вирішує психологічні проблеми, підвищує психологічну стійкість та адаптацію у військовому середовищі.",
  },
  {
    title: 'Сімейна психологія',
    description:
      "Фахівець з розв'язання конфліктів, покращення взаємин та комунікації в родині, надає підтримку у сімейних труднощах та кризах.",
  },
  {
    title: 'Шкільна психологія',
    description:
      'Фахівець з психологічної підтримки учням та педагогам, допомагає вирішувати проблеми навчання, адаптації та соціальної взаємодії в навчальному середовищі.',
  },
  {
    title: 'Соціальна психологія',
    description:
      'Фахівець, який досліджує вплив соціальних факторів на поведінку та сприяє розумінню групової динаміки, стереотипів та міжособистісних відносин тощо.',
  },
  {
    title: 'Юридична психологія',
    description:
      'Фахівець, який займається супроводом та підтримкою взаємовідносин учасників юридичних процесів, надає консультації щодо психологічних аспектів судових справ.',
  },
  {
    title: 'Медична психологія',
    description:
      'Лікар-психолог, який займається психодіагностикою, лікуванням осіб з соматичними та психічними захворюваннями, профілактикою серед груп ризику та психологічною реабілітацією.',
  },
  {
    title: 'Політична психологія',
    description:
      'Фахівець з дослідження психологічних аспектів політичної поведінки та процесів, включаючи вплив масових настроїв, переконань та лідерства на політичні рішення та події.',
  },
  {
    title: 'Корекційна психологія',
    description: 'Фахівець, який спеціалізується на виявленні та корекції психологічних недоліків.',
  },
  {
    title: 'Інше',
  },
];
