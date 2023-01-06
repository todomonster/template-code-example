import { useRouter } from "vue-router";
const router = useRouter();
export const goto = (mode, val) => {
    console.log(mode, val)
    if (mode === "href") {
        window.location.href = "https://myfree.tako.life/privacy";
    }
    if (mode === "router") {
        router.push({ path: val });
    }
};