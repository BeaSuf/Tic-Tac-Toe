// Players area DOM
let playerLeftSection = document.querySelector('.players-left');
let playerRightSection = document.querySelector('.players-right');

let playerLeftNameSpan = document.querySelector('.players-left .name');
let playerRightNameSpan = document.querySelector('.players-right .name');
let playerLeftAvatarSpan = document.querySelector('.players-left .avatar');
let playerRightAvatarSpan = document.querySelector('.players-right .avatar');
let playerLeftWinnerSpan = document.querySelector('.players-left .winner');
let playerRightWinnerSpan = document.querySelector('.players-right .winner');
let playerLeftScoreSpan = document.querySelector('.players-left .score');
let playerRightScoreSpan = document.querySelector('.players-right .score');
let playerLeftTokenImg = document.querySelector('.players-left .token');
let playerRightTokenImg = document.querySelector('.players-right .token');

//SetOings DOM
//SetOingsRight
let settings = document.querySelector('.settings');
// let multyTurnLb = document.querySelector('.multy-turn-lb');  //TODO version2
// let multyTurnCkb = document.querySelector('.multy-turn-ckb');  //TODO version 2
let turnsInput = document.querySelector('.turns-input'); 

let playerLeftTokenSettings = document.querySelector('.players-token-settings .cross');
let playerRightTokenSettings = document.querySelector('.players-token-settings .knot');
let playerTokenReverseBtn = document.querySelector('.players-token-settings .reverse');

let playerLeftNameSettings = document.querySelector('.player-left-settings .player-name');
let playerRightNameSettings = document.querySelector('.player-right-settings .player-name');
let playerLeftAvatarSettings = document.querySelector('.player-left-settings .player-avatar');
let playerRightAvatarSettings = document.querySelector('.player-right-settings .player-avatar');

let newGameButton = document.querySelector('.btn-new-game');
let setSettingsButton = document.querySelector('.show-settings');

//Game area DOM
let boardArea = document.querySelector('.board'); 
let drawSpan = document.querySelector('.draw');
let coinFlipImg = document.querySelector('.coin-flip img');

let rowA = document.querySelectorAll('.r-a');
let rowB = document.querySelectorAll('.r-b');
let rowC = document.querySelectorAll('.r-c');
let col1 = document.querySelectorAll('.c-1');
let col2 = document.querySelectorAll('.c-2');
let col3 = document.querySelectorAll('.c-3');
let cells = document.querySelectorAll('.cell');

let dioganalLeft = document.querySelectorAll('.dl');
let dioganalRight = document.querySelectorAll('.dr'); 

//Data storage 
const board = {
    rows: [rowA, rowB, rowC],
    columns: [col1, col2, col3],
    diagonals: [dioganalLeft, dioganalRight],
    size: 3,
    clicks: 0
}

const playerX = {
    avatar: '',
    name: 'pl1',
    tokenImg: "url('images/tic-tac-toe-X.png')",
    color: '',
    token: 'selected-X',
    winArea: '',
    turn: false,
    section: '',
    winner: false,
    score: 0
}

const playerO = {
    avatar: '',
    name: 'pl2',
    tokenImg: "url('images/tic-tac-toe-O.png')",
    color: '',
    token: 'selected-O',
    winArea: '',
    turn: false,
    section: '',
    winner: false,
    score: 0
}

const game = {
    draw: true, //default - no winner
    over: false
}

const gameSet = {
    numberOfGames: 1,
    //scores created dynamicly for multy turns game - version 2
    over: false
}

let playersSettingsNotSet = false;
let currentPlayer = null;

const initializeGame = () => {
    //TODO for multy turn game    
    // gameSet[playerX.name] = 0;
    // gameSet[playerO.name] = 0;   
    
    clearBoard();
    currentPlayer = null;
    playerX.winner = false;
    playerO.winner = false;
    gameSet.over = false;
    game.over = false;
    game.draw = true;
    
    if(!playerX.winArea.classList.contains('unvisible')) {
        playerX.winArea.classList.toggle('unvisible');
    }
    if(!playerO.winArea.classList.contains('unvisible')) {
        playerO.winArea.classList.toggle('unvisible');
    }

    if(!drawSpan.classList.contains('unvisible')) {
        drawSpan.classList.toggle('unvisible');
    }

    // if(settings.classList.contains('unvisible')){
    //     playerLeftSection.classList.toggle('unvisible');
    //     playerRightSection.classList.toggle('unvisible');
    // }

    coinFlipImg.src = 'images/flip.png';
    coinFlipImg.classList.remove('vivify', 'fadeOut', 'duration-1500');
    board.clicks = 0;

    // Set board to visible
    if(boardArea.classList.contains('unvisible')) {
        boardArea.classList.remove('unvisible');
    }

    playerO.section.classList.remove('active');
    playerX.section.classList.remove('active');
}

