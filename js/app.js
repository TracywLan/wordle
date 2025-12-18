let wordleDictionary = [];

async function loadWordleDictionary() {
    const response = await fetch('https://gist.githubusercontent.com/slushman/e112816f2894aecf013da881130e7805/raw/7fa83100c9235edc5edad5aef6e5b85dc1fdeb02/wordle-dictionary');
    const text = await response.text();
    wordleDictionary = eval(text);
    console.log(wordleDictionary); 
    return wordleDictionary;
}

loadWordleDictionary();



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
    let inputWord = '';
    let row = 0;
    let tileIndex = 0;
}


function letterInput(inputWord) {
row = wordArray.length-1;

for(let i=0;i<inputWord.length;i++){
tileIndex = (row * 5 ) + i;
const targetTile = tiles[tileIndex];
targetTile.textContent = inputWord[i];
}
}


// function check


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

    function handleButtonAction(){
    const trimmedValue = inputElement.value.trim().toUpperCase();
    const isRealWord = wordleDictionary.includes(trimmedValue.toLowerCase());
    console.log(trimmedValue);
    

    if (trimmedValue.length !== 5){
        displayMessage.textContent = 'Must be a 5 letter word!'
    }
    else if (!isRealWord){
        displayMessage.textContent = 'Please enter a valid word'
    }
    else {
        inputWord = trimmedValue;
        wordArray.push(trimmedValue);
        inputElement.value = '';
        inputElement.focus();
    }
    
    letterInput(inputWord)
    updateTileColor(inputWord)
    winCondition(inputWord)
    }


/*----------------------------- Event Listeners -----------------------------*/
btnElement.addEventListener('click', handleButtonAction);
inputElement.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        handleButtonAction();
    }
});



// console.log(tiles);
console.log('Word array',);

console.log("Secret word:", secretWord);
console.log("Input word:", inputWord);

