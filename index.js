var inquirer = require("inquirer");
var Word = require("./word");

var wordBank = ["Thesaurus", "Igloo", "French Toast"]
//================================================================
var guessesPerWord = 5
var currentWord;
var usedWordIndexArray = [];
var outOfWords = false;

//================================================================
console.log("============================")
console.log("   WELCOME TO WORD GUESS")
console.log("============================")
newWord();
mainMenu();

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
            case 1:
                console.log("\nCool beans, let's get started!\n")
                guessLetter();
                break; 
            case 0:
                console.log("\nOk, Bye!\n\n")
        }
    })
}

function guessLetter(){
    console.log("\n"+currentWord.print()+"\n\n");
    inquirer.prompt([
        {
            type: "input",
            message: "Guess a Letter:",
            name: "guess"
        }
    ]).then(function(response){
        var guess = response.guess;
        if(!isAlphabetic(guess)){
            console.log("item entered was not a single alphabetic charachter");
            guessLetter();
            return;
        }

        console.log("you guessed: "+guess)
        if(currentWord.guess(guess)){
            console.log("Nice!! You guessed correctly!")
        }else{
            console.log("Whoops!! You guessed wrong!")
            guessesLeft--;
        }

        if(currentWord.isDone()||guessesLeft < 1){
            if(currentWord.isDone()){
                console.log("Nice! You Got the Word!!")
            }else if(guessesLeft < 1){
                console.log("Sorry you didn't get this word")
            }
            
            newWord();

            if(outOfWords){
                console.log("------------------")
                console.log("    Game Over")
                console.log("------------------")
                return;
            }
        }
        console.log("Guesses Left: ", guessesLeft);
        guessLetter();
    })
}







// Additional Functions
//------------------------------------------------
function isAlphabetic(char){
    //create regex that represents single alphabetic character
    //note: no "+" after square braces becaus we only want 1 character
    var singleAlphabetLetter = /^[a-zA-Z]$/;
    //return result of test
    return singleAlphabetLetter.test(char);
}

function newWord(){
    var newIndex = newUnusedRandIndex()
    if(newIndex === false){
        console.log("newWord: no more words");
        outOfWords = true;
        return false;
    }
    currentWord = new Word(wordBank[newIndex]);
    guessesLeft=guessesPerWord;
    return true;

    
}


function newUnusedRandIndex(){
    var unique = false;
    var randomIndex;
    //check if all words have been used, if so return false (otherwise while conditions would lead to infinite loop)
    if(usedWordIndexArray.length == wordBank.length){
        console.log("newUnusedRandIndex: all indeces in wordBank array were used")
        return false;
    }
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
    //return the new and "unique" index and push it to the usedWordIndexArray 
    usedWordIndexArray.push(randomIndex);
    return randomIndex;
}

