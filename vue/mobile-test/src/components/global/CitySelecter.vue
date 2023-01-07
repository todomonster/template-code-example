<script>
import { reactive, ref, onMounted, watch, $emit } from 'vue'
import { apiGetCityArea } from "@/api/api"



export default {
    props: {
        cityIdx_p: Number || String,
        areaIdx_p: Number || String
    },
    setup(props, { emit }) {
        let cityAreaData = ref([])
        let city = ref("")
        let area = ref("")
        let cityIdx = ref(props.cityIdx_p)
        let areaIdx = ref(props.areaIdx_p)
        let cityList = ref([])
        let areaList = ref([])

        const changeCityIdx = (e) => {
            cityIdx.value = e.target.value
        }
        const changeAreaIdx = (e) => {
            areaIdx.value = e.target.value
        }

        //往外傳
        const updateCityIdx = () => {
            emit("cityIdx", cityIdx)
        }
        const updateAreaIdx = () => {
            emit("areaIdx", areaIdx)
        }

        onMounted(async () => {
            // call api
            cityAreaData.value = await apiGetCityArea()
            cityAreaData.value = cityAreaData.value.data
            if (cityIdx.value != undefined) {
                areaList.value = cityAreaData.value[cityIdx.value - 1].areas
            }
        })

        watch(() => cityIdx.value, async () => {
            areaList.value = cityAreaData.value[cityIdx.value - 1].areas
            updateCityIdx()
        })
        watch(() => areaIdx.value, async () => {
            updateAreaIdx()
        })

        return { cityAreaData, city, area, areaList, changeCityIdx, changeAreaIdx, cityIdx, areaIdx }
    },
};
</script>

<template>

    <div class="input-group">
        <select class="col form-control form-select" v-model="cityIdx" @change="changeCityIdx">
            <option value="undefined" disabled>請選擇縣市</option>
            <option v-for="item in cityAreaData" :value="item.id" :key="item.id">{{ item.city_name }}</option>
        </select>
        <select class="col form-control form-select" v-model="areaIdx" @change="changeAreaIdx">
            <option value="undefined" disabled>請選擇鄉鎮區</option>
            <option v-for="item in areaList" :value="item.id" :key="item.id">{{ item.area_name }}</option>
        </select>
    </div>
</template>


<style lang="scss" scoped>

</style>