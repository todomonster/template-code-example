// 現金太多 要拉大間距
const cash = `AND id%FLOOR(RAND()*2)=FLOOR(RAND()*2)`;
const mobile = `AND id%3=FLOOR(RAND()*3)`;
// 目前的限制是 希望交易金額要很小，如果希望交易金額大一點要用temp算法否則上限就是那樣
const temp = `AND id%5!=FLOOR(RAND()*2) AND id%3!=FLOOR(RAND()*3)`;

function randomGetRowAlgorithm(mode) {
  if (mode === "cash") {
    return cash;
  }
  if (mode === "mobile") {
    return mobile;
  }

  return cash;
}

module.exports = { randomGetRowAlgorithm };
