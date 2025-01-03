# pip install Pillow
from PIL import Image
# pip install fpdf
from fpdf import FPDF
import os
import json

try: 
    with open('index.json', encoding='utf-8') as file:
        data = json.load(file)

    # 支援圖片格式 'tuple'
    support_file_format = ('.png', '.jpg', '.jpeg')

    # 指定檔案路徑
    target_img_path = data['image_setting']['target_img_path'] or ""
    # 輸入&輸出文件路徑
    image_input_folder = data['image_setting']['image_input_folder'] or ""
    image_output_folder = data['image_setting']['image_output_folder'] or ""
    # 底部間隔(pixel)
    bottom_gap = -5

    # 記得不能用 \ 要 /
    pdf_input_folder = data['pdf_setting']['pdf_input_folder'] or ""
    pdf_output_path = data['pdf_setting']['pdf_output_path'] or ""

    # pdf_mode
    pdf_mode = data['pdf_setting']['pdf_parse_mode'] or ""

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
        def convert_images_to_pdf(pdf_input_folder, pdf_output_path):
            # 获取文件夹中的所有图像文件
            image_files = [f for f in os.listdir(pdf_input_folder) if f.endswith(support_file_format)]
            if not image_files:
                print("失敗", "無圖片")
                return
            image_files.sort()  # 按名称排序（请确保文件名能够正确反映图像的顺序）

            pdf = FPDF()

            if pdf_mode == "1":
                for image_file in image_files:
                    image_path = os.path.join(pdf_input_folder, image_file)
                    image = Image.open(image_path)
                    image_width, image_height = image.size

                    # 计算图像放置在A4页面中的位置和尺寸
                    a4_width, a4_height = 210, 297  # A4纸的宽度和高度（单位：毫米）
                    scale = min(a4_width / image_width, a4_height / image_height)
                    new_width = image_width * scale
                    new_height = image_height * scale
                    margin_x = (a4_width - new_width) / 2
                    margin_y = (a4_height - new_height) / 2

                    pdf.add_page()
                    pdf.image(image_path, x=margin_x, y=margin_y, w=new_width, h=new_height)

            elif pdf_mode == "2":
                # 逐个添加图像到PDF
                for image_file in image_files:
                    image_path = os.path.join(pdf_input_folder, image_file)
                    pdf.add_page()
                    # pdf.image(image_path, x=10, y=10, w=190)  # 调整图像位置和大小
                    pdf.image(image_path, x=0, y=0, w=pdf.w, h=pdf.h)  # 图像填充整个页面
            else :
                print("失敗","只支援 '1' 和 '2' ")
                return

            # 保存为PDF文件
            pdf.output(pdf_output_path)
            print("成功", pdf_output_path)

        convert_images_to_pdf(pdf_input_folder, pdf_output_path)    

except Exception as e:
    print(e)

