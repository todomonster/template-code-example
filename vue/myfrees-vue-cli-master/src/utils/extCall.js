//ExtCall文件
// https://wtteam2.atlassian.net/l/cp/C7i7U0wy
// ExtCall callback會比較晚 所以不能用await要用setTimeout

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



// 開新的webview
function openNewWebView(openUrl = "") {
    const data = JSON.stringify({
        function: "popWebview",
        url: openUrl,
    });
    executeExtCall(data);
}

// 這觸發 初始化 新的設定檔 => 不同設定檔去觸發新的 zip
function replaceSetting(id = "", download_url = "") {
    const data = JSON.stringify({
        function: "changeProjectSettingURL",
        userid: id,
        url: download_url
        // ex: https://myfree.tako.life/app/store/store_settings.txt
    });
    executeExtCall(data);
}

// 呼叫App原生分享
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

// 取得設定檔url
/** Example
    let SettingsURL = "";
    window.getExtCallSettingsURL = (url) => SettingsURL = url;
    ExtCall.getSettingsURL("getExtCallSettingsURL");
    setTimeout(() => console.log(SettingsURL), 100);
 */
function getSettingsURL(windowFunctionName = "") {

    const data = JSON.stringify({
        "function": "getSettingsURL",
        "callback": windowFunctionName
    });
    executeExtCall(data);

}

// 取得Firebase推播id
/** Example
    let FcmToken = "";
    window.getFcmPushToken = (token) => (FcmToken = token);
    ExtCall.getFcmPushId("getFcmPushToken");
    setTimeout(() => console.log(FcmToken), 100);
 */
function getFcmPushId(windowFunctionName = "") {
    const data = JSON.stringify({
        "function": "getPushId",
        "callback": windowFunctionName
    });
    executeExtCall(data);
}

// 開啟掃條碼(AVFoundation) ios
/**
    let ScanCode = "";
    window.openScanCode = (appScanCode) => ScanCode = appScanCode;
    ExtCall.openScanCode("openScanCode");
    setTimeout(() => console.log(ScanCode), 100);
 */
function openScanCode(windowFunctionName = "") {

    const config = {
        "function": "openScancode",
        "callback": windowFunctionName
    }
    // 判斷os
    let os = initOS() || "";
    // 開啟掃條碼(zxing)
    if (os == "android") {
        config.scanner = "zxing"
    }
    const data = JSON.stringify(config);
    executeExtCall(data);
}

// 取得URL Scheme 帶入參數後，並清除。
// 沒資料預設是空字串
/**
    let SchemeInput = "";
    window.getUrlSchemeInput = (val) => SchemeInput = val;
    ExtCall.getUrlSchemeInput("getUrlSchemeInput");
    setTimeout(() => console.log(SchemeInput), 100);
 */
function getUrlSchemeInput(windowFunctionName = "") {
    const data = JSON.stringify({
        "function": "resetAfterGetSchemeParameter",
        "callback": windowFunctionName
    });
    executeExtCall(data);
}

// 有需要可以持續擴充
export const ExtCall = {
    openNewWebView,
    replaceSetting,
    shareFile,
    getSettingsURL,
    getFcmPushId,
    openScanCode,
    getUrlSchemeInput
}

export const ExtCallThird = {
    lineLogout(channel_id = "", windowFunctionName = "") {
        const data = JSON.stringify({
            "function": "lineLogout",
            "channel_id": channel_id,
            "callback": windowFunctionName
        });
        executeExtCall(data);
    },
    lineLogin(channel_id = "", windowFunctionName = "") {
        const data = JSON.stringify({
            "function": "lineLogin",
            "channel_id": channel_id,
            "callback": windowFunctionName
        });
        executeExtCall(data);
    },
    appleLogin(windowFunctionName = "") {
        const data = JSON.stringify({
            "function": "appleLogin",
            "callback": windowFunctionName
        });
        executeExtCall(data);
    },
    googleSignInfo(windowFunctionName = "") {
        const data = JSON.stringify({
            "function": "googleSignInfo",
            "callback": windowFunctionName
        });
        executeExtCall(data);
    },
    googleSignIn(windowFunctionName = "") {
        const data = JSON.stringify({
            "function": "googleSignIn",
            "callback": windowFunctionName
        });
        executeExtCall(data);
    },
    googleSignOut(windowFunctionName = "") {
        const data = JSON.stringify({
            "function": "googleSignOut",
            "callback": windowFunctionName
        });
        executeExtCall(data);
    }

}


