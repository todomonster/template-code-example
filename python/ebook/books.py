
# pip install Pillow
# python3 books.py

from PIL import Image
import os

# config
## 指定输入和输出文件夹路径
input_folder = './input'
output_folder = './output'
## RGB顏色代碼 'tuple'
rgb_code = (0, 0, 0)
## 支援圖片格式 'tuple'
support_file_format = ('.png', '.jpg', '.jpeg')
## 裁切模式 1=上下左右 2=上下
crop_mode = 2

def crop_border(image_path, output_path):
    image = Image.open(image_path)
    image_data = image.load()

    # 计算图像的边界像素值
    width, height = image.size

    if crop_mode == 1 : 
        left, right, top, bottom = width, 0, height, 0
        for x in range(width):
            for y in range(height):
                # 检查每个像素的RGB值，如果非纯黑色，则更新边界像素值
                pixel = image_data[x, y]
                if pixel != rgb_code:
                    left = min(left, x)
                    right = max(right, x)
                    top = min(top, y)
                    bottom = max(bottom, y)
    if crop_mode == 2 :
        left, right, top, bottom = 0, width, height, 0
        for y in range(height):
            for x in range(width):
                # 检查每个像素的RGB值，如果非纯黑色，则更新边界像素值
                pixel = image_data[x, y]
                if pixel != rgb_code:
                    top = min(top, y)
                    bottom = max(bottom, y)

    # 裁剪图像并保存
    cropped_image = image.crop((left, top, right + 1, bottom + 1))
    cropped_image.save(output_path)


# 遍历输入文件夹中的所有PNG图像文件
for filename in os.listdir(input_folder):
    if filename.endswith(support_file_format):
        image_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename)
        # 符合圖片格式則呼叫方法
        crop_border(image_path, output_path)
