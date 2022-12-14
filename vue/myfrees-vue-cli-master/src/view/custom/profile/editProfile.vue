<script>
import { ref, onMounted, onBeforeMount, computed, watch } from "vue";
import CitySelecter from "@/components/global/CitySelecter.vue";
import { Toast } from "@/components/global/swal.js";
import { apiGetStore, apiUpdateStore, apiStoreUpload } from "@/api/myfree";

export default {
  name: "EditProfile",
  setup() {
    const storeData = ref({});
    const cityAreaData = ref([]);
    const areaList = computed(() =>
      findAreaWithCityId(cityAreaData.value, storeData.value.city)
    );

    //表單驗證
    const form = ref(null);
    const save = async (e) => {
      e.preventDefault();
      if (form.value.reportValidity()) {
        try {
          // let msg = await apiPutCaretaker(storeData.value);
          console.log(storeData.value);
          // if (msg.data == "更新成功") {
          //   Toast(msg.data);
          // } else {
          //   Toast(msg.message);
          // }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const findAreaWithCityId = (data, cityId) => {
      if (cityId) {
        let city = JSON.parse(JSON.stringify(data));
        let targetArea = city.filter((item) => item.id === cityId);
        if (targetArea.length > 0) {
          return targetArea[0].areas;
        }
      }
      return [];
    };
    watch(
      () => storeData.value.city,
      async () => {
        storeData.value.area = areaList.value[0].id;
      }
    );
    onMounted(async () => {
      // //取會員資料
      //   await apiGetCityArea();
      const response = [
        {
          id: 1,
          city_name: "臺北市",
          city_name_en: "Taipei City",
          areas: [
            {
              id: 1,
              area_name: "中正區",
              area_name_en: "Zhongzheng Dist.",
              zip_code: "100",
              city_id: 1,
            },
            {
              id: 2,
              area_name: "大同區",
              area_name_en: "Datong Dist.",
              zip_code: "103",
              city_id: 1,
            },
            {
              id: 3,
              area_name: "中山區",
              area_name_en: "Zhongshan Dist.",
              zip_code: "104",
              city_id: 1,
            },
            {
              id: 4,
              area_name: "松山區",
              area_name_en: "Songshan Dist.",
              zip_code: "105",
              city_id: 1,
            },
            {
              id: 5,
              area_name: "大安區",
              area_name_en: "Da’an Dist.",
              zip_code: "106",
              city_id: 1,
            },
            {
              id: 6,
              area_name: "萬華區",
              area_name_en: "Wanhua Dist.",
              zip_code: "108",
              city_id: 1,
            },
            {
              id: 7,
              area_name: "信義區",
              area_name_en: "Xinyi Dist.",
              zip_code: "110",
              city_id: 1,
            },
            {
              id: 8,
              area_name: "士林區",
              area_name_en: "Shilin Dist.",
              zip_code: "111",
              city_id: 1,
            },
            {
              id: 9,
              area_name: "北投區",
              area_name_en: "Beitou Dist.",
              zip_code: "112",
              city_id: 1,
            },
            {
              id: 10,
              area_name: "內湖區",
              area_name_en: "Neihu Dist.",
              zip_code: "114",
              city_id: 1,
            },
            {
              id: 11,
              area_name: "南港區",
              area_name_en: "Nangang Dist.",
              zip_code: "115",
              city_id: 1,
            },
            {
              id: 12,
              area_name: "文山區",
              area_name_en: "Wenshan Dist.",
              zip_code: "116",
              city_id: 1,
            },
          ],
        },
        {
          id: 2,
          city_name: "基隆市",
          city_name_en: "Keelung City",
          areas: [
            {
              id: 13,
              area_name: "仁愛區",
              area_name_en: "Ren’ai Dist.",
              zip_code: "200",
              city_id: 2,
            },
            {
              id: 14,
              area_name: "信義區",
              area_name_en: "Xinyi Dist.",
              zip_code: "201",
              city_id: 2,
            },
            {
              id: 15,
              area_name: "中正區",
              area_name_en: "Zhongzheng Dist.",
              zip_code: "202",
              city_id: 2,
            },
            {
              id: 16,
              area_name: "中山區",
              area_name_en: "Zhongshan Dist.",
              zip_code: "203",
              city_id: 2,
            },
            {
              id: 17,
              area_name: "安樂區",
              area_name_en: "Anle Dist.",
              zip_code: "204",
              city_id: 2,
            },
            {
              id: 18,
              area_name: "暖暖區",
              area_name_en: "Nuannuan Dist.",
              zip_code: "205",
              city_id: 2,
            },
            {
              id: 19,
              area_name: "七堵區",
              area_name_en: "Qidu Dist.",
              zip_code: "206",
              city_id: 2,
            },
          ],
        },
        {
          id: 3,
          city_name: "新北市",
          city_name_en: "New Taipei City",
          areas: [
            {
              id: 20,
              area_name: "萬里區",
              area_name_en: "Wanli Dist.",
              zip_code: "207",
              city_id: 3,
            },
            {
              id: 21,
              area_name: "金山區",
              area_name_en: "Jinshan Dist.",
              zip_code: "208",
              city_id: 3,
            },
            {
              id: 22,
              area_name: "板橋區",
              area_name_en: "Banqiao Dist.",
              zip_code: "220",
              city_id: 3,
            },
            {
              id: 23,
              area_name: "汐止區",
              area_name_en: "Xizhi Dist.",
              zip_code: "221",
              city_id: 3,
            },
            {
              id: 24,
              area_name: "深坑區",
              area_name_en: "Shenkeng Dist.",
              zip_code: "222",
              city_id: 3,
            },
            {
              id: 25,
              area_name: "石碇區",
              area_name_en: "Shiding Dist.",
              zip_code: "223",
              city_id: 3,
            },
            {
              id: 26,
              area_name: "瑞芳區",
              area_name_en: "Ruifang Dist.",
              zip_code: "224",
              city_id: 3,
            },
            {
              id: 27,
              area_name: "平溪區",
              area_name_en: "Pingxi Dist.",
              zip_code: "226",
              city_id: 3,
            },
            {
              id: 28,
              area_name: "雙溪區",
              area_name_en: "Shuangxi Dist.",
              zip_code: "227",
              city_id: 3,
            },
            {
              id: 29,
              area_name: "貢寮區",
              area_name_en: "Gongliao Dist.",
              zip_code: "228",
              city_id: 3,
            },
            {
              id: 30,
              area_name: "新店區",
              area_name_en: "Xindian Dist.",
              zip_code: "231",
              city_id: 3,
            },
            {
              id: 31,
              area_name: "坪林區",
              area_name_en: "Pinglin Dist.",
              zip_code: "232",
              city_id: 3,
            },
            {
              id: 32,
              area_name: "烏來區",
              area_name_en: "Wulai Dist.",
              zip_code: "233",
              city_id: 3,
            },
            {
              id: 33,
              area_name: "永和區",
              area_name_en: "Yonghe Dist.",
              zip_code: "234",
              city_id: 3,
            },
            {
              id: 34,
              area_name: "中和區",
              area_name_en: "Zhonghe Dist.",
              zip_code: "235",
              city_id: 3,
            },
            {
              id: 35,
              area_name: "土城區",
              area_name_en: "Tucheng Dist.",
              zip_code: "236",
              city_id: 3,
            },
            {
              id: 36,
              area_name: "三峽區",
              area_name_en: "Sanxia Dist.",
              zip_code: "237",
              city_id: 3,
            },
            {
              id: 37,
              area_name: "樹林區",
              area_name_en: "Shulin Dist.",
              zip_code: "238",
              city_id: 3,
            },
            {
              id: 38,
              area_name: "鶯歌區",
              area_name_en: "Yingge Dist.",
              zip_code: "239",
              city_id: 3,
            },
            {
              id: 39,
              area_name: "三重區",
              area_name_en: "Sanchong Dist.",
              zip_code: "241",
              city_id: 3,
            },
            {
              id: 40,
              area_name: "新莊區",
              area_name_en: "Xinzhuang Dist.",
              zip_code: "242",
              city_id: 3,
            },
            {
              id: 41,
              area_name: "泰山區",
              area_name_en: "Taishan Dist.",
              zip_code: "243",
              city_id: 3,
            },
            {
              id: 42,
              area_name: "林口區",
              area_name_en: "Linkou Dist.",
              zip_code: "244",
              city_id: 3,
            },
            {
              id: 43,
              area_name: "蘆洲區",
              area_name_en: "Luzhou Dist.",
              zip_code: "247",
              city_id: 3,
            },
            {
              id: 44,
              area_name: "五股區",
              area_name_en: "Wugu Dist.",
              zip_code: "248",
              city_id: 3,
            },
            {
              id: 45,
              area_name: "八里區",
              area_name_en: "Bali Dist.",
              zip_code: "249",
              city_id: 3,
            },
            {
              id: 46,
              area_name: "淡水區",
              area_name_en: "Tamsui Dist.",
              zip_code: "251",
              city_id: 3,
            },
            {
              id: 47,
              area_name: "三芝區",
              area_name_en: "Sanzhi Dist.",
              zip_code: "252",
              city_id: 3,
            },
            {
              id: 48,
              area_name: "石門區",
              area_name_en: "Shimen Dist.",
              zip_code: "253",
              city_id: 3,
            },
          ],
        },
        {
          id: 4,
          city_name: "連江縣",
          city_name_en: "Lienchiang County",
          areas: [
            {
              id: 49,
              area_name: "南竿鄉",
              area_name_en: "Nangan Township",
              zip_code: "209",
              city_id: 4,
            },
            {
              id: 50,
              area_name: "北竿鄉",
              area_name_en: "Beigan Township",
              zip_code: "210",
              city_id: 4,
            },
            {
              id: 51,
              area_name: "莒光鄉",
              area_name_en: "Juguang Township",
              zip_code: "211",
              city_id: 4,
            },
            {
              id: 52,
              area_name: "東引鄉",
              area_name_en: "Dongyin Township",
              zip_code: "212",
              city_id: 4,
            },
          ],
        },
        {
          id: 5,
          city_name: "宜蘭縣",
          city_name_en: "Yilan County",
          areas: [
            {
              id: 53,
              area_name: "宜蘭市",
              area_name_en: "Yilan City",
              zip_code: "260",
              city_id: 5,
            },
            {
              id: 54,
              area_name: "壯圍鄉",
              area_name_en: "Zhuangwei Township",
              zip_code: "263",
              city_id: 5,
            },
            {
              id: 55,
              area_name: "頭城鎮",
              area_name_en: "Toucheng Township",
              zip_code: "261",
              city_id: 5,
            },
            {
              id: 56,
              area_name: "礁溪鄉",
              area_name_en: "Jiaoxi Township",
              zip_code: "262",
              city_id: 5,
            },
            {
              id: 57,
              area_name: "員山鄉",
              area_name_en: "Yuanshan Township",
              zip_code: "264",
              city_id: 5,
            },
            {
              id: 58,
              area_name: "羅東鎮",
              area_name_en: "Luodong Township",
              zip_code: "265",
              city_id: 5,
            },
            {
              id: 59,
              area_name: "三星鄉",
              area_name_en: "Sanxing Township",
              zip_code: "266",
              city_id: 5,
            },
            {
              id: 60,
              area_name: "大同鄉",
              area_name_en: "Datong Township",
              zip_code: "267",
              city_id: 5,
            },
            {
              id: 61,
              area_name: "五結鄉",
              area_name_en: "Wujie Township",
              zip_code: "268",
              city_id: 5,
            },
            {
              id: 62,
              area_name: "冬山鄉",
              area_name_en: "Dongshan Township",
              zip_code: "269",
              city_id: 5,
            },
            {
              id: 63,
              area_name: "蘇澳鎮",
              area_name_en: "Su’ao Township",
              zip_code: "270",
              city_id: 5,
            },
            {
              id: 64,
              area_name: "南澳鄉",
              area_name_en: "Nan’ao Township",
              zip_code: "272",
              city_id: 5,
            },
            {
              id: 65,
              area_name: "釣魚臺",
              area_name_en: "Diaoyutai",
              zip_code: "290",
              city_id: 5,
            },
          ],
        },
        {
          id: 6,
          city_name: "釣魚臺",
          city_name_en: "Diauyutai",
          areas: [
            {
              id: 66,
              area_name: "釣魚臺",
              area_name_en: "Diaoyutai",
              zip_code: "290",
              city_id: 6,
            },
          ],
        },
        {
          id: 7,
          city_name: "新竹市",
          city_name_en: "Hsinchu City",
          areas: [
            {
              id: 67,
              area_name: "東區",
              area_name_en: "East Dist.",
              zip_code: "300",
              city_id: 7,
            },
            {
              id: 68,
              area_name: "北區",
              area_name_en: "North Dist.",
              zip_code: "300",
              city_id: 7,
            },
            {
              id: 69,
              area_name: "香山區",
              area_name_en: "Xiangshan Dist.",
              zip_code: "300",
              city_id: 7,
            },
          ],
        },
        {
          id: 8,
          city_name: "新竹縣",
          city_name_en: "Hsinchu County",
          areas: [
            {
              id: 70,
              area_name: "寶山鄉",
              area_name_en: "Baoshan Township",
              zip_code: "308",
              city_id: 8,
            },
            {
              id: 71,
              area_name: "竹北市",
              area_name_en: "Zhubei City",
              zip_code: "302",
              city_id: 8,
            },
            {
              id: 72,
              area_name: "湖口鄉",
              area_name_en: "Hukou Township",
              zip_code: "303",
              city_id: 8,
            },
            {
              id: 73,
              area_name: "新豐鄉",
              area_name_en: "Xinfeng Township",
              zip_code: "304",
              city_id: 8,
            },
            {
              id: 74,
              area_name: "新埔鎮",
              area_name_en: "Xinpu Township",
              zip_code: "305",
              city_id: 8,
            },
            {
              id: 75,
              area_name: "關西鎮",
              area_name_en: "Guanxi Township",
              zip_code: "306",
              city_id: 8,
            },
            {
              id: 76,
              area_name: "芎林鄉",
              area_name_en: "Qionglin Township",
              zip_code: "307",
              city_id: 8,
            },
            {
              id: 77,
              area_name: "竹東鎮",
              area_name_en: "Zhudong Township",
              zip_code: "310",
              city_id: 8,
            },
            {
              id: 78,
              area_name: "五峰鄉",
              area_name_en: "Wufeng Township",
              zip_code: "311",
              city_id: 8,
            },
            {
              id: 79,
              area_name: "橫山鄉",
              area_name_en: "Hengshan Township",
              zip_code: "312",
              city_id: 8,
            },
            {
              id: 80,
              area_name: "尖石鄉",
              area_name_en: "Jianshi Township",
              zip_code: "313",
              city_id: 8,
            },
            {
              id: 81,
              area_name: "北埔鄉",
              area_name_en: "Beipu Township",
              zip_code: "314",
              city_id: 8,
            },
            {
              id: 82,
              area_name: "峨眉鄉",
              area_name_en: "Emei Township",
              zip_code: "315",
              city_id: 8,
            },
          ],
        },
        {
          id: 9,
          city_name: "桃園市",
          city_name_en: "Taoyuan City",
          areas: [
            {
              id: 83,
              area_name: "中壢區",
              area_name_en: "Zhongli Dist.",
              zip_code: "320",
              city_id: 9,
            },
            {
              id: 84,
              area_name: "平鎮區",
              area_name_en: "Pingzhen Dist.",
              zip_code: "324",
              city_id: 9,
            },
            {
              id: 85,
              area_name: "龍潭區",
              area_name_en: "Longtan Dist.",
              zip_code: "325",
              city_id: 9,
            },
            {
              id: 86,
              area_name: "楊梅區",
              area_name_en: "Yangmei Dist.",
              zip_code: "326",
              city_id: 9,
            },
            {
              id: 87,
              area_name: "新屋區",
              area_name_en: "Xinwu Dist.",
              zip_code: "327",
              city_id: 9,
            },
            {
              id: 88,
              area_name: "觀音區",
              area_name_en: "Guanyin Dist.",
              zip_code: "328",
              city_id: 9,
            },
            {
              id: 89,
              area_name: "桃園區",
              area_name_en: "Taoyuan Dist.",
              zip_code: "330",
              city_id: 9,
            },
            {
              id: 90,
              area_name: "龜山區",
              area_name_en: "Guishan Dist.",
              zip_code: "333",
              city_id: 9,
            },
            {
              id: 91,
              area_name: "八德區",
              area_name_en: "Bade Dist.",
              zip_code: "334",
              city_id: 9,
            },
            {
              id: 92,
              area_name: "大溪區",
              area_name_en: "Daxi Dist.",
              zip_code: "335",
              city_id: 9,
            },
            {
              id: 93,
              area_name: "復興區",
              area_name_en: "Fuxing Dist.",
              zip_code: "336",
              city_id: 9,
            },
            {
              id: 94,
              area_name: "大園區",
              area_name_en: "Dayuan Dist.",
              zip_code: "337",
              city_id: 9,
            },
            {
              id: 95,
              area_name: "蘆竹區",
              area_name_en: "Luzhu Dist.",
              zip_code: "338",
              city_id: 9,
            },
          ],
        },
        {
          id: 10,
          city_name: "苗栗縣",
          city_name_en: "Miaoli County",
          areas: [
            {
              id: 96,
              area_name: "竹南鎮",
              area_name_en: "Zhunan Township",
              zip_code: "350",
              city_id: 10,
            },
            {
              id: 97,
              area_name: "頭份市",
              area_name_en: "Toufen City",
              zip_code: "351",
              city_id: 10,
            },
            {
              id: 98,
              area_name: "三灣鄉",
              area_name_en: "Sanwan Township",
              zip_code: "352",
              city_id: 10,
            },
            {
              id: 99,
              area_name: "南庄鄉",
              area_name_en: "Nanzhuang Township",
              zip_code: "353",
              city_id: 10,
            },
            {
              id: 100,
              area_name: "獅潭鄉",
              area_name_en: "Shitan Township",
              zip_code: "354",
              city_id: 10,
            },
            {
              id: 101,
              area_name: "後龍鎮",
              area_name_en: "Houlong Township",
              zip_code: "356",
              city_id: 10,
            },
            {
              id: 102,
              area_name: "通霄鎮",
              area_name_en: "Tongxiao Township",
              zip_code: "357",
              city_id: 10,
            },
            {
              id: 103,
              area_name: "苑裡鎮",
              area_name_en: "Yuanli Township",
              zip_code: "358",
              city_id: 10,
            },
            {
              id: 104,
              area_name: "苗栗市",
              area_name_en: "Miaoli City",
              zip_code: "360",
              city_id: 10,
            },
            {
              id: 105,
              area_name: "造橋鄉",
              area_name_en: "Zaoqiao Township",
              zip_code: "361",
              city_id: 10,
            },
            {
              id: 106,
              area_name: "頭屋鄉",
              area_name_en: "Touwu Township",
              zip_code: "362",
              city_id: 10,
            },
            {
              id: 107,
              area_name: "公館鄉",
              area_name_en: "Gongguan Township",
              zip_code: "363",
              city_id: 10,
            },
            {
              id: 108,
              area_name: "大湖鄉",
              area_name_en: "Dahu Township",
              zip_code: "364",
              city_id: 10,
            },
            {
              id: 109,
              area_name: "泰安鄉",
              area_name_en: "Tai’an Township",
              zip_code: "365",
              city_id: 10,
            },
            {
              id: 110,
              area_name: "銅鑼鄉",
              area_name_en: "Tongluo Township",
              zip_code: "366",
              city_id: 10,
            },
            {
              id: 111,
              area_name: "三義鄉",
              area_name_en: "Sanyi Township",
              zip_code: "367",
              city_id: 10,
            },
            {
              id: 112,
              area_name: "西湖鄉",
              area_name_en: "Xihu Township",
              zip_code: "368",
              city_id: 10,
            },
            {
              id: 113,
              area_name: "卓蘭鎮",
              area_name_en: "Zhuolan Township",
              zip_code: "369",
              city_id: 10,
            },
          ],
        },
        {
          id: 11,
          city_name: "臺中市",
          city_name_en: "Taichung City",
          areas: [
            {
              id: 114,
              area_name: "中區",
              area_name_en: "Central Dist.",
              zip_code: "400",
              city_id: 11,
            },
            {
              id: 115,
              area_name: "東區",
              area_name_en: "East Dist.",
              zip_code: "401",
              city_id: 11,
            },
            {
              id: 116,
              area_name: "南區",
              area_name_en: "South Dist.",
              zip_code: "402",
              city_id: 11,
            },
            {
              id: 117,
              area_name: "西區",
              area_name_en: "West Dist.",
              zip_code: "403",
              city_id: 11,
            },
            {
              id: 118,
              area_name: "北區",
              area_name_en: "North Dist.",
              zip_code: "404",
              city_id: 11,
            },
            {
              id: 119,
              area_name: "北屯區",
              area_name_en: "Beitun Dist.",
              zip_code: "406",
              city_id: 11,
            },
            {
              id: 120,
              area_name: "西屯區",
              area_name_en: "Xitun Dist.",
              zip_code: "407",
              city_id: 11,
            },
            {
              id: 121,
              area_name: "南屯區",
              area_name_en: "Nantun Dist.",
              zip_code: "408",
              city_id: 11,
            },
            {
              id: 122,
              area_name: "太平區",
              area_name_en: "Taiping Dist.",
              zip_code: "411",
              city_id: 11,
            },
            {
              id: 123,
              area_name: "大里區",
              area_name_en: "Dali Dist.",
              zip_code: "412",
              city_id: 11,
            },
            {
              id: 124,
              area_name: "霧峰區",
              area_name_en: "Wufeng Dist.",
              zip_code: "413",
              city_id: 11,
            },
            {
              id: 125,
              area_name: "烏日區",
              area_name_en: "Wuri Dist.",
              zip_code: "414",
              city_id: 11,
            },
            {
              id: 126,
              area_name: "豐原區",
              area_name_en: "Fengyuan Dist.",
              zip_code: "420",
              city_id: 11,
            },
            {
              id: 127,
              area_name: "后里區",
              area_name_en: "Houli Dist.",
              zip_code: "421",
              city_id: 11,
            },
            {
              id: 128,
              area_name: "石岡區",
              area_name_en: "Shigang Dist.",
              zip_code: "422",
              city_id: 11,
            },
            {
              id: 129,
              area_name: "東勢區",
              area_name_en: "Dongshi Dist.",
              zip_code: "423",
              city_id: 11,
            },
            {
              id: 130,
              area_name: "和平區",
              area_name_en: "Heping Dist.",
              zip_code: "424",
              city_id: 11,
            },
            {
              id: 131,
              area_name: "新社區",
              area_name_en: "Xinshe Dist.",
              zip_code: "426",
              city_id: 11,
            },
            {
              id: 132,
              area_name: "潭子區",
              area_name_en: "Tanzi Dist.",
              zip_code: "427",
              city_id: 11,
            },
            {
              id: 133,
              area_name: "大雅區",
              area_name_en: "Daya Dist.",
              zip_code: "428",
              city_id: 11,
            },
            {
              id: 134,
              area_name: "神岡區",
              area_name_en: "Shengang Dist.",
              zip_code: "429",
              city_id: 11,
            },
            {
              id: 135,
              area_name: "大肚區",
              area_name_en: "Dadu Dist.",
              zip_code: "432",
              city_id: 11,
            },
            {
              id: 136,
              area_name: "沙鹿區",
              area_name_en: "Shalu Dist.",
              zip_code: "433",
              city_id: 11,
            },
            {
              id: 137,
              area_name: "龍井區",
              area_name_en: "Longjing Dist.",
              zip_code: "434",
              city_id: 11,
            },
            {
              id: 138,
              area_name: "梧棲區",
              area_name_en: "Wuqi Dist.",
              zip_code: "435",
              city_id: 11,
            },
            {
              id: 139,
              area_name: "清水區",
              area_name_en: "Qingshui Dist.",
              zip_code: "436",
              city_id: 11,
            },
            {
              id: 140,
              area_name: "大甲區",
              area_name_en: "Dajia Dist.",
              zip_code: "437",
              city_id: 11,
            },
            {
              id: 141,
              area_name: "外埔區",
              area_name_en: "Waipu Dist.",
              zip_code: "438",
              city_id: 11,
            },
            {
              id: 142,
              area_name: "大安區",
              area_name_en: "Da’an Dist.",
              zip_code: "439",
              city_id: 11,
            },
          ],
        },
        {
          id: 12,
          city_name: "彰化縣",
          city_name_en: "Changhua County",
          areas: [
            {
              id: 143,
              area_name: "彰化市",
              area_name_en: "Changhua City",
              zip_code: "500",
              city_id: 12,
            },
            {
              id: 144,
              area_name: "芬園鄉",
              area_name_en: "Fenyuan Township",
              zip_code: "502",
              city_id: 12,
            },
            {
              id: 145,
              area_name: "花壇鄉",
              area_name_en: "Huatan Township",
              zip_code: "503",
              city_id: 12,
            },
            {
              id: 146,
              area_name: "秀水鄉",
              area_name_en: "Xiushui Township",
              zip_code: "504",
              city_id: 12,
            },
            {
              id: 147,
              area_name: "鹿港鎮",
              area_name_en: "Lukang Township",
              zip_code: "505",
              city_id: 12,
            },
            {
              id: 148,
              area_name: "福興鄉",
              area_name_en: "Fuxing Township",
              zip_code: "506",
              city_id: 12,
            },
            {
              id: 149,
              area_name: "線西鄉",
              area_name_en: "Xianxi Township",
              zip_code: "507",
              city_id: 12,
            },
            {
              id: 150,
              area_name: "和美鎮",
              area_name_en: "Hemei Township",
              zip_code: "508",
              city_id: 12,
            },
            {
              id: 151,
              area_name: "伸港鄉",
              area_name_en: "Shengang Township",
              zip_code: "509",
              city_id: 12,
            },
            {
              id: 152,
              area_name: "員林市",
              area_name_en: "Yuanlin City",
              zip_code: "510",
              city_id: 12,
            },
            {
              id: 153,
              area_name: "社頭鄉",
              area_name_en: "Shetou Township",
              zip_code: "511",
              city_id: 12,
            },
            {
              id: 154,
              area_name: "永靖鄉",
              area_name_en: "Yongjing Township",
              zip_code: "512",
              city_id: 12,
            },
            {
              id: 155,
              area_name: "埔心鄉",
              area_name_en: "Puxin Township",
              zip_code: "513",
              city_id: 12,
            },
            {
              id: 156,
              area_name: "溪湖鎮",
              area_name_en: "Xihu Township",
              zip_code: "514",
              city_id: 12,
            },
            {
              id: 157,
              area_name: "大村鄉",
              area_name_en: "Dacun Township",
              zip_code: "515",
              city_id: 12,
            },
            {
              id: 158,
              area_name: "埔鹽鄉",
              area_name_en: "Puyan Township",
              zip_code: "516",
              city_id: 12,
            },
            {
              id: 159,
              area_name: "田中鎮",
              area_name_en: "Tianzhong Township",
              zip_code: "520",
              city_id: 12,
            },
            {
              id: 160,
              area_name: "北斗鎮",
              area_name_en: "Beidou Township",
              zip_code: "521",
              city_id: 12,
            },
            {
              id: 161,
              area_name: "田尾鄉",
              area_name_en: "Tianwei Township",
              zip_code: "522",
              city_id: 12,
            },
            {
              id: 162,
              area_name: "埤頭鄉",
              area_name_en: "Pitou Township",
              zip_code: "523",
              city_id: 12,
            },
            {
              id: 163,
              area_name: "溪州鄉",
              area_name_en: "Xizhou Township",
              zip_code: "524",
              city_id: 12,
            },
            {
              id: 164,
              area_name: "竹塘鄉",
              area_name_en: "Zhutang Township",
              zip_code: "525",
              city_id: 12,
            },
            {
              id: 165,
              area_name: "二林鎮",
              area_name_en: "Erlin Township",
              zip_code: "526",
              city_id: 12,
            },
            {
              id: 166,
              area_name: "大城鄉",
              area_name_en: "Dacheng Township",
              zip_code: "527",
              city_id: 12,
            },
            {
              id: 167,
              area_name: "芳苑鄉",
              area_name_en: "Fangyuan Township",
              zip_code: "528",
              city_id: 12,
            },
            {
              id: 168,
              area_name: "二水鄉",
              area_name_en: "Ershui Township",
              zip_code: "530",
              city_id: 12,
            },
          ],
        },
        {
          id: 13,
          city_name: "南投縣",
          city_name_en: "Nantou County",
          areas: [
            {
              id: 169,
              area_name: "南投市",
              area_name_en: "Nantou City",
              zip_code: "540",
              city_id: 13,
            },
            {
              id: 170,
              area_name: "中寮鄉",
              area_name_en: "Zhongliao Township",
              zip_code: "541",
              city_id: 13,
            },
            {
              id: 171,
              area_name: "草屯鎮",
              area_name_en: "Caotun Township",
              zip_code: "542",
              city_id: 13,
            },
            {
              id: 172,
              area_name: "國姓鄉",
              area_name_en: "Guoxing Township",
              zip_code: "544",
              city_id: 13,
            },
            {
              id: 173,
              area_name: "埔里鎮",
              area_name_en: "Puli Township",
              zip_code: "545",
              city_id: 13,
            },
            {
              id: 174,
              area_name: "仁愛鄉",
              area_name_en: "Ren’ai Township",
              zip_code: "546",
              city_id: 13,
            },
            {
              id: 175,
              area_name: "名間鄉",
              area_name_en: "Mingjian Township",
              zip_code: "551",
              city_id: 13,
            },
            {
              id: 176,
              area_name: "集集鎮",
              area_name_en: "Jiji Township",
              zip_code: "552",
              city_id: 13,
            },
            {
              id: 177,
              area_name: "水里鄉",
              area_name_en: "Shuili Township",
              zip_code: "553",
              city_id: 13,
            },
            {
              id: 178,
              area_name: "魚池鄉",
              area_name_en: "Yuchi Township",
              zip_code: "555",
              city_id: 13,
            },
            {
              id: 179,
              area_name: "信義鄉",
              area_name_en: "Xinyi Township",
              zip_code: "556",
              city_id: 13,
            },
            {
              id: 180,
              area_name: "竹山鎮",
              area_name_en: "Zhushan Township",
              zip_code: "557",
              city_id: 13,
            },
            {
              id: 181,
              area_name: "鹿谷鄉",
              area_name_en: "Lugu Township",
              zip_code: "558",
              city_id: 13,
            },
          ],
        },
        {
          id: 14,
          city_name: "嘉義市",
          city_name_en: "Chiayi City",
          areas: [
            {
              id: 182,
              area_name: "西區",
              area_name_en: "West Dist.",
              zip_code: "600",
              city_id: 14,
            },
            {
              id: 183,
              area_name: "東區",
              area_name_en: "East Dist.",
              zip_code: "600",
              city_id: 14,
            },
          ],
        },
        {
          id: 15,
          city_name: "嘉義縣",
          city_name_en: "Chiayi County",
          areas: [
            {
              id: 184,
              area_name: "番路鄉",
              area_name_en: "Fanlu Township",
              zip_code: "602",
              city_id: 15,
            },
            {
              id: 185,
              area_name: "梅山鄉",
              area_name_en: "Meishan Township",
              zip_code: "603",
              city_id: 15,
            },
            {
              id: 186,
              area_name: "竹崎鄉",
              area_name_en: "Zhuqi Township",
              zip_code: "604",
              city_id: 15,
            },
            {
              id: 187,
              area_name: "阿里山鄉",
              area_name_en: "Alishan Township",
              zip_code: "605",
              city_id: 15,
            },
            {
              id: 188,
              area_name: "中埔鄉",
              area_name_en: "Zhongpu Township",
              zip_code: "606",
              city_id: 15,
            },
            {
              id: 189,
              area_name: "大埔鄉",
              area_name_en: "Dapu Township",
              zip_code: "607",
              city_id: 15,
            },
            {
              id: 190,
              area_name: "水上鄉",
              area_name_en: "Shuishang Township",
              zip_code: "608",
              city_id: 15,
            },
            {
              id: 191,
              area_name: "鹿草鄉",
              area_name_en: "Lucao Township",
              zip_code: "611",
              city_id: 15,
            },
            {
              id: 192,
              area_name: "太保市",
              area_name_en: "Taibao City",
              zip_code: "612",
              city_id: 15,
            },
            {
              id: 193,
              area_name: "朴子市",
              area_name_en: "Puzi City",
              zip_code: "613",
              city_id: 15,
            },
            {
              id: 194,
              area_name: "東石鄉",
              area_name_en: "Dongshi Township",
              zip_code: "614",
              city_id: 15,
            },
            {
              id: 195,
              area_name: "六腳鄉",
              area_name_en: "Liujiao Township",
              zip_code: "615",
              city_id: 15,
            },
            {
              id: 196,
              area_name: "新港鄉",
              area_name_en: "Xingang Township",
              zip_code: "616",
              city_id: 15,
            },
            {
              id: 197,
              area_name: "民雄鄉",
              area_name_en: "Minxiong Township",
              zip_code: "621",
              city_id: 15,
            },
            {
              id: 198,
              area_name: "大林鎮",
              area_name_en: "Dalin Township",
              zip_code: "622",
              city_id: 15,
            },
            {
              id: 199,
              area_name: "溪口鄉",
              area_name_en: "Xikou Township",
              zip_code: "623",
              city_id: 15,
            },
            {
              id: 200,
              area_name: "義竹鄉",
              area_name_en: "Yizhu Township",
              zip_code: "624",
              city_id: 15,
            },
            {
              id: 201,
              area_name: "布袋鎮",
              area_name_en: "Budai Township",
              zip_code: "625",
              city_id: 15,
            },
          ],
        },
        {
          id: 16,
          city_name: "雲林縣",
          city_name_en: "Yunlin County",
          areas: [
            {
              id: 202,
              area_name: "斗南鎮",
              area_name_en: "Dounan Township",
              zip_code: "630",
              city_id: 16,
            },
            {
              id: 203,
              area_name: "大埤鄉",
              area_name_en: "Dapi Township",
              zip_code: "631",
              city_id: 16,
            },
            {
              id: 204,
              area_name: "虎尾鎮",
              area_name_en: "Huwei Township",
              zip_code: "632",
              city_id: 16,
            },
            {
              id: 205,
              area_name: "土庫鎮",
              area_name_en: "Tuku Township",
              zip_code: "633",
              city_id: 16,
            },
            {
              id: 206,
              area_name: "褒忠鄉",
              area_name_en: "Baozhong Township",
              zip_code: "634",
              city_id: 16,
            },
            {
              id: 207,
              area_name: "東勢鄉",
              area_name_en: "Dongshi Township",
              zip_code: "635",
              city_id: 16,
            },
            {
              id: 208,
              area_name: "臺西鄉",
              area_name_en: "Taixi Township",
              zip_code: "636",
              city_id: 16,
            },
            {
              id: 209,
              area_name: "崙背鄉",
              area_name_en: "Lunbei Township",
              zip_code: "637",
              city_id: 16,
            },
            {
              id: 210,
              area_name: "麥寮鄉",
              area_name_en: "Mailiao Township",
              zip_code: "638",
              city_id: 16,
            },
            {
              id: 211,
              area_name: "斗六市",
              area_name_en: "Douliu City",
              zip_code: "640",
              city_id: 16,
            },
            {
              id: 212,
              area_name: "林內鄉",
              area_name_en: "Linnei Township",
              zip_code: "643",
              city_id: 16,
            },
            {
              id: 213,
              area_name: "古坑鄉",
              area_name_en: "Gukeng Township",
              zip_code: "646",
              city_id: 16,
            },
            {
              id: 214,
              area_name: "莿桐鄉",
              area_name_en: "Citong Township",
              zip_code: "647",
              city_id: 16,
            },
            {
              id: 215,
              area_name: "西螺鎮",
              area_name_en: "Xiluo Township",
              zip_code: "648",
              city_id: 16,
            },
            {
              id: 216,
              area_name: "二崙鄉",
              area_name_en: "Erlun Township",
              zip_code: "649",
              city_id: 16,
            },
            {
              id: 217,
              area_name: "北港鎮",
              area_name_en: "Beigang Township",
              zip_code: "651",
              city_id: 16,
            },
            {
              id: 218,
              area_name: "水林鄉",
              area_name_en: "Shuilin Township",
              zip_code: "652",
              city_id: 16,
            },
            {
              id: 219,
              area_name: "口湖鄉",
              area_name_en: "Kouhu Township",
              zip_code: "653",
              city_id: 16,
            },
            {
              id: 220,
              area_name: "四湖鄉",
              area_name_en: "Sihu Township",
              zip_code: "654",
              city_id: 16,
            },
            {
              id: 221,
              area_name: "元長鄉",
              area_name_en: "Yuanchang Township",
              zip_code: "655",
              city_id: 16,
            },
          ],
        },
        {
          id: 17,
          city_name: "臺南市",
          city_name_en: "Tainan City",
          areas: [
            {
              id: 222,
              area_name: "中西區",
              area_name_en: "West Central Dist.",
              zip_code: "700",
              city_id: 17,
            },
            {
              id: 223,
              area_name: "東區",
              area_name_en: "East Dist.",
              zip_code: "701",
              city_id: 17,
            },
            {
              id: 224,
              area_name: "南區",
              area_name_en: "South Dist.",
              zip_code: "702",
              city_id: 17,
            },
            {
              id: 225,
              area_name: "北區",
              area_name_en: "North Dist.",
              zip_code: "704",
              city_id: 17,
            },
            {
              id: 226,
              area_name: "安平區",
              area_name_en: "Anping Dist.",
              zip_code: "708",
              city_id: 17,
            },
            {
              id: 227,
              area_name: "安南區",
              area_name_en: "Annan Dist.",
              zip_code: "709",
              city_id: 17,
            },
            {
              id: 228,
              area_name: "永康區",
              area_name_en: "Yongkang Dist.",
              zip_code: "710",
              city_id: 17,
            },
            {
              id: 229,
              area_name: "歸仁區",
              area_name_en: "Guiren Dist.",
              zip_code: "711",
              city_id: 17,
            },
            {
              id: 230,
              area_name: "新化區",
              area_name_en: "Xinhua Dist.",
              zip_code: "712",
              city_id: 17,
            },
            {
              id: 231,
              area_name: "左鎮區",
              area_name_en: "Zuozhen Dist.",
              zip_code: "713",
              city_id: 17,
            },
            {
              id: 232,
              area_name: "玉井區",
              area_name_en: "Yujing Dist.",
              zip_code: "714",
              city_id: 17,
            },
            {
              id: 233,
              area_name: "楠西區",
              area_name_en: "Nanxi Dist.",
              zip_code: "715",
              city_id: 17,
            },
            {
              id: 234,
              area_name: "南化區",
              area_name_en: "Nanhua Dist.",
              zip_code: "716",
              city_id: 17,
            },
            {
              id: 235,
              area_name: "仁德區",
              area_name_en: "Rende Dist.",
              zip_code: "717",
              city_id: 17,
            },
            {
              id: 236,
              area_name: "關廟區",
              area_name_en: "Guanmiao Dist.",
              zip_code: "718",
              city_id: 17,
            },
            {
              id: 237,
              area_name: "龍崎區",
              area_name_en: "Longqi Dist.",
              zip_code: "719",
              city_id: 17,
            },
            {
              id: 238,
              area_name: "官田區",
              area_name_en: "Guantian Dist.",
              zip_code: "720",
              city_id: 17,
            },
            {
              id: 239,
              area_name: "麻豆區",
              area_name_en: "Madou Dist.",
              zip_code: "721",
              city_id: 17,
            },
            {
              id: 240,
              area_name: "佳里區",
              area_name_en: "Jiali Dist.",
              zip_code: "722",
              city_id: 17,
            },
            {
              id: 241,
              area_name: "西港區",
              area_name_en: "Xigang Dist.",
              zip_code: "723",
              city_id: 17,
            },
            {
              id: 242,
              area_name: "七股區",
              area_name_en: "Qigu Dist.",
              zip_code: "724",
              city_id: 17,
            },
            {
              id: 243,
              area_name: "將軍區",
              area_name_en: "Jiangjun Dist.",
              zip_code: "725",
              city_id: 17,
            },
            {
              id: 244,
              area_name: "學甲區",
              area_name_en: "Xuejia Dist.",
              zip_code: "726",
              city_id: 17,
            },
            {
              id: 245,
              area_name: "北門區",
              area_name_en: "Beimen Dist.",
              zip_code: "727",
              city_id: 17,
            },
            {
              id: 246,
              area_name: "新營區",
              area_name_en: "Xinying Dist.",
              zip_code: "730",
              city_id: 17,
            },
            {
              id: 247,
              area_name: "後壁區",
              area_name_en: "Houbi Dist.",
              zip_code: "731",
              city_id: 17,
            },
            {
              id: 248,
              area_name: "白河區",
              area_name_en: "Baihe Dist.",
              zip_code: "732",
              city_id: 17,
            },
            {
              id: 249,
              area_name: "東山區",
              area_name_en: "Dongshan Dist.",
              zip_code: "733",
              city_id: 17,
            },
            {
              id: 250,
              area_name: "六甲區",
              area_name_en: "Liujia Dist.",
              zip_code: "734",
              city_id: 17,
            },
            {
              id: 251,
              area_name: "下營區",
              area_name_en: "Xiaying Dist.",
              zip_code: "735",
              city_id: 17,
            },
            {
              id: 252,
              area_name: "柳營區",
              area_name_en: "Liuying Dist.",
              zip_code: "736",
              city_id: 17,
            },
            {
              id: 253,
              area_name: "鹽水區",
              area_name_en: "Yanshui Dist.",
              zip_code: "737",
              city_id: 17,
            },
            {
              id: 254,
              area_name: "善化區",
              area_name_en: "Shanhua Dist.",
              zip_code: "741",
              city_id: 17,
            },
            {
              id: 255,
              area_name: "新市區",
              area_name_en: "Xinshi Dist.",
              zip_code: "744",
              city_id: 17,
            },
            {
              id: 256,
              area_name: "大內區",
              area_name_en: "Danei Dist.",
              zip_code: "742",
              city_id: 17,
            },
            {
              id: 257,
              area_name: "山上區",
              area_name_en: "Shanshang Dist.",
              zip_code: "743",
              city_id: 17,
            },
            {
              id: 258,
              area_name: "安定區",
              area_name_en: "Anding Dist.",
              zip_code: "745",
              city_id: 17,
            },
          ],
        },
        {
          id: 18,
          city_name: "高雄市",
          city_name_en: "Kaohsiung City",
          areas: [
            {
              id: 259,
              area_name: "新興區",
              area_name_en: "Xinxing Dist.",
              zip_code: "800",
              city_id: 18,
            },
            {
              id: 260,
              area_name: "前金區",
              area_name_en: "Qianjin Dist.",
              zip_code: "801",
              city_id: 18,
            },
            {
              id: 261,
              area_name: "苓雅區",
              area_name_en: "Lingya Dist.",
              zip_code: "802",
              city_id: 18,
            },
            {
              id: 262,
              area_name: "鹽埕區",
              area_name_en: "Yancheng Dist.",
              zip_code: "803",
              city_id: 18,
            },
            {
              id: 263,
              area_name: "鼓山區",
              area_name_en: "Gushan Dist.",
              zip_code: "804",
              city_id: 18,
            },
            {
              id: 264,
              area_name: "旗津區",
              area_name_en: "Qijin Dist.",
              zip_code: "805",
              city_id: 18,
            },
            {
              id: 265,
              area_name: "前鎮區",
              area_name_en: "Qianzhen Dist.",
              zip_code: "806",
              city_id: 18,
            },
            {
              id: 266,
              area_name: "三民區",
              area_name_en: "Sanmin Dist.",
              zip_code: "807",
              city_id: 18,
            },
            {
              id: 267,
              area_name: "楠梓區",
              area_name_en: "Nanzi Dist.",
              zip_code: "811",
              city_id: 18,
            },
            {
              id: 268,
              area_name: "小港區",
              area_name_en: "Xiaogang Dist.",
              zip_code: "812",
              city_id: 18,
            },
            {
              id: 269,
              area_name: "左營區",
              area_name_en: "Zuoying Dist.",
              zip_code: "813",
              city_id: 18,
            },
            {
              id: 270,
              area_name: "仁武區",
              area_name_en: "Renwu Dist.",
              zip_code: "814",
              city_id: 18,
            },
            {
              id: 271,
              area_name: "大社區",
              area_name_en: "Dashe Dist.",
              zip_code: "815",
              city_id: 18,
            },
            {
              id: 272,
              area_name: "東沙群島",
              area_name_en: "Dongsha Islands",
              zip_code: "817",
              city_id: 18,
            },
            {
              id: 273,
              area_name: "南沙群島",
              area_name_en: "Nansha Islands",
              zip_code: "819",
              city_id: 18,
            },
            {
              id: 274,
              area_name: "岡山區",
              area_name_en: "Gangshan Dist.",
              zip_code: "820",
              city_id: 18,
            },
            {
              id: 275,
              area_name: "路竹區",
              area_name_en: "Luzhu Dist.",
              zip_code: "821",
              city_id: 18,
            },
            {
              id: 276,
              area_name: "阿蓮區",
              area_name_en: "Alian Dist.",
              zip_code: "822",
              city_id: 18,
            },
            {
              id: 277,
              area_name: "田寮區",
              area_name_en: "Tianliao Dist.",
              zip_code: "823",
              city_id: 18,
            },
            {
              id: 278,
              area_name: "燕巢區",
              area_name_en: "Yanchao Dist.",
              zip_code: "824",
              city_id: 18,
            },
            {
              id: 279,
              area_name: "橋頭區",
              area_name_en: "Qiaotou Dist.",
              zip_code: "825",
              city_id: 18,
            },
            {
              id: 280,
              area_name: "梓官區",
              area_name_en: "Ziguan Dist.",
              zip_code: "826",
              city_id: 18,
            },
            {
              id: 281,
              area_name: "彌陀區",
              area_name_en: "Mituo Dist.",
              zip_code: "827",
              city_id: 18,
            },
            {
              id: 282,
              area_name: "永安區",
              area_name_en: "Yong’an Dist.",
              zip_code: "828",
              city_id: 18,
            },
            {
              id: 283,
              area_name: "湖內區",
              area_name_en: "Hunei Dist.",
              zip_code: "829",
              city_id: 18,
            },
            {
              id: 284,
              area_name: "鳳山區",
              area_name_en: "Fengshan Dist.",
              zip_code: "830",
              city_id: 18,
            },
            {
              id: 285,
              area_name: "大寮區",
              area_name_en: "Daliao Dist.",
              zip_code: "831",
              city_id: 18,
            },
            {
              id: 286,
              area_name: "林園區",
              area_name_en: "Linyuan Dist.",
              zip_code: "832",
              city_id: 18,
            },
            {
              id: 287,
              area_name: "鳥松區",
              area_name_en: "Niaosong Dist.",
              zip_code: "833",
              city_id: 18,
            },
            {
              id: 288,
              area_name: "大樹區",
              area_name_en: "Dashu Dist.",
              zip_code: "840",
              city_id: 18,
            },
            {
              id: 289,
              area_name: "旗山區",
              area_name_en: "Qishan Dist.",
              zip_code: "842",
              city_id: 18,
            },
            {
              id: 290,
              area_name: "美濃區",
              area_name_en: "Meinong Dist.",
              zip_code: "843",
              city_id: 18,
            },
            {
              id: 291,
              area_name: "六龜區",
              area_name_en: "Liugui Dist.",
              zip_code: "844",
              city_id: 18,
            },
            {
              id: 292,
              area_name: "內門區",
              area_name_en: "Neimen Dist.",
              zip_code: "845",
              city_id: 18,
            },
            {
              id: 293,
              area_name: "杉林區",
              area_name_en: "Shanlin Dist.",
              zip_code: "846",
              city_id: 18,
            },
            {
              id: 294,
              area_name: "甲仙區",
              area_name_en: "Jiaxian Dist.",
              zip_code: "847",
              city_id: 18,
            },
            {
              id: 295,
              area_name: "桃源區",
              area_name_en: "Taoyuan Dist.",
              zip_code: "848",
              city_id: 18,
            },
            {
              id: 296,
              area_name: "那瑪夏區",
              area_name_en: "Namaxia Dist.",
              zip_code: "849",
              city_id: 18,
            },
            {
              id: 297,
              area_name: "茂林區",
              area_name_en: "Maolin Dist.",
              zip_code: "851",
              city_id: 18,
            },
            {
              id: 298,
              area_name: "茄萣區",
              area_name_en: "Qieding Dist.",
              zip_code: "852",
              city_id: 18,
            },
          ],
        },
        {
          id: 19,
          city_name: "南海島",
          city_name_en: "Nanhai",
          areas: [
            {
              id: 299,
              area_name: "東沙群島",
              area_name_en: "Dongsha Islands",
              zip_code: "817",
              city_id: 19,
            },
            {
              id: 300,
              area_name: "南沙群島",
              area_name_en: "Nansha Islands",
              zip_code: "819",
              city_id: 19,
            },
          ],
        },
        {
          id: 20,
          city_name: "澎湖縣",
          city_name_en: "Penghu County",
          areas: [
            {
              id: 301,
              area_name: "馬公市",
              area_name_en: "Magong City",
              zip_code: "880",
              city_id: 20,
            },
            {
              id: 302,
              area_name: "西嶼鄉",
              area_name_en: "Xiyu Township",
              zip_code: "881",
              city_id: 20,
            },
            {
              id: 303,
              area_name: "望安鄉",
              area_name_en: "Wang’an Township",
              zip_code: "882",
              city_id: 20,
            },
            {
              id: 304,
              area_name: "七美鄉",
              area_name_en: "Qimei Township",
              zip_code: "883",
              city_id: 20,
            },
            {
              id: 305,
              area_name: "白沙鄉",
              area_name_en: "Baisha Township",
              zip_code: "884",
              city_id: 20,
            },
            {
              id: 306,
              area_name: "湖西鄉",
              area_name_en: "Huxi Township",
              zip_code: "885",
              city_id: 20,
            },
          ],
        },
        {
          id: 21,
          city_name: "金門縣",
          city_name_en: "Kinmen County",
          areas: [
            {
              id: 307,
              area_name: "金沙鎮",
              area_name_en: "Jinsha Township",
              zip_code: "890",
              city_id: 21,
            },
            {
              id: 308,
              area_name: "金湖鎮",
              area_name_en: "Jinhu Township",
              zip_code: "891",
              city_id: 21,
            },
            {
              id: 309,
              area_name: "金寧鄉",
              area_name_en: "Jinning Township",
              zip_code: "892",
              city_id: 21,
            },
            {
              id: 310,
              area_name: "金城鎮",
              area_name_en: "Jincheng Township",
              zip_code: "893",
              city_id: 21,
            },
            {
              id: 311,
              area_name: "烈嶼鄉",
              area_name_en: "Lieyu Township",
              zip_code: "894",
              city_id: 21,
            },
            {
              id: 312,
              area_name: "烏坵鄉",
              area_name_en: "Wuqiu Township",
              zip_code: "896",
              city_id: 21,
            },
          ],
        },
        {
          id: 22,
          city_name: "屏東縣",
          city_name_en: "Pingtung County",
          areas: [
            {
              id: 313,
              area_name: "屏東市",
              area_name_en: "Pingtung City",
              zip_code: "900",
              city_id: 22,
            },
            {
              id: 314,
              area_name: "三地門鄉",
              area_name_en: "Sandimen Township",
              zip_code: "901",
              city_id: 22,
            },
            {
              id: 315,
              area_name: "霧臺鄉",
              area_name_en: "Wutai Township",
              zip_code: "902",
              city_id: 22,
            },
            {
              id: 316,
              area_name: "瑪家鄉",
              area_name_en: "Majia Township",
              zip_code: "903",
              city_id: 22,
            },
            {
              id: 317,
              area_name: "九如鄉",
              area_name_en: "Jiuru Township",
              zip_code: "904",
              city_id: 22,
            },
            {
              id: 318,
              area_name: "里港鄉",
              area_name_en: "Ligang Township",
              zip_code: "905",
              city_id: 22,
            },
            {
              id: 319,
              area_name: "高樹鄉",
              area_name_en: "Gaoshu Township",
              zip_code: "906",
              city_id: 22,
            },
            {
              id: 320,
              area_name: "鹽埔鄉",
              area_name_en: "Yanpu Township",
              zip_code: "907",
              city_id: 22,
            },
            {
              id: 321,
              area_name: "長治鄉",
              area_name_en: "Changzhi Township",
              zip_code: "908",
              city_id: 22,
            },
            {
              id: 322,
              area_name: "麟洛鄉",
              area_name_en: "Linluo Township",
              zip_code: "909",
              city_id: 22,
            },
            {
              id: 323,
              area_name: "竹田鄉",
              area_name_en: "Zhutian Township",
              zip_code: "911",
              city_id: 22,
            },
            {
              id: 324,
              area_name: "內埔鄉",
              area_name_en: "Neipu Township",
              zip_code: "912",
              city_id: 22,
            },
            {
              id: 325,
              area_name: "萬丹鄉",
              area_name_en: "Wandan Township",
              zip_code: "913",
              city_id: 22,
            },
            {
              id: 326,
              area_name: "潮州鎮",
              area_name_en: "Chaozhou Township",
              zip_code: "920",
              city_id: 22,
            },
            {
              id: 327,
              area_name: "泰武鄉",
              area_name_en: "Taiwu Township",
              zip_code: "921",
              city_id: 22,
            },
            {
              id: 328,
              area_name: "來義鄉",
              area_name_en: "Laiyi Township",
              zip_code: "922",
              city_id: 22,
            },
            {
              id: 329,
              area_name: "萬巒鄉",
              area_name_en: "Wanluan Township",
              zip_code: "923",
              city_id: 22,
            },
            {
              id: 330,
              area_name: "崁頂鄉",
              area_name_en: "Kanding Township",
              zip_code: "924",
              city_id: 22,
            },
            {
              id: 331,
              area_name: "新埤鄉",
              area_name_en: "Xinpi Township",
              zip_code: "925",
              city_id: 22,
            },
            {
              id: 332,
              area_name: "南州鄉",
              area_name_en: "Nanzhou Township",
              zip_code: "926",
              city_id: 22,
            },
            {
              id: 333,
              area_name: "林邊鄉",
              area_name_en: "Linbian Township",
              zip_code: "927",
              city_id: 22,
            },
            {
              id: 334,
              area_name: "東港鎮",
              area_name_en: "Donggang Township",
              zip_code: "928",
              city_id: 22,
            },
            {
              id: 335,
              area_name: "琉球鄉",
              area_name_en: "Liuqiu Township",
              zip_code: "929",
              city_id: 22,
            },
            {
              id: 336,
              area_name: "佳冬鄉",
              area_name_en: "Jiadong Township",
              zip_code: "931",
              city_id: 22,
            },
            {
              id: 337,
              area_name: "新園鄉",
              area_name_en: "Xinyuan Township",
              zip_code: "932",
              city_id: 22,
            },
            {
              id: 338,
              area_name: "枋寮鄉",
              area_name_en: "Fangliao Township",
              zip_code: "940",
              city_id: 22,
            },
            {
              id: 339,
              area_name: "枋山鄉",
              area_name_en: "Fangshan Township",
              zip_code: "941",
              city_id: 22,
            },
            {
              id: 340,
              area_name: "春日鄉",
              area_name_en: "Chunri Township",
              zip_code: "942",
              city_id: 22,
            },
            {
              id: 341,
              area_name: "獅子鄉",
              area_name_en: "Shizi Township",
              zip_code: "943",
              city_id: 22,
            },
            {
              id: 342,
              area_name: "車城鄉",
              area_name_en: "Checheng Township",
              zip_code: "944",
              city_id: 22,
            },
            {
              id: 343,
              area_name: "牡丹鄉",
              area_name_en: "Mudan Township",
              zip_code: "945",
              city_id: 22,
            },
            {
              id: 344,
              area_name: "恆春鎮",
              area_name_en: "Hengchun Township",
              zip_code: "946",
              city_id: 22,
            },
            {
              id: 345,
              area_name: "滿州鄉",
              area_name_en: "Manzhou Township",
              zip_code: "947",
              city_id: 22,
            },
          ],
        },
        {
          id: 23,
          city_name: "臺東縣",
          city_name_en: "Taitung County",
          areas: [
            {
              id: 346,
              area_name: "臺東市",
              area_name_en: "Taitung City",
              zip_code: "950",
              city_id: 23,
            },
            {
              id: 347,
              area_name: "綠島鄉",
              area_name_en: "Ludao Township",
              zip_code: "951",
              city_id: 23,
            },
            {
              id: 348,
              area_name: "蘭嶼鄉",
              area_name_en: "Lanyu Township",
              zip_code: "952",
              city_id: 23,
            },
            {
              id: 349,
              area_name: "延平鄉",
              area_name_en: "Yanping Township",
              zip_code: "953",
              city_id: 23,
            },
            {
              id: 350,
              area_name: "卑南鄉",
              area_name_en: "Beinan Township",
              zip_code: "954",
              city_id: 23,
            },
            {
              id: 351,
              area_name: "鹿野鄉",
              area_name_en: "Luye Township",
              zip_code: "955",
              city_id: 23,
            },
            {
              id: 352,
              area_name: "關山鎮",
              area_name_en: "Guanshan Township",
              zip_code: "956",
              city_id: 23,
            },
            {
              id: 353,
              area_name: "海端鄉",
              area_name_en: "Haiduan Township",
              zip_code: "957",
              city_id: 23,
            },
            {
              id: 354,
              area_name: "池上鄉",
              area_name_en: "Chishang Township",
              zip_code: "958",
              city_id: 23,
            },
            {
              id: 355,
              area_name: "東河鄉",
              area_name_en: "Donghe Township",
              zip_code: "959",
              city_id: 23,
            },
            {
              id: 356,
              area_name: "成功鎮",
              area_name_en: "Chenggong Township",
              zip_code: "961",
              city_id: 23,
            },
            {
              id: 357,
              area_name: "長濱鄉",
              area_name_en: "Changbin Township",
              zip_code: "962",
              city_id: 23,
            },
            {
              id: 358,
              area_name: "太麻里鄉",
              area_name_en: "Taimali Township",
              zip_code: "963",
              city_id: 23,
            },
            {
              id: 359,
              area_name: "金峰鄉",
              area_name_en: "Jinfeng Township",
              zip_code: "964",
              city_id: 23,
            },
            {
              id: 360,
              area_name: "大武鄉",
              area_name_en: "Dawu Township",
              zip_code: "965",
              city_id: 23,
            },
            {
              id: 361,
              area_name: "達仁鄉",
              area_name_en: "Daren Township",
              zip_code: "966",
              city_id: 23,
            },
          ],
        },
        {
          id: 24,
          city_name: "花蓮縣",
          city_name_en: "Hualien County",
          areas: [
            {
              id: 362,
              area_name: "花蓮市",
              area_name_en: "Hualien City",
              zip_code: "970",
              city_id: 24,
            },
            {
              id: 363,
              area_name: "新城鄉",
              area_name_en: "Xincheng Township",
              zip_code: "971",
              city_id: 24,
            },
            {
              id: 364,
              area_name: "秀林鄉",
              area_name_en: "Xiulin Township",
              zip_code: "972",
              city_id: 24,
            },
            {
              id: 365,
              area_name: "吉安鄉",
              area_name_en: "Ji’an Township",
              zip_code: "973",
              city_id: 24,
            },
            {
              id: 366,
              area_name: "壽豐鄉",
              area_name_en: "Shoufeng Township",
              zip_code: "974",
              city_id: 24,
            },
            {
              id: 367,
              area_name: "鳳林鎮",
              area_name_en: "Fenglin Township",
              zip_code: "975",
              city_id: 24,
            },
            {
              id: 368,
              area_name: "光復鄉",
              area_name_en: "Guangfu Township",
              zip_code: "976",
              city_id: 24,
            },
            {
              id: 369,
              area_name: "豐濱鄉",
              area_name_en: "Fengbin Township",
              zip_code: "977",
              city_id: 24,
            },
            {
              id: 370,
              area_name: "瑞穗鄉",
              area_name_en: "Ruisui Township",
              zip_code: "978",
              city_id: 24,
            },
            {
              id: 371,
              area_name: "萬榮鄉",
              area_name_en: "Wanrong Township",
              zip_code: "979",
              city_id: 24,
            },
            {
              id: 372,
              area_name: "玉里鎮",
              area_name_en: "Yuli Township",
              zip_code: "981",
              city_id: 24,
            },
            {
              id: 373,
              area_name: "卓溪鄉",
              area_name_en: "Zhuoxi Township",
              zip_code: "982",
              city_id: 24,
            },
            {
              id: 374,
              area_name: "富里鄉",
              area_name_en: "Fuli Township",
              zip_code: "983",
              city_id: 24,
            },
          ],
        },
      ];
      cityAreaData.value = response;
      storeData.value = await apiGetStore();
      // console.log(storeData.value)
    });

    //檔案上傳
    const myUploadFile = ref(null);
    const handleFileUpload = async () => {
      //一定要這樣寫 [ref的名稱].value.files //固定寫files=FileList
      let requestData = new FormData();
      requestData.append("images", myUploadFile.value.files[0]);
      // console.log("myUploadFile", myUploadFile.value.files[0]);
      // console.log("requestData", requestData.get('images'));
      //檢查上傳檔案大小
      // const fileInput = document.getElementById("formFile");
      // const getFile = fileInput.files[0].size / 1024 / 1024;

      // if (getFile > process.env.VUE_APP_UPLOAD_LIMIT) {
      //   Toast("圖片檔案大小上限為6MB");
      // } else {
      try {
        const response = await apiStoreUpload(requestData);
        if (response.result) {
          storeData.value.images = `["${response.path}"]` || "";
        }
      } catch (error) {
        console.log("error", error);
      }
      // }
    };

    //
    const priceRangeOption = ["$", "$$", "$$$", "$$$$", "$$$$$"];
    const priceRangeClass = (item) =>
      item === storeData.value.price_range
        ? "btn btn-primary"
        : "btn btn-outline-primary";
    const handlePriceRange = (item) => {
      storeData.value.price_range = item;
    };

    const categoryOption = ["食", "衣", "住", "行", "樂"];
    const categoryClass = (item) =>
      item === storeData.value.category
        ? "btn btn-primary"
        : "btn btn-outline-primary";
    const handleCategory = (item) => {
      storeData.value.category = item;
    };

    const handleImg = (item) => {
      if (item) {
        return JSON.parse(item)[0];
      }
      return "";
    };
    const isStoreOpen = ref(true);
    watch(
      () => isStoreOpen.value,
      (val) => {
        storeData.value.is_open = val ? 1 : 0;
      }
    );
    return {
      storeData,
      save,
      form,
      myUploadFile,
      handleFileUpload,
      cityAreaData,
      areaList,
      findAreaWithCityId,
      priceRangeOption,
      priceRangeClass,
      handlePriceRange,
      categoryOption,
      categoryClass,
      handleCategory,
      isStoreOpen,
      handleImg,
    };
  },
  components: {},
};
</script>

<template>
  <div class="main">
    <section class="c-main">
      <div class="form-container">
        <form>
          <div class="image-container">
            <div class="image">
              <!-- <img src="@/assets/images/img_shop.png"> -->
              <img :src="handleImg(storeData.images)" v-if="storeData.images" />
              <img src="@/assets/image/noavatar.jpg" v-if="!storeData.images" />
              <input
                class="form-control"
                type="file"
                id="formFile"
                accept="image/png, image/jpeg"
                ref="myUploadFile"
                @change="handleFileUpload"
                style="display: none"
              />
            </div>
            <div class="camera-container">
              <label class="form-file-label">
                <i class="icon icon-camera"></i>
              </label>
              <input type="file" class="form-file-input" />
            </div>
          </div>
          <div class="mb-2">
            <label class="form-label"
              >商店名稱<span class="must">必填</span></label
            >
            <input
              type="text"
              class="form-control"
              placeholder="請輸入商店名稱"
              v-model="storeData.name"
              required
            />
          </div>
          <div class="mb-2">
            <label class="form-label">負責人</label>
            <input
              type="text"
              class="form-control"
              placeholder="請輸入負責人名稱"
              v-model="storeData.contact"
              required
            />
          </div>
          <div class="mb-2">
            <label class="form-label"
              >商店地址<span class="must">必填</span></label
            >
            <div class="row mb-2">
              <div class="col">
                <select
                  class="col form-control form-select"
                  v-model="storeData.city"
                  required
                >
                  <option value="undefined" disabled>請選擇縣市</option>
                  <option
                    v-for="item in cityAreaData"
                    :value="item.id"
                    :key="item.id"
                  >
                    {{ item.city_name }}
                  </option>
                </select>
              </div>
              <div class="col">
                <select
                  class="col form-control form-select"
                  v-model="storeData.area"
                  required
                >
                  <option value="undefined" disabled>請選擇鄉鎮區</option>
                  <option
                    v-for="item in areaList"
                    :value="item.id"
                    :key="item.id"
                  >
                    {{ item.area_name }}
                  </option>
                </select>
              </div>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="請輸入商店地址"
              v-model="storeData.address"
            />
          </div>
          <div class="mb-2">
            <label class="form-label">電話</label>
            <input
              type="text"
              class="form-control"
              placeholder="請輸入店家電話"
              v-model="storeData.tel"
            />
          </div>
          <!-- no -->
          <div class="mb-2">
            <label class="form-label">營業時間</label>
            <div class="input-list">
              <div class="form-check mb-2">
                <input
                  type="checkbox"
                  class="form-check-input"
                  name="week1"
                  id="week1"
                />
                <label class="form-check-label" for="week1">星期日</label>
              </div>
              <div class="form-check mb-2">
                <input
                  type="checkbox"
                  class="form-check-input"
                  name="week2"
                  id="week2"
                  checked
                />
                <label class="form-check-label" for="week2">星期一</label>
              </div>
              <div class="row mb-2">
                <div class="col">
                  <input
                    type="time"
                    class="form-control"
                    placeholder="請選擇時間"
                  />
                </div>
                <div class="col">
                  <input
                    type="time"
                    class="form-control"
                    placeholder="請選擇時間"
                  />
                </div>
              </div>
              <div class="form-check mb-2">
                <input
                  type="checkbox"
                  class="form-check-input"
                  name="week3"
                  id="week3"
                />
                <label class="form-check-label" for="week3">星期二</label>
              </div>
              <div class="form-check mb-2">
                <input
                  type="checkbox"
                  class="form-check-input"
                  name="week4"
                  id="week4"
                />
                <label class="form-check-label" for="week4">星期三</label>
              </div>
              <div class="form-check mb-2">
                <input
                  type="checkbox"
                  class="form-check-input"
                  name="week5"
                  id="week5"
                />
                <label class="form-check-label" for="week5">星期四</label>
              </div>
              <div class="form-check mb-2">
                <input
                  type="checkbox"
                  class="form-check-input"
                  name="week6"
                  id="week6"
                />
                <label class="form-check-label" for="week6">星期五</label>
              </div>
              <div class="form-check mb-2">
                <input
                  type="checkbox"
                  class="form-check-input"
                  name="week7"
                  id="week7"
                />
                <label class="form-check-label" for="week7">星期六</label>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="mb-2">
            <label class="form-label">大分類</label>
            <div class="input-pill">
              <div class="row">
                <div
                  class="col form-check"
                  v-for="item in categoryOption"
                  :key="item"
                >
                  <input
                    type="radio"
                    class="form-check-input"
                    name="kind"
                    :id="item"
                    :checked="item === storeData.category"
                  />
                  <label
                    class="form-check-label"
                    :for="item"
                    @click="handleCategory(item)"
                    >{{ item }}</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="mb-2">
            <label class="form-label">價格範圍</label>
            <div class="input-pill">
              <div class="row">
                <div
                  class="col form-check"
                  v-for="item2 in priceRangeOption"
                  :key="item2"
                >
                  <input
                    type="radio"
                    class="form-check-input"
                    name="price"
                    :id="item2"
                    :checked="item2  === storeData.price_range"
                  />
                  <label
                    class="form-check-label"
                    :for="item2"
                    @click="handlePriceRange(item2)"
                    >{{ item2 }}</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="mb-2">
            <label class="form-label">分類標籤(請用逗號分格標籤)</label>
            <input
              type="text"
              class="form-control"
              placeholder="請輸入分類標籤"
              v-model="storeData.keywords"
            />
          </div>
          <div class="mt-3 mb-2">
            <div class="form-check form-switch">
              <label class="form-check-label" for="SwitchCheck">商店狀態</label>
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                v-model="isStoreOpen"
                checked
              />
            </div>
          </div>
          <div class="btn-container mt-4 d-flex justify-content-center">
            <button class="btn btn-next-grey" type="submit" @click="save">
              <i class="icon icon-next"></i>
            </button>
          </div>          
          <!-- <div class="btn-container mt-4 d-flex justify-content-between">
            <button class="btn btn-skip" type="button">Skip</button>
            <button class="btn btn-next-grey" type="submit" @click="save">
              <i class="icon icon-next"></i>
            </button>
          </div> -->
        </form>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.main {
  margin-top: $header-height;
  padding: 0.25rem;
}
</style>
