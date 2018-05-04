# Word-Guess-CLI
## This is ~~basically~~ command line hangman
### Have you ever been using the command line and thought to yourself, "hey, it'd be great if I could play hangman right here in my console?"  Well even if you haven't, this application is for you. Simply download the files, install the required npm packages, and get a-guessin' !

## Getting Started:
* download the files
* install the required npm packages
* run the program

## Resources and Dependencies:
* inquirer npm package

## Game Play:
* when you start the program, you will be taken to the *Main Menu* which will prompt you to either *Start a New Game*, which will begin the game or *Exit*, which will exit the program
* when you start a game, a random word from a hard-coded wordbank is chosen and the program will display an underscore for each of the letters in the word; spaces are displayed as spaces and do not count as a letter
* you will then be prompted to guess a letter. Do so by typing in a single alphabetic character (not case sensitive) and hitting 'Enter'.
* if you guess correctly, the letter will be displayed in the word.
* if you guess incorrectly, your *guesses-left* will be decreased; you have 6 guesses.
* once you have either guessed the word correctly or used up all of your guesses, the game is over and you will be taken back to the *MainMenu* where you can start a new game (with a new word) or *Exit*


### Notes
* Program uses contructor functions to create *Letter* and *Word* classes/object types, each with their own properties and methods
* Would like to improve command line UI as well as add colors and other text formatting
* May try to add *wins* and *losses*
* Words are limited to words in the *wordBank*. It might be worthwhile to utilize a random word generator. However would want to restrict the type and length of words generated; some words aren't good for hangman. This also precludes using a theme.








