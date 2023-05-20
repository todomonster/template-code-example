import json

# 打开 JSON 文件默認會判斷 string int
# 默認是 encoding='cp950'
with open('index.json', encoding='utf-8') as file:
    # 產生 物件(字典) = <class 'dict'>
    data = json.load(file)

target_img_path = data['image_setting']['target_img_path'] or ""
image_input_folder = data['image_setting']['image_input_folder'] or ""
image_output_folder = data['image_setting']['image_output_folder'] or ""
pdf_input_folder = data['pdf_setting']['pdf_input_folder'] or ""
pdf_output_path = data['pdf_setting']['pdf_output_path'] or ""

print(target_img_path)
print(image_input_folder)
print(image_output_folder)
print(pdf_input_folder)
print(pdf_output_path)

# def parse_list(string_list):
#     parsed_list = json.loads(string_list)
#     return parsed_list


# # strip 去除字符串两端的指定字符（默认为空格）; split 將str轉成陣列(list) = <class 'list'>
# array = data['setting']['color'].strip('()').split(',')
# # map 就是類似js的map 對陣列作遍歷操作 <map object at 0x000001F53EAF11B0> <class 'map'>
# color_tuple = tuple(map(int, array))
# print(data, type(data))

# print(data['setting']['number'], type(data['setting']['number']))

# arr = parse_list(data['setting']['array'])
# print(arr, type(arr))