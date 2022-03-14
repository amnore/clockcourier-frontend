<template>
  <el-form>
    <el-input
      class="searcher-main-input"
      type="text"
      :placeholder="paramNames[defaultParam]"
      v-model="paramValues[defaultParam]">
      <template #append>
        <el-button :icon="searchIcon" @click="doSearch" circle/>
      </template>
    </el-input>
    <component
      class="searcher-additional-fields"
      v-for="(item, name) in formItems"
      :is="item"
      :key="name" 
      :label="paramNames[name]"
      v-model="paramValues[name]"/>
  </el-form>
</template>

<script>
import { searchParams } from '@/scripts/DataSchema.js'
import SearcherCheckBox from '@/components/searcher-fields/SearcherCheckBox.vue'
import SearcherTextField from '@/components/searcher-fields/SearcherTextField.vue'
import { Search } from '@element-plus/icons-vue'

const paramNameMapping = {
  projectInfo: {
    name: '名称',
    platform: '平台',
    language: '所用语言',
    homepageUrl: '项目地址',
    latestReleaseN: '版本',
    dependency: '依赖库',
  },
  repositoryInfo: {
    hostType: '平台',
    repositoryName: '名称',
    repositoryOwner: '所有者',
    language: '所用语言',
    homepageUrl: '仓库地址',
    canFork: '能否 fork',
  },
  mavenRepositoryInfo: {
    name: '名称',
    groupId: '组织名',
    artifactId: '组件名',
  }
}

const defaultParams = {
  projectInfo: 'name',
  repositoryInfo: 'repositoryName',
  mavenRepositoryInfo: 'name',
}

const defaultFormItem = {
  String: SearcherTextField,
  Boolean: SearcherCheckBox,
}

const searchPaths = {
  projectInfo: 'Projects',
  repositoryInfo: 'Repositories',
}

export default {
  name: 'Searcher',
  props: {
    category: String
  },
  data() {
    const d = {
      paramValues: Object.fromEntries(
        Object.entries(searchParams[this.category])
          .map(e => [e[0], e[1]()])
      )
    }
    return d
  },
  methods: {
    doSearch() {
      this.$router.push({
        name: searchPaths[this.category],
        params: this.paramValues,
      })
    }
  },
  computed: {
    searchIcon() {
      return Search
    },
    params() {
      return searchParams[this.category]
    },
    paramNames() {
      return paramNameMapping[this.category]
    },
    defaultParam() {
      return defaultParams[this.category]
    },
    formItems() {
      return Object.fromEntries(
        Object.entries(this.params)
          .filter(e => e[0] !== this.defaultParam)
          .map(e => {
            const name = e[0]
            const item = defaultFormItem[e[1].name]
            // item.$on('change', value => this.paramValues[name] = value)
            return [name, item]
          })
      )
    }
  }
}
</script>

<style>
.searcher-main-input.el-input {
  height: var(--searcher-main-input-height);
  width: var(--searcher-main-input-width);
}

.searcher-main-input.el-input input {
  height: var(--searcher-main-input-height);
}
</style>
