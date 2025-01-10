
let player1 = {
    "username": undefined,
    "mark": "x"
};

let player2 = {
    "username": undefined,
    "mark": "o"
};

let currentUserId;

let confirmButton = document.querySelector(".confirm-button");
let cancelButton = document.querySelector(".cancel-button");
let edit1 = document.getElementById("edit-1");
let edit2 = document.getElementById("edit-2");

let player1Div = document.getElementById("player1");
let player2Div = document.getElementById("player2");
let playerDataDiv = document.getElementById("player-data");
let usernameInput = document.querySelector("input");

player1Div.querySelector("#mark").className = player1.mark;
player2Div.querySelector("#mark").className = player2.mark;

const xOTable = document.getElementById("xo-table");
const startGameButton = document.getElementById("start-game");

const allCell = document.querySelectorAll(".cell");

let tableVisible = false;
let counter = 0;
let winner = "";
let table = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
];


const checkEquality = (list) => {
    return (
        list[0] === list[1] && list[1] === list[2] && list[2] !== undefined
    );
};

const changeTurn = (id) => {
    let turn = document.getElementById("turn");
    turn.style.display = "block";
    turn.innerText = `It is your turn, ${id === 1 ? player1.username : player2.username}`;
};


const cellListener = (cell) => {
    let div = cell.children[0];
    if (!["x", "o"].includes(div.className)) {
        let mark = (counter % 2 === 0 ? "x" : "o");
        let x = div.getAttribute("id")[0];
        let y = div.getAttribute("id")[1];
        div.className = mark;
        counter += 1;
        table[x][y] = mark;
        checkWin();
        if (winner) {
            let turn = document.getElementById("turn");
            turn.style.display = "none";
            document.getElementById("win").style.display = "flex";
            if (player1.mark === winner) document.querySelector("span").innerText = player1.username;
            if (player2.mark === winner) document.querySelector("span").innerText = player2.username;
        } else {
            changeTurn(counter % 2 === 0);
        }
    }
};

const handleClick = (event) => {
    const cell = event.currentTarget;
    cellListener(cell);
};

const checkWin = () => {
    table.forEach((row) => {
        if (checkEquality([row[0], row[1], row[2]])) {
            winner = row[0];
        }
    });

    if (checkEquality([table[0][0], table[1][1], table[2][2]])) {
        winner = table[0][0];
    }
    if (checkEquality([table[0][2], table[1][1], table[2][0]])) {
        winner = table[0][2];
    }

    let tableT = table[0].map((_, i) => table.map(row => row[i]));
    tableT.forEach((row) => {
        if (checkEquality([row[0], row[1], row[2]])) {
            winner = row[0];
        }
    });

    if (winner) {
        allCell.forEach((cell) => {
            cell.removeEventListener("click", handleClick);
        });
    }
};

const tableInit = () => {
    changeTurn(1);
    allCell.forEach((cell) => {
        cell.addEventListener("click", handleClick);
    });
};

const resetTable = () => {
    table = [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
    ];
    allCell.forEach((cell) => {
        counter = 0;
        let div = cell.children[0];
        div.className = "";
    });
    winner = undefined;
};

startGameButton.addEventListener("click", () => {
    if (!player1.username && !player2.username) {
        return alert("Choose username!");
    }
    document.getElementById("win").style.display = "none";
    resetTable();
    tableInit();
    tableVisible = true;
    xOTable.style.display = "flex";
});

confirmButton.addEventListener("click", (e) => {
    e.preventDefault();
    username = usernameInput.value
    if (username.length <= 3) return alert("Username cannot be shorter than 3 char!")
    if (currentUserId === 1) {
        player1.username = username;
        player1Div.querySelector("h1").innerText = player1.username;
        usernameInput.value = "";
    }else {
        player2.username = username;
        player2Div.querySelector("h1").innerText = player2.username;
        usernameInput.value = "";
    }
    playerDataDiv.style.display = "none";
});

cancelButton.addEventListener("click", () => cancelUser());

edit1.addEventListener("click", () => {editUser(1);});
edit2.addEventListener("click", () => {editUser(2);});


const cancelUser = () => {playerDataDiv.style.display = "none"};

const editUser = (id) => {
    currentUserId = id;
    playerDataDiv.style.display = "block";
};
