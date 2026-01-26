const test = require("node:test");
const assert = require("node:assert");

const prep_conversion = require("../prepositionConvert.js");

test('Convert ["00","FF"] to in,in,below,below', t => {
    var prepArray = prep_conversion.convertStrHexArrayToPrepositionArr(['00','FF']);
    assert.deepEqual(prepArray, ['in','in','below','below']);
});


test('Convert ["in","in","below","below"] to ["00","FF"]', t => {
    var prepArray = prep_conversion.convertPrepositionArrayToHex(['in','in','below','below']);
    assert.deepEqual(prepArray, ['00','FF']);
});

test('Filter Words "This is in middle then in the tunnel and below the big below.', t=> {
    var wordArray = prep_conversion.getPrepositionalArray("This is in middle then in the tunnel and below the big below.");
    assert.deepEqual(wordArray, ['in','in','below','below']);
})

var testStrFromGemini1 = `subject: Urgent Update

Thinking about our project. I suggest meeting next near between deadlines to solidify strategy.`;

test('Filter Wods' + testStrFromGemini1, t=> {
    var wordArray = prep_conversion.getPrepositionalArray(testStrFromGemini1);
    assert.deepEqual(wordArray, ["about", "between"]);
});

var testStrFromGemini2 = `Subject: Journey

Imagine a world woven with purpose, crafted for discovery. Dreams dance about possibilities, poised between what is and could be. We inquire about journeys into the unknown, rally against doubt, guided by intuition. The path unfolds at dawn, illuminated in moonlight. Stories whisper about challenges, transformed into triumphs. Defiance pushes against limitations, supported by resilience. Hope dawns at the horizon, blossoming in adversity. We ponder about decisions, acting on impulse, arriving at understanding. The struggle lies in facing odds, pushing against complacency, striving for excellence. We question about meaning, connected with each other, standing against indifference, empowered by unity, working against fate, aiming for something more.`;

var gemnini2ExprectedResult = [ "with","for","about","between","about","into","against","by","at","in","about","into","against","by","at","in","about","on","at","in","against","for","about","with","against","by","against","for"];
test('Filter Wods' + testStrFromGemini2, t=> {
    var wordArray = prep_conversion.getPrepositionalArray(testStrFromGemini2);
    assert.deepEqual(wordArray, gemnini2ExprectedResult);
});