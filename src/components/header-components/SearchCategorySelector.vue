<template>
  <el-menu
    id='header-menu'
    :collapse-transition="false"
    default-active="dependencyGraphInfo"
    mode="horizontal"
    @select="$emit('select', $event)"
  >
    <el-menu-item index="dependencyGraphInfo">
      {{ $t("message.depMigGraph") }}
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  emits: [ 'select' ],
}
</script>

<style scoped>
#header-menu {
  width: calc(100% - var(--header-logo-width));
  float: left;
  width: 80%;
  border-bottom: none;
}
</style>
