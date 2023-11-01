# 筆記

```js
/**
 * Jest 語法
 * it 為 test 的別名，所以兩者其實是一樣的。
 * expect( 執行的方法 ).toBe( 執行的方法回傳 )
 * 語法公式 expect( ${回傳} ).${ matchers(回傳) }; matchers =（匹配器）
 * expect(1 + 1) 是一個斷言
 * toBe toBeNull toBeNull toBeNaN toBeFalsy toBeTruthy toBeDefined
 * not.toBe(value)： 不是
 * toEqual 物件比對(效能上會較差一些)
 * 比較 toBeLessThan toBeLessThanOrEqual toBeGreaterThanOrEqual
 * 浮點數 toBeCloseTo(value, numDigits)
 * 陣列 arrayContaining toContain toHaveLength
 * 正則 toMatch
 * 錯誤 toThrow(error?)
 * 實例 toBeInstanceOf(Class)
 * 物件 toHaveProperty(keyPath?, value?)
 *
 * 十分鐘上手
 * https://www.casper.tw/development/2020/02/02/jest-intro/
 * 專業
 * https://ithelp.ithome.com.tw/articles/10338871
 *
 * 要遵守三A法則
 * https://github.com/goldbergyoni/javascript-testing-best-practices/blob/master/readme-zh-CN.md
 *
 * 很棒的簡報 神Q超人
 * https://hackmd.io/@ei_7gAIeSEq2x9U-cH1WoQ/r1FoTHClL#/
 *
 * 單元測試涵蓋兩派
 * 孤立型（Solitary）or 社交型（Sociable）
 */
```

介紹文章
// <https://www.casper.tw/development/2020/02/02/jest-intro/>
套件
// <https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest>
