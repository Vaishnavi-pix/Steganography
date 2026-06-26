
const crypto = require("crypto");

const basePrepositions = [
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

/**
 * Deterministically shuffles an array using a password.
 */
function deterministicShuffle(array, password) {
  const key = crypto
    .createHash("sha256")
    .update(password + "|deterministic-shuffle-v1")
    .digest();

  let counter = 0;

  function randomInt(max) {
    const range = 2 ** 32;
    const limit = Math.floor(range / max) * max;

    let value;

    do {
      const hmac = crypto
        .createHmac("sha256", key)
        .update(Buffer.from(String(counter++)))
        .digest();

      value = hmac.readUInt32BE(0);
    } while (value >= limit);

    return value % max;
  }

  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function getRandomPrepositionArray(password) {
  return deterministicShuffle(basePrepositions, password || "");
}

module.exports = { deterministicShuffle, getRandomPrepositionArray };
