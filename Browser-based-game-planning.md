# Project planning

## Choice of Game
Wordle


## Pseudocode
1. Game display module will have 5 x 6 square blocks
2. On the bottom of the module, an input box that the player can type their guessed word, and a enter button
3. Player will enter 5 letter word into the input box and click enter
4. The word entered must be a valid word that is also in the word list, else, will display error
5. Once a valid word is entered and player clicks enter, the word will be displayed in the square blacks on the module
6. If the letter of the word they got is correct and is in the right position, it will turn green, if the letter is correct but in the wrong position it will turn yellow. If the word does not contain the input letter, it will stay grey.
7. When player make a second guess, the new word will display on the second line.
8. If the player guess the word right in 6 turns they win. if they cannot guess the word, they lose.


## Additional Planning Requirements

Wordle word list
<script src="https://gist.github.com/dracos/dd0668f281e685bad51479e5acaadb93.js"></script>

How to deal with double letters

// Define array for wordleWords
// define a random index
// Define a random wordleWord from the wordle array list

// Input a 5 letter word in input
// Loop through wordle list to see if array.contains entered word 
// else return error (not enough letters or not a word)


// Dom for click/press enter button that push the entered word to the game container
// Define inputWord for the word entered
// Loop through the input word so each letter is separated into individual div(inputWord[${index}].textElement = wordHolder[${index}])

// 

// Loop through the letters in the word to check if they are the same value
// IF wordleWord[index] === inputWord[index], style.background-color = 'green'
// ELSE IF wordleWord.contains(inputWord[index]), style.background-color = 'yellow'
// ELSE gray
// letter count

Check for double letters
create a status array for each letter in the secret word,and a word count object.
loop though the letters and mark any letter that wordleWord[index] === inputWord[index], change status in status array to green, decrease word count for that 



// render to check if win condition is met, 
IF (wordleWord === inputWord), 
win = true,
input disable,
pop win message (As a pop up new window, everything else is blurred out)


// When new word is inputted, inputWord refresh, go through loop again
// will push the new input to the next row div in the game module(maybe have a row counter?)
// when rowcounter is > 6, push lose message, play again button

// Select the play again button element and add an event listener. On click:
    // Reset the user's inputWord to nothing
    // Reset the computer's choice to nothing
    // Reset the game message to nothing
    // Reset all game display to nothing
    // Reset win/lose condition to nothing



