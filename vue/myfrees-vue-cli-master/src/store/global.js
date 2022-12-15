import { ref } from 'vue'
import { defineStore } from 'pinia'
import { router } from "@/router/index"

export const useGlobalStore = defineStore('global', () => {
    const globalLoading = ref(false);


    const goto = (mode, val) => {

        if (mode === "href") {
            const url = val || "https://myfree.tako.life/privacy";
            // window.location.href = url;
            window.open(url, '_blank');
        }
        if (mode === "router") {
            router.push({ path: val });
        }
        if (mode === "back") {
            router.back();
        }
    };

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

    return { isToAddStore, setStoreData, globalLoading, goto }
})

