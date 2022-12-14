<template>
  <page-header></page-header>
  <el-container>
    <el-main>
      <el-descriptions :title="$t('message.migInfo')" column="4" border>
        <el-descriptions-item :label="$t('message.sourceLib')">
          <el-link type="primary" v-on:click="$router.push('/jump-to-out?url='+fromLib.mvnCtrUrl)">{{fromLib.groupId+":"+fromLib.artifactId}}</el-link>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('message.targetLib')">
          <el-link type="primary" v-on:click="$router.push('/jump-to-out?url='+toLib.mvnCtrUrl)">{{toLib.groupId+":"+toLib.artifactId}}</el-link>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('message.confidence')">
          {{confidence}}
        </el-descriptions-item>
      </el-descriptions>
      <my-table class="detail" :columnInfo="columnInfo" :contentData="rules"></my-table>
      <page :goPage="goPage" :pageAll="pageAll"></page>
    </el-main>
  </el-container>
</template>

<script>
import MyTable from "@/components/Table.vue";
import Page from "@/components/Page.vue";
import PageHeader from "@/components/PageHeader.vue";
import { columnInfos } from "@/scripts/constant.js";
import { searchRuleInstance, searchRuleBaseInfo } from "@/api/searchRule.js";
import { getLibInfo } from "@/api/dependencyGraph.js";

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
      confidence: 0,
      rs: 0,
      ms: 0,
      ds: 0,
      as: 0,
      fromLib: {},
      toLib:{},
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
      // 获取 rules 列表
      searchRuleInstance(this.id, page)
        .then((res) => {
          this.rules = res.data.data.instances;
          for(var i=0;i<this.rules.length;++i){
            this.rules[i].startCommitBack=this.rules[i].startCommit.substring(this.rules[i].startCommit.length-6,this.rules[i].startCommit.length)
            this.rules[i].endCommitBack=this.rules[i].endCommit.substring(this.rules[i].endCommit.length-6,this.rules[i].endCommit.length)
          }
          this.pageAll = res.data.data.pageAll;
        })
        .catch(function (e) {
          console.log(e);
        });
      console.log(page);
      searchRuleBaseInfo(this.id)
        .then((res) => {
          this.confidence = Math.floor(res.data.data.confidence*10000)/10000;
          this.rs = Math.floor(res.data.data.rs*10000)/10000;
          this.ms = Math.floor(res.data.data.ms*10000)/10000;
          this.ds = Math.floor(res.data.data.ds*10000)/10000;
          this.as = Math.floor(res.data.data.as*10000)/10000;
          getLibInfo(res.data.data.fromId)
            .then((res) => {
              this.fromLib=res.data
            })
            .catch(function (e) {
              console.log(e);
            });

          getLibInfo(res.data.data.toId)
            .then((res) => {
              this.toLib=res.data
            })
            .catch(function (e) {
              console.log(e);
            });
        })
        .catch(function (e) {
          console.log(e);
        });
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

  mounted() {
    this.refresh();
  },
};
</script>

<style scoped>
.el-main {
  margin: 2%;
}

.detail {
  margin-top: 2%;
}
</style>
