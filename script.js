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
