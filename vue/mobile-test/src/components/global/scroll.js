export const throttle = (fn, delay) => {
  let time = Date.now();
  return () => {
    if ((time + delay - Date.now()) <= 0) {
      fn()
      time = Date.now()
    }
  }
}


// totalData,nowPage,listData,bodyHeight,params,apiGet
/**
 * 
 * @param {*} nowPage 現在第幾頁=page
 * @param {*} totalData 總共幾筆資料=size=limit
 * @param {*} params query 參數
 * @param {*} apiGet api function
 * 
 */
export const handleScroll = async ({ totalData, nowPage, params, apiGet }) => {
  const output = {
    newData: {},
    nowPage: nowPage,
    totalData: totalData
  }
  if (window.scrollY + window.screen.height >= document.body.scrollHeight) {
    output.nowPage++
    if (nowPage < (totalData * 0.1)) {
      output.newData = await apiGet(params)
    }
  }
  return output;
}

// handleScroll => handleApi params, count height

export function scrollToElement(selector, pixel = 10) {
  const target = document.querySelector(selector);
  const fakeNode = document.querySelector(".ref_target_item_");
  // 生成一個元素給予高度
  if (fakeNode) {
    // 滾動
    if (target) {
      fakeNode.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    const newItem = document.createElement("div");
    newItem.style.height = `${pixel}px`;
    newItem.className = "ref_target_item_";
    // 插入指定元素之前
    target.insertBefore(newItem, target.childNodes[0]);
    if (target) {
      newItem.scrollIntoView({ behavior: "smooth" });
    }
  }
}