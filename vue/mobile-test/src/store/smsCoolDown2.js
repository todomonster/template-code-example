/**
簡訊倒數計時功能描述
1.離線
    0.例如隔天才進入網頁
2.在線
    a.切換路由
    b.重新整理
    c.保持畫面不動
要符合以上4種情形，正確執行冷卻
要特別留意切換路由要清除計時器!
*/
import { ref } from 'vue';
import { defineStore } from 'pinia';

const useStorage = {
    setItem(key, value) {
        localStorage.setItem(key, value);
    },
    getItem(key) {
        const item = localStorage.getItem(key) || "";
        return item;
    }
};

export const useCoolDownStore = defineStore('smsCoolDown', () => {
    // 定義冷卻時間(秒)
    let 顯示秒數的文字 = ref("");
    let JS計時器 = null;
    let isSmsCoolDownOk = ref(true);
    const 預設倒數計時幾秒 = 60;

    function smsSendDate() {
        // 紀錄發送簡訊的時間
        useStorage.setItem("smsSendDate", new Date());
    }

    function currentTime() {
        // 記錄目前的時間
        useStorage.setItem("currentTime", new Date());
    }

    function 清除計時器() {
        clearInterval(JS計時器);
    }

    function 計算前後時間差幾秒() {
        const { before, after } = 取得秒數();
        return Math.floor((after - before) / 1000);
    }

    function init() {
        // 初始化 否則會 NaN
        let before = useStorage.getItem("smsSendDate");
        if (!before) {
            useStorage.setItem("smsSendDate", new Date("2000/01/01"));
        }
        currentTime();
    }

    function 取得秒數() {
        let before = useStorage.getItem("smsSendDate");
        let after = useStorage.getItem("currentTime");
        return {
            after: new Date(after).getTime(),
            before: new Date(before).getTime()
        }
    }

    function handleRouterLeave() {
        清除計時器();
        isSmsCoolDownOk.value = true;
        顯示秒數的文字.value = "";
    }

    function showText() {
        if (60 - 顯示秒數的文字.value < 60) {
            if (60 - 顯示秒數的文字.value >= 0) {
                return 60 - 顯示秒數的文字.value;
            }
        }
        return "";
    }

    function setCountDown() {
        // 主程式
        if (isSmsCoolDownOk.value === true) {
            JS計時器 = setInterval(() => {
                if (計算前後時間差幾秒() >= 預設倒數計時幾秒) {
                    顯示秒數的文字.value = "";
                    isSmsCoolDownOk.value = true;
                    清除計時器();
                } else {
                    currentTime();
                    顯示秒數的文字.value = 計算前後時間差幾秒();
                    isSmsCoolDownOk.value = false;
                }
            }, 1000);
        }

    }

    return {
        setCountDown, showText, isSmsCoolDownOk, smsSendDate, handleRouterLeave, init
    }

})

