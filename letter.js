function Letter(char){
    this.char = char;

    //if character is a space, set "guessed" to true, otherwise set to false 
    if(char == " "){
        this.guessed = true;
    }else{
        this.guessed = false;
    }
}

Letter.prototype.return = function(){
    if(this.guessed){
        return this.char;
    }else{
        return "_";
    }
}

Letter.prototype.check = function(charGuess){
    if(this.char.toLowerCase() == charGuess.toLowerCase()){
        // console.log("guess is correct")
        this.guessed = true;
        return true;
    }else{
        // console.log("guess is wrong")
        return false;
    }
}


// Testing isAlphabetic function
//--------------------------------
// console.log(isAlphabetic("A"))
// console.log(isAlphabetic("a"))
// console.log(isAlphabetic(6))
// console.log(isAlphabetic("6"))
// console.log(isAlphabetic("ab"))
// console.log(isAlphabetic("word"))
// console.log(isAlphabetic(" "))

//Testing Letter constructor
//---------------------------------
// var letter1 = new Letter("L");
// console.log(letter1.return());
// if(letter1.check("l")){
//     console.log("yup")
// }
// letter1.check("L")
// console.log(letter1.return());


// var letter2 = new Letter("a");
// console.log(letter2.return());
// letter2.check("a")
// letter2.check("A")
// console.log(letter2.return());


module.exports = Letter; 