var hex = require("./hex_conversion.js");

var prepositions = [
  "in",
  "on",
  "at",
  "by",
  "for",
  "with",
  "about",
  "against",
  "between",
  "into",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below"
];



//Converts a string to an array of prepositions.
function convertToPrepositionArray(inputStr) {
    let ret=[];
    let hexArray = hex.convertToHex(inputStr); //Converts  each char in a string to a 2 digit hex value
    
    ret = convertStrHexArrayToPrepositionArr(hexArray);

    return ret;
}

//
function convertStrHexArrayToPrepositionArr(hexArray) {

  let ret = [];

  for (let hexVal of hexArray) {

        let hexDecNum1 =  parseInt(hexVal.charAt(0), 16); //converts the first digit to an int 
        let hexDecNum2 =  parseInt(hexVal.charAt(1), 16); //converts the second digit to an int 

        let str1= prepositions[hexDecNum1]; //Finds the prepoisition in the array to that int
        let str2= prepositions[hexDecNum2]; 

        //Adds both prepositions to the end of the array.
        ret.push(str1); 
        ret.push(str2);
    }

    return ret;
}

function getPrepositionList() {
  return prepositions;
}

//Converts the preposition array to a reverse array
//Example: ret["in"] == 0 in hex 
function convertPrepositionToAssociativeArray() {
      let ret = [];
      for (var i=0; i<prepositions.length; i++) {
         ret[prepositions[i]] = i; //Exmple ret["in"] == 0
      }

      return ret;
}

function convertPrepositionArrayToHex(prepositionArray) {
    var reversePrepArray = convertPrepositionToAssociativeArray();
   
    let ret = [];

    for (var i=0; i<prepositionArray.length; i=i+2) {

        var prepVal = prepositionArray[i];
        if ((i+1) >= prepositionArray.length) break;
        var prepVa2 = prepositionArray[i+1];

        var reversePrep1 =  reversePrepArray[prepVal];
        var reversePrep2 =  reversePrepArray[prepVa2];

        let prep1 = reversePrep1.toString(16);
        let prep2 = reversePrep2.toString(16);

        var subHexString = prep1+""+prep2;

        ret.push(subHexString.toLocaleUpperCase());
    }

    return ret;
}

function getPrepositionalArray(someString) {
  //Create a Prepositional Set
  const allowedWordsSet = new Set(prepositions.map(word => word.toLowerCase()));

  //Break up the string into words
  let wordsWithoutSpecialCharacters = someString.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, ' '); //Repalce non a-zA-Z0-9 or space with a space character
  let wordsInString = wordsWithoutSpecialCharacters.split(/\s+/);  //Split text by space(one or more)

  // Filter the words from the string, keeping only those present in the Set.
  const foundWords = wordsInString.filter(word => allowedWordsSet.has(word));

  return foundWords;

}

exports.convertToPrepositionArray = convertToPrepositionArray;
exports.prepositions = getPrepositionList;
exports.convertPrepositionArrayToHex = convertPrepositionArrayToHex;
exports.convertStrHexArrayToPrepositionArr =  convertStrHexArrayToPrepositionArr;
exports.convertPrepositionArrayToHex = convertPrepositionArrayToHex;
exports.getPrepositionalArray = getPrepositionalArray;
