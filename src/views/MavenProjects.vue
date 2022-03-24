<template>
  <page-header>
    <searcher category="mavenProjectInfo" @search="doSearch" />
  </page-header>
  <my-table
    :columnInfo="columnInfo"
    :contentData="mavenProjects"
    :changeSort="changeSort"
  ></my-table>
  <page :pageAll="pageAll" :goPage="goPage"></page>
</template>

<script>
import Searcher from "../components/Searcher.vue";
import { searchParams } from "@/scripts/DataSchema.js";
import { columnInfos } from "@/scripts/Constant.js";
import PageHeader from "@/components/PageHeader.vue";
import Page from "../components/Page.vue";
import MyTable from "../components/Table.vue";
import search from "../api/Search.js";

const sortKeys = {
  name: "Name",
  groupId: "GroupId",
  artifactId: "ArtifactId",
};

export default {
  name: "MavenProjects",
  components: { Searcher, PageHeader, Page, MyTable },
  props: searchParams.mavenProjectInfo,
  data() {
    return {
      mavenProjects: [],
      columnInfo: columnInfos.mavenProjectsColumnInfo,
      pageAll: 1,
      sortKey: "Name",
      sortReverse: false,
    };
  },
  methods: {
    changeSort(ev) {
      if (ev.prop === null) {
        this.sortKey = "Name";
        this.sortReverse = false;
      } else {
        this.sortKey = sortKeys[ev.prop];
        this.sortReverse = ev.order === "descending";
      }
      this.searchMavenProject(this.$props, 1);
    },
    goPage(index) {
      if (Number(index) > 0 && Number(index) <= this.pageAll) {
        this.searchMavenProject(this.$props, Number(index));
      }
    },
    searchMavenProject(params, page) {
      search(
        "mavenProjectInfo",
        this.$props,
        [15 * (page - 1), 15 * page],
        this.sortKey,
        false
      ).then((resp) => {
        console.log(resp);
        this.mavenProjects = resp.data.projects;
      });
      this.goPage({ page, sort: this.sortKey, ...params });
    },
  },
  mounted() {
    this.searchMavenProject(this.$props, 1);
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/searcher-in-header.scss";
</style>