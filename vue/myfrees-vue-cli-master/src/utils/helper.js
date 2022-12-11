/**
 * 手機加密做法 先加上1之後根據數字第幾位就移動幾次
 * 10位數變成11位
 * '0000000000' => '11234567890'
 */

import { left } from "@popperjs/core";

/**
 * 
 * @param {string} phone 要加密的手機號碼
 * @param {boolean} clockwise 加密(順時針) | 解密(逆時針)
 * @returns {string} 加密後的手機號碼 || ''
 */
function 運算(phone = '', clockwise = true) {
    const ans = [];
    phone.split('').forEach((item, i, arr) => {
        let char = '';
        if (clockwise) {
            char = (Number(item) + i) % 10;
        } else {
            char = (Number(item) - i) % 10;
            char = char < 0 ? char + 10 : char;
        }
        ans.push(char);
    });
    return ans.join('');
}

/**
 * 
 * @param {string} phone 要加密的手機號碼
 * @returns {string} 加密後的手機號碼 || ''
 */
export const 手機加密 = (phone = '') => {
    // 檢查是10位數字 + 字串
    if (typeof (phone) === 'string' && phone.length === 10) {
        // 加上 '1'
        const ans = '1' + phone;
        // 跑正向運算
        return 運算(ans, true);
    }
    return '';
}


/**
 * 
 * @param {string} hash 加密後的手機號碼
 * @returns {string} 正確的手機號碼 || ''
 */
export const 手機解密 = (hash = '') => {
    if (typeof (hash) === 'string') {
        const firstChar = hash[0];
        //檢查第一個是1 + 長度=11
        if (firstChar === '1' && hash.length === 11) {
            // 跑逆向運算
            let ans = 運算(hash, false);
            // 移除第一位
            return ans.slice(1);
        }
    }
    return '';
}

/**
 * 負責將物件解析後拼成query字串
 * @param {string} hash 要拼成query字串的物件
 * @returns {string} 例如:'a=1&b=0' || ''
 */
export const parseUrlEncode = (objParam = {}) => {
    const entries = Object.entries(objParam);
    if (entries.length === 0) return '';
    const ans = [];
    //可以吃 3種 string, array, object; 這邊用 array 模式
    entries.forEach(item => {
        const key = item[0];
        let value = item[1];
        if (Array.isArray(value)) {
            // 判斷陣列長度連續push
            value.forEach(item => {
                ans.push([key, item]);
            })
        } else if (typeof (value) === 'object') {
            value = JSON.stringify(value);
            if (value) {
                ans.push([key, value]);
            }
        } else {
            if (value) {
                ans.push([key, value]);
            }
        }
        // 是0 或是 正值存起來 (=排除掉 '', false, null, undefined, NaN)
        // value === 0 || 
    })
    const searchParams = new URLSearchParams(ans);
    return searchParams.toString();
}


export const useCookie = {
    setItem(key, value, expireMinutes) {
        const date = new Date();
        date.setTime(date.getTime() + expireMinutes * 60 * 1000);
        document.cookie = `${key}=${value};expires=${date.toUTCString()};path=/`;
    },
    getItem(key) {
        const decodedCookie = decodeURIComponent(document.cookie);
        const match = decodedCookie.match(new RegExp("(^| )" + key + "=([^;]+)"));
        if (match) return match[2];
        else return null;
    }
};

export const useStorage = {
    setItem(key, value) {
        localStorage.setItem(key, value);
    },
    getItem(key) {
        const item = localStorage.getItem(key) || "";
        return item;
    }
};


/**
 * 要弄懂
scrollTop
window.scrollY
window.innerHeight
clientHeight
window.screen.height
document.body.scrollHeight
 */

// 判斷是否在底部的共用邏輯
export const isBetweenBottom = () => {
    // window.screen.height = window.innerHeight
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滾動條到最頂部的距離
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight // 可是區的高度 
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight //DOM 元素的高度，包含超出畫面(視窗外)的内容
    // console.log("scrollTop: ",scrollTop); 
    // console.log("windowHeight: ",windowHeight); 
    // console.log("scrollHeight: ",scrollHeight);     
    if (scrollTop + windowHeight >=  scrollHeight) {
        return true;
    } else {
        return false;
    }

}

// 滾動到特定元素
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

// 滾動到特定位置
export function windowScrollTo({ top = 0, left = 0, behavior = "instant" }) {
    window.scrollTo({
        top,
        left,
        behavior,
    });
}
