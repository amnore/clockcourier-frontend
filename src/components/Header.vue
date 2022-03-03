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
  watch:{
    $route:"changeRoute",
  },
  methods: {
    handleSelect(key) {
      if (key == 1) {
        this.$router.push("/projects");
      } else if (key == 2) {
        this.$router.push("/repositories");
      }
    },
    changeRoute(){
      if(this.$route.path=="/projects"||this.$route.path=="/"){
        this.activeIndex="1";
      }
      else if(this.$route.path=="/repositories"){
        this.activeIndex="2";
      }
      else{
        this.activeIndex="0";
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
