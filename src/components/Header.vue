<template>
  <div>
    <table class="head">
      <tr>
        <td><router-link to="/repositories">仓库</router-link></td>
        <td><router-link to="/projects">项目</router-link></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "header",
  props: {},
};
</script>
、

<style>
.head {
  text-align: center;
  margin: auto;
}
</style>
