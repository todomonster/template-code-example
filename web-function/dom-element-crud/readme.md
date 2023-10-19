在JavaScript中，您可以使用多种方法向文档（Document）中添加新元素。以下是一些常见的方法：

1. 使用 `createElement` 和 `appendChild` 方法：

   ```javascript
   // 创建新元素
   var newElement = document.createElement('div');

   // 添加文本内容
   newElement.textContent = '新元素的文本内容';

   // 将新元素添加到文档中的某个父元素中
   var parentElement = document.getElementById('parent-id');
   parentElement.appendChild(newElement);
   ```
2. 使用 `innerHTML` 属性：

   ```javascript
   // 找到要添加内容的父元素
   var parentElement = document.getElementById('parent-id');

   // 使用innerHTML属性将HTML内容添加到父元素中
   parentElement.innerHTML += '<div>新元素的内容</div>';
   ```
3. 使用 `insertAdjacentHTML` 方法：

   ```javascript
   // 找到要添加内容的目标元素
   var targetElement = document.getElementById('target-id');

   // 使用insertAdjacentHTML方法添加HTML内容
   targetElement.insertAdjacentHTML('beforeend', '<div>新元素的内容</div>');
   ```
4. 使用 `insertBefore` 方法：

   ```javascript
   // 创建新元素
   var newElement = document.createElement('div');
   newElement.textContent = '新元素的文本内容';

   // 找到目标元素和目标元素的父元素
   var targetElement = document.getElementById('target-id');
   var parentElement = targetElement.parentNode;

   // 使用insertBefore方法将新元素插入到目标元素之前
   parentElement.insertBefore(newElement, targetElement);
   ```

这些是一些常见的方法，您可以根据需要选择其中的一种来向文档中添加新元素。每种方法都有其适用的情况和用法。
