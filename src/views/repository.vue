<template>
  <table border="1" class="table">
    <tr>
      <td>名称</td>
      <td>平台</td>
      <td>所有者</td>
      <td>语言</td>
      <td>地址</td>
      <td>创建时间</td>
      <td>更新时间</td>
      <td>最新push时间</td>
      <td>是否可以fork</td>
      <td>fork数量</td>
      <td>watcher数量</td>
      <td>star数量</td>
      <td>贡献者数量</td>
      <td>issue数量</td>
      <td>默认分支</td>
    </tr>
    <tr>
      <td width="80">
        <router-link :to="'/repository/' + repository.repositoryId">{{
          repository.repositoryName
        }}</router-link>
      </td>
      <td width="80">{{ repository.hostType }}</td>
      <td width="80">{{ repository.repositoryOwner }}</td>
      <td width="80">{{ repository.language }}</td>
      <td width="80">
        <a :href="repository.homepageUrl">{{ repository.homepageUrl }}</a>
      </td>
      <td width="80">{{ repository.createT }}</td>
      <td width="80">{{ repository.updateT }}</td>
      <td width="80">{{ repository.latestPushT }}</td>
      <td width="80">{{ repository.canFork }}</td>
      <td width="80">{{ repository.forkCount }}</td>
      <td width="80">{{ repository.watcherCount }}</td>
      <td width="80">{{ repository.starCount }}</td>
      <td width="80">{{ repository.contributorCount }}</td>
      <td width="80">{{ repository.openIssueCount }}</td>
      <td width="80">{{ repository.defaultBranch }}</td>
    </tr>
  </table>

  <table border="1" class="table">
    <tr>
      <td width="80">许可证</td>
      <td v-for="license in repository.licenses" v-bind:key="license">
        {{ license }}
      </td>
    </tr>
  </table>
  <div>{{ repository.description }}</div>
  <div>
    <p>筛选依赖</p>
    <label>名称:</label>
    <input type="text" value="" placeholder="name" id="dependency_name" />
    <label>依赖类型:</label>
    <select name="" id="dependency_type">
      <option value="">请选择依赖类型</option>
      <option
        v-for="type in dependency_type_list"
        v-bind:key="type"
        v-bind:value="type"
      >
        {{ type }}
      </option>
    </select>
    <div>
      <button id="searchbutton" v-on:click="getDependency()">搜索</button>
    </div>
    <input
      type="radio"
      name="sort_method"
      value="1"
      v-model="sort_method"
    /><label>正序</label>
    <input
      type="radio"
      name="sort_method"
      value="2"
      v-model="sort_method"
    /><label>倒序</label>
  </div>
  <div>
    <table border="1" class="table">
      <tr>
        <td width="80">依赖名称</td>
        <td width="80">依赖的版本要求</td>
        <td width="80">依赖类型</td>
      </tr>
      <tr v-for="dependency in dependencies" v-bind:key="dependency">
        <td width="80">
          <router-link :to="'/project/' + dependency.dependencyProjectId">{{
            dependency.dependencyProjectName
          }}</router-link>
        </td>
        <td width="80">{{ dependency.dependencyReqirements }}</td>
        <td width="80">{{ dependency.dependencyType }}</td>
      </tr>
    </table>
  </div>
  <div>
    <ul class="page">
      <li>
        <span v-if="page > 1"
          ><b @click="page--, getDependency()">上一页</b></span
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
          ><b @click="page++, getDependency()">下一页</b></span
        >
        <span v-if="page == pageAll">下一页</span>
      </li>
      <li>共{{ pageAll }}页 当前{{ page }}页</li>
      <li>
        到<input type="text" class="int02" v-model="jumpPage" /> 页<input
          type="button"
          class="bt03"
          value="确定"
          @click="goPage(jumpPage)"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import { get_repo_by_id, get_repo_dependency } from "../api/search_repo";
export default {
  name: "Repository", //注册在路由（router.js）里的就是这个
  props: {},
  data() {
    return {
      repository: {
        repositoryId: 0,
        hostType: "",
        repositoryName: "",
        repositoryOwner: "",
        language: "",
        description: "",
        homepageUrl: "",
        createT: "",
        updateT: "",
        latestPushT: "",
        canFork: true,
        forkCount: 0,
        watcherCount: 0,
        starCount: 0,
        contributorCount: 0,
        openIssueCount: 0,
        defaultBranch: "",
        licenses: [""],
      },
      dependencies: [],
      dependency_type_list: ["runtime", "test", "development", "build"],
      page: 1,
      pageAll: 1,
      jumpPage: "",
      sort_method: 1,
      id: 0,
    };
  },
  watch: {
    sort_method: "getDependency",
    $route: "refresh",
  },
  methods: {
    refresh() {
      this.getRepo();
      this.getDependency();
    },
    getRepo() {
      this.id = this.$route.params.id;
      get_repo_by_id(Number(this.id))
        .then((res) => {
          this.repository = res.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getDependency() {
      let id = this.repository.repositoryId;
      let name = document.getElementById("dependency_name").value;
      let type = document.getElementById("dependency_type").value;
      let page = this.page;
      let isReverse = true;
      if (this.sort_method == 1) {
        isReverse = false;
      }
      get_repo_dependency(id, name, type, page, isReverse)
        .then((res) => {
          this.dependencies = res.data.data.repoDeps;
          this.pageAll = res.data.data.pageAll;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    goPage(index) {
      if (Number(index) > 0 && Number(index) <= this.pageAll) {
        this.page = Number(index);
        this.getDependency();
      }
    },
  },
  mounted() {
    //let id = document.URL.split("?")[1].split("=")[1];
    this.refresh();
  },
  created() {},
};
</script>
