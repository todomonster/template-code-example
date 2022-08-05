const temp = {
  async genTable(obj, index) {
    const { year, month, cashPages, mobilePages } = obj;
    if (this.validation(obj)) {
      try {
        // mobile
        const mobileData = await this.getMobile({ year, month }, cashPages);
        this.cards[index].items.push(...mobileData.data);
        // cash
        const cashData = await this.getCash({ year, month }, mobilePages);
        this.cards[index].items.push(...cashData.data);
        this.cards[index].show = true;
      } catch (error) {
        console.log(error);
      }
    }
  },
  getMobile(selected = { year: "2022", month: "03" }, page = 1) {
    const { year, month } = selected;
    const limit = 5;
    return fetch(
      `http://localhost:3011/mobile/${year}/${month}?limit=${limit}&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => data);
  },
  getCash(selected = { year: "2022", month: "03" }, page = 1) {
    const { year, month } = selected;
    const limit = 5;
    return fetch(
      `http://localhost:3011/cash/${year}/${month}?limit=${limit}&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => data);
  },
};
