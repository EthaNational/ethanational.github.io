/* Elements */

const counter = document.getElementById("counter");
const stats = document.getElementById("stats");
const button = document.getElementById("button");
const upgradeDiv = document.getElementById("upgradeDiv");
const backgroundMusic = new Audio("assets/spoof.mp3");
const clickSound = new Audio("assets/click.wav");
const buySound = new Audio("assets/success.wav");
// Shop Items
const ppc1 = document.getElementById("ppc1");
const pps1 = document.getElementById("pps1");
const ppc2 = document.getElementById("ppc2");
const pps2 = document.getElementById("pps2");

/* Variables */

var pointsPerClick = 1;
var pointsPerSecond = 0;
var lastUpdate = performance.now();
var points = 0;

/* Functions */

function update() {
    const deltaTime = performance.now() - lastUpdate;
    lastUpdate = performance.now();
    points += pointsPerSecond*(deltaTime/1000)
    counter.innerText = points.toFixed(3);
    stats.innerText = "Points Per Click: ".concat(pointsPerClick).concat(" | Points Per Second: ").concat(pointsPerSecond)
};

function onClick() {
    const clonedAudio = clickSound.cloneNode()
    clonedAudio.play()
    points += pointsPerClick;
    update();
};

function ppcBuy(price,increase) {
    if (points >= price) {
        points -= price;
        pointsPerClick += increase;
        pointsPerClick = Number(pointsPerClick.toFixed(3));
        update();
    }
}

function ppsBuy(price,increase) {
    if (points >= price) {
        points -= price;
        pointsPerSecond += increase;
        pointsPerSecond = Number(pointsPerSecond.toFixed(3));
        update();
    }
}

function shopItem(type,price,increase) {
    const newItem = document.createElement("button")
    newItem.innerHTML = "$".concat(price," -> +",increase," ",type)
    newItem.addEventListener("click",function() {
        const clonedAudio = buySound.cloneNode()
        clonedAudio.play()
    })
     newItem.addEventListener("touchstart",function() {
        const clonedAudio = buySound.cloneNode()
        clonedAudio.play()
    })
    if (type=="ppc") {
        newItem.innerHTML = "$".concat(price," -> +",increase," Points per Click")
        newItem.addEventListener("click",function() {
            ppcBuy(Number(price),Number(increase))
        })
        newItem.addEventListener("touchstart",function() {
            ppcBuy(Number(price),Number(increase))
        })
    }
    if (type=="pps") {
        newItem.innerHTML = "$".concat(price," -> +",increase," Points per Second")
        newItem.addEventListener("click",function() {
            ppsBuy(Number(price),Number(increase))
        })
        newItem.addEventListener("touchstart",function() {
            ppsBuy(Number(price),Number(increase))
        })
    }
    document.body.appendChild(newItem)
}

function init() {
    setInterval(update)
    button.addEventListener("click",onClick);
    button.addEventListener("touchstart",onClick);
    document.addEventListener("click",function(){
        setInterval(function() {
            backgroundMusic.play()
        })
    })
    document.addEventListener("touchstart",function(){
        setInterval(function() {
            backgroundMusic.play()
        },0.1)
    })
    // Shop Items
    shopItem("ppc",10,1)
    shopItem("pps",15,2)
    shopItem("ppc",50,6.5)
    shopItem("pps",65,18)
    shopItem("ppc",200,17)
    shopItem("pps",280,82.5)
    shopItem("ppc",1300,165.75)
    shopItem("pps",2000,500)
    shopItem("ppc",5750,1215)
    shopItem("pps",8500,9525.5)
};

/* Initialization */

init();

