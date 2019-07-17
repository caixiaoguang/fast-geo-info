<template>
  <div class="toolbar">
    <el-menu mode="horizontal">
      <el-menu-item v-for="menu in menuData" :key="menu.index" @click="openDialog(menu.index)">
        <span class="iconfont" :class="menu.icon"></span>
        {{menu.name}}
      </el-menu-item>
    </el-menu>
    <el-dialog :visible="visible" :modal="false" title="请选择数据：">
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
export default {
  data() {
    return {
      menuData: [
        { name: "基础工具", index: "tools", icon: "icon-gongju" },
        { name: "生态监测", index: "monitor", icon: "icon-jiankong" },
        { name: "生态评价", index: "evaluate", icon: "icon-weibiaoti527" },
        { name: "历史数据", index: "historyData", icon: "icon-lishishuju" }
      ],
      visible: false,
      mapType: 3,
      mapDate: ""
    };
  },
  methods: {
    openDialog(index) {
      if (index === "historyData") {
        this.visible = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  position: absolute;
  top: 30px;
  left: 100px;
  z-index: 600;
  .el-menu-item {
    height: 40px;
    line-height: 40px;
    vertical-align: -webkit-baseline-middle;
    color: #000;
    &:hover {
      color: #409eff !important;
      .iconfont {
        font-size: 28px;
      }
    }
  }
  .chooseDate {
    margin-top: 20px;
  }
}
</style>

