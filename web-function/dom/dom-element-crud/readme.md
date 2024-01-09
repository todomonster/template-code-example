在 JavaScript 中，您可以使用多种方法向文档（Document）中添加新元素。以下是一些常见的方法：

1. 使用 `createElement` 和 `appendChild` 方法：

   ```javascript
   // 创建新元素
   var newElement = document.createElement("div");

   // 添加文本内容
   newElement.textContent = "新元素的文本内容";

   // 将新元素添加到文档中的某个父元素中
   var parentElement = document.getElementById("parent-id");
   parentElement.appendChild(newElement);
   ```

2. 使用 `innerHTML` 属性：

   ```javascript
   // 找到要添加内容的父元素
   var parentElement = document.getElementById("parent-id");

   // 使用innerHTML属性将HTML内容添加到父元素中
   parentElement.innerHTML += "<div>新元素的内容</div>";
   ```

3. 使用 `insertAdjacentHTML` 方法：

   ```javascript
   // 找到要添加内容的目标元素
   var targetElement = document.getElementById("target-id");

   // 使用insertAdjacentHTML方法添加HTML内容
   targetElement.insertAdjacentHTML("beforeend", "<div>新元素的内容</div>");
   ```

4. 使用 `insertBefore` 方法：

   ```javascript
   // 创建新元素
   var newElement = document.createElement("div");
   newElement.textContent = "新元素的文本内容";

   // 找到目标元素和目标元素的父元素
   var targetElement = document.getElementById("target-id");
   var parentElement = targetElement.parentNode;

   // 使用insertBefore方法将新元素插入到目标元素之前
   parentElement.insertBefore(newElement, targetElement);
   ```

这些是一些常见的方法，您可以根据需要选择其中的一种来向文档中添加新元素。每种方法都有其适用的情况和用法。

5. text to dom


createContextualFragment 與 innerHTML 在安全性上有些許不同。

首先，innerHTML 是一個屬性，它允許將字串直接插入到 HTML 元素中，這可能存在安全風險，因為它會將文字視為 HTML 代碼進行解析並直接執行。如果你不信任提供的內容，尤其是來自使用者輸入的內容，使用 innerHTML 可能會使你的網站容易受到跨站腳本攻擊 (XSS)。

相反，createContextualFragment 是一個方法，它接受一個 HTML 字串作為參數，但會在處理前根據上下文進行過濾和清理。這個方法會將 HTML 字串解析為 DocumentFragment 物件，然後可以插入到 DOM 中。這個過程中會對 HTML 進行嚴格的解析，並且不會直接執行任何腳本，因此可以更安全地操作用戶輸入的內容。

雖然 createContextualFragment 較為安全，但在使用時仍應小心，確保所提供的內容不包含惡意腳本，並且在將其插入到 DOM 中之前進行必要的驗證和清理。

總的來說，若要安全地處理用戶輸入的 HTML 內容，createContextualFragment 較 innerHTML 更為建議。

```js
function insertElByStr(query, customEl) {
  console.log("insertUI start");
  var parent = document.querySelector(query);
  if (parent) {
    var firstChild = parent.firstChild;
    var range = document.createRange();
   //這邊是重點
    var fragment = range.createContextualFragment(customEl);
    parent.insertBefore(fragment, firstChild);
  } else {
    alert("找不到元素");
  }
  console.log("insertUI end");
}
```
