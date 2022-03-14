<template>
  <page-header>
    <search-category-selector @select="category = $event"/>
  </page-header>
  <searcher :category="category" />
</template>

<script>
import Searcher from '@/components/Searcher.vue'
import PageHeader from '@/components/PageHeader.vue'
import SearchCategorySelector from '@/components/header-components/SearchCategorySelector.vue'

export default {
  name:"Search",
  components: { Searcher, PageHeader, SearchCategorySelector },
  data() {
    return {
      category: "projectInfo"
    }
  },
  methods() {
  }
}
</script>

<style scoped>
::v-deep .searcher-main-input {
  --searcher-main-input-height: 64px;
  /* --height: 64px; */
  /* height: var(--height); */
}
::v-deep .searcher-main-input input {
  font-size: 2em;
  /* height: var(--height); */
}
</style>
