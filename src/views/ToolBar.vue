<template>
  <div class="toolbar">
    <el-menu mode="horizontal">
      <el-submenu index="tool">
        <template slot="title">
          <img src="../assets/images/工具箱.png" style="margin-top:-3px" />
          <span>基础工具</span>
        </template>
        <el-menu-item @click="map.zoomIn()">
          <img src="../assets/images/放大.png" alt />
          放大
        </el-menu-item>
        <el-menu-item @click="map.zoomOut()">
          <img src="../assets/images/缩小.png" alt />
          缩小
        </el-menu-item>
        <el-menu-item @click="measure">
          <img src="../assets/images/工具-尺子.png" alt />
          测量
        </el-menu-item>
        <el-menu-item @click="drawMarker">
          <img src="../assets/images/铅笔.png" alt />
          标绘
        </el-menu-item>
      </el-submenu>
      <el-menu-item @click="isMonitor=true">
        <img src="../assets/images/社会化监控.png" alt />
        生态监测
      </el-menu-item>
      <el-menu-item @click="openNotify">
        <img src="../assets/images/自我评价-01-01.png" alt />
        生态评价
      </el-menu-item>
      <el-menu-item @click="visible=true">
        <img src="../assets/images/历史数据.png" alt />
        历史数据
      </el-menu-item>
    </el-menu>

    <!-- 上传生态监测数据 -->
    <el-dialog :visible="isMonitor" width="30%" :modal="false" title="请选择监测数据：">
      选择在线数据：
      <el-radio-group v-model="mapType">
        <el-radio :label="3">数据一</el-radio>
        <el-radio :label="6">数据二</el-radio>
        <el-radio :label="9">数据三</el-radio>
      </el-radio-group>
      <div style="margin:20px 0 10px 0">或者上传数据：</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">上传shp文件，大小不超过10m</div>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isMonitor = false">取 消</el-button>
        <el-button type="primary" @click="isMonitor = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible="visible" :modal="false" width="30%" title="请选择数据：">
      <div>
        <span>地图类型：</span>
        <el-radio-group v-model="mapType">
          <el-radio :label="3">类型一</el-radio>
          <el-radio :label="6">类型二</el-radio>
          <el-radio :label="9">类型三</el-radio>
        </el-radio-group>
        <div class="chooseDate">
          <span>选择年份：</span>
          <el-date-picker v-model="mapDate" type="year" placeholder="请选择年份"></el-date-picker>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { findRealParent, propsBinder } from "vue2-leaflet";
export default {
  data() {
    return {
      fileList: [],
      visible: false,
      isMonitor: false,
      mapType: 3,
      mapDate: ""
    };
  },
  mounted() {
    L.drawLocal.draw.handlers.marker.tooltip.start = "点击地图放置点";
    L.drawLocal.draw.handlers.polyline.tooltip.start = "点击地图开始绘制线";
    L.drawLocal.draw.handlers.polyline.tooltip.cont = "继续点击进行绘制";
    L.drawLocal.draw.handlers.polyline.tooltip.end = "点击最后一个点结束绘制";

    this.map = findRealParent(this.$parent).mapObject;
    this.drawnItems = L.featureGroup();
    this.drawnItems.addTo(this.map);
    this.map.on("draw:created", e => {
      this.drawnItems.addLayer(e.layer);
    });
  },
  methods: {
    openDialog(index) {
      this.visible = true;
    },
    drawMarker() {
      this.drawObj = new L.Draw.Marker(this.map);
      this.drawObj.enable();
    },
    measure() {
      this.drawObj = new L.Draw.Polyline(this.map);
      this.drawObj.enable();
    },
    openNotify() {
      this.$notify({
        title: "生态评价",
        dangerouslyUseHTMLString: true,
        message:
          ' 总体评价: <span style="color: green">好</span><br />健康面积：<span style="color: green">39271</span>平方千米<br />亚健康面积：<span style="color: orange">2372</span>平方千米<br />不健康面积：<span style="color: red">122</span>平方千米<br />'
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style lang="scss">
.toolbar {
  position: absolute;
  top: 30px;
  left: 100px;
  z-index: 600;
  .el-menu--horizontal,
  .el-menu {
    .el-submenu {
      .el-submenu__title {
        height: 40px;
        line-height: 40px;
        vertical-align: -webkit-baseline-middle;
        color: #000;
        &:hover {
          color: #409eff !important;
        }
      }
    }
    .el-menu-item {
      height: 40px;
      line-height: 40px;
      color: #000;
      &:hover {
        color: #409eff !important;
      }
    }
    img {
      width: 15px;
      height: 15px;
      margin-top: -5px;
      margin-right: 5px;
    }
  }

  .chooseDate {
    margin-top: 20px;
  }
}

.el-menu--horizontal {
  .el-menu--popup {
    min-width: 70px;

    .el-menu-item {
      min-width: auto;
      height: 30px;
      line-height: 30px;
    }
    img {
      width: 15px;
      height: 15px;
      margin-top: -2px;
      margin-right: 5px;
    }
  }
}
.el-dialog__body {
  padding-top: 5px !important;
}
</style>

