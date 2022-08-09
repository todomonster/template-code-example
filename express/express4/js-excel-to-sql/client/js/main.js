new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: () => ({
    baseUrl: "http://10.1.1.111:3011" || "http://localhost:3011",
    i18n: {
      random: "再執行亂數獲取資料",
      save: "儲存該月紀錄",
      teach: `
  已知問題:
      現金和行動支付數值差異太大，故需要將該月金額大幅降低

  操作說明:
      功能1 生成新卡片 | 點右下角新增按鈕，選擇資料日期
      功能2 即時估算金額  | 行動支付和現金支付合計為100%
      功能3 亂數產生 | input: 輸入預估該月金額 行動支付% 現金支付% | output: table
      功能4 存檔 | 儲存亂數產生資料的id陣列和預估該月金額等數值放在 localStorage
      `,
      ok: "確認",
      limit: "總金額上限:   ",
      mobileLimit: "行動支付上限:   ",
      cashLimit: "現金支付上限:   ",
      cashRatio: "現金上限 占比:\n",
      mobileRatio: "行動上限 占比:\n",
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
      // { text: "Num", value: "index", sortable: false },
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
    calculatePrice(card, mode = "mobile") {
      const { monthPrice, mobilePercent } = card;
      let ans = 0;
      switch (mode) {
        case "mobile":
          ans = (monthPrice * mobilePercent) / 100;
          break;
        case "cash":
          ans = monthPrice - (monthPrice * mobilePercent) / 100;
          break;
      }
      return ans;
    },
    calculatePercent(card, mode = "mobile") {
      const { cash, mobile } = card;
      const maxCash = cash.sum;
      const maxMobile = mobile.sum;
      let value = 0;
      let ans = 0;
      switch (mode) {
        case "mobile":
          value = this.calculatePrice(card, mode);
          ans = value / maxMobile;
          break;
        case "cash":
          value = this.calculatePrice(card, mode);
          ans = value / maxCash;
          break;
      }
      return ans * 100;
    },

    async addCard() {
      this.btnState = true;
      const selected = this.select.split("/");

      await fetch(`${this.baseUrl}/status/${selected[0]}/${selected[1]}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) return;
          const { cash, mobile } = data;
          const total = cash.sum + mobile.sum;
          // 計算 ids rows
          const { cashPagination, mobilePagination } = this.countAllRows(
            cash.rows,
            mobile.rows
          );
          const card = {
            year: selected[0],
            month: selected[1],
            title: `${selected[0]}/${selected[1]}`,
            cash,
            mobile,
            monthPrice: total * 0.1,
            mobilePercent: 2,
            total: total, // 預估該月金額 monthPrice
            show: false,//展開 table
            headers: this.headers,
            items: [],
            //table pagination
            page: 1,
            len: 999, //頁數有多少
            cashPagination, //cash 頁數有多少 每頁5筆
            mobilePagination, //mobile 頁數有多少 每頁5筆
            //
            ids: {
              cash: [],
              mobile: [],
            },
            newTotal: 0, //總金額
            newMobileTotal: 0,
            newCashTotal: 0,
            newRows: 0, //總筆數
            newMobileRows: 0,
            newCashRows: 0,
            index: this.cards.length,
          };

          return card;
        })
        .then(async (card) => {
          const data = await this.getRandom(card);
          const newCard = this.setRefresh(card, data);
          this.cards.push(newCard);
          return newCard;
        })
        .then(async (card) => {
          this.generate(card, card.index, 1);
          console.log("myCard:", card);
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
    countAllRows(cRows, mRows) {
      const cashPagination = Math.floor(cRows / 5);
      const mobilePagination = Math.floor(mRows / 5);
      return { cashPagination, mobilePagination };
    },
    setRefresh(card, data) {
      const { mobileTotal, cashTotal } = data;
      const cashLen = data.cash.length;
      const mobileLen = data.mobile.length;
      card.newTotal = mobileTotal + cashTotal;
      const length = cashLen + mobileLen;
      card.newRows = length;
      card.ids.cash = [...data.cash.map((x) => x.id)];
      card.ids.mobile = [...data.mobile.map((x) => x.id)];
      card.len = Math.floor(length / 10);
      //
      card.newMobileTotal = mobileTotal;
      card.newCashTotal = cashTotal;
      card.newMobileRows = mobileLen;
      card.newCashRows = cashLen;
      return card;
    },
    redo(INDEX) {
      const card = this.cards[INDEX];
      let flag = this.validation(card);
      if (flag) {
        new Promise(async (resolve, reject) => {
          return resolve(await this.getRandom(card));
        })
          .then((data) => {
            return this.setRefresh(card, data);
          })
          .then(async (card) => {
            await this.generate(card, card.index, 1);
            console.log("myCard:", card);
          })
          .catch((err) => {
            if (err.message === "Failed to fetch") {
              alert("後端server沒開");
            }
            console.log(err);
          });
      }
    },
    async generate(cardItem, index, page = 1, checkSign) {
      const copy = JSON.parse(JSON.stringify(cardItem));
      try {
        const { ids } = copy;
        const start = (page - 1) * 5;
        const end = start + 5;
        let cashPageData = ids.cash.slice(start, end);
        let mobilePageData = ids.mobile.slice(start, end);

        let flag = true;
        if (checkSign === true) flag = this.validation(copy);

        if (flag) {
          // 分頁系統
          let ids = {
            cash: cashPageData,
            mobile: mobilePageData,
          };
          const data = await this.getData(ids);
          let ans = [...data.cash, ...data.mobile];
          //
          this.cards[index].items = [...ans];
          this.cards[index].show = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    next(card, index) {
      this.generate(card, index, card.page);
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
      //3. maxValue
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
      localStorage.setItem(
        card.title + "mobile",
        JSON.stringify(card.ids.mobile)
      );
      localStorage.setItem(card.title + "cash", JSON.stringify(card.ids.cash));
      const { monthPrice, mobilePercent } = card;
      const cashPercent = 100 - mobilePercent;
      localStorage.setItem(
        card.title + "-status",
        JSON.stringify({ monthPrice, mobilePercent, cashPercent })
      );
      alert("ok");
    },
    // API
    getRandom(item) {
      const { year, month, index, monthPrice, mobilePercent } = item;
      let headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const ratio = {
        cash: this.calculatePercent(item, "cash"),
        mobile: this.calculatePercent(item, "mobile"),
      };
      let body = { year, month, index, monthPrice, mobilePercent, ratio };
      return fetch(`${this.baseUrl}/random`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    },
    getData(ids) {
      let headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      let body = ids;
      return fetch(`${this.baseUrl}/orders`, {
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
