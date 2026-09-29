// ============================================================
// ENTRETENI2
// SCRIPT COMPLETO
// ============================================================


// ============================================================
// ESTADO
// ============================================================

let players = [];
let playerCount = 2;

let selectedGame = null;
let selectedMode = "normal";

let currentPlayer = 0;
let round = 0;

let used = [];

let scores = {};


// ============================================================
// DATOS
// ============================================================

const conversationQuestions = [

    {
        title: "Vida en el espacio",
        category: "Ciencia",
        question: "¿Crees que existe vida fuera de la Tierra?"
    },

    {
        title: "Una regla nueva",
        category: "Ideas",
        question: "Si pudieras crear una regla que todos tuvieran que seguir durante un día, ¿cuál sería?"
    },

    {
        title: "El futuro",
        category: "Futuro",
        question: "¿Qué invento crees que podría cambiar muchísimo nuestra vida?"
    },

    {
        title: "Dentro de diez años",
        category: "Futuro",
        question: "¿Cómo crees que será la vida de ustedes dentro de diez años?"
    },

    {
        title: "Una gran cantidad de dinero",
        category: "Dinero",
        question: "¿Qué harías si de repente recibieras una cantidad enorme de dinero?"
    },

    {
        title: "Un misterio",
        category: "Misterios",
        question: "¿Qué misterio del mundo te gustaría poder resolver?"
    },

    {
        title: "El negocio del grupo",
        category: "Ideas",
        question: "Si tuvieran que abrir un negocio entre todos, ¿qué negocio sería?"
    },

    {
        title: "Viaje",
        category: "General",
        question: "Si pudieran viajar juntos a cualquier lugar, ¿a dónde irían?"
    },

    {
        title: "Un día perfecto",
        category: "General",
        question: "¿Cómo sería un día perfecto para ti?"
    },

    {
        title: "Tecnología",
        category: "Ciencia",
        question: "¿Qué tecnología te gustaría que existiera actualmente?"
    },

    {
        title: "Sin preocupaciones",
        category: "Dinero",
        question: "¿Qué cambiarías de tu vida si durante un año no tuvieras que preocuparte por dinero?"
    }

];


const whatIfQuestions = [

    "¿Qué harías si mañana descubres que tu mejor amigo contó un secreto tuyo?",

    "¿Qué harías si llegas a una fiesta y accidentalmente escuchas que están hablando de ti?",

    "¿Qué harías si encuentras una cartera con mucho dinero y no hay nadie cerca?",

    "¿Qué harías si mandas un mensaje a la persona equivocada?",

    "¿Qué harías si todos tus amigos empiezan a creer una mentira sobre ti?",

    "¿Qué harías si mañana tuvieras que mudarte a otra ciudad?",

    "¿Qué harías si alguien que no conoces te reconoce y sabe tu nombre?",

    "¿Qué harías si descubres que uno de tus amigos te está ocultando algo importante?",

    "¿Qué harías si tienes que pasar un día entero sin teléfono?",

    "¿Qué harías si tu mejor amigo te pide ayuda para resolver un problema complicado?",

    "¿Qué harías si descubres que alguien te está imitando?",

    "¿Qué harías si durante una reunión todos se quedan en silencio después de que dices algo?"

];


const spicyGeneralQuestions = [

    "¿Qué secreto pequeño te costaría admitir frente al grupo?",

    "¿Qué situación te pone más nervioso cuando hay mucha gente?",

    "¿Qué cosa te da pena admitir aunque realmente no sea tan grave?",

    "¿Qué tipo de persona te cae bien rápidamente?",

    "¿Qué cosa hace que pierdas el interés en conocer mejor a alguien?",

    "¿Qué indirecta te cuesta más entender?",

    "¿Qué situación te daría más vergüenza vivir frente a tus amigos?",

    "¿Qué haces cuando alguien te cae muy bien pero no quieres que se note?",

    "¿Qué te hace desconfiar de una persona?",

    "¿Qué opinión tuya suele sorprender a los demás?"

];


