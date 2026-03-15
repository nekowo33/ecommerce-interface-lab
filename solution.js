// Problem 1: The Strict Type Checker [NOVIO]
function checkVariable(input) {
    switch (typeof input) {
        case "string":
            return "This input is a string";
        case "number":
            return "This input is a number";
        case "boolean":
            return "This input is a boolean";
        case "bigint":
            return "This input is a bigint";
        case "undefined":
            return "This input is undefined";
        default:
            return "object";
    }
}

// Problem 2: Secure ID Generator [NOVIO]
function generateIDs(count) {
    let ids = [];
    for (let i = 0; i < count; i++) {
        if (i === 5) {
            continue;
        }
        ids.push(`ID-${i}`)
    }
    return ids;
}

// Problem 3: The Functional Sum [NOVIO]
function calculateTotal(...numbers) {
    if (numbers.some(num => typeof num !== 'number')) {
        throw new TypeError("Invalid input: All arguments must be numbers");
    }
    return numbers.reduce((total, num) => total + num, 0);
}

//Problem 4: Leaderboard Filter [COSINO]
const players = [
    {name: "Mariel", score: 15},
    {name: "Vivian", score: 15},
    {name: "Princess", score: 14},
    {name: "Ashlly", score: 9},
    {name: "Jhon Reeve", score: 5},
    {name: "Pauline", score: 8},
    {name: "Jules", score: 10},
    {name: "Joban", score: 4},
    {name: "Kent", score: 6},
    {name: "Keniel", score: 4},
]

function getTopScorers(playersList) {
    return playersList.filter(players => players.score > 8).map(players => players.name).join(", ");
}