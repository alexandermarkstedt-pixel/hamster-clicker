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