const spicyRomanticQuestions = [

    "¿Qué te hace sospechar que alguien está interesado en ti?",

    "¿Qué te da más celos aunque no quieras admitirlo?",

    "¿Qué situación te pondría más nervioso frente a alguien que te gusta?",

    "¿Qué es lo primero que notas cuando alguien empieza a gustarte?",

    "¿Alguna vez has fingido que alguien no te interesa cuando sí te interesaba?",

    "¿Qué tipo de indirecta te haría pensar que alguien está interesado en ti?",

    "¿Qué te costaría más admitir frente al grupo: que te gusta alguien o que estás celoso?",

    "¿Qué actitud hace que alguien te parezca más interesante?"

];


const whoToQuestions = [

    "¿A quién le regalarías algo que sabes que le encanta?",

    "¿A quién escogerías para hacer un viaje largo?",

    "¿A quién piensas que se le ocurriría la mejor solución si todos tuvieran un problema?",

    "¿A quién elegirías para hacer un negocio?",

    "¿A quién confiarías un secreto importante?",

    "¿A quién escogerías para ayudarte si tuvieras que resolver un problema?",

    "¿A quién llevarías contigo si tuvieras que pasar un día entero fuera?",

    "¿A quién pedirías consejo si no supieras qué decisión tomar?",

    "¿A quién elegirías para representar al grupo?"

];


const contextPhrases = [

    "No pensé que fueras a llegar.",

    "No fue por celos.",

    "Prométeme que esto queda entre nosotros.",

    "Tenemos que hablar.",

    "Yo nunca dije eso.",

    "No era lo que parecía.",

    "¿Y tú qué haces aquí?",

    "Te juro que puedo explicarlo.",

    "Eso no estaba ahí antes.",

    "Creo que alguien nos está escuchando.",

    "No le digas a nadie.",

    "Fue completamente accidental.",

    "Tenemos un problema.",

    "¿Por qué sabes eso?",

    "No esperaba verte aquí.",

    "¿Quién te contó?"

];


const opinionQuestions = [

    "¿Está bien dejar de hablarle a alguien después de que rompe tu confianza?",

    "¿Es mejor decir siempre la verdad aunque pueda causar un problema?",

    "¿Deberías darle una segunda oportunidad a alguien que te falló?",

    "¿Es posible ser amigo de alguien con quien antes tuviste un problema?",

    "¿Es mejor trabajar solo o trabajar en equipo?",

    "¿Deberías perdonar a alguien que nunca pidió perdón?",

    "¿Vale la pena arriesgarse por una oportunidad importante?",

    "¿Es mejor tener muchos amigos o pocos amigos de confianza?",

    "¿Deberías decirle a un amigo cuando está tomando una mala decisión?"

];


const orderQuestions = [

    "¿Con quién te irías de viaje?",

    "¿Quién crees que te conoce mejor?",

    "¿Con quién te sentirías más cómodo contando un secreto?",

    "¿A quién elegirías para hacer un negocio?",

    "¿Quién crees que te defendería si tuvieras un problema?",

    "¿A quién elegirías para ayudarte a resolver un problema complicado?",

    "¿Quién sería mejor líder en una situación difícil?",

    "¿Quién sería el último en abandonar al grupo si todos tuvieran un problema?",

    "¿Quién crees que tendría más posibilidades de organizar una fiesta?"

];


const guessNormalQuestions = [

    "¿Qué cosa te hace desconfiar rápidamente de alguien?",

    "¿Qué situación te pondría más nervioso frente a mucha gente?",

    "¿Qué te hace pensar que una persona realmente es tu amiga?",

    "¿Qué secreto pequeño te costaría admitir frente al grupo?",

    "¿Qué es algo que nunca perdonarías fácilmente?",

    "¿Qué cosa te hace cambiar de opinión sobre una persona?",

    "¿Qué te gustaría que los demás entendieran mejor de ti?",

    "¿Qué característica valoras más en una amistad?",

    "¿Qué tipo de persona te cae bien desde el primer momento?"

];


