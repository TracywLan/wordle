window.fiveLetterWords = []; // global array

    const WORD_LIST_URL = 'https://gist.githubusercontent.com/daemondevin/df09befaf533c380743bc2c378863f0c/raw/5-letter-words.txt';

    async function loadWords() {
    try {
        const res = await fetch(WORD_LIST_URL);
        const text = await res.text();
        window.fiveLetterWords = text
            .split(/\r?\n/)
            .map(w => w.trim())
            .filter(Boolean);
        
        console.log('Loaded', window.fiveLetterWords.length, 'words');
        // console.log(window.fiveLetterWords); 
    } catch (error) {
        console.error('Failed to load words:', error);
    }
}

loadWords();
/*-------------------------------- Constants --------------------------------*/
const btnElement = document.querySelector('.btn')
const inputElement = document.querySelector('input')
const secretWord = wordleWordList[Math.floor(Math.random() * wordleWordList.length)].toUpperCase();
const tiles = document.querySelectorAll('.tiles')
const displayMessage = document.querySelector('#display-message')

/*---------------------------- Variables (state) ----------------------------*/

let wordArray = [];


/*------------------------ Cached Element References ------------------------*/
let inputWord = '';
let row = 0;
let tileIndex = 0;



/*-------------------------------- Functions --------------------------------*/
function init(){
    inputElement.disabled = false;
    btnElement.disabled = false;
    let wordArray = [];
}


function letterInput(inputWord) {
row = wordArray.length-1;

for(let i=0;i<inputWord.length;i++){
tileIndex = (row * 5 ) + i;
const targetTile = tiles[tileIndex];
targetTile.textContent = inputWord[i];
}
}


function updateTileColor(inputWord){
    row = wordArray.length-1;
    
    for(let i= 0; i<inputWord.length; i++) {
        tileIndex = (row * 5 ) + i;
        const targetTile = tiles[tileIndex];
        
        if (secretWord[i] === inputWord[i]){
            console.log("  -> Setting GREEN");
            targetTile.style.backgroundColor = "rgb(90, 149, 90)";
            targetTile.style.border = "none"
        }else if (secretWord.includes(inputWord[i])) {
            console.log("  -> Setting YELLOW");
            targetTile.style.backgroundColor = "rgb(248, 217, 102)";
            targetTile.style.border = "none"
        } else {
            targetTile.style.backgroundColor = "gray";
            targetTile.style.border = "none"
        }
    }
}



function winCondition(inputWord){
    if(inputWord === secretWord){
        console.log('Congrats! You won!');
        inputElement.disabled = true;
        btnElement.disabled = true;
        btnElement.classList.add('no-hover');
        displayMessage.textContent = 'Congrats! You won!'
    }else if (inputWord !== secretWord && wordArray.length === 6) {
        console.log('No more guesses left! Try again?');
        inputElement.disabled = true;
        btnElement.disabled = true;
        btnElement.classList.add('no-hover');
        displayMessage.textContent = 'No more guesses left! Try again?'
    } else{
        return;
    }
}


    function lettersOnly(input) {
    // Remove any characters that are not letters (a-z, A-Z)
        input.value = input.value.replace(/[^a-zA-Z]/g, '');
    }


/*----------------------------- Event Listeners -----------------------------*/
btnElement.addEventListener('click',() => {
    const trimmedValue = inputElement.value.trim().toUpperCase();
    const isRealWord = fiveLetterWords.includes(trimmedValue.toLowerCase());

    if (trimmedValue.length !== 5){
        console.log(`must be a 5 letter word!`)
        displayMessage.textContent = 'Must be a 5 letter word!'
    }
    else if (!isRealWord){
        console.log(`Please enter a real word`);
        displayMessage.textContent = 'Please enter a valid word'
    }
    else {
        inputWord = trimmedValue;
        wordArray.push(trimmedValue);
        inputElement.value = '';
        
    }
    
    letterInput(inputWord)
    updateTileColor(inputWord)
    winCondition(inputWord)
})



console.log(tiles);
console.log('word array',);

console.log("Secret word:", secretWord);
console.log("Input word:", inputWord);
