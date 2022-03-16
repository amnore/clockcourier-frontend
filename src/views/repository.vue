<template>
  <el-container>
    <el-header height="150px">
      <el-descriptions :title="repository.repositoryName" :column="5" border>
        <el-descriptions-item label="平台">{{
          repository.hostType
        }}</el-descriptions-item>
        <el-descriptions-item label="所有者">{{
          repository.repositoryOwner
        }}</el-descriptions-item>
        <el-descriptions-item label="语言">{{
          repository.language
        }}</el-descriptions-item>
        <el-descriptions-item label="地址">
          <el-link type="primary" :href="repository.homepageUrl">{{
            repository.homepageUrl
          }}</el-link>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{
          dateFormat(repository.createT)
        }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{
          dateFormat(repository.updateT)
        }}</el-descriptions-item>
        <el-descriptions-item label="最新push时间">{{
          dateFormat(repository.latestPushT)
        }}</el-descriptions-item>
        <el-descriptions-item label="能否fork">{{
          repository.canFork
        }}</el-descriptions-item>
        <el-descriptions-item label="fork数量">{{
          repository.forkCount
        }}</el-descriptions-item>
        <el-descriptions-item label="watcher数量">{{
          repository.watcherCount
        }}</el-descriptions-item>
        <el-descriptions-item label="star数量">{{
          repository.starCount
        }}</el-descriptions-item>
        <el-descriptions-item label="贡献者数量">{{
          repository.contributorCount
        }}</el-descriptions-item>
        <el-descriptions-item label="issue数量">{{
          repository.openIssueCount
        }}</el-descriptions-item>
        <el-descriptions-item label="默认分支">{{
          repository.defaultBranch
        }}</el-descriptions-item>
      </el-descriptions>
    </el-header>
    <el-container>
      <el-aside>
        <div>{{ repository.description }}</div>
        <div>
          <el-table
            :data="repository.licenses"
            border
            empty-text="无许可证信息"
          >
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
            <el-button id="searchbutton" v-on:click="getDependency()" round
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
        <el-table
          :data="dependencies"
          border
          empty-text="无依赖"
          style="max-width: 50%; margin: auto"
        >
          <el-table-column prop="dependencyProjectName" label="依赖名称">
            <template #default="scope">
              <el-link
                type="primary"
                @click="
                  $router.push('/project/' + scope.row.dependencyProjectId)
                "
                >{{ scope.row.dependencyProjectName }}</el-link
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="dependencyReqirements"
            label="依赖的版本要求"
          />
          <el-table-column prop="dependencyType" label="依赖类型" />
        </el-table>

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
import { get_repo_by_id, get_repo_dependency } from "../api/search_repo";
import { dateFormatter } from "@/scripts/DateFormatter.js";
export default {
  name: "Repository",
  props: {},
  data() {
    return {
      repository_data: [],
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
      dependency_name: "",
      dependency_type: "",
      page: 1,
      pageAll: 1,
      jumpPage: "",
      sort_method: "1",
      id: 0,
    };
  },
  watch: {
    sort_method: "changeSortMethod",
    $route: "refresh",
  },
  methods: {
    refresh() {
      this.getRepo();
    },
    changeSortMethod() {
      this.getDependency(1);
    },
    getRepo() {
      this.id = this.$route.params.id;
      get_repo_by_id(Number(this.id))
        .then((res) => {
          this.repository = res.data.data;
          this.repository_data.push(this.repository);
          this.getDependency(1);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getDependency(page) {
      let id = this.repository.repositoryId;
      let name = document.getElementById("dependency_name").value;
      let type = document.getElementById("dependency_type").value;
      this.page = page;
      let isReverse = true;
      if (this.sort_method == 1) {
        isReverse = false;
      }
      get_repo_dependency(id, name, type, page, isReverse)
        .then((res) => {
          this.dependencies = res.data.data.repoDeps;
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

<style scoped>
.el-header {
  margin: 2%;
}

.el-aside {
  margin-left: 3%;
  margin-top: 3%;
}

</style>
