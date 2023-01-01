import { ref } from 'vue';
import { defineStore } from 'pinia';
import { router } from "@/router/index";
import { ExtCall, initOS } from "@/utils/extCall";
import { useStorage } from "@/utils/helper";

export const useGlobalStore = defineStore('global', () => {
    const globalLoading = ref(false);


    const goto = (mode, val, config) => {

        if (mode === "href") {
            const url = val || "https://myfree.tako.life/privacy";
            // window.location.href = url;
            window.open(url, '_blank');
        }
        if (mode === "router") {
            router.push({ path: val });
        }
        if (mode === "routerParams") {

            if (val.indexOf("/") > -1) {
                throw new Error("請使用 component name");
            }
            const { params } = config;
            router.push({
                name: val,
                // 注意，傳送後會轉為字串
                params
            });
        }
        if (mode === "routerQuery") {
            const { query } = config;
            router.push({
                path: val,
                // 注意，傳送後會轉為字串
                query
            });
        }
        if (mode === "back") {
            // 判斷作業系統
            const os = initOS();
            //ios會失敗所以改呼叫ExtCall做返回
            const table = {
                "/product/list": "/profile/view",
                "/wallet/list": "/profile/view",
                "/setting/list": "/profile/view",

                "/product/detail?mode=view": "/product/list",//..
                "/product/detail?mode=add": "/product/list",

                "/profile/edit": "/profile/view",

                // "/notify/list": ["/profile/view", "/product/list", "/wallet/list", "/setting/list"],//gg

                "/wallet/rewardApply": "/wallet/list",
                "/wallet/rewardRecord": "/wallet/list",
                "/wallet/moneyRecord": "/wallet/list",

                "/setting/qrCode": "/setting/list",
            }
            let now = window.location.hash.slice(1);
            // 如果有&符號做拆除
            if (now.indexOf("&") > -1) {
                const now2 = now.split("&")[0];
                now = now2;
            }

            const path = table[now] || "/profile/view";
            router.push(path);
            // if (os === 'ios') {

            // } else {
            //     router.back();
            // }
        }
        // if (mode === "closeBack") {
        //     const os = initOS();
        //     // const preRouterHistory = useStorage.getItem("preRouterHistory") || "";
        //     const routerHistory = useStorage.getItem("routerHistory") || "";
        //     const obj = JSON.parse(routerHistory)
        //     const path = window.location.hash.slice(1)
        //     router.push(obj[path]);
        //     // preRouterHistory.back => routerHistory.back
        //     // const preRouterHistoryObj = JSON.parse(preRouterHistory)
        //     // const routerHistoryObj = JSON.parse(routerHistory)
        //     // alert(`${preRouterHistoryObj.back}?=${routerHistoryObj.back}`)
        //     if (os === 'ios') {
        //         // 有記住2層之前的路徑 
        //         // 新增完成後要轉到記住的地方 並且帶上參數 再跳一次
        //         // router.push({
        //         //     path: `${preRouterHistory.back}?redirect=${routerHistory.back}`,
        //         // })
        //         // router.push(`${preRouterHistory.back}?redirect=${routerHistory.back}`)
        //     } else {
        //         // router.back();
        //         // router.push(`${preRouterHistory.back}?redirect=${routerHistory.back}`)
        //     }
        // }

    };
    // 註冊時記住手機密碼
    const isToAddStore = ref({
        status: false,
        password: "",
        mobile: "",
    });
    const setStoreData = ({ status, password, mobile }) => {
        if (status === true || status === false) isToAddStore.value.status = status;
        if (password) isToAddStore.value.password = password;
        if (mobile) isToAddStore.value.mobile = mobile;
    }
    // 


    return { isToAddStore, setStoreData, globalLoading, goto, router }
})

