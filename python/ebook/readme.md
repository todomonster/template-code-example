# 文件

此專案由 chatGPT 協助完成

## 使用程式版

1. 安裝 python
<https://www.python.org/downloads/>
2. `pip install Pillow`
3. cd 到該資料夾 執行`python3 books.py`
===

## 使用exe版本

找到 `dist 資料夾`
把要的圖片放入 `input`
點exe後會將處理過的圖片放在 `output`

## 打包成exe

將Python程式碼轉換成獨立的可執行文件（.exe）需要使用第三方工具，例如PyInstaller或py2exe。以下是使用PyInstaller的示例步骤：

1. 安裝PyInstaller：打開終端或命令提示字元，運行以下命令進行安裝：

```
pip install pyinstaller
```

2. 將程式碼保存到一個名為`books.py`的文件中。

3. 在終端或命令提示字元中，切換到包含`books.py`文件的目錄。

4. 使用以下命令將程式碼轉換為可執行文件：

```
pyinstaller --onefile books.py
```

5. 程式碼轉換完成後，將生成的可執行文件位於`dist`目錄下。

請注意，轉換成可執行文件後，你可以將該可執行文件移動到任何地方，並在沒有Python解釋器的情況下運行它。

請確保在轉換程式碼之前，已經安裝了Pillow庫，你可以使用以下命令進行安裝：

```
pip install Pillow
```

希望這個範例能幫助到你！如果你遇到任何問題，請隨時提出。
