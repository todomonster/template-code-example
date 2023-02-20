//ExtCall文件
// https://wtteam2.atlassian.net/l/cp/C7i7U0wy
// ExtCall callback會比較晚 所以不能用await要用setTimeout

// old 棄用問題找時間修改
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform
export function initOS() {

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
function shareFile({ subject = "", title = "", message = "", imageUrl = "", base64 = "" }) {

    const config = {
        "function": "share",
        "subject": subject,
        "title": title,
    }
    // 文字
    if (message && typeof (message) === 'string') {
        config.message = message;
    } else {
        config.message = "share"
    }

    // 圖片
    if (imageUrl) {
        config.imageUrl = imageUrl;
    } else if (base64 && typeof (base64) === 'string') {
        const realBase64 = base64.split(',')[1];
        base64 = realBase64;
        config.base64 = base64;
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

// PDF
function loadPDFURL2View(url = "") {
    const data = JSON.stringify({
        "function": "loadPDF2View",
        "key": String(Date.now()),
        "url": url,
        "timestamp": String(Date.now())
    });

    executeExtCall(data);
}
// PDF
function loadPDFURLWithKey(url = "") {
    const data = JSON.stringify({
        "function": "loadPDFURLWithKey",
        "key": String(Date.now()),
        "url": url,
        "timestamp": String(Date.now())
    });

    executeExtCall(data);
}
// PDF
function loadPDFURL(url = "") {
    const data = JSON.stringify({
        "function": "loadPDFURL",
        "url": url,
        "version": Date.now()
        // version 一定要數字
    });

    executeExtCall(data);
}

// toBrowser
function toBrowser(url = "") {
    const data = JSON.stringify({
        "function": "toBrowser",
        "url": url
    });

    executeExtCall(data);
}


// App 返回 
function goBack() {
    const data = JSON.stringify({
        "function": "goBack"
    });

    executeExtCall(data);
}

// App 前景/背景 
function setApplicationStatusCallback(windowFunctionName = "") {
    const data = JSON.stringify({
        "function": "setApplicationStatusCallback",
        "callback": windowFunctionName
    });

    executeExtCall(data);
}

// App Toast
function AppToast(message = "", duration = 1000) {
    const data = JSON.stringify({
        "function": "toast",
        "message": message,
        "duration": duration //duration = int
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
    getUrlSchemeInput,
    goBack,
    loadPDFURL,
    loadPDFURL2View,
    loadPDFURLWithKey,
    toBrowser,
    setApplicationStatusCallback,
    AppToast
}

export const ExtCallThirdPart = {
    /**
        let SchemeInput = "";
        window.getUrlSchemeInput = (val) => SchemeInput = val;
        ExtCall.getUrlSchemeInput("getUrlSchemeInput");
        setTimeout(() => console.log(SchemeInput), 100);
     */
    lineLogout(channel_id = "", windowFunctionName = "") {
        const data = JSON.stringify({
            "function": "lineLogout",
            "channel_id": channel_id,
            "callback": windowFunctionName
        });
        executeExtCall(data);
    },
    /**
              const channel_id = "1655750341";
              let LineLoginInput = "";
              window.lineLogin = (a) => {
                LineLoginInput = a;
                alert(JSON.stringify(LineLoginInput));
              };
     */
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

export const ExtCallGPS = {
    /**
        let Input = "";
        window.ExtCallStartGPS = (val) => (Input = val);
        ExtCallGPS.startGPS("ExtCallStartGPS");
        setTimeout(() => console.log(Input), 100);
    */
    startGPS(windowFunctionName = "") {
        const data = JSON.stringify({
            "function": "startGPS",
            "callback": windowFunctionName
        });

        executeExtCall(data);
    },

    stopGPS() {
        const data = JSON.stringify({
            "function": "stopGPS"
        });

        executeExtCall(data);
    },
    /**

    */
    getCurrentLocation(windowFunctionName = "") {
        const data = JSON.stringify({
            "function": "getCurrentLocation",
            "callback": windowFunctionName,
            "datatype": "json"
        });

        executeExtCall(data);
    },
    /**
        let Input = "";
        window.ExtCallGetUserLocationHistory = (val) => Input = val;
        ExtCallGPS.getUserLocationHistory("ExtCallGetUserLocationHistory");
        setTimeout(() => console.log(Input), 100);
    */
    getUserLocationHistory(windowFunctionName = "") {
        const data = JSON.stringify({
            "function": "getUserLocationHistory",
            "callback": windowFunctionName
        });

        executeExtCall(data);
    },

}

export const ExtCallAppStorage = {
    /**
        let Input = "";
        window.ExtCallSaveDataByKey = (val) => (Input = val);
        ExtCallAppStorage.saveDataByKey({ keyword:"", value:"", windowFunctionName:"ExtCallSaveDataByKey" });
        setTimeout(() => console.log(Input), 500);
    */
    // 存
    saveDataByKey({ keyword = "", value = "", windowFunctionName = "" }) {
        const data = JSON.stringify({
            "function": "saveDataByKey",
            "key": keyword,
            "value": value,
            "mode": "encrypt",
            "callback": windowFunctionName
        });

        executeExtCall(data);
    },
    // 取
    /**
    const testGetDataByKey = () => {
      let Input = "";
      window.ExtCallGetDataByKey = (val) => (Input=val);
      ExtCallAppStorage.getDataByKey({
        keyword: "test",
        windowFunctionName: "ExtCallGetDataByKey",
      });
      setTimeout(() => alert(JSON.stringify(Input)), 500);
    };
     */
    getDataByKey({ keyword = "", windowFunctionName = "" }) {
        const data = JSON.stringify({
            "function": "getDataByKey",
            "callback": windowFunctionName,
            "mode": "decrypt",
            "key": keyword
        });

        executeExtCall(data);
    },
    
    getEncryptDataByKey({ keyword = "", windowFunctionName = "" }) {
        const data = JSON.stringify({
            "function": "getDataByKey",
            "callback": windowFunctionName,
            "key": keyword
        });

        executeExtCall(data);
    },
}


