<template>
  <div id="mapView">
    <l-map :center="center" :zoom="zoom" @ready="mapReady">
      <slot />
      <tile-layer />
      <Layers />
      <l-control :attributionControl="false" />
    </l-map>
  </div>
</template>

<script>
import { LMap, LControl } from "vue2-leaflet";
import TileLayer from "../components/TileLayer";
import Layers from "../components/Layers";
export default {
  components: {
    LMap,
    TileLayer,
    Layers,
    LControl
  },
  data() {
    return {
      center: [25.65, 106.85],
      zoom: 15
    };
  },
  methods: {
    mapReady(map) {
      this.$store.commit("setMap", map);
    }
  }
};
</script>

<style lang="scss" scoped>
#mapView {
  height: calc(100vh - 60px);
  .leaflet-control-attribution {
    display: none !important;
  }
}
</style>

