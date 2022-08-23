function randomDigit() {
  return Math.floor(Math.random() * Math.floor(2));
}

function generateRandomBinary(binaryLength) {
  let binary = "";
  for (let i = 0; i < binaryLength; ++i) {
    binary += randomDigit();
  }
  return binary;
}

module.exports = {randomDigit,generateRandomBinary}