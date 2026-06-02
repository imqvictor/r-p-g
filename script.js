let xp = 10;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let monsterHealth;
let fighting;
let inventory = ["stick"];

let xpText = document.querySelector('#xp');
let healthText = document.querySelector('#health');
let goldText = document.querySelector('#gold');
let button1 = document.querySelector('#btn1');
let button2 = document.querySelector('#btn2');
let button3 = document.querySelector('#btn3');
let text = document.querySelector('#txt');



const weapons = [
    { name: 'stick', power: 5 },
    { name: 'dager', power: 30 },
    { name: 'claw hammer', power: 50 },
    { name: 'sword', power: 100 }
]

const monsters = [
    { name: 'slime', level: 2, health: 15 },
    { name: 'fanged beast', level: 8, health: 60 },
    { name: 'dragon', level: 20, health: 300 }
]




const locations = [
    {
        name: "town square",
        "button text": ["Go to Store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: 'You are in the town square. you see a sign that says \"store\".'
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters"
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "buton functions": [attack, doge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to Town square", "Go to Town square", "Go to Town square"],
        "button functions": [goTown, goTown, goTown],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [reStart, reStart, reStart],
        text: "You die."
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [reStart, reStart, reStart],
        text: "You defeat the dragon!. YOU WIN THE GAME!"
    },

]

//initalize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {

    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];

    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];

    text.innerHTML = location.text;
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function fightDragon() {
    alert('Hello');
}

function buyHealth() {
    healthText.innerHTML = health;
}
function buyWeapon() {
    goldText.innerHTML = gold;
}
function fightSlime() {
    xpText.innerHTML = xp;
}
function fightBeast() {
    alert('Hello');
}
function attack() {
    alert('Hello');
}

function doge() {
    alert('Hello');
}
function reStart() {
    alert('Hello');
}