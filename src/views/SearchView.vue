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
::v-deep #searcher-main-input {
  width: 60%;
  height: 3em;
  margin: 1em auto;
}

#searcher::v-deep {
  margin-top: 30vh;
}
</style>
