// ===== GAME STATE =====
let score = 0;
let perClick = 1;
let perSecond = 0;

let multiplier = 1;
let boostActive = false;

// ===== ELEMENTS =====
const scoreEl = document.getElementById("score");
const perClickEl = document.getElementById("perClick");
const perSecondEl = document.getElementById("perSecond");
const boostEl = document.getElementById("boost");

const hamster = document.getElementById("hamster");
const dropZone = document.getElementById("dropZone");

// ===== CLICK HAMSTER =====
hamster.addEventListener("click", (e) => {
    const gain = perClick * multiplier;
    score += gain;

    // floating number
    const float = document.createElement("div");
    float.className = "floating-text";
    float.innerText = "+" + gain;
    float.style.left = e.offsetX + "px";
    float.style.top = e.offsetY + "px";

    dropZone.appendChild(float);
    setTimeout(() => float.remove(), 1000);

    updateUI();
});

// ===== AUTO INCOME LOOP =====
setInterval(() => {
    score += perSecond * multiplier;
    updateUI();
}, 1000);

// ===== GOLDEN SEED SPAWN (2% every second) =====
setInterval(() => {
    if (Math.random() < 0.02) {
        spawnGoldenSeed();
    }
}, 1000);

// ===== SPAWN GOLDEN SEED =====
function spawnGoldenSeed() {
    const seed = document.createElement("img");
    seed.src = "golden_seed.png";
    seed.className = "golden-seed";

    seed.style.left = Math.random() * 250 + "px";
    seed.style.top = "0px";

    dropZone.appendChild(seed);

    seed.onclick = () => activateBoost(seed);

    // auto remove if not clicked
    setTimeout(() => seed.remove(), 4000);
}

// ===== BOOST SYSTEM =====
function activateBoost(seed) {
    seed.remove();

    multiplier = 5;
    boostActive = true;
    boostEl.innerText = "5x";

    setTimeout(() => {
        multiplier = 1;
        boostActive = false;
        boostEl.innerText = "1x";
    }, 30000);
}

// ===== UI UPDATE =====
function updateUI() {
    scoreEl.innerText = Math.floor(score);
    perClickEl.innerText = perClick;
    perSecondEl.innerText = perSecond;
}

// first render
updateUI();
