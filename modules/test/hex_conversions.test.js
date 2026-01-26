const test = require("node:test");
const assert = require("node:assert");

const hex_conversion = require("../hex_conversion.js");

test('Conver 000 to Hex', t => {
    var hexVal = hex_conversion.convertToHex("000");
    assert.deepEqual(hexVal, ['30','30','30']);
});

test('Conver 303030 to String', t => {
    var strVal = hex_conversion.convertFromHex(['30','30','30']);
    assert.equal(strVal, "000");
});