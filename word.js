var Letter = require("./letter");

function Word(wordString){
    // create property "letters" as an empty array
    this.letters = [];
    // push each letter in the word to "letters" array as a new "Letter"
    for (var i=0; i < wordString.length; i++){
        this.letters.push(new Letter(wordString.charAt(i)));
    }
}

Word.prototype.print = function(){
    var outputString = "";
    this.letters.forEach(function(val,ind,arr){
        outputString += "  " + val.return();
    })
    return outputString;
}

Word.prototype.guess = function(charGuess){
    var letterInWord = false;
    this.letters.forEach(function(val,ind,arr){
        if(val.check(charGuess)){
            letterInWord = true;
        }
    })
    return letterInWord;
}

Word.prototype.isDone = function(charGuess){
    for(var i=0; i< this.letters.length;i++){
        // console.log(this.letters[i]);
        if(this.letters[i].guessed){
            // console.log("letter is guessed")
        }else{
            // console.log("not guessed")
            return false;
        }
    }
    return true;
}


//Testing the Word constructor
//--------------------------------
// var testWord = new Word("Igloo");
// console.log(testWord.letters)
// console.log(testWord.print());
// testWord.guess("g");
// console.log(testWord.print());

// var testWord2 = new Word("igloo")
// console.log(testWord2.letters)
// console.log(testWord2.print());
// testWord2.guess("i");
// console.log("In Word: ", testWord2.guess("i"));
// testWord2.guess("g");
// console.log(testWord2.isDone());
// testWord2.guess("l");
// testWord2.guess("o");
// console.log(testWord2.print());
// console.log(testWord2.isDone());

module.exports = Word;