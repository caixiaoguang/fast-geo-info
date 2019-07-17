<template>
  <div>
    <!-- <l-geo-json :geojson="geojson" /> -->
    <l-geo-json :geojson="monitor" :options="options" />
  </div>
</template>

<script>
import { LGeoJson, LMarker } from "vue2-leaflet";
import pingtang from "../utils/平塘县.json";
import monitor from "../utils/point.json";

const icon = L.icon({
  iconUrl: require("../assets/监控.png"),
  iconSize: [30, 30]
});
const tooptipOption = {
  direction: "top",
  offset: [0, -14]
};
export default {
  components: {
    LGeoJson
  },
  data() {
    return {
      geojson: pingtang,
      monitor: monitor
    };
  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunc,
        pointToLayer: this.pointToLayerFunc
      };
    }
  },
  methods: {
    pointToLayerFunc(feature, latlng) {
      let tooptipText =
        "监测点名称：监测点1</br>位置：" +
        latlng.lng.toPrecision(6) +
        "," +
        latlng.lat.toPrecision(5) +
        "</br>" +
        "监测情况:";
      return L.marker(latlng, { icon: icon }).bindTooltip(
        tooptipText,
        tooptipOption
      );
    }
  }
};
</script>

<style>
</style>
