<template>
  <el-select v-model="$i18n.locale" id="lan" placeholder='$t("select")' size="large">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
  const options = [
    {
      value: 'en',
      label: 'English',
    },
    {
      value: 'zh',
      label: '中文',
    },
  ]

  export default {
    name: "LanguageSelector",

    data() {
      return {
        options,
      }
    }
  }
</script>

<style scoped>
  #lan {
    display: block;
    /* align-self: flex-end; */
  }
</style>
