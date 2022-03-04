<template>
  <el-container>
    <el-header height="150px">
      <el-descriptions :title="project.projectName" :column="3">
        <el-descriptions-item label="平台">{{
          project.platform
        }}</el-descriptions-item>
        <el-descriptions-item label="语言">{{
          project.language
        }}</el-descriptions-item>
        <el-descriptions-item label="地址">
          <el-link type="primary" :href="project.homepageUrl">{{
            project.homepageUrl
          }}</el-link>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{
          dateFormat(project.createT)
        }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{
          dateFormat(project.updateT)
        }}</el-descriptions-item>
        <el-descriptions-item label="最新发布版本时间">{{
          dateFormat(project.latestReleaseT)
        }}</el-descriptions-item>
        <el-descriptions-item label="最新版本号">{{
          project.latestReleaseN
        }}</el-descriptions-item>
        <el-descriptions-item label="所属仓库">
          <el-link
            type="primary"
            @click="$router.push('/repository/' + project.repositoryId)"
            >{{ repo_name }}</el-link
          >
        </el-descriptions-item>
        <el-descriptions-item label="仓库地址">
          <el-link type="primary" :href="project.repositoryUrl">{{
            project.repositoryUrl
          }}</el-link>
        </el-descriptions-item>
      </el-descriptions>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <div>{{ project.description }}</div>
        <div>
          <el-table :data="project.licenses" border empty-text="无许可证信息">
            <el-table-column label="许可证">
              <template #default="scope">
                {{ scope.row }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-aside>
      <el-main>
        <el-form label-position="left" label-width="80px" :inline="true">
          <p>筛选依赖</p>
          <el-form-item label="名称:">
            <el-input
              type="text"
              value=""
              placeholder="name"
              id="dependency_name"
              v-model="dependency_name"
            />
          </el-form-item>
          <el-form-item label="平台:">
            <el-input
              type="text"
              value=""
              placeholder="platform"
              id="dependency_platform"
              v-model="dependency_platform"
            />
          </el-form-item>
          <el-form-item label="依赖类型:">
            <el-select
              name=""
              id="dependency_type"
              placeholder="请选择依赖类型"
              v-model="dependency_type"
              clearable
            >
              <el-option
                v-for="type in dependency_type_list"
                v-bind:key="type"
                v-bind:value="type"
              >
                {{ type }}
              </el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-button id="searchbutton" v-on:click="getDependency(1)" round
              >搜索</el-button
            >
          </div>
        </el-form>
        <div>
          <el-radio name="sort_method" label="1" v-model="sort_method"
            ><label>正序</label></el-radio
          >
          <el-radio name="sort_method" label="2" v-model="sort_method"
            ><label>倒序</label></el-radio
          >
        </div>
        <div>
          <el-table
            :data="dependencies"
            border
            empty-text="无依赖"
            style="max-width: 50%; margin: auto"
          >
            <el-table-column prop="dependencyProjectName" label="依赖名称">
              <template #default="scope">
                <el-link type="primary" @click="$router.push('/project/' + scope.row.dependencyProjectID)">{{ scope.row.dependencyProjectName }}</el-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="dependencyProjectPlatform"
              label="依赖的所属平台"
            />
            <el-table-column
              prop="dependencyReqirements"
              label="依赖的版本要求"
            />
            <el-table-column prop="dependencyType" label="依赖类型" />
          </el-table>
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
                <span v-if="page > 2" @click="goPage(page - 1)">{{
                  page - 1
                }}</span>
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
            <li>到</li>
            <li><el-input type="text" value="1" v-model="jumpPage" /></li>
            <li>页</li>
            <el-button v-on:click="goPage(jumpPage)">确定</el-button>
          </ul>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {
  get_project_by_id,
  get_project_dependency,
} from "../api/search_project";
import { get_repo_by_id } from "../api/search_repo";
import { dateFormatter } from "@/scripts/DateFormatter.js";

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
      console.log(this.project.licenses);
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
          if (this.pageAll < 1) {
            this.pageAll = 1;
          }
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
    dateFormat(date) {
      return dateFormatter(date);
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
