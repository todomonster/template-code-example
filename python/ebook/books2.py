# pip install Pillow
from PIL import Image
# pip install fpdf
from fpdf import FPDF
import os

# 支援圖片格式 'tuple'
support_file_format = ('.png', '.jpg', '.jpeg')

# 指定檔案路徑
target_img_path = './input2/3.jpg'
# 輸入&輸出文件路徑
image_input_folder = './input2'
image_output_folder = './output'
# 底部間隔(pixel)
bottom_gap = -5

# 記得不能用 \ 要 /
pdf_folder_path = './output'  # 替换为您的图像文件夹路径
pdf_output_path = './output/output.pdf'  # 替换为您要保存的PDF文件路径


def folder_image_cropper():

    def get_0x0y_color(image_data):
        pixel_rgb = image_data[0, 0]
        return pixel_rgb

    # 計算圖片邊界
    def calculate_image_border(image):
        image_data = image.load()
        # 計算邊界
        width, height = image.size
        left, right, top, bottom = 0, width, height, 0
        for y in range(height):
            for x in range(width):
                # 檢查每個像素的RGB值，如果非純黑色，則更新邊界像素值
                pixel = image_data[x, y]
                if pixel != get_0x0y_color(image_data):
                    top = min(top, y)
                    bottom = max(bottom, y)
        return (left, top, right, bottom + bottom_gap)

    # 裁切並儲存圖片
    def crop_border(image_path, output_path, image_border):
        image = Image.open(image_path)
        cropped_image = image.crop(image_border)
        cropped_image.save(output_path)
        print("已完成:", filename)


    image = Image.open(target_img_path)
    image_border = calculate_image_border(image)
    # 遍歷資料夾
    for filename in os.listdir(image_input_folder):
        if filename.endswith(support_file_format):
            image_path = os.path.join(image_input_folder, filename)
            output_path = os.path.join(image_output_folder, filename)
            crop_border(image_path, output_path, image_border)

def image2pdf():
    def convert_images_to_pdf(pdf_folder_path, pdf_output_path):
        # 获取文件夹中的所有图像文件
        image_files = [f for f in os.listdir(pdf_folder_path) if f.endswith(support_file_format)]
        image_files.sort()  # 按名称排序（请确保文件名能够正确反映图像的顺序）

        pdf = FPDF()

        # 逐个添加图像到PDF
        for image_file in image_files:
            image_path = os.path.join(pdf_folder_path, image_file)
            pdf.add_page()
            pdf.image(image_path, x=10, y=10, w=190)  # 调整图像位置和大小

        # 保存为PDF文件
        pdf.output(pdf_output_path)
        print("成功", pdf_output_path)

    convert_images_to_pdf(pdf_folder_path, pdf_output_path)