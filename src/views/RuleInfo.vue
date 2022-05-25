<template>
  <page-header></page-header>
  <el-container>
    <el-main>
      <my-table
        :columnInfo="columnInfo"
        :contentData="rules"
      ></my-table>
      <page :goPage="goPage" :pageAll="pageAll"></page>
    </el-main>
  </el-container>
</template>

<script>
import MyTable from "../components/Table.vue";
import Page from "../components/Page.vue";
import PageHeader from "@/components/PageHeader.vue";
import { columnInfos } from "../scripts/Constant.js";
import { searchRule } from "../api/SearchRule";
export default {
  name: "RuleInfo",
  components: { MyTable, Page, PageHeader },
  data() {
    return {
      id: 0,
      rules: [
        {
          ruleId: 0,
          projectName: "project",
          projectId: 0,
          fileName: "file",
          projectUrl: "http://www.baidu.com",
          startCommit: "start",
          endCommit: "http://www.baidu.com",
        },
      ],
      pageAll: 1,
      pageSize: 10,
      columnInfo: columnInfos.rulesColumnInfo,
    };
  },
  watch: {
    $route: "refresh",
  },
  methods: {
    refresh() {
      this.getRules(1);
    },
    getRules(page) {
      this.id = this.$route.params.id;
      //TODO：获取rule列表
      searchRule(this.id, page)
        .then((res) => {
          this.rules = res.data.data.instances;
          this.pageAll = res.data.data.pageAll
        })
        .catch(function (e) {
          console.log(e);
        });
      console.log(page);
      return;
    },
    setPageAll(count, pageSize) {
      this.pageAll = Math.ceil(count / pageSize);
      if (this.pageAll < 1) {
        this.pageAll = 1;
      }
    },
    goPage(index) {
      if (Number(index) > 0 && Number(index) <= this.pageAll) {
        this.page = Number(index);
        this.getRules(this.page);
      }
    },
  },
  mounted(){
    this.refresh();
  }
};
</script>

<style scoped>
.el-main {
  margin: 5%;
}
</style>