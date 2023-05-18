# python index.py
import tkinter as tk
from tkinter import colorchooser

window_title = ""
window_geometry = "380x400"
choose_button_text = "Choose Color"
selected_color_text = ""
start_button_text = "Start"

def printer():
    print("Start")
        

def choose_color():
    color = colorchooser.askcolor(title="Choose a color")
    if color[1]:
        # bg 吃hex #000000
        selected_color.configure(bg=color[1])
        print("Selected rgb_color:", color[0])

# 創建主視窗
window = tk.Tk()
window.title(window_title)
window.geometry(window_geometry)
window.resizable(False, False)

# 創建選擇顏色的按鈕
choose_button = tk.Button(window, text=choose_button_text, command=choose_color)
choose_button.pack(pady=10) #pb=10px

# 顯示選擇的顏色
selected_color = tk.Label(window, text=selected_color_text, width=20, height=5)
selected_color.pack(pady=10)

# 執行裁切圖片的按鈕
start_button = tk.Button(window, text=start_button_text, command=printer)
selected_color.configure(bg="#000000")
start_button.pack(pady=10)

# 啟動主視窗的事件迴圈
window.mainloop()