const guessRomanticQuestions = [

    "¿Qué te hace sospechar que alguien está interesado en ti?",

    "¿Qué te da más celos aunque no quieras admitirlo?",

    "¿Qué situación te pondría más nervioso frente a alguien que te gusta?",

    "¿Qué es lo primero que notas cuando alguien empieza a gustarte?",

    "¿Alguna vez has fingido que alguien no te interesa cuando sí te interesaba?",

    "¿Qué tipo de indirecta te haría pensar que alguien está interesado en ti?"

];


const believeNormalQuestions = [

    "¿Creerías si te dijeran que {target} sería capaz de abandonar todo para empezar de cero en otra ciudad?",

    "¿Creerías si te dijeran que {target} podría guardar un secreto durante años?",

    "¿Creerías si te dijeran que {target} podría convertirse en una persona muy famosa?",

    "¿Creerías si te dijeran que {target} aceptaría una aventura completamente inesperada?",

    "¿Creerías si te dijeran que {target} sería el primero en ayudar a alguien con un problema?",

    "¿Creerías si te dijeran que {target} podría vivir un mes sin redes sociales?"

];


const believeRomanticQuestions = [

    "¿Creerías si te dijeran que {target} podría enamorarse de alguien que inicialmente no le caía bien?",

    "¿Creerías si te dijeran que {target} podría ponerse celoso sin admitirlo?"

];


// ============================================================
// UTILIDADES
// ============================================================

function $(id) {
    return document.getElementById(id);
}


function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const target = $(id);

    if (target) {
        target.classList.add("active");
    }
}


function randomItem(array) {

    if (!array || array.length === 0) {
        return null;
    }

    return array[Math.floor(Math.random() * array.length)];
}


function randomIndex(array) {

    if (!array || array.length === 0) {
        return -1;
    }

    return Math.floor(Math.random() * array.length);
}


function shuffle(array) {

    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}


