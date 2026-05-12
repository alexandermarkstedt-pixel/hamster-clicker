let score = 0;

let perClick = 1;
let perSecond = 0;

let clickUpgradeCost = 25;
let autoUpgradeCost = 50;

let multiplier = 1;

// ===== ELEMENTS =====
const scoreEl = document.getElementById("score");
const perClickEl = document.getElementById("perClick");
const perSecondEl = document.getElementById("perSecond");
const boostEl = document.getElementById("boost");

const hamster = document.getElementById("hamster");
const dropZone = document.getElementById("dropZone");

const clickBtn = document.getElementById("clickUpgradeBtn");
const autoBtn = document.getElementById("autoUpgradeBtn");

// ===== UI UPDATE =====
function updateUI() {
    scoreEl.innerText = Math.floor(score);
    perClickEl.innerText = perClick;
    perSecondEl.innerText = perSecond;

    clickBtn.innerHTML = "+1 per click<br>Cost: " + clickUpgradeCost;
    autoBtn.innerHTML = "+1 per second<br>Cost: " + autoUpgradeCost;

    boostEl.innerText = multiplier + "x";
}

// ===== CLICK =====
hamster.addEventListener("click", (e) => {
    const gain = perClick * multiplier;
    score += gain;

    const float = document.createElement("div");
    float.className = "floating-text";
    float.innerText = "+" + gain;
    float.style.left = e.offsetX + "px";
    float.style.top = e.offsetY + "px";

    dropZone.appendChild(float);
    setTimeout(() => float.remove(), 1000);

    updateUI();
});

// ===== UPGRADES (FIXED PROPERLY) =====
clickBtn.addEventListener("click", () => {
    if (score >= clickUpgradeCost) {
        score -= clickUpgradeCost;
        perClick += 1;
        clickUpgradeCost = Math.floor(clickUpgradeCost * 1.5);
        updateUI();
    }
});

autoBtn.addEventListener("click", () => {
    if (score >= autoUpgradeCost) {
        score -= autoUpgradeCost;
        perSecond += 1;
        autoUpgradeCost = Math.floor(autoUpgradeCost * 1.7);
        updateUI();
    }
});

// ===== AUTO INCOME =====
setInterval(() => {
    score += perSecond * multiplier;
    updateUI();
}, 1000);

// ===== GOLDEN SEED (2% per second) =====
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

    seed.style.left = Math.random() * 300 + "px";
    seed.style.top = "0px";

    dropZone.appendChild(seed);

    seed.onclick = () => activateBoost(seed);

    setTimeout(() => seed.remove(), 4000);
}

// ===== BOOST =====
function activateBoost(seed) {
    seed.remove();

    multiplier = 5;
    updateUI();

    setTimeout(() => {
        multiplier = 1;
        updateUI();
    }, 30000);
}

// ===== START =====
updateUI();