const handleCoinFlip = () => {
    let random = Math.round(Math.random());
    coinFlipImg.classList.add('vivify', 'spin', 'duration-1500');
     setTimeout(() => {
        coinFlipImg.classList.remove('spin');
        coinFlipImg.classList.add('fadeOut');
        
        coinFlipImg.src = random === 0 ? 'images/flip-X.png' : 'images/flip-O.png';
        currentPlayer = random === 0 ? playerX : playerO;
        
        currentPlayer.section.classList.toggle('active'); //active background

        // coinFlipImg.classList.toggle('unvisible');
        setSettingsButton.classList.add('unvisible');
     }, 800);
}

const togglePlayers = () => {
    currentPlayer.section.classList.toggle('active');

    if(currentPlayer === playerX) {
        playerO.section.classList.toggle('active');
        currentPlayer = playerO;
    } else {
        playerX.section.classList.toggle('active');
        currentPlayer = playerX;
    }    
}

const handleReverseTokenClick = () => {
    let leftToken = playerLeftTokenSettings.src;
    let leftTokenClass = playerLeftTokenSettings.className;
    let rightToken = playerRightTokenSettings.src;
    let rightTokenClass = playerRightTokenSettings.className;

    let tempToken = leftToken;
    playerLeftTokenSettings.src = rightToken;
    playerLeftTokenImg.src = rightToken;
    playerRightTokenSettings.src = tempToken;
    playerRightTokenImg.src = tempToken;

    let tempScore = playerLeftScoreSpan.textContent;
    playerLeftScoreSpan.textContent = playerRightScoreSpan.textContent;
    playerRightScoreSpan.textContent = tempScore;

    let tempTokenClass = leftTokenClass;
    playerLeftTokenSettings.classList.add(rightTokenClass);
    playerLeftTokenSettings.classList.remove(leftTokenClass);
    playerRightTokenSettings.classList.add(tempTokenClass);
    playerRightTokenSettings.classList.remove(rightTokenClass);


}

const setPlayersArea = () => {
    if(playerLeftTokenSettings.className === "cross") {
        playerX.name = playerLeftNameSettings.value;
        playerX.winArea = playerLeftWinnerSpan;
        playerX.scoreArea = playerLeftScoreSpan;
        playerX.section = playerLeftSection;
        playerLeftNameSpan.textContent = playerLeftNameSettings.value;
        playerLeftAvatarSpan.textContent = playerLeftAvatarSettings.value;
        // playerLeftScoreSpan.textContent = playerX.score; 
        
        playerO.name = playerRightNameSettings.value;
        playerO.winArea = playerRightWinnerSpan;
        playerO.scoreArea = playerRightScoreSpan;
        playerO.section = playerRightSection;
        playerRightNameSpan.textContent = playerRightNameSettings.value;
        playerRightAvatarSpan.textContent = playerRightAvatarSettings.value;        
        // playerRightScoreSpan.textContent = playerO.score;
    } else if(playerLeftTokenSettings.className === "knot") {
        playerO.name = playerLeftNameSettings.value;
        playerO.winArea = playerLeftWinnerSpan;
        playerO.scoreArea = playerLeftScoreSpan;
        playerO.section = playerLeftSection;
        playerLeftNameSpan.textContent = playerLeftNameSettings.value;
        playerLeftAvatarSpan.textContent = playerLeftAvatarSettings.value;
        // playerLeftScoreSpan.textContent = playerX.score; 
        
        playerX.name = playerRightNameSettings.value;
        playerX.winArea = playerRightWinnerSpan;
        playerX.scoreArea = playerRightScoreSpan;
        playerX.section = playerRightSection;
        playerRightNameSpan.textContent = playerRightNameSettings.value;
        playerRightAvatarSpan.textContent = playerRightAvatarSettings.value;
        // playerRightScoreSpan.textContent = playerO.score;

        // let tempScore = playerX.score;
        // playerX.score = playerO.score;
        // playerO.score = tempScore;
    }

    playerLeftTokenImg.src = playerLeftTokenSettings.src;
    playerRightTokenImg.src = playerRightTokenSettings.src;

    playersSettingsNotSet = true;
} 


