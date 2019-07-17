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
const echarts = require("echarts");

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
      let div = document.createElement("div");
      div.setAttribute("id", "chart");
      div.style.width = "300px";
      div.style.height = "200px";
      return L.marker(latlng, { icon: icon })
        .bindTooltip(div, tooptipOption)
        .on("tooltipopen", this.initChart);
    },
    initChart() {
      let myChart = echarts.init(document.getElementById("chart"));
      let option = {
        title: {
          text: "监测数据",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["指标一", "指标二", "指标三", "指标四", "指标五"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "指标一" },
              { value: 310, name: "指标二" },
              { value: 234, name: "指标三" },
              { value: 135, name: "指标四" },
              { value: 1548, name: "指标五" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style>
</style>
