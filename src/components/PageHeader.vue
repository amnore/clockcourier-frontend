<template>
<el-header>
  <div id='header-logo' @click="$router.push('/')">
    <img id='header-icon' src='/icon.svg' />
    <span>ClockCourier</span>
  </div>
  <slot />
  <language-selector></language-selector>
</el-header>
</template>

<script>
import LanguageSelector from "@/components/header-components/LanguageSelector.vue";

export default {
  name: "PageHeader",
  components: { LanguageSelector },
};
</script>


<style scoped>
.el-header {
  --header-logo-width: 200px;
  border-bottom: solid 1px var(--el-border-color-base);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#header-logo {
  height: var(--el-header-height);
  width: var(--header-logo-width);
  float: left;
  cursor: pointer;
}

#header-icon {
  height: 100%;
}

#header-logo * {
  vertical-align: middle;
}

</style>
