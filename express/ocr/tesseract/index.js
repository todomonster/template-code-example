//影像辨識 中文很爛 英文還OK
// npm i tesseract.js
const { createWorker } = require("tesseract.js");

async function main() {
    const worker = await createWorker("chi_tra");
    // 提供 Tesseract.js 執行 OCR 的核心功能
    const { data: { text } } = await worker.recognize("./1.png");
    console.log(text);

    //   終止工作執行緒並進行清理
    await worker.terminate();
}
main();

//文字重複問題
https://www.xuehua.us/a/5eb9a3c286ec4d39f3435248?lang=zh-tw 