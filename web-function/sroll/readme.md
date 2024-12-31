# sroll 種類

1. scrollTo
2. scrollToView
3. scrollBy

與 scrollBy() 的主要區別是：

scrollTo() 滾動到指定的絕對位置
scrollBy() 則是相對當前位置移動指定的距離 px

scrollToView(true) 相當於
{block: "start", inline: "nearest"}
scrollToView(false) 相當於
{block: "end", inline: "nearest"}
