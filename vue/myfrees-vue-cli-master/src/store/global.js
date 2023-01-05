import { ref } from 'vue';
import { defineStore } from 'pinia';
import { router } from "@/router/index";
// import { ExtCall, initOS } from "@/utils/extCall";
import { useStorage, hashUrlRemoveQuery } from "@/utils/helper";

export const useGlobalStore = defineStore('global', () => {
    const globalLoading = ref(false);
    const VUE_APP_ROUTER_TABLE = process.env.VUE_APP_ROUTER_TABLE;


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
            // 目前的路由資訊
            const routerData = { ...router.currentRoute.value };
            // get localStorage string
            const backPath = useStorage.getItem(VUE_APP_ROUTER_TABLE) || "{}";
            const backPathObj = JSON.parse(backPath);

            //找上一頁的路由 
            const father = backPathObj?.findStart?.[routerData.path];
            const { query, path } = father;
            // 吃到 $back$=1 讓路由守衛知道是上一頁 不用儲存
            if (path) {
                if (query) {
                    router.push({ path: father.path, query: { ...query, $back$: '1' } })
                    return;
                } else {
                    router.push({ path: father.path, query: { $back$: '1' } })
                    return;
                }
            }
            router.push("/");
        }

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

