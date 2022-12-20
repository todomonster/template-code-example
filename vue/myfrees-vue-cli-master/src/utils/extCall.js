// https://wtteam2.atlassian.net/l/cp/C7i7U0wy

// old 棄用問題找時間修改
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform
function initOS() {

    const agent = navigator.userAgent.toLowerCase() || "";
    let platform = navigator.platform.toLowerCase() || "";
    if (platform.indexOf("linux") > -1) {
        if (agent.indexOf("android") > -1) {
            platform = "android";
        }
    }
    if (platform.indexOf("iphone") > -1 || platform.indexOf("ipad") > -1) {
        platform = "ios";
        // 如果是ios 要對console.log做處理
        console.log = function (message) {
            window.webkit.messageHandlers.logger.postMessage(message);
        };
    }
    return platform;
}

function executeExtCall(data = {}) {
    let os = initOS() || "";

    if (os == "android") {
        /**
         * 注意: 這邊一定要掛在window底下，否則webpack打包會改名稱，導致App抓不到
         * https://hackmd.io/@ChuBoy/ryinChg3L
         */
        // ExtCall.postMessage(data);
        return window.ExtCall.postMessage(data);
    } else if (os == "ios") {
        return window.webkit.messageHandlers.ExtCall.postMessage(data);
    } else {
        // 故意噴錯讓外層 try catch 處理
        throw new Error(os);
    }
}

// 有需要可以持續擴充
export const ExtCall = {
    openNewWebView,
    replaceSetting,
    downloadFile,
    shareFile
}

function openNewWebView(openUrl = "") {
    const data = JSON.stringify({
        function: "popWebview",
        url: openUrl,
    });
    executeExtCall(data);
}

// 這隻是能觸發 初始化 新的設定檔 => 不同設定檔去觸發新的 zip
function replaceSetting(id = "", download_url = "") {
    const data = JSON.stringify({
        function: "changeProjectSettingURL",
        userid: id,
        url: download_url
        // ex: https://myfree.tako.life/app/store/store_settings.txt
    });
    executeExtCall(data);
}
// callback 回傳路徑 app_code + "_file" + /dirName/fileName
function downloadFile(dirname, filename, url) {

    const data = JSON.stringify({
        "function": "downloadFileWithURL",
        "callback": "",
        "dirname": dirname,
        "filename": filename,
        "url": url,
        "type": "progress"  //填空白，不會出現下載進度條
    });
    return executeExtCall(data);
}

function shareFile({ subject = "", title = "", message = null, imageUrl = null, base64 = null }) {

    const config = {
        "function": "share",
        "subject": subject,
        "title": title,
    }
    if (message) {
        config.message = message;
    } else if (imageUrl) {
        config.imageUrl = imageUrl;
    } else if (base64 && typeof (base64) === 'string') {
        const realBase64 = base64.split(',')[1];
        base64 = realBase64;
        config.base64 = base64;
    } else {
        config.message = "share"
    }

    const data = JSON.stringify(config);

    executeExtCall(data);
}
