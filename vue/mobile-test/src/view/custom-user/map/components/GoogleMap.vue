<template>
  <div class="google-map" id="map"></div>
</template>

<script>
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
  data() {
    return {
      map: null,
      infowindow: null,
      markers: [],
      currentMarker: null,
    };
  },
  // 當發現中心位置改變時，更新中心位置與地標
  watch: {
    center(val) {
      this.resetCenter();
      this.setMarker();
    },
  },
  mounted() {
    window.gotoDetail = () => {
      // $router.push
      alert(1);
    };
    this.initMap();
    this.setMarker();
  },
  activated() {
    if (this.infowindow) {
      this.infowindow.open(this.map, this.currentMarker);
    }
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: this.center,
        zoom: this.zoom,
        maxZoom: 20,
        minZoom: 3,
        streetViewControl: this.streetViewControl,
        mapTypeControl: this.mapTypeControl,
        fullscreenControl: this.fullscreenControl,
        zoomControl: this.zoomControl,
      });
    },
    resetCenter() {
      // set center
      this.map.panTo({ lat: this.center.lat, lng: this.center.lng });
    },
    clearMarkers() {
      this.markers.forEach((marker) => marker.setMap(null));
      this.markers = [];
    },
    setMarker() {
      const iconPath = "https://myfree.tako.life/app/icon/google_map_icon.png";
      // clear existing markers
      this.clearMarkers();
      this.pointList.forEach((location) => {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: this.map,
          draggable: false,
          icon: iconPath,
        });
        // save markers
        this.markers.push(marker);

        const infowindow = new google.maps.InfoWindow({
          //   content: `
          //   <div id="content">
          //     <p id="firstHeading" class="firstHeading">${location.name}</p>
          //   </div>
          // `,
          content: `
            <div id="content">
                <a style="text-decoration: underline black; color:black;"
                  href='${window.location.origin}/#/store/detail?id=${location.id}'"
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
        marker.addListener("click", () => {
          if (this.infowindow) this.infowindow.close();
          infowindow.open(this.map, marker);
          this.infowindow = infowindow;
          this.currentMarker = marker;
        });

        
      });
    },
  },
};
</script>
