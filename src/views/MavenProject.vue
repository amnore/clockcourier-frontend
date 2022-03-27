<template>
  <el-container>
    <el-header height="100px">
      <my-description
        :columnCountInline="4"
        :columnInfo="columnInfo"
        :contentData="mavenProject"
        :title="mavenProject.artifictId"
      >
      </my-description>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-table :data="versions" empty-text="无版本信息" border>
          <el-table-column label="版本">
            <template #default="scope">
              <el-link
                type="primary"
                v-on:click="
                  $router.push(
                    '/maven-project/' + this.id + '?version=' + scope.row
                  )
                "
              >
                {{ scope.row }}
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-aside>
      <el-main>
        <div>
          <p><strong>查询不同版本间依赖变更情况</strong></p>
        </div>
        <div>
          <el-form
            id="search-form"
            label-position="right"
            label-width="80px"
            :inline="true"
          >
            <el-form-item label="版本1:">
              <el-input v-model="firstVersion" placeholder="版本1" />
            </el-form-item>
            <el-form-item label="版本2:">
              <el-input v-model="secondVersion" placeholder="版本2" />
            </el-form-item>
            <div>
              <el-button v-on:click="getDependencyDiff()" round>搜索</el-button>
            </div>
          </el-form>
        </div>
        <my-table
          :columnInfo="dependencyColumnInfo"
          :contentData="dependencies"
        ></my-table>
        <page :pageAll="pageAll" :goPage="goPage"></page>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Page from "../components/Page.vue";
import MyDescription from "../components/Description.vue";
import { columnInfos } from "../scripts/Constant.js";
import {
  searchMavenProjectById,
  searchMavenProjectByVersion,
} from "../api/SearchMavenProject.js";
import MyTable from "../components/Table.vue";

function dependencyDiff(dependency1, dependency2) {
  let diffArray = [];
  if (dependency1 == null || dependency2 == null) {
    if (dependency2 != null) {
      for (let index = 0; index < dependency2.length; index++) {
        const element = dependency2[index];
        diffArray.push({ diff: "+", ...element });
      }
    }
    if (dependency1 != null) {
      for (let index = 0; index < dependency1.length; index++) {
        const element = dependency1[index];
        diffArray.push({ diff: "-", ...element });
      }
    }
    return diffArray;
  }
  for (let index = 0; index < dependency1.length; index++) {
    const element = dependency1[index];
    if (
      dependency2.findIndex(
        (dependency) =>
          dependency.projectId == element.projectId &&
          dependency.version == element.version
      ) == -1
    ) {
      diffArray.push({ diff: "-", ...element });
    }
  }
  for (let index = 0; index < dependency2.length; index++) {
    const element = dependency2[index];
    if (
      dependency1.findIndex(
        (dependency) =>
          dependency.projectId == element.projectId &&
          dependency.version == element.version
      ) == -1
    ) {
      diffArray.push({ diff: "+", ...element });
    }
  }
  return diffArray;
}

export default {
  name: "MavenProject",
  components: { Page, MyDescription, MyTable },
  data() {
    return {
      id: 0,
      mavenProject: {
        artifictId: "test",
        projectId: 0,
        name: "",
        groupId: "test",
        version: "",
        dependencies: [],
      },
      versions: ["1.0.0"],
      version: "1.0.0",
      firstVersion: "",
      secondVersion: "",
      dependencies: [],
      dependencyDiff: [],
      pageAll: 1,
      pageSize: 10,
      columnInfo: columnInfos.mavenProjectColumnInfo,
      dependencyColumnInfo: columnInfos.mavenDependencyColumnInfo,
    };
  },
  watch: {
    $route: "refresh",
  },
  methods: {
    refresh() {
      this.getMavenProject();
    },
    getMavenProject() {
      this.id = this.$route.params.id;
      let version = this.$route.query.version;
      searchMavenProjectById(this.id)
        .then((res) => {
          console.log(res);
          this.versions = res.data.versions;
          if (!version) {
            version = this.versions[0];
          }
          this.getDependencyByVersion(version);
        })
        .catch(function (e) {
          console.log(e);
        });
    },
    getDependencyByVersion(version) {
      searchMavenProjectByVersion(this.id, version)
        .then((res) => {
          this.version = version;
          this.mavenProject.version = version;
          this.dependencyColumnInfo = columnInfos.mavenDependencyColumnInfo;
          this.mavenProject = res.data.data;
          this.setDependencies(1);
          if (this.mavenProject.dependencies != null) {
            this.pageAll = Math.ceil(
              this.mavenProject.dependencies.length / this.pageSize
            );
          }
        })
        .catch(function (e) {
          console.log(e);
        });
    },
    setDependencies(page) {
      this.dependencies = [];
      if (this.mavenProject.dependencies == null) {
        return;
      }
      for (
        let i = (page - 1) * this.pageSize;
        i < this.mavenProject.dependencies.length && i < page * this.pageSize;
        ++i
      ) {
        this.dependencies.push(this.mavenProject.dependencies[i]);
      }
    },
    setDependencyDiff(page) {
      this.dependencies = [];
      if (this.dependencyDiff == null) {
        return;
      }
      for (
        let i = (page - 1) * this.pageSize;
        i < this.dependencyDiff.length && i < page * this.pageSize;
        ++i
      ) {
        this.dependencies.push(this.dependencyDiff[i]);
      }
    },
    getDependencyDiff() {
      if (this.firstVersion == "" || this.secondVersion == "") {
        if (this.firstVersion == "" && this.secondVersion != "") {
          this.getDependencyByVersion(this.secondVersion);
        } else if (this.firstVersion != "" && this.secondVersion == "") {
          this.getDependencyByVersion(this.firstVersion);
        }
        return;
      }
      //console.log(this.firstVersion + this.secondVersion);
      let dependency1;
      let dependency2;
      searchMavenProjectByVersion(this.id, this.firstVersion)
        .then((res1) => {
          dependency1 = res1.data.data.dependencies;
          searchMavenProjectByVersion(this.id, this.secondVersion)
            .then((res2) => {
              dependency2 = res2.data.data.dependencies;
              // dependency1 = [
              //   {
              //     projectId: 0,
              //     version: "1",
              //   },
              // ];
              // dependency2 = [
              //   {
              //     projectId: 0,
              //     version: "2",
              //   },
              // ];
              //console.log(dependencyDiff(dependency1, dependency2));
              this.dependencyDiff = dependencyDiff(dependency1, dependency2);
              this.setDependencyDiff(1);
              this.dependencyColumnInfo =
                columnInfos.mavenDependencyDiffColumnInfo;
              this.pageAll = Math.ceil(
                this.dependencies.length / this.pageSize
              );
            })
            .catch(function (e) {
              console.log(e);
            });
        })
        .catch(function (e) {
          console.log(e);
        });
    },
    goPage(index) {
      //TODO: pageChange
      if (Number(index) > 0 && Number(index) <= this.pageAll) {
        this.page = Number(index);
        if (
          JSON.stringify(this.dependencyColumnInfo) ==
          JSON.stringify(columnInfos.mavenDependencyColumnInfo)
        ) {
          this.setDependencies(this.page);
        } else {
          this.setDependencyDiff(this.page);
        }
      }
    },
  },
  mounted() {
    this.refresh();
  },
  created() {},
};
</script>

<style lang="scss" scoped>
#search-form {
  margin: 2% auto;
}

.el-header {
  margin: 2%;
}

.el-aside {
  margin-left: 3%;
  margin-top: 3%;
}
</style>