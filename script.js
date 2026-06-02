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
let monSterStarts = document.querySelector('#monSterStarts');
let monsterName = document.querySelector('#monsterName');
let monsterHealthText = document.querySelector('#monsterHealth');

xpText.innerHTML = xp;
healthText.innerHTML = health;
goldText.innerHTML = gold;

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
        "button functions": [attack, dodge, goTown],
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
    {
        name: "easter egg",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [reStart, reStart, reStart],
        text: "You found the easter egg! YOU WIN THE GAME!"
    }
]

//initalize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monSterStarts.style.display = "none";

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

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerHTML = gold;
        healthText.innerHTML = health;
    } else {
        text.innerHTML = "You don't have enough gold to buy health.";
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerHTML = gold;

            let newWeapon = weapons[currentWeapon].name + ".";
            text.innerHTML = "You now have a " + newWeapon;
            inventory.push(newWeapon);
            text.innerHTML += " In your inventory you have: " + inventory;
        } else {
            text.innerHTML = "You don't have enough gold to buy a weapon.";
        }
    } else {
        text.innerHTML = "You already have the most powerful weapon!";
        button2.innerHTML = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}
function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerHTML = gold;
        let currentWeapon = inventory.shift();
        text.innerHTML = "You sold your " + currentWeapon + ".";
        text.innerHTML += " In your inventory you have: " + inventory;
    } else {
        text.innerHTML = "Don't sell your only weapon!";
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monSterStarts.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerHTML = "The " + monsters[fighting].name + " attacks. ";
    text.innerHTML += "You attack it with your " + weapons[currentWeapon].name + ".";
    health -= getMonstersAttackValue(monsters[fighting].level);
    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    } else {
        text.innerText += " You missed.";
    }
    healthText.innerHTML = health;
    monsterHealthText.innerHTML = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        if (fighting === 2) {
            winGame();
        } else {
            defeatMonster();
        }
    }
    if (Math.random() <= .1 && inventory.length > 1) {
        text.innerHTML += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
    }
}

function getMonstersAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit > 0 ? hit : 0;
}

function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}

function dodge() {
    text.innerHTML = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerHTML = gold;
    xpText.innerHTML = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function reStart() {
    xp = 10;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    xpText.innerHTML = xp;
    healthText.innerHTML = health;
    goldText.innerHTML = gold;
    goTown();
}

function easterEgg() {
    update(locations[7]);
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}

function pick() {
    const numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 10) + 1);
    }
    text.innerHTML = "You picked " + guess + ". Here are the random numbers:\n";
    for (let i = 0; i < numbers.length; i++) {
        text.innerHTML += numbers[i] + " ";
    }
    if (numbers.includes(guess)) {
        text.innerHTML += "Right you win 20 gold!";
        gold += 20;
        goldText.innerHTML = gold;
    } else {
        text.innerHTML += "Wrong! you lose 10 health!";
        health -= 10;
        healthText.innerHTML = health;
    }

}