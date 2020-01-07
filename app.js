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

let resetButton = document.querySelector('.reset');

const board = {
    rows: [rowA, rowB, rowC],
    columns: [col1, col2, col3],
    diagonals: [dioganalLeft, dioganalRight],
    size: 3
}

const playerX = {
    color: 'red',
    token: 'selected-X',
    area: ''
}

const playerO = {
    color: 'blue',
    token: 'selected-O',
    area: ''
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
    //Anounce the winner
    if(player.winner) {
        player.area.classList.toggle('unvisible'); 
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
        singleGameOver(player);
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
}

const handleCellClick = event => {
    event.target.style.backgroundColor = currentPlayer.color;
    event.target.classList.add(currentPlayer.token);
    
    checkBoard(currentPlayer);

    if(!currentPlayer.winner) {
        togglePlayers();
    }        
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

const handleClearBoard = () => {

}

resetButton.addEventListener('click', handleClearBoard);

initializeGame();


