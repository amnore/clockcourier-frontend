<template>
  <div class="head">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">项目</el-menu-item>
      <el-menu-item index="2">仓库</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "header",
  props: {},
  data() {
    return {
      activeIndex: '1',
    };
  },
  methods: {
    handleSelect(key) {
      if (key == 1) {
        this.$router.push("/projects");
      } else if (key == 2) {
        this.$router.push("/repositories");
      }
    },
  },
};
</script>


<style>
.head {
  text-align: center;
  margin: auto;
}
</style>
