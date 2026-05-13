// ===== GAME STATE =====
let score = 0;
let perClick = 1;
let perSecond = 0;

let clickUpgradeCost = 25;
let autoUpgradeCost = 50;
let megaUpgradeCost = 500;

let boostMultiplier = 1;

// ===== PRESTIGE STATE =====
let prestigeLevel = 0;
let prestigeMultiplier = 1;
const PRESTIGE_THRESHOLD = 10000;

// ===== ELEMENTS =====
const scoreEl = document.getElementById("score");
const perClickEl = document.getElementById("perClick");
const perSecondEl = document.getElementById("perSecond");
const boostEl = document.getElementById("boost");

const hamster = document.getElementById("hamster");
const dropZone = document.getElementById("dropZone");

const clickBtn = document.getElementById("clickUpgradeBtn");
const autoBtn = document.getElementById("autoUpgradeBtn");
const megaBtn = document.getElementById("megaUpgradeBtn");

const prestigeBtn = document.getElementById("prestigeBtn");
const prestigeInfo = document.getElementById("prestigeInfo");
const prestigeLevelEl = document.getElementById("prestigeLevel");
const prestigeBonusEl = document.getElementById("prestigeBonus");

// ===== BOOST TIMER TEXT =====
const boostTimer = document.createElement("div");
boostTimer.style.position = "absolute";
boostTimer.style.top = "10px";
boostTimer.style.left = "50%";
boostTimer.style.transform = "translateX(-50%)";
boostTimer.style.fontSize = "28px";
boostTimer.style.fontWeight = "bold";
boostTimer.style.color = "gold";
boostTimer.style.textShadow = "2px 2px 5px black";
boostTimer.style.zIndex = "2000";
boostTimer.innerText = "";
document.body.appendChild(boostTimer);

// ===== UI UPDATE =====
function updateUI() {
    scoreEl.innerText = Math.floor(score).toLocaleString();
    perClickEl.innerText = perClick;
    perSecondEl.innerText = perSecond;

    clickBtn.innerHTML = "+1 per click<br>Cost: " + clickUpgradeCost.toLocaleString();
    autoBtn.innerHTML = "+1 per second<br>Cost: " + autoUpgradeCost.toLocaleString();
    megaBtn.innerHTML = "+10 per click<br>Cost: " + megaUpgradeCost.toLocaleString();

    boostEl.innerText = (boostMultiplier * prestigeMultiplier).toFixed(1) + "x";

    if (score >= PRESTIGE_THRESHOLD) {
        prestigeBtn.style.display = "block";
    } else {
        prestigeBtn.style.display = "none";
    }

    if (prestigeLevel > 0) {
        prestigeInfo.style.display = "block";
        prestigeLevelEl.innerText = prestigeLevel;
        prestigeBonusEl.innerText = prestigeMultiplier.toFixed(1) + "x";
    }
}

// ===== PREVENT DRAG =====
hamster.addEventListener("dragstart", (e) => {
    e.preventDefault();
});

// ===== CLICK =====
hamster.addEventListener("click", (e) => {
    const gain = perClick * boostMultiplier * prestigeMultiplier;
    score += gain;

    const float = document.createElement("div");
    float.className = "floating-text";
    float.innerText = "+" + Math.floor(gain);
    float.style.left = e.offsetX + "px";
    float.style.top = e.offsetY + "px";

    dropZone.appendChild(float);
    setTimeout(() => float.remove(), 1000);

    updateUI();
});

// ===== UPGRADES =====
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

megaBtn.addEventListener("click", () => {
    if (score >= megaUpgradeCost) {
        score -= megaUpgradeCost;
        perClick += 10;
        megaUpgradeCost = Math.floor(megaUpgradeCost * 2);
        updateUI();
    }
});

// ===== PRESTIGE =====
prestigeBtn.addEventListener("click", () => {
    if (score < PRESTIGE_THRESHOLD) return;

    prestigeLevel += 1;
    prestigeMultiplier = 1 + (prestigeLevel * 0.5);

    score = 0;
    perClick = 1;
    perSecond = 0;
    clickUpgradeCost = 25;
    autoUpgradeCost = 50;
    megaUpgradeCost = 500;
    boostMultiplier = 1;
    boostTimer.innerText = "";

    hamster.style.filter = "brightness(3)";
    setTimeout(() => { hamster.style.filter = "brightness(1)"; }, 400);

    updateUI();
    saveGame();
});

// ===== AUTO INCOME =====
setInterval(() => {
    score += perSecond * boostMultiplier * prestigeMultiplier;
    updateUI();
}, 1000);

// ===== GOLDEN SEED (2% chance per second) =====
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
    seed.style.width = "120px";
    seed.style.left = Math.random() * 300 + "px";
    seed.style.top = "-100px";
    seed.style.position = "absolute";
    seed.style.transition = "top 6s linear";
    seed.style.zIndex = "999";

    dropZone.appendChild(seed);

    setTimeout(() => { seed.style.top = "500px"; }, 50);

    seed.addEventListener("click", (e) => {
        e.stopPropagation();
        activateBoost(seed);
    });

    setTimeout(() => { seed.remove(); }, 6500);
}

// ===== BOOST =====
function activateBoost(seed) {
    seed.remove();
    boostMultiplier = 5;
    updateUI();

    let timeLeft = 10;
    boostTimer.innerText = "🌟 Golden Seed: " + timeLeft + " secs";

    const countdown = setInterval(() => {
        timeLeft--;
        boostTimer.innerText = "🌟 Golden Seed: " + timeLeft + " secs";

        if (timeLeft <= 0) {
            clearInterval(countdown);
            boostMultiplier = 1;
            boostTimer.innerText = "";
            updateUI();
        }
    }, 1000);
}

// ===== SAVE & LOAD =====
function saveGame() {
    const saveData = {
        score: score,
        perClick: perClick,
        perSecond: perSecond,
        clickUpgradeCost: clickUpgradeCost,
        autoUpgradeCost: autoUpgradeCost,
        megaUpgradeCost: megaUpgradeCost,
        prestigeLevel: prestigeLevel,
        prestigeMultiplier: prestigeMultiplier
    };
    localStorage.setItem("hamsterClickerSave", JSON.stringify(saveData));
    showSaveNotice();
}

function showSaveNotice() {
    const notice = document.getElementById("saveNotice");
    notice.style.opacity = "1";
    clearTimeout(notice._fadeTimer);
    notice._fadeTimer = setTimeout(() => {
        notice.style.opacity = "0";
    }, 1500);
}

function loadGame() {
    const saved = localStorage.getItem("hamsterClickerSave");
    if (!saved) return;

    const data = JSON.parse(saved);
    score = data.score || 0;
    perClick = data.perClick || 1;
    perSecond = data.perSecond || 0;
    clickUpgradeCost = data.clickUpgradeCost || 25;
    autoUpgradeCost = data.autoUpgradeCost || 50;
    megaUpgradeCost = data.megaUpgradeCost || 500;
    prestigeLevel = data.prestigeLevel || 0;
    prestigeMultiplier = data.prestigeMultiplier || 1;
}

// Auto-save every 10 seconds
setInterval(saveGame, 10000);

// ===== START =====
loadGame();
updateUI();
