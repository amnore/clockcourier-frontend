<template>
  <el-form id="searcher">
    <div id="searcher-main-input">
      <el-input
        type="text"
        :placeholder="paramNames[defaultParam]"
        v-model="paramValues[defaultParam]">
        <template #suffix>
          <el-button :icon="searchIcon" @click="$emit('search', paramValues)"/>
          <el-button :icon="moreIcon" @click="showAdvancedFields"/>
        </template>
      </el-input>
    </div>
    <div
      id="searcher-additional-fields"
      ref="searcherAdditionalFields"
      hidden>
      <component
        v-for="(item, name) in formItems"
        :is="item"
        :key="name"
        :label="paramNames[name]"
        v-model="paramValues[name]"/>
    </div>
  </el-form>
</template>

<script>
import { searchParams } from '@/scripts/DataSchema.js'
import SearcherCheckBox from '@/components/searcher-fields/SearcherCheckBox.vue'
import SearcherTextField from '@/components/searcher-fields/SearcherTextField.vue'
import { Search, More } from '@element-plus/icons-vue'

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

export default {
  name: 'Searcher',
  emits: ['search'],
  props: {
    category: String
  },
  data() {
    return {
      paramValues: Object.fromEntries(
        Object.entries(searchParams[this.category])
          .map(e => [e[0], e[1]()])
      )
    }
  },
  methods: {
    showAdvancedFields() {
      console.log(Object.fromEntries(Object.keys(this.params).map(k => [k, this.paramValues[k]])))
      const elem = this.$refs.searcherAdditionalFields
      elem.hidden = !elem.hidden
    }
  },
  computed: {
    searchIcon() {
      return Search
    },
    moreIcon() {
      return More
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

<style scoped>
#searcher-main-input::v-deep .el-button {
  align-self: center;
}

#searcher-main-input::v-deep .el-input {
  height: 100%;
}

#searcher-main-input::v-deep input {
  height: 100%;
  font-size: 1.5em;
}

#searcher-additional-fields {
  width: 90%;
  margin: 0 auto;
}

#searcher-additional-fields > * {
  float: left;
  margin: 1em 5%;
  max-width: min(90%, max(10ch, 30%));
}
</style>
