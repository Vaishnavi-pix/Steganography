var hex_conversion = require("./hex_conversion.js");
var prepoisition_conversion = require("./prepositionConvert.js");
var google_gemini = require("./google_gemini.js");

async function stegString(plainText) {
    var hexValOfText = hex_conversion.convertToHex(plainText);
    console.log("hexValueof text: " +hexValOfText );
    var prepValOfHex = prepoisition_conversion.convertStrHexArrayToPrepositionArr(hexValOfText);
    console.log("prepValOfHex text: " +prepValOfHex );
    var stegText = await google_gemini.genText(prepValOfHex);
    

    return stegText;
}

function deStegText(stegText) {
    console.log("deStegText Got: " + stegText);
    var prepositionsOnly = prepoisition_conversion.getPrepositionalArray(stegText);
    console.log("deStegText Got: 1 " + prepositionsOnly);
    var hexArray = prepoisition_conversion.convertPrepositionArrayToHex(prepositionsOnly);
    console.log("deStegText Got: 2 " + hexArray);
    var plainText = hex_conversion.convertFromHex(hexArray);
    console.log("deStegText Got: 3 " + plainText);

    return plainText;
}

exports.stegString = stegString;
exports.deStegText = deStegText;