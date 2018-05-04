var inquirer = require("inquirer");
var Word = require("./word");

var wordBank = ["Thesaurus", "Igloo", ""]
//================================================================
currentWord = new Word("French Toast")

//================================================================
console.log("============================")
console.log("   WELCOME TO WORD GUESS")
console.log("============================")
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
        }
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
