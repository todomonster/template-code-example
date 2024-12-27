# 卡片長按拖曳排序功能

## 注意事項

bs5 底層有改寫一些東西導致無法直接拿 bs3 的程式碼來用
要靠 fixed 才會正常

```css
.outer-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
```
