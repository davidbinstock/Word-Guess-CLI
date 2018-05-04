
//================================================================
//=================== Load Requirements ==========================
//================================================================
var inquirer = require("inquirer");
var Word = require("./word");

//================================================================
//=================== Global Variables ===========================
//================================================================
var wordBank = ["Thesaurus", "Igloo", "French Toast"]
var guessesPerWord = 5
var guessesLeft;
var lettersGuessed = [];
var currentWord;
var usedWordIndexArray = [];
var outOfWords = false;
//================================================================
//================ Initial State/Entry Point =====================
//================================================================
console.log("============================")
console.log("   WELCOME TO WORD GUESS")
console.log("============================")
// call 'mainMenu' function which prompts the user to start gam or exit
mainMenu();

//================================================================
//==================== Gameplay Functions ========================
//================================================================

// 'mainMenu' prompts user to either start a new game or exit
function mainMenu(){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: [
                {
                    name: "Start a New Game",
                    value: 1
                },
                {
                    name: "Exit",
                    value: 0
                }
            ],
            name: "action"
        }
    ]).then(function(response){
        switch(response.action){
            // case 1: user chooses 'Start a New Game'
            // call 'newWord' function which chooses a random word from the wordbank, creates a new 'Word' object with that word, and stores it in the 'currentWord' variable. The function also sets 'guessesLeft' equal to 'guessesPerWord'. 
            // call 'guessLetter' to begin guessing
            case 1:
                console.log("\nCool beans, let's get started!\n")
                newWord();
                guessLetter();
                break;
            // case 2: user chooses 'Exit'
            // console log exit message and do nothing to end the program
            case 0:
                console.log("\nOk, Bye!\n\n")
        }
    })
}

// 'guessLetter' is the main gameplay function
// prompts user to guess a letter and then checks the entry against the current word
function guessLetter(){
    console.log("\n"+currentWord.print()+"\n\n");
    inquirer.prompt([
        {
            type: "input",
            message: "Guess a Letter:",
            name: "guess"
        }
    ]).then(function(response){
        // store the guessed letter in a new variable called 'guess'
        var guess = response.guess;

        // if entry is NOT a single alphabetic character, return back to prompt
        if(!isAlphabetic(guess)){
            console.log("item entered was not a single alphabetic character");
            return guessLetter();
        }
        // if letter was already guessed, return back to prompt
        if(lettersGuessed.indexOf(guess.toLowerCase()) >= 0){
            console.log("you guessed that letter already");
            return guessLetter();
        }

        // console log the guess
        console.log("you guessed: "+guess)
        // push letter to 'lettersGuessed' array
        lettersGuessed.push(guess.toLowerCase());

        // check if letter is in current word
        if(currentWord.guess(guess)){
            console.log("Nice!! You guessed correctly!")
        }else{
            console.log("Whoops!! You guessed wrong!")
            guessesLeft--;
        }

        // check if word is done (i.e. solved) or user is out of guesses
        if(currentWord.isDone()||guessesLeft < 1){
            if(currentWord.isDone()){
                console.log("Nice! You Got the Word!!\n\n")
            }else if(guessesLeft < 1){
                console.log("Sorry you didn't get that word\n\n")
            }

            // if out of words, display end message and return to end the program
            // otherwise, call 'mainMenu' to prompt user to start new game or exit
            if(outOfWords){
                console.log("We're all out of words!\n")
                console.log("------------------")
                console.log("    Game Over")
                console.log("------------------")
                return;
            }else{
                return mainMenu();
            }

        }
        // if word is not done, display guesses left and call 'guessLetter'
        console.log("Guesses Left: ", guessesLeft);
        guessLetter();
    })
}

//================================================================
//==================== Additional Functions ======================
//================================================================
// 'isAlphabetic' returns true if string passed is a single alphabetic character (a-z or A-Z) and false otherwise
function isAlphabetic(char){
    //create regex that represents single alphabetic character
    //note: no "+" after square braces because we only want 1 character
    var singleAlphabetLetter = /^[a-zA-Z]$/;
    //return result of test
    return singleAlphabetLetter.test(char);
}

//'newWord' function which chooses a random word from the wordbank, creates a new 'Word' object with that word, and stores it in the 'currentWord' variable. The function also sets 'guessesLeft' equal to 'guessesPerWord'. 
function newWord(){
    var newIndex = newUnusedRandIndex()
    
    // check if 'newIndex' is returning false, (i.e. the 'newUnusedRandIndex' function is not running)
    if(newIndex === false){
        console.log("newWord: no more words");
        return false;
    }

    // otherwise create new word and reset game....
    currentWord = new Word(wordBank[newIndex]);
    guessesLeft=guessesPerWord;
    lettersGuessed = [];
    return true;
}

// 'newUnusedRandIndex' returns an integer between 0 and 1 minus the length of the 'wordBank' array that has not yet been used. If all numbers have been used, it does not run and returns "false"
function newUnusedRandIndex(){
    //Prevent loop from running if all words have been used (otherwise while conditions would lead to infinite loop)
    if(usedWordIndexArray.length == wordBank.length){
        console.log("newUnusedRandIndex: all indeces in wordBank array were used");
        return false;
    }

    var unique = false;
    var randomIndex;
    //keep generating a random number untill one that wasn't used already is generated
    while(!unique){
        randomIndex = Math.floor(Math.random()*wordBank.length); 
        // console.log("number: ", randomIndex);
        // console.log("used array: ", usedWordIndexArray);     
        if(usedWordIndexArray.indexOf(randomIndex)>= 0){
            // console.log("Used, try again")
        }else{
            // console.log("cool this is a new number")
            unique= true;
        }
    }
    //return the new and "unique" index and push it to the 'usedWordIndexArray' 
    usedWordIndexArray.push(randomIndex);
    //if all words have been used set 'outOfWords' flag to true
    if(usedWordIndexArray.length == wordBank.length){
        outOfWords = true;
    }
    return randomIndex;
}