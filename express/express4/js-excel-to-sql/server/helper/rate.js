// const rate50 = `AND id%FLOOR(RAND()*3)=0`;
const rate100 = `AND id%10!=FLOOR(RAND()*10);`;

function randomGetRowAlgorithm(ratio) {
  return rate100;
}

module.exports = { randomGetRowAlgorithm };
