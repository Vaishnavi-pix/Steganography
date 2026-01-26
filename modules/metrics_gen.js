//Script to meant run metrics
const { randomInt } = require('node:crypto');
const { appendFile } = require('node:fs/promises');
const { setTimeout } = require('node:timers/promises');


var stegUtil = require("./stegUtil.js");

//Number of times to run the test
const numberOfTests = 1;

//Upper bound of the size of String
const upperSizeOfString = 5;

/**
 * Generates a random string of typeable alphanumeric characters.
 * @param {number} length - The desired length of the string.
 */
function generateTypeableString(length) {
    let result = '';

    for (let i = 0; i < length; i++) {
        // ASCII 32 is 'Space', 126 is '~'
        // randomInt is exclusive of the upper bound, so we use 127
        const charCode = randomInt(32, 127);
        result += String.fromCharCode(charCode);
    }

    return result;
}

/**
 * Counts the number of differences between two Strings
 */
function countNumberOfCharDiffs(str1, str2) {
    let differences = 0;
    const maxLength = Math.max(str1.length, str2.length);

    for (let i = 0; i < maxLength; i++) {
        if (str1[i] !== str2[i]) {
            differences++;
        }
    }

    return differences;
}

//Run Google Gemini
//Start with 5 characters and slowly increment by 5 and measure the  Error Rate
async function googleGeminiMetric() {
    let currentSize = 5;

    const timestamp = Date.now();
    const filename = `log_${timestamp}.txt`;

    let totalNumRuns = 0;
    while (currentSize <= upperSizeOfString) {
        for (let i = 0; i < numberOfTests; i++) {
            let randomText = generateTypeableString(currentSize);
            let encodedText = stegUtil.stegString(randomText);
            let decodedText = stegUtil.deStegText(encodedText);
            let charDiffernces = countNumberOfCharDiffs(randomText, decodedText);
            if (charDiffernces > 0) {
                console.error("Str is Different: " + charDiffernces);
                console.error("Sent: " + randomText);
                console.error("Got: " + decodedText);
            }

            let dataStr = currentSize + "," + charDiffernces + '\n';
            await appendFile(filename, dataStr);

            //Google Free Tier no more than 5 runs per minute
            //Sleep after 5 runs for 1 min
            totalNumRuns++;
            if ((totalNumRuns % 4) == 0) setTimeout(60000);
        }

        currentSize = currentSize + 5;
    }
}

googleGeminiMetric();