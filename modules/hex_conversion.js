function convertFromHex(hex) {
  var str = '';
  for (var i = 0; i < hex.length; i += 1){
    str += String.fromCharCode(parseInt(hex[i], 16));
  }
  return str;
}

function convertToHex(str) {
  return Array.from(str).map(char => char.charCodeAt(0).toString(16));
}

exports.convertFromHex = convertFromHex;
exports.convertToHex = convertToHex;
