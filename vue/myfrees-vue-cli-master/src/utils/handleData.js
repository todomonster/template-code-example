

function dateToChinese(date) {
    let ans = "";
    switch (date) {
        case 'Mon': ans = "星期一"; break;
        case 'Tue': ans = "星期二"; break;
        case 'Wed': ans = "星期三"; break;
        case 'Thu': ans = "星期四"; break;
        case 'Fri': ans = "星期五"; break;
        case 'Sat': ans = "星期六"; break;
        case 'Sun': ans = "星期日"; break;
    }
    return ans;
}

function combineTime(weekday, time) {
    let ans = `${dateToChinese(weekday)}\n`;
    time.map((item) => {
        ans += `${item.start} - ${item.end}\n`
    })
    return ans;
}


// 營業時間
function businessHours(business_hours) {
    const newHour = JSON.parse(business_hours).filter((x) => x.active);
    const newTime = newHour.map((x) => combineTime(x.weekday, x.time));
    return newTime.join("");
}

// 回饋%數
function isOpen(is_open) {
    return (is_open) ? "營業" : "停業"
}

function storeImages(images) {
    return JSON.parse(images)[0] || "";
}

export const handleStoreProfile = {
    businessHours,
    storeImages,
    isOpen
}