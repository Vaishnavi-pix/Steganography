const test = require("node:test");
const assert = require("node:assert");

const stegUtil = require("../stegUtil.js");


test('Round Trip conversion of This is a Test.', async t => {
    let testStr = "test";
    console.log("Converting: " + testStr);
    let stegText = await stegUtil.stegString(testStr);
    console.log("Steg Text: " + stegText);
    let deSteg = stegUtil.deStegText(stegText);
    console.log("Got Back: " + deSteg);
    assert.deepEqual(deSteg, testStr);
});
