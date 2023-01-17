<template>
  <div class="container mt-4">
    <div class="map-container border rounded">
      <!--使用 GMap 並帶入相關設定資訊-->
      <GMap
        :center="{ lat, lng }"
        :pointList="pointList"
        :streetViewControl="false"
        :mapTypeControl="false"
        :fullscreenControl="true"
        :zoomControl="true"
      ></GMap>
    </div>
  </div>
</template>

<script>
// https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-%E5%BE%9E%E9%9B%B6%E6%8E%A5%E8%A7%B8-google-map-api-%E5%9C%A8-vue-js-%E4%B8%AD%E5%AF%A6%E4%BD%9C%E5%9C%B0%E5%9C%96-%E5%9C%B0%E6%A8%99-%E8%A8%8A%E6%81%AF%E8%A6%96%E7%AA%97-8eed860637d6
import GMap from "./components/GoogleMap";
export default {
  components: {
    GMap,
  },
  data() {
    return {
      lat: 25.0325917,
      lng: 121.5624999,
      pointList: [
        {
          id: 1,
          name: "餐廳一",
          lat: 25.034,
          lng: 121.5645,
        },
        {
          id: 2,
          name: "餐廳二",
          lat: 25.036643,
          lng: 121.567678,
        },
        {
          id: 3,
          name: "餐廳三",
          lat: 25.033643,
          lng: 121.566678,
        },
      ],
    };
  },
  // 其他程式碼
};
</script>

<style lang="scss" scoped>
.google-map {
  width: 100%;
  height: 90vh;
  //   height: calc(100vh - $footer-height - $header-height - 5.5rem);
  // border: 10px solid red;
}
</style>
