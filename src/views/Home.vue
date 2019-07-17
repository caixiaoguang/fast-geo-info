<template>
  <div class="home">
    <el-container>
      <el-header>
        <head-title></head-title>
      </el-header>
      <el-main>
        <Map />
        <tool-bar />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HeadTitle from "./HeadTitle";
import Map from "./Map";
import ToolBar from "./ToolBar";
export default {
  name: "home",
  components: {
    HeadTitle,
    Map,
    ToolBar
  }
};
</script>


<style lang="scss">
.home {
  .el-header {
    padding: 0;
  }
  .el-main {
    padding: 0;
    position: relative;
  }
}
</style>

