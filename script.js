let score = 0;
let perClick = 1;
let perSecond = 0;

let clickUpgradeCost = 25;
let autoUpgradeCost = 50;

const scoreEl = document.getElementById("score");
const perClickEl = document.getElementById("perClick");
const perSecondEl = document.getElementById("perSecond");

const clickCostEl = document.getElementById("clickCost");
const autoCostEl = document.getElementById("autoCost");

const hamster = document.getElementById("hamster");

// CLICK
hamster.addEventListener("click", () => {
    score = score + perClick;
    updateUI();
});

// UPGRADES
document.getElementById("clickUpgradeBtn").addEventListener("click", () => {
    if (score >= clickUpgradeCost) {
        score -= clickUpgradeCost;
        perClick += 1;
        clickUpgradeCost = Math.floor(clickUpgradeCost * 1.5);
        updateUI();
    }
});

document.getElementById("autoUpgradeBtn").addEventListener("click", () => {
    if (score >= autoUpgradeCost) {
        score -= autoUpgradeCost;
        perSecond += 1;
        autoUpgradeCost = Math.floor(autoUpgradeCost * 1.7);
        updateUI();
    }
});

// AUTO INCOME
setInterval(() => {
    score += perSecond;
    updateUI();
}, 1000);

// UPDATE UI
function updateUI() {
    scoreEl.innerText = score;
    perClickEl.innerText = perClick;
    perSecondEl.innerText = perSecond;

    clickCostEl.innerText = clickUpgradeCost;
    autoCostEl.innerText = autoUpgradeCost;
}

// FIRST LOAD
updateUI();

body {
    margin: 0;
    font-family: Arial;
    background: linear-gradient(to bottom right, #f8d57e, #f5b971);
}

.game-container {
    display: flex;
    height: 100vh;
}

.left-panel {
    width: 20%;
    background: white;
    padding: 20px;
}

.center-panel {
    width: 50%;
    text-align: center;
    position: relative;
}

#hamster {
    width: 420px;
    cursor: pointer;
}

.shop {
    width: 30%;
    padding: 20px;
}

.floating-text {
    position: absolute;
    animation: floatUp 1s forwards;
    font-weight: bold;
}

@keyframes floatUp {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-80px); opacity: 0; }
}

.golden-seed {
    position: absolute;
    width: 60px;
    cursor: pointer;
    animation: fall 3s linear;
}

@keyframes fall {
    from { transform: translateY(-100px); }
    to { transform: translateY(400px); }
}
