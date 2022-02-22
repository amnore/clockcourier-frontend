<template>
    <el-container >
      <el-header>
      <!-- 导航栏 -->
        <myheader></myheader>
      </el-header>
    </el-container>
  <router-view></router-view>
</template>

<script>
import header from './components/Header.vue';
export default {
  name: "App",
  components: {
    myheader: header,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
