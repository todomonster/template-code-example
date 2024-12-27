# el-plus 功能語法說明

## tree

請見另一個檔案 `tree.vue`

## resize 彈出視窗

- 背景遮罩要隱藏
- 調整 css 背景 DOM 才能操作
  - pointer-events
- resize 透過 hook 執行()

```html
<el-dialog
  v-model="dialogVisible"
  title="Tips"
  width="500"
  draggable
  :modal="false"
  :close-on-click-modal="false"
  :append-to-body="true"
  class="custom-dialog"
  id="myDialog"
>
  <span>It's a draggable Dialog</span>
  <template #footer>
    <div class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="dialogVisible = false">
        Confirm
      </el-button>
    </div>
  </template>
</el-dialog>

<style>
  /* 確保 Dialog 本身可以被操作 */
  .custom-dialog {
    pointer-events: auto;
  }
</style>
```

```js
const 執行 = () => {
  function getBrowserMaxDimensions() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    return { width, height };
  }

  nextTick(() => {
    const dragDom = document.querySelector(".el-dialog") as HTMLElement;
    dragDom.style.top = "1%";
    dragDom.style.left = "1%";
    // dragDom.style.top = "18%";
    // dragDom.style.left = "1%";

    let minWidth = 0;
    let minHeight = 0;

    setTimeout(() => {
      minWidth = dragDom.clientWidth;
      minHeight = dragDom.clientHeight;
    }, 300);

    const resizeEl = document.createElement("div");
    dragDom.appendChild(resizeEl);

    resizeEl.style.cursor = "nwse-resize";
    resizeEl.style.position = "absolute";
    resizeEl.style.height = "10px";
    resizeEl.style.width = "10px";
    resizeEl.style.right = "0px";
    resizeEl.style.bottom = "0px";
    resizeEl.style.background = "gray";

    resizeEl.onmousedown = (e: MouseEvent) => {
      const dimensions = getBrowserMaxDimensions();
      const maxWidth = dimensions.width - 100 || 800;
      const maxHeight = dimensions.height - 100 || 600;

      const disX = e.clientX - resizeEl.offsetLeft;
      const disY = e.clientY - resizeEl.offsetTop;

      document.onmousemove = function (e: MouseEvent) {
        e.preventDefault();

        // 判斷滑鼠是否超出瀏覽器可視範圍
        if (
          e.clientX < 0 ||
          e.clientY < 0 ||
          e.clientX > dimensions.width ||
          e.clientY > dimensions.height
        ) {
          // 超出範圍，停止事件
          document.onmousemove = null;
          document.onmouseup = null;
          return;
        }

        const x = e.clientX - disX + 10;
        const y = e.clientY - disY + 10;

        const newWidth = Math.min(Math.max(x, minWidth), maxWidth);
        const newHeight = Math.min(Math.max(y, minHeight), maxHeight);

        dragDom.style.width = `${newWidth}px`;
        dragDom.style.height = `${newHeight}px`;
      };

      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  });
};
const handleDialogOpen = () => {
  dialogVisible.value = true;
  nextTick(() => {
    const element = document.getElementById("myDialog");
    element.style.margin = "0";
    console.log(element);
    const grandParent = element?.parentElement?.parentElement; // 取得祖父節點
    if (grandParent) {
      grandParent.style.pointerEvents = "none";
    }
    console.log(grandParent);

    執行();
  });
};
```
