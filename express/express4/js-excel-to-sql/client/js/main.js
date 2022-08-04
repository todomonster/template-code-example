new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: () => ({
    i18n: {
      random: "亂數獲取資料",
      save: "儲存該月紀錄",
      teach: `
  已知問題:
      現金和行動支付數值差異太大，故需要將該月金額大幅降低

  操作說明:
      功能1 生成新卡片 | 點右下角新增按鈕，選擇資料日期
      功能2 即時估算金額  | 行動支付和現金支付合計為100%
      功能3 亂數產生 | input: 輸入預估該月金額 行動支付% 現金支付% | output: table
      功能4 存檔 | 儲存亂數產生資料(id陣列) 放在 localStorage
      `,
      ok: "確認",
      limit: "總金額上限:   ",
      mobileLimit: "行動支付上限:   ",
      cashLimit: "現金支付上限:   ",
    },
    textLabel: {
      calculate: "預估金額",
      mobile: "預估行動支付占 %",
      cash: "預估現金支付占 %",
      wantBenefit: "預估該月金額",
      date: "資料日期",
    },
    // dialog
    dialog: false,
    items: ["2022/03", "2022/04", "2022/05", "2022/06"],
    select: "2022/03",
    btnState: false,
    // card
    cards: [],
    headers: [
      { text: "id", value: "id", sortable: false },
      { text: "店別", value: "店別", sortable: false },
      { text: "銷售單號", value: "銷售單號", sortable: false },
      { text: "機號", value: "機號", sortable: false },
      // { text: "顧客編號", value: "顧客編號" ,sortable: false,},
      // { text: "顧客姓名", value: "顧客姓名", sortable: false },
      // { text: "持卡人", value: "持卡人" ,sortable: false,},
      { text: "付款方式", value: "付款方式", sortable: false },
      { text: "款項金額", value: "款項金額", sortable: false },
      { text: "結帳時間", value: "結帳時間", sortable: false },
      // { text: "註記", value: "註記" ,sortable: false,},
      // { text: "結帳員工", value: "結帳員工" ,sortable: false,},
    ],
    // rules
    percentRules: [(v) => (!!v && v !== 0) || "required"],
    rules: {
      percentMin(value, min) {
        return (value || "") >= min || `提示: 需要大於 ${min} `;
      },
      percentMax(value, max) {
        return (value || "") <= max || `提示: 最多 ${max}`;
      },
    },
  }),
  computed: {},
  watch: {},
  mounted() {
    console.clear();
    // this.getStatus();
    // this.getMobile();
    // this.getCash();
  },
  methods: {
    toNTD(prices) {
      return prices.toLocaleString("zh-TW", {
        style: "currency",
        currency: "TWD",
      });
    },

    async addCard() {
      this.btnState = true;
      const selected = this.select.split("/");
      const data = await fetch(
        `http://localhost:3011/status/${selected[0]}/${selected[1]}`
      )
        .then((response) => response.json())
        .then((data) => {
          const { cash, mobile } = data;
          const total = cash.sum + mobile.sum;
          const card = {
            year: selected[0],
            month: selected[1],
            title: `${selected[0]}/${selected[1]}`,
            cash,
            mobile,
            monthPrice: total * 0.02,
            mobilePercent: 75,
            // cashPercent: 25,
            total: total,
            show: false,
            headers: this.headers,
            items: [],
            now: 1,
          };
          this.cards.push(card);

          return data;
        })
        .catch((err) => {
          if (err.message === "Failed to fetch") {
            alert("後端server沒開");
          }
          console.log(err);
        });
      this.dialog = false;
      this.btnState = false;
    },
    async genTable(obj, index) {
      const { year, month, now } = obj;
      this.validation(obj);
      try {
        const mobileData = await this.getMobile({ year, month }, now);
        this.cards[index].items.push(...mobileData.data);
        const cashData = await this.getCash({ year, month }, now);
        this.cards[index].items.push(...cashData.data);
        this.cards[index].show = true;
        this.cards[index].now++;
      } catch (error) {
        console.log(error);
      }
    },
    validation(obj) {
      const { monthPrice, cash, mobile, total, mobilePercent } = obj;
      //1. percent
      if (mobilePercent < 0 || mobilePercent > 100) {
        alert("不符合 %數規則");
        return;
      }
      //2. 超過金額
      if (monthPrice < 0 || monthPrice > total) {
        alert("不符合 總金額規則");
        return;
      }
      //3.
      if ((mobilePercent * monthPrice) / 100 > mobile.sum) {
        alert("超過 mobile 最大上限");
        return;
      }
      if (((100 - mobilePercent) * monthPrice) / 100 > cash.sum) {
        alert("超過 cash 最大上限");
        return;
      }
    },
    saveId(card) {
      const saveItems = card.items.map((x) => x.id);
      localStorage.setItem(card.title, JSON.stringify(saveItems));
      alert("ok");
    },
    getMobile(selected = { year: "2022", month: "03" }, now = 1) {
      const { year, month } = selected;
      const limit = 5;
      return fetch(
        `http://localhost:3011/mobile/${year}/${month}?limit=${limit}&now=${now}`
      )
        .then((response) => response.json())
        .then((data) => data);
    },
    getCash(selected = { year: "2022", month: "03" }, now = 1) {
      const { year, month } = selected;
      const limit = 5;
      return fetch(
        `http://localhost:3011/cash/${year}/${month}?limit=${limit}&now=${now}`
      )
        .then((response) => response.json())
        .then((data) => data);
    },
  },
});