function escapeHTML(text) {

    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function playerName(index) {

    if (!players[index]) {
        return "Jugador";
    }

    return players[index].name;
}


function nextPlayer() {

    currentPlayer++;

    if (currentPlayer >= players.length) {
        currentPlayer = 0;
        round++;
    }
}


function getUnused(array) {

    let available = array.filter(item => !used.includes(item));

    if (available.length === 0) {

        used = [];

        available = [...array];
    }

    const item = randomItem(available);

    used.push(item);

    return item;
}


// ============================================================
// GÉNERO
// ============================================================

function hasMixedGenders() {

    let male = false;
    let female = false;

    players.forEach(player => {

        if (player.gender === "male") {
            male = true;
        }

        if (player.gender === "female") {
            female = true;
        }

    });

    return male && female;
}


function hasOppositeGender(index) {

    if (!players[index]) {
        return false;
    }

    const gender = players[index].gender;

    if (gender !== "male" && gender !== "female") {
        return false;
    }

    return players.some((player, i) => {

        if (i === index) {
            return false;
        }

        return (
            (gender === "male" && player.gender === "female") ||
            (gender === "female" && player.gender === "male")
        );

    });
}


// ============================================================
// INICIO
// ============================================================

function goPlayers() {

    showScreen("playersScreen");

    updatePlayerCounter();
}


function changePlayers(amount) {

    playerCount += amount;

    if (playerCount < 1) {
        playerCount = 1;
    }

    if (playerCount > 10) {
        playerCount = 10;
    }

    updatePlayerCounter();
}


function updatePlayerCounter() {

    $("playerCount").textContent = playerCount;
}


// ============================================================
// FORMULARIO DE JUGADORES
// ============================================================

function createPlayerForm() {

    const container = $("playersForm");

    if (!container) {
        console.error("No existe playersForm");
        return;
    }

    let html = "";

    for (let i = 0; i < playerCount; i++) {

        html += `

            <div class="player-form">

                <h3>Jugador ${i + 1}</h3>

                <input
                    type="text"
                    id="name${i}"
                    maxlength="20"
                    placeholder="Nombre del jugador ${i + 1}"
                >

                <div class="gender-buttons">

                    <button
                        type="button"
                        class="gender-btn"
                        id="male${i}"
                        onclick="setGender(${i}, 'male')"
                    >
                        👨 Hombre
                    </button>

                    <button
                        type="button"
                        class="gender-btn"
                        id="female${i}"
                        onclick="setGender(${i}, 'female')"
                    >
                        👩 Mujer
                    </button>

                    <button
                        type="button"
                        class="gender-btn selected"
                        id="none${i}"
                        onclick="setGender(${i}, 'none')"
                    >
                        ⚪ Prefiero no decirlo
                    </button>

                </div>

                <input
                    type="hidden"
                    id="gender${i}"
                    value="none"
                >

            </div>

        `;
    }

    container.innerHTML = html;

    showScreen("namesScreen");
}


function setGender(index, gender) {

    const hidden = $(`gender${index}`);

    if (hidden) {
        hidden.value = gender;
    }

    [
        $(`male${index}`),
        $(`female${index}`),
        $(`none${index}`)
    ].forEach(button => {

        if (button) {
            button.classList.remove("selected");
        }

    });

    if (gender === "male") {
        $(`male${index}`).classList.add("selected");
    }

    if (gender === "female") {
        $(`female${index}`).classList.add("selected");
    }

    if (gender === "none") {
        $(`none${index}`).classList.add("selected");
    }
}


function savePlayers() {

    players = [];

    for (let i = 0; i < playerCount; i++) {

        let name = $(`name${i}`).value.trim();

        if (!name) {
            name = `Jugador ${i + 1}`;
        }

        players.push({

            name: name,

            gender: $(`gender${i}`).value || "none"

        });

    }

    scores = {};

    players.forEach(player => {
        scores[player.name] = 0;
    });

    showScreen("gameTypeScreen");
}


// ============================================================
// SELECCIÓN DEL JUEGO
// ============================================================

function selectGameType(game) {

    selectedGame = game;

    if (game === "continue") {

        selectedMode = "normal";

        startSelectedGame();

        return;
    }

    showScreen("modeScreen");
}


function selectMode(mode) {

    selectedMode = mode;

    document.querySelectorAll(".mode-card").forEach(card => {
        card.classList.remove("selected");
    });

    event.currentTarget.classList.add("selected");
}


function startSelectedGame() {

    if (!selectedGame) {
        alert("Selecciona un juego.");
        return;
    }

    used = [];

    currentPlayer = 0;

    round = 0;

    if (selectedGame === "conversation") {
        startConversation();
        return;
    }

    if (selectedGame === "whatif") {
        startWhatIf();
        return;
    }

    if (selectedGame === "spicy") {
        startSpicy();
        return;
    }

    if (selectedGame === "whoto") {
        startWhoTo();
        return;
    }

    if (selectedGame === "context") {
        startContext();
        return;
    }

    if (selectedGame === "opinion") {
        startOpinion();
        return;
    }

    if (selectedGame === "order") {
        startOrder();
        return;
    }

    if (selectedGame === "guess") {
        startGuess();
        return;
    }

    if (selectedGame === "believe") {
        startBelieve();
        return;
    }

    if (selectedGame === "continue") {
        startContinue();
        return;
    }
}


// ============================================================
// JUEGO GENERAL
// ============================================================

function setupGame(badge, playerText, category, question, buttonText, action) {

    showScreen("gameScreen");

    $("gameBadge").textContent = badge;

    $("gameCounter").textContent = `Ronda ${round + 1}`;

    $("gamePlayer").textContent = playerText;

    $("gameCategory").textContent = category;

    $("gameQuestion").textContent = question;

    $("gameExtra").innerHTML = "";

    const button = $("gameMainButton");

    button.textContent = buttonText;

    button.onclick = action;
}


// ============================================================
// TEMAS
// ============================================================

function startConversation() {

    const item = getUnused(conversationQuestions);

    setupGame(
        "🗣️ CONVERSACIÓN",
        playerName(currentPlayer),
        item.category,
        item.question,
        "SIGUIENTE →",
        nextGeneralGame
    );

    $("gameCategory").textContent = item.title;
}


// ============================================================
// QUÉ HARÍAS SI
// ============================================================

function startWhatIf() {

    const question = getUnused(whatIfQuestions);

    setupGame(
        "🎭 ¿QUÉ HARÍAS SI...?",
        playerName(currentPlayer),
        "Situación",
        question,
        "SIGUIENTE →",
        nextGeneralGame
    );
}


// ============================================================
// PICANTE
// ============================================================

function startSpicy() {

    let pool = [...spicyGeneralQuestions];

    if (hasMixedGenders()) {
        pool.push(...spicyRomanticQuestions);
    }

    const question = getUnused(pool);

    setupGame(
        "🌶️ PICANTE",
        playerName(currentPlayer),
        "Pregunta personal",
        question,
        "SIGUIENTE →",
        nextGeneralGame
    );
}


function nextGeneralGame() {

    nextPlayer();

    startSelectedGame();
}


// ============================================================
// SIN CONTEXTO
// ============================================================

function startContext() {

    const phrase = getUnused(contextPhrases);

    setupGame(
        "🕵️ SIN CONTEXTO",
        playerName(currentPlayer),
        "Frase",
        `"${phrase}"`,
        "SIGUIENTE →",
        nextGeneralGame
    );

    $("gameExtra").innerHTML = `
        <p class="instruction">
            ¿En qué situación dirías esto?
        </p>
    `;
}


// ============================================================
// ¿A QUIÉN?
// ============================================================

let whoToPlayer = 0;


function startWhoTo() {

    whoToPlayer = randomIndex(players);

    used = [];

    renderWhoTo();
}


function renderWhoTo() {

    showScreen("whoToScreen");

    const question = getUnused(whoToQuestions);

    $("whoToPlayer").textContent = playerName(whoToPlayer);

    $("whoToQuestion").textContent = question;

    $("whoToResult").innerHTML = "";

    const choices = $("whoToChoices");

    choices.innerHTML = "";

    players.forEach((player, index) => {

        if (index === whoToPlayer) {
            return;
        }

        const button = document.createElement("button");

        button.className = "person-choice";

        button.textContent = player.name;

        button.onclick = () => chooseWhoTo(index);

        choices.appendChild(button);

    });

    $("whoToNext").classList.add("hidden");
}


function chooseWhoTo(index) {

    $("whoToResult").innerHTML = `
        <strong>${escapeHTML(playerName(whoToPlayer))}</strong>
        eligió a
        <strong>${escapeHTML(playerName(index))}</strong>.
    `;

    $("whoToNext").classList.remove("hidden");

    $("whoToNext").onclick = () => {

        whoToPlayer++;

        if (whoToPlayer >= players.length) {
            whoToPlayer = 0;
        }

        renderWhoTo();

    };
}


// ============================================================
// CONTINÚA
// ============================================================

let continuePlayer = 0;

const continueQuestions = [

    "¿Qué es algo que siempre has querido aprender?",

    "¿Cuál ha sido una de las decisiones más difíciles que has tomado?",

    "¿Qué lugar te gustaría conocer?",

    "¿Qué cosa te gustaría cambiar de tu rutina?",

    "¿Qué recuerdo te hace reír cuando lo recuerdas?",

    "¿Qué harías si tuvieras un día completamente libre?"

];


function startContinue() {

    continuePlayer = 0;

    used = [];

    renderContinue();
}


function renderContinue() {

    showScreen("continueScreen");

    $("continuePlayer").textContent = playerName(continuePlayer);

    $("continueQuestion").textContent =
        getUnused(continueQuestions);

    $("continueAnswer").value = "";
}


function continueNext() {

    const answer = $("continueAnswer").value.trim();

    if (!answer) {

        alert("Primero responde la pregunta.");

        return;
    }

    continuePlayer++;

    if (continuePlayer >= players.length) {
        continuePlayer = 0;
    }

    renderContinue();
}


// ============================================================
// CAMBIA DE OPINIÓN
// ============================================================

let opinionMain = 0;
let opinionYes = null;
let opinionNo = null;
let opinionOriginal = null;
let opinionRound = 0;


function startOpinion() {

    if (players.length < 3) {

        alert("Cambia de opinión necesita mínimo 3 jugadores.");

        showScreen("gameTypeScreen");

        return;
    }

    opinionMain = 0;

    opinionRound = 0;

    used = [];

    renderOpinion();
}


function renderOpinion() {

    showScreen("opinionScreen");

    const question = getUnused(opinionQuestions);

    $("opinionPlayer").textContent = playerName(opinionMain);

    $("opinionQuestion").textContent = question;

    $("opinionArea").innerHTML = `

        <p class="instruction">
            Primero responde SÍ o NO.
        </p>

        <div class="two-buttons">

            <button
                class="choice yes"
                onclick="opinionChoose('SI')"
            >
                SÍ
            </button>

            <button
                class="choice no"
                onclick="opinionChoose('NO')"
            >
                NO
            </button>

        </div>
    `;
}


function opinionChoose(answer) {

    opinionOriginal = answer;

    const others = players
        .map((_, index) => index)
        .filter(index => index !== opinionMain);

    const shuffled = shuffle(others);

    opinionYes = shuffled[0];

    opinionNo = shuffled[1];

    $("opinionArea").innerHTML = `

        <div class="result-box">

            <strong>
                ${escapeHTML(playerName(opinionYes))}
            </strong>

            debe intentar convencerte de decir SÍ.

            <br><br>

            <strong>
                ${escapeHTML(playerName(opinionNo))}
            </strong>

            debe intentar convencerte de decir NO.

        </div>

        <button
            class="btn primary"
            onclick="opinionFinal()"
        >
            YA ARGUMENTARON →
        </button>
    `;
}


function opinionFinal() {

    $("opinionArea").innerHTML = `

        <p class="instruction">
            Después de escuchar los argumentos, ¿cuál es tu respuesta final?
        </p>

        <div class="two-buttons">

            <button
                class="choice yes"
                onclick="finishOpinion('SI')"
            >
                SÍ
            </button>

            <button
                class="choice no"
                onclick="finishOpinion('NO')"
            >
                NO
            </button>

        </div>
    `;
}


function finishOpinion(finalAnswer) {

    if (finalAnswer !== opinionOriginal) {

        if (finalAnswer === "SI") {
            scores[playerName(opinionYes)] += 2;
        } else {
            scores[playerName(opinionNo)] += 2;
        }

    } else {

        if (finalAnswer === "SI") {
            scores[playerName(opinionYes)] += 1;
        } else {
            scores[playerName(opinionNo)] += 1;
        }
    }

    scores[playerName(opinionMain)] += 1;

    opinionRound++;

    if (opinionRound >= players.length) {

        showFinalScores();

        return;
    }

    opinionMain++;

    if (opinionMain >= players.length) {
        opinionMain = 0;
    }

    renderOpinion();
}


// ============================================================
// ORDÉNENSE
// ============================================================

let orderMain = 0;
let orderList = [];
let orderUsed = [];


function startOrder() {

    if (players.length < 2) {

        alert("Este modo necesita mínimo 2 jugadores.");

        showScreen("gameTypeScreen");

        return;
    }

    orderMain = randomIndex(players);

    orderUsed = [];

    renderOrder();
}


function renderOrder() {

    showScreen("orderScreen");

    let available = orderQuestions.filter(
        question => !orderUsed.includes(question)
    );

    if (available.length === 0) {
        orderUsed = [];
        available = [...orderQuestions];
    }

    const question = randomItem(available);

    orderUsed.push(question);

    $("orderPlayer").textContent = playerName(orderMain);

    $("orderQuestion").textContent = question;

    orderList = players
        .map((player, index) => ({
            index,
            name: player.name
        }))
        .filter(player => player.index !== orderMain);

    orderList = shuffle(orderList);

    renderOrderList();
}


function renderOrderList() {

    const container = $("orderList");

    container.innerHTML = "";

    orderList.forEach((player, position) => {

        const row = document.createElement("div");

        row.className = "order-item";

        row.innerHTML = `

            <span class="order-item-name">
                ${position + 1}. ${escapeHTML(player.name)}
            </span>

            <div class="order-controls">

                <button
                    ${position === 0 ? "disabled" : ""}
                    onclick="moveOrder(${position}, -1)"
                >
                    ↑
                </button>

                <button
                    ${position === orderList.length - 1 ? "disabled" : ""}
                    onclick="moveOrder(${position}, 1)"
                >
                    ↓
                </button>

            </div>
        `;

        container.appendChild(row);
    });
}


function moveOrder(position, direction) {

    const newPosition = position + direction;

    if (
        newPosition < 0 ||
        newPosition >= orderList.length
    ) {
        return;
    }

    [
        orderList[position],
        orderList[newPosition]
    ] = [
        orderList[newPosition],
        orderList[position]
    ];

    renderOrderList();
}


function finishOrder() {

    orderMain++;

    if (orderMain >= players.length) {
        orderMain = 0;
    }

    renderOrder();
}


// ============================================================
// ADIVINA AL JUGADOR
// ============================================================

let guessQuestion = "";
let guessAnswers = {};
let guessAnsweringPlayer = 0;
let guessOwner = null;
let guessStage = "answers";


function startGuess() {

    guessAnswers = {};

    guessAnsweringPlayer = 0;

    guessOwner = null;

    guessStage = "answers";

    let pool = [...guessNormalQuestions];

    if (hasMixedGenders()) {
        pool.push(...guessRomanticQuestions);
    }

    const available = pool.filter(
        question => !used.includes(question)
    );

    if (available.length === 0) {
        used = [];
    }

    guessQuestion = getUnused(pool);

    renderGuessAnswer();
}


function renderGuessAnswer() {

    showScreen("guessScreen");

    $("guessQuestion").textContent = guessQuestion;

    $("guessProgress").textContent =
        `Jugador ${guessAnsweringPlayer + 1} / ${players.length}`;

    $("guessCurrentPlayer").textContent =
        `${playerName(guessAnsweringPlayer)}, responde`;

    $("guessInput").style.display = "block";

    $("guessInput").value = "";

    $("guessHiddenAnswer").innerHTML = "";

    $("guessChoices").innerHTML = "";

    $("guessButton").textContent = "GUARDAR";

    $("guessButton").onclick = submitGuessAnswer;
}


function submitGuessAnswer() {

    const answer = $("guessInput").value.trim();

    if (!answer) {

        alert("Escribe una respuesta.");

        return;
    }

    guessAnswers[guessAnsweringPlayer] = answer;

    guessAnsweringPlayer++;

    if (guessAnsweringPlayer < players.length) {

        renderGuessAnswer();

        return;
    }

    renderGuessMystery();
}


function renderGuessMystery() {

    guessStage = "guess";

    showScreen("guessScreen");

    const owners = Object.keys(guessAnswers);

    guessOwner = Number(randomItem(owners));

    $("guessProgress").textContent =
        "¿ADIVINA QUIÉN?";

    $("guessQuestion").textContent =
        "¿ADIVINA QUIÉN RESPONDIÓ ESTO?";

    $("guessCurrentPlayer").textContent = "";

    $("guessInput").style.display = "none";

    $("guessHiddenAnswer").textContent =
        `"${guessAnswers[guessOwner]}"`;

    const choices = $("guessChoices");

    choices.innerHTML = "";

    players.forEach((player, index) => {

        const button = document.createElement("button");

        button.className = "person-choice";

        button.textContent = player.name;

        button.onclick = () => chooseGuess(index);

        choices.appendChild(button);

    });

    $("guessButton").textContent = "REVELAR";

    $("guessButton").onclick = revealGuess;
}


function chooseGuess(index) {

    document.querySelectorAll("#guessChoices button").forEach(button => {

        button.style.borderColor = "";

    });

    const buttons =
        document.querySelectorAll("#guessChoices button");

    if (buttons[index]) {
        buttons[index].style.borderColor = "#a78bfa";
    }

    $("guessButton").dataset.guess = index;
}


function revealGuess() {

    const selected =
        $("guessButton").dataset.guess;

    if (selected === undefined) {

        alert("Primero elige quién crees que respondió.");

        return;
    }

    const selectedIndex = Number(selected);

    if (selectedIndex === guessOwner) {

        scores[playerName(selectedIndex)] += 1;

        $("guessHiddenAnswer").innerHTML +=
            `<br><br>✅ ¡Correcto!`;

    } else {

        $("guessHiddenAnswer").innerHTML +=
            `<br><br>❌ Era ${escapeHTML(playerName(guessOwner))}.`;

    }

    $("guessButton").textContent = "SIGUIENTE";

    $("guessButton").onclick = () => {

        startGuess();

    };
}


// ============================================================
// ¿CREERÍAS SI...?
// ============================================================

let believeTarget = 0;
let believeAnswerer = 0;
let believeQuestion = "";


function startBelieve() {

    if (players.length < 2) {

        alert("Este modo necesita mínimo 2 jugadores.");

        showScreen("gameTypeScreen");

        return;
    }

    believeTarget = randomIndex(players);

    renderBelieve();
}


function renderBelieve() {

    showScreen("believeScreen");

    const normalPool = believeNormalQuestions;

    let pool = [...normalPool];

    if (hasOppositeGender(believeTarget)) {
        pool.push(...believeRomanticQuestions);
    }

    const available = pool.filter(
        question => !used.includes(question)
    );

    if (available.length === 0) {
        used = [];
    }

    const template = getUnused(pool);

    believeQuestion =
        template.replace(
            "{target}",
            playerName(believeTarget)
        );

    const possibleAnswerers = players
        .map((_, index) => index)
        .filter(index => index !== believeTarget);

    believeAnswerer = randomItem(possibleAnswerers);

    $("believeTarget").textContent =
        playerName(believeTarget);

    $("believeQuestion").textContent =
        believeQuestion;

    $("believeAnswerer").textContent =
        playerName(believeAnswerer);

    $("believeButtons").innerHTML = `

        <button
            class="choice yes"
            onclick="answerBelieve(true)"
        >
            ✅ SÍ
        </button>

        <button
            class="choice no"
            onclick="answerBelieve(false)"
        >
            ❌ NO
        </button>
    `;

    $("believeResult").innerHTML = "";
}


function answerBelieve(answer) {

    $("believeResult").innerHTML = `

        <strong>
            ${escapeHTML(playerName(believeAnswerer))}
        </strong>

        respondió

        <strong>
            ${answer ? "SÍ" : "NO"}
        </strong>.
    `;

    $("believeButtons").innerHTML = `

        <button
            class="btn primary"
            onclick="nextBelieve()"
        >
            SIGUIENTE →
        </button>
    `;
}


function nextBelieve() {

    believeTarget++;

    if (believeTarget >= players.length) {
        believeTarget = 0;
    }

    renderBelieve();
}


// ============================================================
// PUNTOS / FINAL
// ============================================================

function showFinalScores() {

    showScreen("finalScreen");

    const ranking = [...players].sort(
        (a,b) => scores[b.name] - scores[a.name]
    );

    let html = `
        <div class="final-title">
            📊 Puntos finales
        </div>
    `;

    ranking.forEach((player, index) => {

        html += `

            <div class="final-row">

                <span>
                    ${index === 0 ? "🏆 " : ""}
                    ${escapeHTML(player.name)}
                </span>

                <strong>
                    ${scores[player.name] || 0} puntos
                </strong>

            </div>

        `;

    });

    $("finalContent").innerHTML = html;
}


// ============================================================
// REINICIAR
// ============================================================

function restartGame() {

    selectedGame = null;

    selectedMode = "normal";

    currentPlayer = 0;

    round = 0;

    used = [];

    scores = {};

    players = [];

    showScreen("startScreen");
}


// ============================================================
// REGLAS
// ============================================================

function showRules() {

    $("rulesModal").classList.add("active");
}


function closeRules() {

    $("rulesModal").classList.remove("active");
}


// ============================================================
// INICIO
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    showScreen("startScreen");

});
