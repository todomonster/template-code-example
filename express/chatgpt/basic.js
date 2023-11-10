// 參考
// https://www.npmjs.com/package/openai
// https://blog.jiatool.com/posts/chatgpt_api/
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "user",
      content: "",
    },
  ],
  // 介於 0 和 2 之間。較高的值(如 0.8)將使輸出更加隨機，
  // 而較低的值(如 0.2)將使輸出更加集中和確定。
  temperature: 1,
  // 最大值
  max_tokens: 3000,
  // 一種替代temperature的方法
  top_p: 1,
  // -2.0 和 2.0 之間的數字。
  // 正值會根據到目前為止是否出現在文本中來懲罰新標記，從而增加 Model 談論新主題的可能性。
  presence_penalty: 0,
  // -2.0 和 2.0 之間的數字。
  // 正值會根據新標記在文本中的現有頻率對其進行懲罰，從而降低 Model 逐字重複同一行的可能性。
  frequency_penalty: 0,
  // 	輸出幾種回覆結果。
  n: 1,
  // 開啟 stream 方式傳送，就像 ChatGPT 網頁版那樣會一個一個字跑出來。
  stream: false,
  // 指定字串，如果回覆有出現這些字串將會停止輸出。
  stop: null,
  // 修改指定標記出現在完成中的可能性。
  logit_bias: null
});

// 官方建議不要同時更改 temperature 和 top_p
// 如果想讓它記得以前講過的話，每次請求所消耗的 token 是要繼續往上疊的，也是蠻恐怖的 XD

// 要記住文字 token 是往上疊加
// 3.5=>4096 4=>8192 
// 中文消耗的 token 比英文還多很多