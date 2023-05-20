
import tkinter as tk
from tkinter import colorchooser
from books2 import folder_image_cropper, image2pdf

window_title = ""
window_geometry = "380x200"

# 創建主視窗
window = tk.Tk()
window.title(window_title)
window.geometry(window_geometry)
window.resizable(False, False)

# Start 裁切圖片
choose_button = tk.Button(window, text="Start 裁切圖片", command=folder_image_cropper)
choose_button.pack(pady=10) #pb=10px

# Start 圖片轉 pdf (依照檔案名稱排序)
choose_button = tk.Button(window, text="Start 圖片轉 .pdf", command=image2pdf)
choose_button.pack(pady=10) #pb=10px

# 啟動主視窗的事件迴圈
window.mainloop()

