new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: () => ({
    baseUrl: "http://10.1.1.165:3011" || "http://localhost:3011",
    // selectDBTable: {},
    // selectDBTables: [
    //   { state: "cash", value: "cash" },
    //   { state: "mobile", value: "mobile" },
    // ],
    //
    executeMode: {},
    executeModes: [
      { state: "cash 到 cash_official", value: "cash,cash_official" },
      { state: "mobile 到 mobile_official", value: "mobile,mobile_official" },
      { state: "cash_official 到 cash", value: "cash_official,cash" },
      { state: "mobile_official 到 mobile", value: "mobile_official,mobile" },
    ],
    textarea: `[

]`,
    //
    loading: false,
  }),
  watch: {},
  mounted() {},
  methods: {
    async main(value, mode, lowRows) {
      if (!value || !mode) {
        alert("格式錯誤");
        return;
      }
      let arr = this.handleTextarea(value);
      if (lowRows === "low" && arr.length > 4) {
        alert("筆數太多 請用執行按鈕");
        return;
      }
      this.loading = true;
      //   call API
      await this.executeMovingData(arr, mode, lowRows);
      this.loading = false;
    },
    handleTextarea(str) {
      if (str.indexOf("[") > -1) {
        const arr = JSON.parse(str);
        if (Array.isArray(arr)) {
          return arr;
        }
      }
      return undefined;
    },
    async executeMovingData(dataArr, mode, lowRows) {
      const [a, b] = mode.split(",");
      let ans = {};
      let ids = [];
      for (let i = 0, len = dataArr.length; i < len; i++) {
        ids.push(dataArr[i]);
        if (i > 20001) {
          console.log("id: ", ids);
          break;
        }

        if (i % 5 === 4 || lowRows === "low") {
          ans = await this.apiPostId(ids, a, b);
          console.log(ans);
          ids = [];
        }
        // last
        if (i === len - 1) {
          this.textarea = "[" + ids.toString() + "]";
        }
      }
    },
    apiPostId(id, tableA, tableB) {
      let headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      let body = { id: id };
      return fetch(`${this.baseUrl}/moveData/${tableA}/${tableB}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        });
    },
  },
});
// 算法 id改成5個一組 query數量/5
