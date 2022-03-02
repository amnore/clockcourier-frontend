<template>
  <div>
    <table border="1" class="table">
      <tr>
        <td>名称</td>
        <td>平台</td>
        <td>语言</td>
        <td>地址</td>
        <td>创建时间</td>
        <td>更新时间</td>
        <td>最新发布版本时间</td>
        <td>最新版本号</td>
        <td>所属仓库</td>
        <td>仓库地址</td>
      </tr>
      <tr>
        <td width="80">
          <router-link :to="'/project/' + project.projectId">{{
            project.projectName
          }}</router-link>
        </td>
        <td width="80">{{ project.platform }}</td>
        <td width="80">{{ project.language }}</td>
        <td width="80">
          <a :href="project.homepageUrl">{{ project.homepageUrl }}</a>
        </td>
        <td width="80">{{ project.createT }}</td>
        <td width="80">{{ project.updateT }}</td>
        <td width="80">{{ project.latestReleaseT }}</td>
        <td width="80">{{ project.latestReleaseN }}</td>
        <td width="80">{{ repo_name }}</td>
        <td width="80">
          <a :href="project.repositoryUrl">{{ project.repositoryUrl }}</a>
        </td>
      </tr>
    </table>
    <table border="1" class="table">
      <tr>
        <td width="80">许可证</td>
        <td v-for="license in project.licenses" v-bind:key="license">
          {{ license }}
        </td>
      </tr>
    </table>
  </div>
  <div>
    {{ project.description }}
  </div>
  <div>
    <p>筛选依赖</p>
    <label>名称:</label>
    <el-input
      type="text"
      value=""
      placeholder="name"
      id="dependency_name"
      v-model="dependency_name"
    />
    <label>平台:</label>
    <el-input
      type="text"
      value=""
      placeholder="platform"
      id="dependency_platform"
      v-model="dependency_platform"
    />
    <label>依赖类型:</label>
    <el-select
      name=""
      id="dependency_type"
      placeholder="请选择依赖类型"
      v-model="dependency_type"
    >
      <el-option
        v-for="type in dependency_type_list"
        v-bind:key="type"
        v-bind:value="type"
      >
        {{ type }}
      </el-option>
    </el-select>
    <div>
      <el-button id="searchbutton" v-on:click="getDependency(1)" round
        >搜索</el-button
      >
    </div>
    <el-radio name="sort_method" label="1" v-model="sort_method"
      ><label>正序</label></el-radio
    >
    <el-radio name="sort_method" label="2" v-model="sort_method"
      ><label>倒序</label></el-radio
    >
  </div>
  <div>
    <table border="1" class="table">
      <tr>
        <td width="80">依赖名称</td>
        <td width="80">依赖的所属平台</td>
        <td width="80">依赖的版本要求</td>
        <td width="80">依赖类型</td>
      </tr>
      <tr v-for="dependency in dependencies" v-bind:key="dependency">
        <td width="80">
          <router-link :to="'/project/' + dependency.dependencyProjectId">{{
            dependency.dependencyProjectName
          }}</router-link>
        </td>
        <td width="80">{{ dependency.dependencyProjectPlatform }}</td>
        <td width="80">{{ dependency.dependencyReqirements }}</td>
        <td width="80">{{ dependency.dependencyType }}</td>
      </tr>
    </table>
  </div>
  <div>
    <ul class="page">
      <li>
        <span v-if="page > 1"
          ><b @click="page--, getDependency(page)">上一页</b></span
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
          ><b @click="page++, getDependency(page)">下一页</b></span
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
import {
  get_project_by_id,
  get_project_dependency,
} from "../api/search_project";
import { get_repo_by_id } from "../api/search_repo";

export default {
  name: "Project", //注册在路由（router.js）里的就是这个
  props: {},
  data() {
    return {
      project: {
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
      dependencies: [
        {
          dependencyId: 0,
          projectId: 0,
          projectName: "",
          platform: "",
          projectVersion: "",
          dependencyProjectId: 0,
          dependencyProjectName: "",
          dependencyProjectPlatform: "",
          dependencyReqirements: "",
          dependencyType: "",
        },
      ],
      dependency_type_list: ["runtime", "test", "development", "build"],
      repo_name: "",
      dependency_name: "",
      dependency_platform: "",
      dependency_type: "",
      page: 1,
      pageAll: 1,
      jumpPage: "",
      sort_method: "1",
      id: 0,
      latestReleaseN: "",
    };
  },
  watch: {
    sort_method: "changeSortMethod",
    $route: "refresh",
  },
  methods: {
    refresh() {
      this.getProject();
    },
    changeSortMethod() {
      this.getDependency(1);
    },
    getProject() {
      this.id = this.$route.params.id;
      get_project_by_id(Number(this.id))
        .then((res) => {
          this.project = res.data.data;
          this.getDependency(1);
          get_repo_by_id(this.project.repositoryId)
            .then((res) => {
              this.repo_name = res.data.data.repositoryName;
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getDependency(page) {
      let id = this.id;
      let version = this.project.latestReleaseN;
      let name = document.getElementById("dependency_name").value;
      let platform = document.getElementById("dependency_platform").value;
      let type = document.getElementById("dependency_type").value;
      this.page = page;
      let isReverse = true;
      if (this.sort_method == 1) {
        isReverse = false;
      }
      get_project_dependency(id, version, name, platform, type, page, isReverse)
        .then((res) => {
          this.dependencies = res.data.data.projDeps;
          this.pageAll = res.data.data.pageAll;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    goPage(index) {
      if (Number(index) > 0 && Number(index) <= this.pageAll) {
        this.page = Number(index);
        this.getDependency(this.page);
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
