let wordleDictionary = [];

async function loadWordleDictionary() {
    const response = await fetch('https://gist.githubusercontent.com/slushman/e112816f2894aecf013da881130e7805/raw/7fa83100c9235edc5edad5aef6e5b85dc1fdeb02/wordle-dictionary');
    const text = await response.text();
    wordleDictionary = eval(text);
    return wordleDictionary;
}

loadWordleDictionary();

/*-------------------------------- Constants --------------------------------*/
const btnElement = document.querySelector('.btn')
const inputElement = document.querySelector('input')

const tiles = document.querySelectorAll('.tiles')
const displayMessage = document.querySelector('#display-message')
const resetBtn = document.getElementById('reset-btn')
/*---------------------------- Variables (state) ----------------------------*/

let wordArray = [];
let secretWord = wordleWordList[Math.floor(Math.random() * wordleWordList.length)].toUpperCase();

/*------------------------ Cached Element References ------------------------*/
let inputWord = '';
let row = 0;
let tileIndex = 0;


/*-------------------------------- Functions --------------------------------*/

function reset() {
    inputElement.disabled = false;
    btnElement.disabled = false;
    inputElement.value = '';
    displayMessage.textContent = '';
    wordArray = [];
    inputWord = '';
    row = 0;
    tileIndex = 0;
    resetBtn.style.display = "none"

    tiles.forEach(tile => {
        tile.textContent = '';
        tile.style.backgroundColor = 'var(--primary-color)';
        tile.style.border = '2px solid rgb(194, 194, 194)';
    });

    const newIndex = Math.floor(Math.random() * wordleWordList.length);
    secretWord = wordleWordList[newIndex].toUpperCase();
    console.log("Secret Word",secretWord);
    
}


function letterInput(word) {
    row = wordArray.length-1;

    for(let i=0;i<word.length;i++){
        tileIndex = (row * 5 ) + i;
        const targetTile = tiles[tileIndex];
        targetTile.textContent = word[i];
    }
}



function updateTileColor(inputWord){
    let tileStatus = ['gray','gray','gray','gray','gray']
    let availableLetters = secretWord.split('');
    row = wordArray.length-1;

    for(let i = 0; i < inputWord.length; i++) {
        if (secretWord[i] === inputWord[i]){
            tileStatus[i]='green';
            const letterIndex = availableLetters.indexOf(inputWord[i]);
            availableLetters.splice(letterIndex, 1);
        }
    }

    for (let i= 0; i<inputWord.length; i++){
        if (tileStatus[i] !== 'green' && availableLetters.includes(inputWord[i])){
            tileStatus[i]='yellow';
            const letterIndex = availableLetters.indexOf(inputWord[i]);
            availableLetters.splice(letterIndex, 1);
        }
    }


    for (let i = 0; i < inputWord.length; i++) {
        const targetTile = tiles[(row * 5) + i];
        if (tileStatus[i] === 'green') {
            targetTile.style.backgroundColor = "var(--tile-correct-color)";
        } else if (tileStatus[i] === 'yellow') {
            targetTile.style.backgroundColor = "var(--tile-position-color)";
        } else {
            targetTile.style.backgroundColor = "var(--tile-color)";
        }
        
        targetTile.style.border = "none";
    }
    }



function winCondition(inputWord){
    if(inputWord === secretWord){
        inputElement.disabled = true;
        btnElement.disabled = true;
        btnElement.classList.add('no-hover');
        displayMessage.textContent = 'Congrats! You won!'
        resetBtn.style.display = "block"

    }else if (inputWord !== secretWord && wordArray.length === 6) {
        inputElement.disabled = true;
        btnElement.disabled = true;
        btnElement.classList.add('no-hover');
        displayMessage.textContent = 'No more guesses left! Try again?'
        resetBtn.style.display = "block"
    } else{
        return;
    }
}


    function lettersOnly(input) {
        input.value = input.value.replace(/[^a-zA-Z]/g, '');
    }


    function handleButtonAction(){
        const trimmedValue = inputElement.value.trim().toUpperCase();
        const isRealWord = wordleDictionary.includes(trimmedValue.toLowerCase());
        // console.log(trimmedValue);
        
        if (trimmedValue.length !== 5){
            displayMessage.textContent = 'Must be a 5 letter word!'
        }
        else if (!isRealWord || wordArray.includes(trimmedValue)){
            displayMessage.textContent = 'Please enter a valid word'
        }
        else {
            displayMessage.textContent = '';
            inputWord = trimmedValue;
            wordArray.push(trimmedValue);
            inputElement.value = '';
            inputElement.focus();
            letterInput(inputWord)
            updateTileColor(inputWord)
            winCondition(inputWord)
        }
    }


/*----------------------------- Event Listeners -----------------------------*/
btnElement.addEventListener('click', handleButtonAction);

inputElement.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        handleButtonAction();
    }
});

resetBtn.addEventListener('click',()=>{
reset()
});

// console.log(tiles);
console.log('Word array',wordArray);

console.log("Secret word:", secretWord);
console.log("Input word:", inputWord);

