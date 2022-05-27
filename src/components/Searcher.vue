<template>
  <el-form id="searcher">
    <div id="searcher-main-input">
      <el-input
        type="text"
        :placeholder="paramNames[defaultParam]"
        v-model="paramValues[defaultParam]"
        @keyup.enter="$emit('search', paramValues)"
      >
        <template #suffix>
          <el-button :icon="searchIcon" @click="$emit('search', paramValues)" />
          <el-dropdown trigger="click">
            <el-button :icon="moreIcon"/>
            <template #dropdown>
              <div id="searcher-additional-items">
                <component
                  v-for="(item, name) in formItems"
                  :is="item"
                  :key="name"
                  :label="paramNames[name]"
                  v-model="paramValues[name]"
                />
              </div>
            </template>
          </el-dropdown>
        </template>
      </el-input>
    </div>
  </el-form>
</template>

<script>
import { searchParams } from "@/scripts/DataSchema.js";
import SearcherBooleanField from "@/components/searcher-fields/SearcherBooleanField.vue";
import SearcherTextField from "@/components/searcher-fields/SearcherTextField.vue";
import SearcherPomField from "@/components/searcher-fields/SearcherPomField.vue";
import { Search, More } from "@element-plus/icons-vue";

const paramNameMapping = {
  projectInfo: {
    name: "名称",
    platform: "平台",
    language: "所用语言",
    homepageUrl: "项目地址",
    latestReleaseN: "版本",
    dependency: "依赖库",
  },
  repositoryInfo: {
    hostType: "平台",
    repositoryName: "名称",
    repositoryOwner: "所有者",
    language: "所用语言",
    homepageUrl: "仓库地址",
    canFork: "能否 fork",
  },
  mavenProjectInfo: {
    groupId: "组织名",
    artifactId: "名称",
  },
  dependencyInfo: {
    groupId: '组织名',
    artifactId: '名称',
  },
};

const defaultParams = {
  projectInfo: "name",
  repositoryInfo: "repositoryName",
  mavenProjectInfo: "artifactId",
  dependencyInfo: 'artifactId',
};

const defaultFormItem = {
  String: SearcherTextField,
  Boolean: SearcherBooleanField,
};

const overrideFormItem = {
  pomUrl: SearcherPomField,
};

export default {
  name: "Searcher",
  emits: ["search"],
  props: {
    category: String,
    initParamValues: Object,
  },
  data() {
    console.log('initParamValues', this.initParamValues)
    return {
      paramValues: {
        groupId: this.initParamValues?.groupId,
        artifactId: this.initParamValues?.artifactId,
      },
    };
  },
  watch: {
    category() {
      this.paramValues = {}
    },
  },
  computed: {
    searchIcon() {
      return Search;
    },
    moreIcon() {
      return More;
    },
    params() {
      return searchParams[this.category];
    },
    paramNames() {
      return paramNameMapping[this.category];
    },
    defaultParam() {
      return defaultParams[this.category];
    },
    formItems() {
      return Object.fromEntries(
        Object.entries(this.params)
          .filter((e) => e[0] !== this.defaultParam)
          .map((e) => {
            const name = e[0];
            const item = overrideFormItem[e[0]] || defaultFormItem[e[1].name];
            // item.$on('change', value => this.paramValues[name] = value)
            return [name, item];
          })
      );
    },
  },
};
</script>

<style scoped>
#searcher-main-input::v-deep .el-input__suffix-inner > * {
  align-self: center;
  margin: 0 5px;
}

#searcher-main-input::v-deep .el-input {
  height: 100%;
}

#searcher-main-input::v-deep input {
  height: 100%;
  font-size: 1.5em;
}

#searcher-additional-items {
  padding: 10px;
}
</style>
