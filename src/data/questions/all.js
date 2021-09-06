const questions = [
    {
        text: "Какой твой самый большой страх?",
        ps: "",
        topics: "друзьям,близким,любимым,разговор на всю ночь",
        lvl: 40,
        depth: 65,
        closeness: 70,
        emotions: 60,
    },
    {
        text: "Опиши наиболее притягательные качества в противоположном поле",
        ps: "",
        topics: "друзьям,любимым,разговор на всю ночь",
        lvl: 40,
        depth: 35,
        closeness: 50,
        emotions: 30,
    },
    {
        text: "Какое самое большое разочарование в твоей жизни?",
        ps: "Будь аккуратнее. Вопрос может вызвать у человека сильные эмоции.",
        topics: "друзьям,близким,любимым,разговор на всю ночь",
        lvl: 60,
        depth: 75,
        closeness: 80,
        emotions: 90,
    },
    {
        text: "У тебя есть травмы из детства, которые причинили тебе родители? Можешь рассказать об этом?",
        ps: "Будь аккуратнее. Вопрос может вызвать у человека сильные эмоции.",
        topics: "близким,любимым,разговор на всю ночь",
        lvl: 60,
        depth: 85,
        closeness: 85,
        emotions: 95,
    },
    {
        text: "У тебя были интернет отношения? Расскажи о них. Как они начинались?",
        ps: "Не стоит задавать этот вопрос тому, для кого это больная тема.",
        topics: "близким,любимым,разговор на всю ночь",
        lvl: 80,
        depth: 55,
        closeness: 60,
        emotions: 90,
    },
    {
        text: "Расскажи о своей первой любви. Как все начиналось и что с вами произошло потом?",
        ps: "",
        topics: "близким,любимым,разговор на всю ночь",
        lvl: 45,
        depth: 65,
        closeness: 50,
        emotions: 80,
    },
    {
        text: "Было ли у тебя событие, которое координально изменило твою жизнь и мировоззрение? Расскажи о нем",
        ps: "",
        topics: "друзьям,близким,любимым,разговор на всю ночь,философия",
        lvl: 75,
        depth: 45,
        closeness: 55,
        emotions: 70,
    },
    {
        text: "Как думаешь, что в мире кажется волшебным и нереальным, хотя уже существует?",
        ps: "",
        topics: "друзьям,близким,разговор на всю ночь,философия,начало разговора",
        lvl: 35,
        depth: 35,
        closeness: 45,
        emotions: 20,
    },
    {
        text: "Каких людей на твой взгляд стоит лучше остерегаться? Почему ты так думаешь?",
        ps: "",
        topics: "друзьям,разговор на всю ночь",
        lvl: 25,
        depth: 35,
        closeness: 45,
        emotions: 15,
    },
    {
        text: "Ты умеешь поддерживать людей? Что бы ты сказал человеку в трудные моменты в его жизни?",
        ps: "",
        topics: "друзьям,разговор на всю ночь,философия",
        lvl: 35,
        depth: 45,
        closeness: 55,
        emotions: 35,
    },
    {
        text: "Кто для тебя настоящий друг? В твоей жизни был/есть такой человек?",
        ps: "",
        topics: "друзьям,близким,разговор на всю ночь",
        lvl: 45,
        depth: 55,
        closeness: 75,
        emotions: 40,
    },
    {
        text: "Тебя когда-нибудь предавали? Если хочешь, расскажи об этом",
        ps: "",
        topics: "близким,любимым",
        lvl: 40,
        depth: 45,
        closeness: 75,
        emotions: 80,
    },
    {
        text: "В какие моменты ты чувствовал себя максимально одиноким? Расскажи о них",
        ps: "",
        topics: "друзьям,близким,любимым,философия,разговор на всю ночь",
        lvl: 30,
        depth: 65,
        closeness: 70,
        emotions: 60,
    },
    {
        text: "Какие необычные для тебя вещи ты когда-либо делал?",
        ps: "",
        topics: "друзьям,разговор на всю ночь,начало разговора",
        lvl: 20,
        depth: 55,
        closeness: 30,
        emotions: 55,
    },
    {
        text: "Расскажи историю в стиле «Это не то, о чем ты подумал»",
        ps: "",
        topics: "друзьям,разговор на всю ночь",
        lvl: 25,
        depth: 25,
        closeness: 30,
        emotions: 75,
    },
    {
        text: "Какие наказания применяли родители в твоем воспитании?",
        ps: "",
        topics: "друзьям,близким",
        lvl: 65,
        depth: 35,
        closeness: 30,
        emotions: 85,
    },
    {
        text: "Каким ты видишь идеальное предложение руки и сердца?",
        ps: "",
        topics: "близким,для него,любимым",
        lvl: 25,
        depth: 45,
        closeness: 20,
        emotions: 35,
    },
    {
        text: "Что ты всегда хотел спросить у парней/девушек, но стеснялся?",
        ps: "",
        topics: "для нее,для него,любимым",
        lvl: 45,
        depth: 30,
        closeness: 30,
        emotions: 65,
    },
    {
        text: "О каком очевидном факте ты узнал слишком поздно?",
        ps: "",
        topics: "друзьям,начало разговора",
        lvl: 25,
        depth: 20,
        closeness: 10,
        emotions: 45,
    },
    {
        text: "Какие совпадения случались в твоей жизни, в которые трудно поверить?",
        ps: "",
        topics: "друзьям,разговор на всю ночь",
        lvl: 25,
        depth: 15,
        closeness: 10,
        emotions: 65,
    },
    {
        text: "Если бы тебе дали возможность изменить только один поступок в твоей жизни, то что бы это было?",
        ps: "",
        topics: "друзьям,близким,разговор на всю ночь,философия",
        lvl: 55,
        depth: 85,
        closeness: 60,
        emotions: 75,
    },
    {
        text: "Ты о чем-нибудь жалеешь до сих пор? Расскажи об этом",
        ps: "",
        topics: "близким,разговор на всю ночь,философия",
        lvl: 75,
        depth: 85,
        closeness: 80,
        emotions: 85,
    },
    {
        text: "Какой «оригинальный» подарок ты получал когда-либо?",
        ps: "",
        topics: "близким,разговор на всю ночь,любимым",
        lvl: 25,
        depth: 35,
        closeness: 20,
        emotions: 65,
    },
    {
        text: "Расскажи о странных действиях, к которым ты уже привык в отношениях",
        ps: "",
        topics: "близким,любимым,для него,для нее",
        lvl: 25,
        depth: 55,
        closeness: 20,
        emotions: 65,
    },
    {
        text: "Расскажи о самой грязной фантазии, которая связана с твоим партнером",
        ps: "",
        topics: "близким,любимым,для него,для нее",
        lvl: 65,
        depth: 75,
        closeness: 30,
        emotions: 75,
    },
    {
        text: "Есть ли у тебя странная, но гениальная мысль?",
        ps: "",
        topics: "друзьям,философия,разговор на всю ночь",
        lvl: 25,
        depth: 65,
        closeness: 30,
        emotions: 55,
    },
    {
        text: "Что милого делает твоя девушка, сама того не подозревая?",
        ps: "",
        topics: "друзьям,для него",
        lvl: 25,
        depth: 15,
        closeness: 30,
        emotions: 45,
    },
    {
        text: "Было ли в твоей жизни то, что тебя сломало больше всего? Что это было?",
        ps: "",
        topics: "близким,разговор на всю ночь,философия",
        lvl: 85,
        depth: 90,
        closeness: 80,
        emotions: 95,
    },
    {
        text: "В чем для тебя смысл жизни?",
        ps: "",
        topics: "друзьям,близким,разговор на всю ночь,философия",
        lvl: 65,
        depth: 80,
        closeness: 65,
        emotions: 35,
    },
    {
        text: "Если бы время остановилось на 24 часа, что бы ты сделал?",
        ps: "",
        topics: "друзьям,близким,разговор на всю ночь",
        lvl: 45,
        depth: 85,
        closeness: 35,
        emotions: 45,
    },
    {
        text: "Какой самый безумный бред ты делал за деньги?",
        ps: "",
        topics: "друзьям,разговор на всю ночь",
        lvl: 35,
        depth: 75,
        closeness: 25,
        emotions: 55,
    },
    {
        text: "Что тебя пугает, хотя другие относятся к этому без страха?",
        ps: "",
        topics: "друзьям,разговор на всю ночь,для нее",
        lvl: 25,
        depth: 65,
        closeness: 45,
        emotions: 55,
    },
    {
        text: "Самая мудрая мысль, которую ты когда-либо слышал?",
        ps: "",
        topics: "друзьям,разговор на всю ночь",
        lvl: 25,
        depth: 65,
        closeness: 45,
        emotions: 55,
    },
    {
        text: "Какие советы должна знать каждая девушка?",
        ps: "",
        topics: "для нее",
        lvl: 25,
        depth: 65,
        closeness: 45,
        emotions: 35,
    },
    {
        text: "О чем бы ты никогда не рассказал своим родителям?",
        ps: "",
        topics: "друзьям,близким,разговор на всю ночь",
        lvl: 75,
        depth: 65,
        closeness: 85,
        emotions: 65,
    },
    {
        text: "О чем ты обычно врешь другим людям?",
        ps: "",
        topics: "близким,разговор на всю ночь,любимым",
        lvl: 75,
        depth: 85,
        closeness: 65,
        emotions: 75,
    },
    {
        text: "После чего ты решил закончить отношения?",
        ps: "Если это болезненная тема для человека, следует не задавать этот вопрос",
        topics: "близким,для нее,для него",
        lvl: 80,
        depth: 75,
        closeness: 65,
        emotions: 90,
    },
    {
        text: "Какое сочетание продуктов ты любишь, но никому об этом не рассказываешь, потому что сама идея смешать их звучит отвратительно?",
        ps: "",
        topics: "близким,друзьям,любимым",
        lvl: 60,
        depth: 45,
        closeness: 55,
        emotions: 60,
    },
    {
        text: "Что по твоему мнению родители недодали тебе?",
        ps: "",
        topics: "близким,разговор на всю ночь",
        lvl: 70,
        depth: 75,
        closeness: 65,
        emotions: 70,
    },
    {
        text: "Расскажи, что ты находишь привлекательным?",
        ps: "",
        topics: "друзьям,разговор на всю ночь,любимым,для него,для нее",
        lvl: 50,
        depth: 75,
        closeness: 55,
        emotions: 40,
    },
    {
        text: "Самая неловкая ситуация в твоей жизни?",
        ps: "",
        topics: "друзьям,разговор на всю ночь",
        lvl: 60,
        depth: 45,
        closeness: 55,
        emotions: 50,
    },
    {
        text: "Расскажи, когда ты понял, что влюбился в нее/него/меня?",
        ps: "",
        topics: "близким,разговор на всю ночь,любимым,для него,для нее",
        lvl: 50,
        depth: 35,
        closeness: 55,
        emotions: 70,
    },
    {
        text: "В каких ситуациях ты смог бы попросить прощение, даже если чувствуешь, что прав?",
        ps: "",
        topics: "друзьям,разговор на всю ночь,философия",
        lvl: 40,
        depth: 65,
        closeness: 45,
        emotions: 50,
    },
    {
        text: "Какие неловкие ситуации с тобой случались?",
        ps: "",
        topics: "друзьям,разговор на всю ночь,начало разговора",
        lvl: 30,
        depth: 25,
        closeness: 35,
        emotions: 50,
    },
    {
        text: "Расскажи о самых странных подарках в твоей жизни",
        ps: "",
        topics: "друзьям,разговор на всю ночь",
        lvl: 20,
        depth: 15,
        closeness: 25,
        emotions: 55,
    },
    {
        text: "Какой фильм произвел на тебя сильное впечатление и почему?",
        ps: "",
        topics: "друзьям,разговор на всю ночь,начало разговора",
        lvl: 40,
        depth: 65,
        closeness: 35,
        emotions: 50,
    },
    {
        text: "О чем ты мечтаешь?",
        ps: "",
        topics: "друзьям,близким,любимым,разговор на всю ночь,философия",
        lvl: 30,
        depth: 75,
        closeness: 65,
        emotions: 30,
    },
    {
        text: "Чего тебе не хватает для полного счастья?",
        ps: "",
        topics: "близким,любимым,разговор на всю ночь,философия",
        lvl: 30,
        depth: 75,
        closeness: 65,
        emotions: 40,
    },
    {
        text: "Что ты больше всего ценишь в людях?",
        ps: "",
        topics: "друзьям,любимым,для нее,для него,философия",
        lvl: 40,
        depth: 85,
        closeness: 35,
        emotions: 20,
    },
    {
        text: "Соответствует ли твой знак зодиака твоему характеру? Расскажи о том, какой ты",
        ps: "",
        topics: "друзьям,любимым,разговор на всю ночь",
        lvl: 30,
        depth: 75,
        closeness: 70,
        emotions: 45,
    },
    {
        text: "Где бы ты хотел жить, в маленьком уютном домике на берегу озера или большом мегаполисе?",
        ps: "",
        topics: "друзьям,любимым,разговор на всю ночь,философия",
        lvl: 20,
        depth: 55,
        closeness: 45,
        emotions: 20,
    },
    {
        text: "Что тебя чаще всего раздражает в людях?",
        ps: "",
        topics: "друзьям,любимым,разговор на всю ночь",
        lvl: 40,
        depth: 75,
        closeness: 45,
        emotions: 50,
    },
    {
        text: "Расскажи о самом прекрасном сне, который ты помнишь",
        ps: "",
        topics: "друзьям,близким,любимым,разговор на всю ночь",
        lvl: 20,
        depth: 55,
        closeness: 35,
        emotions: 30,
    },
    {
        text: "Что ты делаешь, чтобы контролировать свой гнев?",
        ps: "",
        topics: "друзьям,любимым,разговор на всю ночь",
        lvl: 30,
        depth: 55,
        closeness: 65,
        emotions: 40,
    },
    {
        text: "Какие слова ты хотел бы чаще слышать от своих родителей?",
        ps: "",
        topics: "близким,разговор на всю ночь,философия",
        lvl: 70,
        depth: 85,
        closeness: 75,
        emotions: 60,
    },
    {
        text: "Ради чего стоит жить?",
        ps: "",
        topics: "друзьям,близким,любимым,разговор на всю ночь,философия",
        lvl: 60,
        depth: 90,
        closeness: 65,
        emotions: 30,
    },
    {
        text: "Расскажи о чем ты думаешь, но никому не рассказываешь",
        ps: "",
        topics: "близким,разговор на всю ночь",
        lvl: 60,
        depth: 65,
        closeness: 85,
        emotions: 40,
    },
    {
        text: "Каким бы ты был или что бы ты сделал, если бы не боялся?",
        ps: "",
        topics: "друзьям,близким,разговор на всю ночь,философия",
        lvl: 50,
        depth: 65,
        closeness: 75,
        emotions: 40,
    },
    {
        text: "Какие странные привычки, принципы или традиции у тебя есть?",
        ps: "",
        topics: "друзьям,любимым,разговор на всю ночь",
        lvl: 60,
        depth: 75,
        closeness: 75,
        emotions: 40,
    },
    {
        text: "После какой фразы ты поцеловался?",
        ps: "",
        topics: "друзьям,разговор на всю ночь,для нее",
        lvl: 20,
        depth: 25,
        closeness: 15,
        emotions: 50,
    },
    {
        text: "За что платят только идиоты?",
        ps: "",
        topics: "друзьям,разговор на всю ночь,философия",
        lvl: 30,
        depth: 45,
        closeness: 25,
        emotions: 40,
    },
    {
        text: "Как ты думаешь, какое самое лучшее чувство в мире?",
        ps: "",
        topics: "друзьям,близким,разговор на всю ночь,философия",
        lvl: 40,
        depth: 55,
        closeness: 35,
        emotions: 30,
    },
    {
        text: "Что нужно попробовать хотя бы раз в жизни?",
        ps: "",
        topics: "друзьям,разговор на всю ночь,философия",
        lvl: 35,
        depth: 45,
        closeness: 35,
        emotions: 20,
    },
    {
        text: "Как понять, что девушка тебя использует?",
        ps: "",
        topics: "друзьям,любимым,для нее,для него",
        lvl: 35,
        depth: 25,
        closeness: 25,
        emotions: 50,
    },
    {
        text: "Лучшие лайфхаки в твоей жизни?",
        ps: "",
        topics: "друзьям,разговор на всю ночь,начало разговора",
        lvl: 10,
        depth: 15,
        closeness: 20,
        emotions: 20,
    },
    {
        text: "Что ты хотел бы знать 5/10/20 лет назад?",
        ps: "",
        topics: "друзьям,близким,разговор на всю ночь,философия",
        lvl: 40,
        depth: 45,
        closeness: 50,
        emotions: 40,
    },
    {
        text: "Какие обычные вещи ты никогда не делал?",
        ps: "",
        topics: "друзьям,близким,любимым,разговор на всю ночь",
        lvl: 20,
        depth: 25,
        closeness: 30,
        emotions: 20,
    },
    {
        text: "Что можно узнать про человека по языку тела?",
        ps: "",
        topics: "друзьям,любимым,разговор на всю ночь",
        lvl: 30,
        depth: 35,
        closeness: 40,
        emotions: 20,
    },
    {
        text: "Что девушки хотят от своих парней, но никогда не попросят?",
        ps: "",
        topics: "друзьям,любимым,для нее",
        lvl: 30,
        depth: 35,
        closeness: 30,
        emotions: 30,
    },
    {
        text: "Тебе нравится твоя внешность? Почему?",
        ps: "",
        topics: "друзьям,близким,любимым,для нее",
        lvl: 65,
        depth: 85,
        closeness: 60,
        emotions: 40,
    },
    {
        text: "Какая самая главная для тебя вещь, которую нужно исправить в этом мире?",
        ps: "",
        topics: "друзьям,близким,любимым,разговор на всю ночь,философия",
        lvl: 60,
        depth: 75,
        closeness: 50,
        emotions: 50,
    },
    {
        text: "Что тебя делает по-настоящему счастливым?",
        ps: "",
        topics: "близким,любимым,разговор на всю ночь,философия",
        lvl: 75,
        depth: 95,
        closeness: 70,
        emotions: 50,
    },
    {
        text: "Что тебя делает по-настоящему счастливым?",
        ps: "",
        topics: "близким,любимым,разговор на всю ночь,философия",
        lvl: 75,
        depth: 95,
        closeness: 70,
        emotions: 50,
    },
    {
        text: "Если бы у тебя была карточка, которая избавляет от суда за преступление, что бы ты сделал?",
        ps: "",
        topics: "друзьям,разговор на всю ночь",
        lvl: 50,
        depth: 75,
        closeness: 30,
        emotions: 40,
    },
    {
        text: "Что ты больше всего любишь в себе?",
        ps: "",
        topics: "друзьям,близким,любимым,разговор на всю ночь",
        lvl: 70,
        depth: 85,
        closeness: 70,
        emotions: 50,
    },
    {
        text: "Что хуже, провалиться с треском или вообще ничего не делать?",
        ps: "",
        topics: "друзьям,разговор на всю ночь,философия",
        lvl: 35,
        depth: 65,
        closeness: 20,
        emotions: 30,
    },
    {
        text: "Какая книга или фильм оказали на тебя наибольшее влияние?",
        ps: "",
        topics: "друзьям,любимым,разговор на всю ночь",
        lvl: 60,
        depth: 75,
        closeness: 50,
        emotions: 40,
    },
    {
        text: "Если бы ты не знал, сколько тебе лет, сколько бы ты себе дал и почему?",
        ps: "",
        topics: "друзьям,разговор на всю ночь,философия",
        lvl: 45,
        depth: 75,
        closeness: 40,
        emotions: 30,
    },
    {
        text: "Опиши себя в пяти словах",
        ps: "",
        topics: "друзьям,разговор на всю ночь",
        lvl: 55,
        depth: 85,
        closeness: 60,
        emotions: 30,
    },
];

export default questions;