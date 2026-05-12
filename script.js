document.addEventListener("DOMContentLoaded", () => {

let score = 0;
let perClick = 1;
let perSecond = 0;

let clickUpgradeCost = 25;
let autoUpgradeCost = 50;

const scoreEl = document.getElementById("score");
const perClickEl = document.getElementById("perClick");
const perSecondEl = document.getElementById("perSecond");

const hamster = document.getElementById("hamster");

const clickUpgradeBtn = document.getElementById("clickUpgradeBtn");
const autoUpgradeBtn = document.getElementById("autoUpgradeBtn");

const clickCostEl = document.getElementById("clickCost");
const autoCostEl = document.getElementById("autoCost");

// CLICK HAMSTER
hamster.addEventListener("click", (e) => {
    score += perClick;

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

// AUTO INCOME
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

updateUI();

});
