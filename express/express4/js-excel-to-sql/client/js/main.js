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
      { text: "Num", value: "index", sortable: false },
      // { text: "id", value: "id", sortable: false },
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
  watch: {},
  mounted() {
    console.clear();
  },
  methods: {
    toNTD(prices) {
      if (!prices) return "";
      return prices.toLocaleString("zh-TW", {
        style: "currency",
        currency: "TWD",
      });
    },
    itemsWithIndex(index) {
      return this.cards[index].items.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
    async addCard() {
      this.btnState = true;
      const selected = this.select.split("/");
      // ===============================

      await fetch(`http://localhost:3011/status/${selected[0]}/${selected[1]}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) return;
          const { cash, mobile } = data;
          const total = cash.sum + mobile.sum;
          const { cashPages, mobilePages, pageCount } = this.countPage(
            cash.rows,
            mobile.rows
          );
          const card = {
            year: selected[0],
            month: selected[1],
            title: `${selected[0]}/${selected[1]}`,
            cash,
            mobile,
            monthPrice: total * 0.2,
            mobilePercent: 75,
            // cashPercent: 25,
            total: total,
            show: false,
            headers: this.headers,
            items: [],
            page: 1,
            pageCount,
            cashPages,
            mobilePages,
            ids: [],
            newTotal: 0,
            newRows: 0,
            index: this.cards.length,
          };

          return card;
        })
        .then(async (card) => {
          const data = await this.getRandom(card);
          card.newTotal = data.mobileTotal + data.cashTotal;
          card.newRows = data.cash.length + data.mobile.length;
          card.ids = [
            ...data.cash.map((x) => x.id),
            ...data.mobile.map((x) => x.id),
          ];
          // console.log(data)
          this.cards.push(card);
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
    countPage(cashRows, mobileRows) {
      const cashPages = Math.floor(cashRows / 5);
      const mobilePages = Math.floor(mobileRows / 5);
      const pageCount = cashPages + mobilePages;
      return { cashPages, mobilePages, pageCount };
    },
    async genTable(obj, index) {
      const { year, month, page, cashPages, mobilePages, ids } = obj;
      if (this.validation(obj)) {
        try {
          const mobileData = await this.getMobile(
            { year, month },
            cashPages,
            ids
          );
          this.cards[index].items.push(...mobileData.data);
          const cashData = await this.getCash(
            { year, month },
            mobilePages,
            ids
          );
          this.cards[index].items.push(...cashData.data);
          this.cards[index].show = true;
        } catch (error) {
          console.log(error);
        }
      }
    },
    validation(obj) {
      const { monthPrice, cash, mobile, total, mobilePercent } = obj;
      //1. percent
      if (mobilePercent < 0 || mobilePercent > 100) {
        alert("不符合 %數規則");
        return false;
      }
      //2. 超過金額
      if (monthPrice < 0 || monthPrice > total) {
        alert("不符合 總金額規則");
        return false;
      }
      //3.
      if ((mobilePercent * monthPrice) / 100 > mobile.sum) {
        alert("超過 mobile 最大上限");
        return false;
      }
      if (((100 - mobilePercent) * monthPrice) / 100 > cash.sum) {
        alert("超過 cash 最大上限");
        return false;
      }
      return true;
    },
    saveId(card) {
      // const saveItems = card.items.map((x) => x.id);
      localStorage.setItem(card.title, JSON.stringify(card.ids));
      alert("ok");
    },
    getMobile(selected = { year: "2022", month: "03" }, page = 1, ids) {
      const { year, month } = selected;
      const limit = 5;
      return fetch(
        `http://localhost:3011/mobile/${year}/${month}?limit=${limit}&page=${page}`
      )
        .then((response) => response.json())
        .then((data) => data);
    },
    getCash(selected = { year: "2022", month: "03" }, page = 1, ids) {
      const { year, month } = selected;
      const limit = 5;
      return fetch(
        `http://localhost:3011/cash/${year}/${month}?limit=${limit}&page=${page}`
      )
        .then((response) => response.json())
        .then((data) => data);
    },
    // 明天繼續寫
    getRandom(item) {
      const { year, month, index, monthPrice, mobilePercent } = item;
      let headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      //以下是API文件中提及必寫的主體参數。而以下這個產品資料是六角學院提供的。
      let body = { year, month, index, monthPrice, mobilePercent };
      return fetch(`http://localhost:3011/random`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    },
  },
});
