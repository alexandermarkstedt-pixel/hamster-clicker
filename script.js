let score = 0;
    float.style.left = e.offsetX + "px";
    float.style.top = e.offsetY + "px";

    dropZone.appendChild(float);
    setTimeout(() => float.remove(), 1000);

    updateUI();
});

// AUTO
setInterval(() => {
    score += perSecond * boost;
    updateUI();
}, 1000);

// GOLDEN SEED SPAWN (2% per second)
setInterval(() => {
    if (Math.random() < 0.02) spawnGoldenSeed();
}, 1000);

function spawnGoldenSeed() {
    const seed = document.createElement("img");
    seed.src = "golden_seed.png";
    seed.className = "golden-seed";

    seed.style.left = Math.random() * 300 + "px";
    seed.style.top = "0px";

    seed.onclick = () => activateBoost(seed);

    dropZone.appendChild(seed);

    setTimeout(() => seed.remove(), 4000);
}

function activateBoost(seed) {
    seed.remove();

    boost = 5;
    boostActive = true;
    boostEl.innerText = "5x";

    setTimeout(() => {
        boost = 1;
        boostEl.innerText = "1x";
        boostActive = false;
    }, 30000);
}

function updateUI() {
    scoreEl.innerText = Math.floor(score);
    perClickEl.innerText = perClick;
    perSecondEl.innerText = perSecond;
}
