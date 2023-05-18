import tkinter as tk
from tkinter import filedialog
import os

def select_folder():
    folder_path = filedialog.askdirectory()
    if folder_path:
        result_label.config(text=folder_path)
    else:
        result_label.config(text="未選擇任何檔案資料夾")

def select_file():
    file_path = filedialog.askopenfilename()
    if file_path:
        file_name = os.path.basename(file_path)
        file_label.config(text="檔案路徑: "+file_path+" | 檔案名稱: "+"file_name")
    else:
        file_label.config(text="未選擇任何檔案")

# 建立主視窗
window = tk.Tk()
window.geometry("300x300")

# 建立選擇資料夾按鈕
folder_button = tk.Button(window, text="選擇檔案資料夾", command=select_folder)
folder_button.pack()

# 顯示選擇資料夾結果的標籤
result_label = tk.Label(window, text="")
result_label.pack()

# 建立選擇檔案按鈕
file_button = tk.Button(window, text="選擇檔案", command=select_file)
file_button.pack()

# 顯示選擇檔案結果的標籤
file_label = tk.Label(window, text="")
file_label.pack()

# 啟動主迴圈
window.mainloop()
