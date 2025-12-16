

/*-------------------------------- Constants --------------------------------*/
const btnElement = document.querySelector('.btn')
const inputElement = document.querySelector('input')
const secretWord = wordleWordList[Math.floor(Math.random() * wordleWordList.length)];
console.log(secretWord)
const letters = document.querySelectorAll('.letters')
console.log(letters);
const rows = document.querySelector('.row')

/*---------------------------- Variables (state) ----------------------------*/

let wordArray = [];



/*------------------------ Cached Element References ------------------------*/
let inputWord = '';
let row = 0;
let column = 0;




/*-------------------------------- Functions --------------------------------*/
function letterInput(inputWord) {
const arrIdx = wordArray.length;

}

function checkGuessWord(){

}

function updateTileColor(){

}


function checkIfWin(){

}


/*----------------------------- Event Listeners -----------------------------*/
btnElement.addEventListener('click',() => {

    const trimmedValue = inputElement.value.trim().toLowerCase();
    // const isRealWord = wordleWord.includes(trimmedValue)

    if (trimmedValue.length !== 5){
        console.log(`must be a 5 letter word!`)
    }
    // else if (!isRealWord){
    //     console.log(`Please enter a real word`);
    // }
    else {
        inputWord = trimmedValue;
        wordArray.push(trimmedValue);
        inputElement.value = '';
        console.log(wordArray);
    }
    
})



