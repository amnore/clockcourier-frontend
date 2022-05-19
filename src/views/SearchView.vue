<template>
  <page-header>
    <search-category-selector @select="type = $event"/>
  </page-header>
  <searcher :category="searchCategory" @search="doSearch"/>
  <el-upload accept=".xml" :auto-upload="false" :on-change="doUploadPom">
    <el-button>上传 pom 文件</el-button>
  </el-upload>
    <!-- <div id="searcher-pom-uploader">
         <el-input type="file" v-model="pomFile" accept=".xml">
         <template #prepend>
         上传 pom 文件
         </template>
         </el-input>
         </div> -->
</template>

<script>
import Searcher from '@/components/Searcher.vue'
import PageHeader from '@/components/PageHeader.vue'
import SearchCategorySelector from '@/components/header-components/SearchCategorySelector.vue'

const searchPaths = {
    // projectInfo: 'Projects',
    // repositoryInfo: 'Repositories',
    // mavenProjectInfo:'MavenProjects',
  dependencyGraphInfo: 'DependencyGraph',
}

const searchCategories = {
    // projectInfo: 'projectInfo',
    // repositoryInfo: 'repositoryInfo',
    // mavenProjectInfo:'mavenProjectInfo',
  dependencyGraphInfo: 'dependencyInfo',
}

export default {
  name:"Search",
  components: { Searcher, PageHeader, SearchCategorySelector },
  data() {
    return {
      type: "dependencyGraphInfo",
      pomFile: null,
    }
  },
  computed: {
    searchCategory() {
      return searchCategories[this.type]
    }
  },
  methods: {
    doSearch(paramValues) {
      this.$router.push({
        name: searchPaths[this.type],
        params: paramValues,
      })
    },
    doUploadPom(file) {
      const fileUrl = URL.createObjectURL(file.raw)
      console.log('doUploadPom', file, fileUrl)
      this.$router.push({
        name: 'DependencyGraph',
        params: {
          pomUrl: fileUrl
        }
      })
    }
  },
  watch: {
    pomFile: function(file) { this.doUploadPom(file) }
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

#searcher-pom-uploader {
  width: 30%;
  margin: 1em auto;
}
</style>
