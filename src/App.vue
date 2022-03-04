<template>
  <myheader></myheader>
  <router-view></router-view>
</template>

<script>
import header from "./components/Header.vue";
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
}

.el-form-item{
  width: 20%;
}
</style>
