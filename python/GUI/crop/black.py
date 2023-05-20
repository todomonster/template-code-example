import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageOps

def select_image():
    file_path = filedialog.askopenfilename()
    if file_path:
        image = Image.open(file_path)
        image = remove_black_edges(image)
        image.show()

def remove_black_edges(image):
    # 將圖片轉換為灰度模式
    gray_image = image.convert("L")
    
    # 找到圖片中的邊界
    bbox = gray_image.getbbox()
    
    # 裁切圖片
    cropped_image = image.crop(bbox)
    
    return cropped_image
    # rgb_code = (0, 0, 0)
    # image_data = image.load()
    # # 计算图像的边界像素值
    # width, height = image.size    
    # left, right, top, bottom = 0, width, height, 0
    # for y in range(height):
    #     for x in range(width):
    #         # 检查每个像素的RGB值，如果非纯黑色，则更新边界像素值
    #         pixel = image_data[x, y]
    #         if pixel != rgb_code:
    #             top = min(top, y)
    #             bottom = max(bottom, y)
    # cropped_image = image.crop((left, top, right + 1, bottom + 1))
    # return cropped_image                


# 建立主視窗
window = tk.Tk()
window.title("圖片裁切程式")
window.geometry("300x100")

# 選擇圖片的按鈕
button_select = tk.Button(window, text="選擇圖片", command=select_image)
button_select.pack(pady=20)

# 啟動主迴圈
window.mainloop()
