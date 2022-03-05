<template>
<el-header>
  <div id='header-logo'>
    <img id='header-icon' src='/icon.svg' />
    <span>ClockCourier</span>
  </div>
  <el-menu
    id='header-menu'
    collapse-transition="false"
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="0">项目</el-menu-item>
    <el-menu-item index="1">仓库</el-menu-item>
  </el-menu>
</el-header>
</template>

<script>
const menuUrl = [
  "/",
  "/repositories"
]
export default {
  name: "header",
  props: {},
  data() {
    return {
      activeIndex: '0',
    };
  },
  watch:{
    $route:"changeRoute",
  },
  methods: {
    handleSelect(key) {
      this.$router.push(menuUrl[key])
    },
    changeRoute(){
      let longestMatch = 0, longestIndex = "";
      for (let [i, path]  of menuUrl.entries()) {
        if (this.$route.path.startsWith(path) && path.length > longestMatch) {
          longestIndex = i
        }
      }
      this.activeIndex = `${longestIndex}`
    },
  },
};
</script>


<style scoped>
.el-header {
  --header-logo-width: 200px;
  border-bottom: solid 1px var(--el-border-color-base);
  margin: 0;
}

#header-logo {
  height: var(--el-header-height);
  width: var(--header-logo-width);
  float: left;
}

#header-menu {
  width: calc(100% - var(--header-logo-width));
  float: left;
  width: 80%;
  border-bottom: none;
}

#header-icon {
  height: 100%;
}

#header-logo * {
  vertical-align: middle;
}
</style>