const singleGameOver = (player) => {   
    if(player !== null && player.winner) {
        //Anounce the winner
        player.winArea.classList.toggle('unvisible'); 
        player.score++;
        player.scoreArea.textContent = player.score; 
        player.section.classList.remove('active');
        
    } else {
        // player === null, it's a draw
        //announce a draw
        drawSpan.classList.toggle('unvisible')
        playerO.section.classList.remove('active');
        playerX.section.classList.remove('active');
        // TODO some animation
    }

    game.over = true;

    //Show start new game button
    if(gameSet.numberOfGames === 1) {
        newGameButton.classList.remove('unvisible');
        setSettingsButton.classList.remove('unvisible');
        gameSet.over = true; 
    } else {
        //multiple 
        //set score
        gameSet[player.name] += 1; 
    }
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

        set.forEach(cell => {
            let img = player.token === 'selected-X' ? 'winner-X' : 'winner-O';
            cell.style.backgroundImage = `url('images/${img}.png')`;
            cell.style.backgroundSize = 'cover';
        });
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
    
    if(!game.draw && player.winner) {
        singleGameOver(player);
    } else if(board.clicks === (Math.pow(board.size, 2))) {
        //board full - it's a draw
        singleGameOver(null);
    }
}

const handleCellClick = event => {
    //X/O are placed only if the game set is not over
    if(!gameSet.over && currentPlayer != null && event.target.style.backgroundImage === '') {
        if(board.clicks === 0) {
            coinFlipImg.classList.toggle('unvisible');
        }
        event.target.style.backgroundImage = currentPlayer.tokenImg;
        event.target.style.backgroundSize = 'cover';
        event.target.classList.add(currentPlayer.token);
        board.clicks++;
    
        checkBoard(currentPlayer);
    
        if(!currentPlayer.winner) {
            togglePlayers();
        }
    } 
}

const clearBoard = () => {
    cells.forEach(cell => {
        cell.style.backgroundColor = '';
        cell.style.backgroundImage = '';
        if(cell.classList.contains(playerX.token)) {
            cell.classList.remove(playerX.token);
        }
        if(cell.classList.contains(playerO.token)) {
            cell.classList.remove(playerO.token);
        }
    })
}


//TODO version2
// const handleMultyTurnChk = () => {
//     turnsInput.classList.toggle('unvisible');
// }

const handleNewGameButtonClick = () => {
    if(!playersSettingsNotSet) {
        setPlayersArea();
        // Set preferences and start game buttons to unvisible
        settings.classList.toggle('unvisible');
        // set game-set turns
        // gameSet.numberOfGames = turnsInput.value !== "" ? turnsInput.value : 1;     //TODO version 2        
    }
    
    newGameButton.classList.add('unvisible');
   // setSettingsButton.classList.add('unvisible');
    initializeGame();
    coinFlipImg.classList.toggle('unvisible');
}

const handleSetSettingsBtn = () => {
    settings.classList.toggle('unvisible');
    setSettingsButton.classList.add('unvisible');
    newGameButton.classList.remove('unvisible');
    boardArea.classList.toggle('unvisible');
    playersSettingsNotSet = false;

    // playerLeftSection.classList.toggle('unvisible');
    // playerRightSection.classList.toggle('unvisible');

    if(!coinFlipImg.classList.contains('unvisible')) {
        coinFlipImg.classList.add('unvisible');
    }
    playerLeftSection.classList.remove('active');
    playerRightSection.classList.remove('active');
    playerLeftWinnerSpan.classList.add('unvisible');
    playerRightWinnerSpan.classList.add('unvisible');
}



// multyTurnCkb.addEventListener('click', handleMultyTurnChk); //TODO - version 2
newGameButton.addEventListener('click', handleNewGameButtonClick);
setSettingsButton.addEventListener('click', handleSetSettingsBtn);
playerTokenReverseBtn.addEventListener('click', handleReverseTokenClick);
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
coinFlipImg.addEventListener('click', handleCoinFlip)


