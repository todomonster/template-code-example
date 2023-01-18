<template>
  <div class="google-map" id="map"></div>
</template>

<script>
import { reactive, ref, onMounted, watch, onActivated, computed } from "vue";

export default {
  // 接收來自父元件的地圖設定資訊
  props: {
    center: {
      type: Object,
      default: () => ({ lat: 25.0325917, lng: 121.5624999 }),
    },
    zoom: {
      type: Number,
      default: 14,
    },
    clearMarkers: {
      type: Number,
    },
    streetViewControl: {
      type: Boolean,
      default: true,
    },
    mapTypeControl: {
      type: Boolean,
      default: true,
    },
    fullscreenControl: {
      type: Boolean,
      default: true,
    },
    zoomControl: {
      type: Boolean,
      default: true,
    },
    pointList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const map = ref(null);
    const currentInfowindow = ref(null);
    const currentMarker = ref(null);
    const markers = ref([]);

    // const lat = ref(props.center.lat);
    // const lng = ref(props.center.lng);

    const pointListData = ref([]);
    const centerData = ref({});

    watch(
      () => props.center,
      (val) => {
        centerData.value = val;
        resetCenter(val);
      }
    );

    watch(
      () => props.clearMarkers,
      (val) => {
        clearMarkers();
      }
    );

    watch(
      () => props.pointList,
      (val) => {
        pointListData.value = val;
        clearMarkers();
        // 延遲生成 marker
        setTimeout(() => {
          setMarker();
        }, 1000);
      }
    );

    onMounted(() => {
      // 延遲生成 map
      setTimeout(() => {
        initMap();
      }, 500);
    });

    onActivated(() => {
      // 維持視窗開啟
      if (currentInfowindow.value) {
        currentInfowindow.value.open(map, currentMarker);
      }
    });

    const initMap = () => {
      const {
        center,
        zoom,
        streetViewControl,
        mapTypeControl,
        fullscreenControl,
        zoomControl,
      } = props;
      map.value = new google.maps.Map(document.getElementById("map"), {
        maxZoom: 20,
        minZoom: 3,
        center,
        zoom,
        streetViewControl,
        mapTypeControl,
        fullscreenControl,
        zoomControl,
      });
    };

    const resetCenter = (location) => {
      if (map.value) {
        map.value.panTo(location);
        setSingleMarker(location, true);
      }
    };

    const clearMarkers = () => {
      markers.value.forEach((item) => {
        item.setMap(null);
        // 很重要!
        item.setVisible(false);
      });
      markers.value = [];
    };

    const setInfoWindow = (location = { id: null, name: "", all_addr: "" }) => {
      return new google.maps.InfoWindow({
        content: `
            <div id="content">
                <a style="text-decoration: underline black; color:black;"
                  href="${
                    window.location.href?.split("#/")?.[0]
                  }#/store/detail?id=${location.id}"
                >
                  <p style="font-size:1.25rem; font-weight:600;">${
                    location.name
                  }</p>
                </a>
                <span>${location.all_addr ? location.all_addr : ""}</span>
            </div>
            `,
        maxWidth: 250,
      });
    };

    const setSingleMarker = (coordinate, useDefaultIcon = false) => {
      if (!coordinate) {
        return false;
      }
      const iconPath = "https://myfree.tako.life/app/icon/google_map_icon.png";
      const config = {
        position: coordinate,
        map: map.value,
        draggable: false,
        icon: iconPath,
      };
      if (useDefaultIcon) {
        delete config.icon;
      }
      const marker = new google.maps.Marker(config);
      markers.value.push(marker);
      return marker;
    };

    const setMarker = () => {
      pointListData.value.forEach((location) => {
        const marker = setSingleMarker({
          lat: location.lat,
          lng: location.lng,
        });
        if (!marker) {
          // marker生成錯誤離開
          return;
        }
        const infowindow = setInfoWindow(location);

        marker.addListener("click", () => {
          // 先關閉目前的視窗
          if (currentInfowindow.value) {
            currentInfowindow.value.close();
          }
          // 開啟點的那個視窗
          infowindow.open(map.value, marker);
          // 刷新狀態
          currentInfowindow.value = infowindow;
          currentMarker.value = marker;
        });
      });
    };

    return { pointListData, centerData, markers };
  },
};
</script>
