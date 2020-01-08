let rowA = document.querySelectorAll('.r-a');
let rowB = document.querySelectorAll('.r-b');
let rowC = document.querySelectorAll('.r-c');
let col1 = document.querySelectorAll('.c-1');
let col2 = document.querySelectorAll('.c-2');
let col3 = document.querySelectorAll('.c-3');
let cells = document.querySelectorAll('.cell');

let dioganalLeft = document.querySelectorAll('.dl');
let dioganalRight = document.querySelectorAll('.dr');

let playerLeftWinnerSpan = document.querySelector('.players-left .winner');
let playerRightWinnerSpan = document.querySelector('.players-right .winner');

let newGameButton = document.querySelector('.btn-new-game');
let settings = document.querySelector('.settings');
let multyTurnLb = document.querySelector('.multy-turn-lb'); 
let multyTurnCkb = document.querySelector('.multy-turn-ckb'); 
let turnsInput = document.querySelector('.turns-input'); 
let boardArea = document.querySelector('.board'); 
let draw = document.querySelector('.draw'); 



let resetButton = document.querySelector('.reset');

const board = {
    rows: [rowA, rowB, rowC],
    columns: [col1, col2, col3],
    diagonals: [dioganalLeft, dioganalRight],
    size: 3,
    clicks: 0
}

const playerX = {
    color: 'red',
    token: 'selected-X',
    area: '',
    turn: false
}

const playerO = {
    color: 'blue',
    token: 'selected-O',
    area: '',
    turn: false
}

const game = {
    turns: 1,
    draw: true //default - no winner
}

let random = Math.round(Math.random());

let currentPlayer = random === 0 ? playerX : playerO;

const togglePlayers = () => {
    if(currentPlayer === playerX) {
        currentPlayer = playerO;
    } else {
        currentPlayer = playerX;
    }
}

const initializeGame = () => {
    //TODO set interactivly
    setKnotsAndCrosses(playerO, playerLeftWinnerSpan);
    setKnotsAndCrosses(playerX, playerRightWinnerSpan);
}

const setKnotsAndCrosses = (player, area) => {
    player.area = area;
}

const singleGameOver = (player) => {
   
    if(player !== null && player.winner) {
        //Anounce the winner
        player.area.classList.toggle('unvisible'); 
    } else {
        // player === null, it's a draw
        //announce a draw
        draw.classList.toggle('unvisible')
        // TODO maybe some animation

    }

    //Show reset button
    resetButton.classList.toggle('unvisible'); 

    //Players can't click anymore
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
}

const checkWinner = (player, set) => {
    let countToken = 0;
    set.forEach(cell => {
        if(cell.classList.contains(player.token)) {
            countToken++;
        }
    });

    if(countToken === board.size) {
        player.winner = true;
        game.draw = false;
    }
}

const checkBoard = (player) => {
    board.rows.forEach(row => {
        if(!player.winner) {
            checkWinner(player, row);
        }
    });

    board.columns.forEach(column => {
        if(!player.winner) {
            checkWinner(player, column);
        }
    });

    board.diagonals.forEach(diagonal => {
        if(!player.winner) {
            checkWinner(player, diagonal);
        }
    });
    
    if(!game.draw) {
        singleGameOver(player);
    } else if(board.clicks === (Math.pow(board.size, 2))) {
        //board full - it's a draw
        singleGameOver(null);
    }
}

const handleCellClick = event => {
    event.target.style.backgroundColor = currentPlayer.color;
    event.target.classList.add(currentPlayer.token);
    board.clicks++;

    checkBoard(currentPlayer);

    if(!currentPlayer.winner) {
        togglePlayers();
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

const handleClearBoard = () => {
    cells.forEach(cell => {
        cell.style.backgroundColor = "";
    })

    //TODO Flip a coin
}



const handleMultyTurnChk = () => {
    turnsInput.classList.toggle('unvisible');
}

const handleNewGameButtonClick = () => {
    // Set preferences and start game buttons to unvisible
    settings.classList.toggle('unvisible');
    newGameButton.classList.toggle('unvisible');
    
    // Set board to visible
    boardArea.classList.toggle('unvisible');
    
    // set game set turns
    game.turns = turnsInput.value !== "" ? turnsInput.value : 1;    
}

multyTurnCkb.addEventListener('click', handleMultyTurnChk);
newGameButton.addEventListener('click', handleNewGameButtonClick);
resetButton.addEventListener('click', handleClearBoard);


initializeGame();


