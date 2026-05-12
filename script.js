```js id="h4m8qp"
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

    // DOUBLE SIZE
    seed.style.width = "120px";

    // RANDOM POSITION
    seed.style.left = Math.random() * 300 + "px";

    // START ABOVE SCREEN
    seed.style.top = "-100px";

    // SMOOTH SLOW FALL
    seed.style.position = "absolute";
    seed.style.transition = "top 6s linear";
    seed.style.zIndex = "999";

    dropZone.appendChild(seed);

    // START FALLING
    setTimeout(() => {
        seed.style.top = "500px";
    }, 50);

    // CLICK GOLDEN SEED
    seed.addEventListener("click", (e) => {

        // PREVENT HAMSTER CLICK UNDERNEATH
        e.stopPropagation();

        activateBoost(seed);
    });

    // REMOVE AFTER FALL
    setTimeout(() => {
        seed.remove();
    }, 6500);
}

// ===== BOOST =====
function activateBoost(seed) {
    seed.remove();

    multiplier = 5;
    updateUI();

    let timeLeft = 10;

    boostTimer.innerText = "Golden Seed: " + timeLeft + " secs";

    const countdown = setInterval(() => {
        timeLeft--;

        boostTimer.innerText = "Golden Seed: " + timeLeft + " secs";

        if (timeLeft <= 0) {
            clearInterval(countdown);

            multiplier = 1;
            boostTimer.innerText = "";

            updateUI();
        }
    }, 1000);
}

// ===== START =====
updateUI();
```
