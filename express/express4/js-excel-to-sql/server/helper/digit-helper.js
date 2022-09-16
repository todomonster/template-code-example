function randomDigit() {
  return Math.floor(Math.random() * Math.floor(2));
}

function generateRandomBinary(binaryLength) {
  let binary = "";
  for (let i = 0; i < binaryLength; ++i) {
    let digits = String(randomDigit());
    binary += digits;
  }
  return binary;
}

module.exports = {randomDigit,generateRandomBinary}