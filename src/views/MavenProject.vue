<template>
  <el-container>
    <el-header height="150px">
      <my-description
        :columnCountInline="4"
        :columnInfo="columnInfo"
        :contentData="mavenProject"
        :title="mavenProject.artificialId"
      >
      </my-description>
    </el-header>
    <el-container
      >]
      <el-aside> </el-aside>
      <el-main>
        <page :pageAll="pageAll" :goPage="goPage"></page>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Page from "../components/Page.vue";
import MyDescription from "../components/Description.vue";
import { columnInfos } from "../scripts/Constant.js";
export default {
  name: "MavenProject",
  components: { Page, MyDescription },
  data() {
    return {
      mavenProject: {
        artificialId: "test",
        projectId: 0,
        projectName: "",
        platform: "",
        language: "",
        description: "",
        homepageUrl: "",
        createT: "",
        updateT: "",
        latestReleaseT: "",
        latestReleaseN: "",
        repositoryId: 0,
        repositoryUrl: "",
        licenses: [""],
      },
      pageAll: 1,
      columnInfo: columnInfos.projectColumnInfo,
    };
  },
  methods: {
    goPage(index) {
      //doNothing
      index;
    },
  },
  mounted() {},
  created() {},
};
</script>