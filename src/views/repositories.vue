<template>
  <el-form label-position="right" label-width="80px" :inline="true">
    <el-form-item label="名称:">
      <el-input
        type="text"
        value=""
        placeholder="name"
        id="repo_name"
        v-model="repo_name"
      />
    </el-form-item>

    <el-form-item label="平台:">
      <el-input
        type="text"
        value=""
        placeholder="platform"
        id="hostType"
        v-model="platform"
      />
    </el-form-item>
    <el-form-item label="所有者:">
      <el-input
        type="text"
        value=""
        placeholder="owner"
        id="owner"
        v-model="owner"
      />
    </el-form-item>
    <el-form-item label="所用语言:">
      <el-autocomplete
        v-model="language_text"
        :fetch-suggestions="getLanguages"
        placeholder="language"
        id="language_text"
      />
    </el-form-item>
    <el-form-item label="仓库地址:">
      <el-input type="text" value="" placeholder="url" id="url" v-model="url" />
    </el-form-item>
    <!--
    <label>创建时间:</label>
    <el-input type="date" value="2022-02-22" id="create_date" />
    <label>更新时间:</label>
    <el-input type="date" value="2022-02-22" id="update_date" />
    <label>最新push时间:</label>
    <el-input type="date" value="2022-02-22" id="latest_push_date" />
    -->
    <el-form-item label="能否fork:">
      <el-radio name="can_be_fork" label="0" v-model="canFork"
        ><label>不选择</label></el-radio
      >
      <el-radio name="can_be_fork" label="1" v-model="canFork"
        ><label>能</label></el-radio
      >
      <el-radio name="can_be_fork" label="2" v-model="canFork"
        ><label>不能</label></el-radio
      >
    </el-form-item>
    <div>
      <el-button id="searchbutton" v-on:click="searchRepo(1)" round
        >搜索</el-button
      >
    </div>
  </el-form>
  <div>
    <el-table
      :data="repository_data"
      border
      :default-sort="{ prop: 'repositoryName', order: 'ascending' }"
      v-on:sort-change="changeSort"
    >
      <el-table-column prop="repositoryName" label="名称" sortable='custom'>
        <template #default="scope">
          <router-link :to="'/repository/' + scope.row.repositoryId">{{
            scope.row.repositoryName
          }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="hostType" label="平台" />
      <el-table-column prop="repositoryOwner" label="所有者" />
      <el-table-column prop="language" label="所用语言" />
      <el-table-column prop="homepageUrl" label="地址">
        <template #default="scope">
          <a :href="scope.row.homepageUrl">{{ scope.row.homepageUrl }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="createT" label="创建时间" sortable='custom'/>
      <el-table-column prop="updateT" label="更新时间" sortable='custom'/>
      <el-table-column prop="canFork" label="能否fork" />
      <el-table-column prop="forkCount" label="fork数量" />
      <el-table-column prop="watcherCount" label="watcher数量" sortable='custom'/>
      <el-table-column prop="starCount" label="star数量" sortable='custom'/>
      <el-table-column prop="contributorCount" label="贡献者数量" sortable='custom'/>
      <el-table-column prop="openIssueCount" label="issue数量" sortable='custom'/>
    </el-table>
  </div>
  <div>
    <ul class="page">
      <li>
        <span v-if="page > 1"
          ><b @click="page--, searchRepo(page)">上一页</b></span
        >
        <span v-if="page == 1">上一页</span>
        <span v-if="Number(pageAll) <= 10">
          <span
            v-for="index in pageAll"
            :key="index"
            :class="{ active: page == index }"
            @click="goPage(index)"
            >{{ index }}</span
          ></span
        >
        <span v-if="Number(pageAll) > 10">
          <span @click="goPage(1)">1</span>
          <span v-if="page > 3">...</span>
          <span v-if="page > 2" @click="goPage(page - 1)">{{ page - 1 }}</span>
          <span v-if="page > 1 && page < pageAll" @click="goPage(page)">{{
            page
          }}</span>
          <span v-if="page < pageAll - 1" @click="goPage(page + 1)">{{
            page + 1
          }}</span>
          <span v-if="page < pageAll - 2">...</span>
          <span @click="goPage(pageAll)">{{ pageAll }}</span>
        </span>
        <span v-if="page != pageAll"
          ><b @click="page++, searchRepo(page)">下一页</b></span
        >
        <span v-if="page == pageAll">下一页</span>
      </li>
      <li>共{{ pageAll }}页 当前{{ page }}页</li>
      <li>到</li>
      <li><el-input type="text" value="1" v-model="jumpPage" /></li>
      <li>页</li>
      <el-button v-on:click="goPage(jumpPage)">确定</el-button>
    </ul>
  </div>
</template>

<script>
import { search_repo } from "../api/search_repo";
import getLanguageList from '@/api/LanguageSelector.js'

const sortKeys = {
  repositoryName: "Name",
  createT: "CreateT",
  updateT: "UpdateT",
  latestPushT: "LatestPushT",
  // forkCount: "ForkCount",
  watcherCount: "WatcherCount",
  starCount: "StarCount",
  contributorCount: "ContributorCount",
  openIssueCount: "OpenIssueCount",
}

export default {
  name: "Repositories", //注册在路由（router.js）里的就是这个
  props: {},
  data() {
    return {
      repository_data: [],
      repo_name: "",
      platform: "",
      owner: "",
      language_text: "",
      url: "",
      version: "",
      dependency: "",
      repository: "",
      canFork: "0",
      page: 1,
      pageAll: 1,
      jumpPage: "",
      sortKey: "Name",
      sortReverse: false,
    };
  },
  methods: {
    changeSort(ev) {
      if (ev.prop === null) {
        this.sortKey = "Name"
        this.sortReverse = false
      } else {
        this.sortKey = sortKeys[ev.prop]
        this.sortReverse = ev.order === "descending"
      }
      this.searchRepo(1)
    },
    searchRepo(page) {
      let name = document.getElementById("repo_name").value;
      let hostType = document.getElementById("hostType").value;
      let owner = document.getElementById("owner").value;
      let language = this.language_text;
      let url = document.getElementById("url").value;
      this.page = page;
      let can_be_fork = this.canFork;
      let canFork = null;
      if (can_be_fork == 1) {
        canFork = true;
      } else if (can_be_fork == 2) {
        canFork = false;
      }
      search_repo(
        name,
        hostType,
        owner,
        language,
        url,
        canFork,
        page,
        this.sortKey,
        this.sortReverse
      )
        .then((res) => {
          console.log(res.data.msg);
          this.repository_data = res.data.data.repositories;
          this.pageAll = res.data.data.pageAll;
          if (this.pageAll < 1) {
            this.pageAll = 1;
          }
        })
        .catch(function (error) {
          console.log("连接失败");
          console.log(error); //如果连接失败，则抛出错误的信息
        });
    },
    goPage(index) {
      if (Number(index) > 0 && Number(index) <= this.pageAll) {
        this.page = Number(index);
        this.searchRepo(this.page);
      }
    },
    getLanguages(input, cb) {
      getLanguageList(input, cb)
    },
  },
  mounted() {
    this.searchRepo(1);
  },
  created() {},
};
</script>

<style>
.table {
  text-align: center;
  margin: auto;
}

.page li {
  display: inline-block;
  margin: 0 5px;
}
.page li span {
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #dfdfdf;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
