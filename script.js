let score = 0;
// CLICK HAMSTER
hamster.addEventListener("click", () => {
    score += perClick;
    updateUI();
});

// CLICK UPGRADE
clickUpgradeBtn.addEventListener("click", () => {
    if (score >= clickUpgradeCost) {
        score -= clickUpgradeCost;

        perClick += 1;

        clickUpgradeCost = Math.floor(clickUpgradeCost * 1.5);

        updateUI();
    }
});

// AUTO UPGRADE
autoUpgradeBtn.addEventListener("click", () => {
    if (score >= autoUpgradeCost) {
        score -= autoUpgradeCost;

        perSecond += 1;

        autoUpgradeCost = Math.floor(autoUpgradeCost * 1.7);

        updateUI();
    }
});

// AUTO GENERATION
setInterval(() => {
    score += perSecond;
    updateUI();
}, 1000);

// SAVE GAME
setInterval(() => {
    localStorage.setItem("hamsterSave", JSON.stringify({
        score,
        perClick,
        perSecond,
        clickUpgradeCost,
        autoUpgradeCost
    }));
}, 2000);

function updateUI() {
    scoreEl.textContent = Math.floor(score);
    perClickEl.textContent = perClick;
    perSecondEl.textContent = perSecond;

    clickCostEl.textContent = clickUpgradeCost;
    autoCostEl.textContent = autoUpgradeCost;
}

let score = 0;
const scoreEl = document.getElementById("score");
const perClickEl = document.getElementById("perClick");
const perSecondEl = document.getElementById("perSecond");

const hamster = document.getElementById("hamster");

const clickUpgradeBtn = document.getElementById("clickUpgradeBtn");
const autoUpgradeBtn = document.getElementById("autoUpgradeBtn");

const clickCostEl = document.getElementById("clickCost");
const autoCostEl = document.getElementById("autoCost");

// CLICK HAMSTER + FLOATING NUMBER
hamster.addEventListener("click", (e) => {
    score += perClick;

    // floating text
    const float = document.createElement("div");
    float.classList.add("floating-text");
    float.innerText = "+" + perClick;

    document.querySelector(".center-panel").appendChild(float);

    float.style.left = e.offsetX + "px";
    float.style.top = e.offsetY + "px";

    setTimeout(() => {
        float.remove();
    }, 1000);

    updateUI();
});

// CLICK UPGRADE
clickUpgradeBtn.addEventListener("click", () => {
    if (score >= clickUpgradeCost) {
        score -= clickUpgradeCost;
        perClick++;
        clickUpgradeCost = Math.floor(clickUpgradeCost * 1.5);
        updateUI();
    }
});

// AUTO UPGRADE
autoUpgradeBtn.addEventListener("click", () => {
    if (score >= autoUpgradeCost) {
        score -= autoUpgradeCost;
        perSecond++;
        autoUpgradeCost = Math.floor(autoUpgradeCost * 1.7);
        updateUI();
    }
});

// AUTO SCORE
setInterval(() => {
    score += perSecond;
    updateUI();
}, 1000);

function updateUI() {
    scoreEl.textContent = Math.floor(score);
    perClickEl.textContent = perClick;
    perSecondEl.textContent = perSecond;

    clickCostEl.textContent = clickUpgradeCost;
    autoCostEl.textContent = autoUpgradeCost;
}
