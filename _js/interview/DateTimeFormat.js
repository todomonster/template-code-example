// https://juejin.cn/post/7199191689150644279
// https://juejin.cn/post/7207769757571514426

const formattedDate = new Intl.DateTimeFormat("zh", {
  timeStyle: "medium",
  hour12: false,
}).format(new Date());

//16:33:28
console.log(formattedDate);
