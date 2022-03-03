<template>
  <el-form label-position="left" label-width="80px" :inline="true">
    <el-form-item label="名称:">
      <el-input
        type="text"
        value=""
        placeholder="name"
        id="project_name"
        v-model="project_name"
      />
    </el-form-item>
    <el-form-item label="平台:">
      <el-input
        type="text"
        value=""
        placeholder="platform"
        id="platform"
        v-model="platform"
      />
    </el-form-item>
    <el-form-item label="所用语言:">
      <el-input
        type="text"
        value=""
        placeholder="language"
        id="language_text"
        v-model="language_text"
      />
      <el-select
        name="language"
        id="language"
        v-model="language_select"
        placeholder="请选择语言"
        clearable
      >
        <el-option
          v-for="language in language_list"
          v-bind:key="language"
          v-bind:value="language.value"
        >
          {{ language.name }}
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="项目地址:">
      <el-input type="text" value="" placeholder="url" id="url" v-model="url" />
    </el-form-item>
    <!--
    <label>创建时间:</label>
    <el-input type="date" value="2022-02-22" id="create_date" />
    <label>更新时间:</label>
    <el-input type="date" value="2022-02-22" id="update_date" />
    <label>最新发布时间:</label>
    <el-input type="date" value="2022-02-22" id="latest_pub_date" />
	-->
    <el-form-item label="版本:">
      <el-input
        type="text"
        value=""
        placeholder="version"
        id="latestReleaseN"
        v-model="version"
      />
    </el-form-item>
    <el-form-item label="依赖库:">
      <el-input
        type="text"
        value=""
        placeholder="dependency"
        id="dependency"
        v-model="dependency"
      />
    </el-form-item>
    <el-form-item label="所属仓库:">
      <el-input
        type="text"
        value=""
        placeholder="repository"
        id="repository"
        v-model="repository"
      />
    </el-form-item>
    <div>
      <el-button id="searchbutton" v-on:click="searchProject(1)" round
        >搜索</el-button
      >
    </div>
  </el-form>
  <div>
    <p>排序方式</p>
    <el-radio name="sort_key" label="1" v-model="sort_key"
      ><label>名称</label></el-radio
    >
    <el-radio name="sort_key" label="2" v-model="sort_key"
      ><label>创建日期</label></el-radio
    >
    <el-radio name="sort_key" label="3" v-model="sort_key"
      ><label>更新日期</label></el-radio
    >
    <el-radio name="sort_key" label="4" v-model="sort_key"
      ><label>最新发布日期</label></el-radio
    >
    <el-radio name="sort_key" label="5" v-model="sort_key"
      ><label>最新发布版本</label></el-radio
    >
    <br />
    <el-radio name="sort_method" label="1" v-model="sort_method"
      ><label>正序</label></el-radio
    >
    <el-radio name="sort_method" label="2" v-model="sort_method"
      ><label>倒序</label></el-radio
    >
  </div>
  <div>
    <table border="1" class="table">
      <thead>
        <tr>
          <th>名称</th>
          <th>平台</th>
          <th>语言</th>
          <th>地址</th>
          <th>创建时间</th>
          <th>更新时间</th>
          <th>最新发布版本时间</th>
          <th>最新版本号</th>
          <th>仓库地址</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in project_data" v-bind:key="project">
          <td class="project-name">
            <router-link :to="'/project/' + project.projectId">{{
              project.projectName
            }}</router-link>
          </td>
          <td class="project-platform">{{ project.platform }}</td>
          <td class="project-language">{{ project.language }}</td>
          <td class="project-url">
            <a :href="project.homepageUrl">{{ project.homepageUrl }}</a>
          </td>
          <td class="project-creation-time">
            {{ project.createT }}
          </td>
          <td class="project-update-time">{{ project.updateT }}</td>
          <td class="project-release-time">
            {{ project.latestReleaseT }}
          </td>
          <td class="project-version">
            {{ project.latestReleaseN }}
          </td>
          <td class="project-repo-url">
            <a :href="project.repositoryUrl">{{ project.repositoryUrl }}</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <ul class="page">
      <li>
        <span v-if="page > 1"
          ><b @click="page--, searchProject(page)">上一页</b></span
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
          ><b @click="page++, searchProject(page)">下一页</b></span
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
import { search_project } from "../api/search_project";

export default {
  name: "Projects", //注册在路由（router.js）里的就是这个
  props: {},
  data() {
    return {
      project_data: [],
      project_name: "",
      platform: "",
      language_text: "",
      language_select: "",
      url: "",
      version: "",
      dependency: "",
      repository: "",
      language_list: [
        {
          name: "请选择语言",
          value: "",
        },
        {
          name: "C",
          value: "C",
        },
        {
          name: "C++",
          value: "C++",
        },
        {
          name: "Java",
          value: "Java",
        },
        {
          name: "Python",
          value: "Python",
        },
        {
          name: "PHP",
          value: "PHP",
        },
        {
          name: "JavaScript",
          value: "JavaScript",
        },
        {
          name: "Ruby",
          value: "Ruby",
        },
        {
          name: "Groovy",
          value: "Groovy",
        },
        {
          name: "Scala",
          value: "Scala",
        },
      ],
      sort_key: "1",
      sort_method: "1",
      page: 1,
      pageAll: 1,
      jumpPage: "",
    };
  },
  watch: {
    sort_key: "changeSortKey",
    sort_method: "changeSortMethod",
  },
  methods: {
    changeSortKey() {
      this.searchProject(1);
    },
    changeSortMethod() {
      this.searchProject(1);
    },
    searchProject(page) {
      let name = document.getElementById("project_name").value;
      let platform = document.getElementById("platform").value;
      let language = document.getElementById("language").value;
      if (language == "") {
        language = document.getElementById("language_text").value;
      }
      let url = document.getElementById("url").value;
      let latestReleaseN = document.getElementById("latestReleaseN").value;
      let dependency = document.getElementById("dependency").value;
      this.page = page;
      let sort = "";
      if (this.sort_key == 1) {
        sort = "Name";
      } else if (this.sort_key == 2) {
        sort = "CreateT";
      } else if (this.sort_key == 3) {
        sort = "UpdateT";
      } else if (this.sort_key == 4) {
        sort = "LatestReleaseT";
      } else if (this.sort_key == 5) {
        sort = "LatestReleaseN";
      }
      let isReverse = true;
      if (this.sort_method == 1) {
        isReverse = false;
      }
      search_project(
        name,
        platform,
        language,
        url,
        latestReleaseN,
        dependency,
        page,
        sort,
        isReverse
      )
        .then((res) => {
          console.log("连接成功");
          this.project_data = res.data.data.projects;
          this.pageAll = res.data.data.pageAll;
          if (this.pageAll < 1) {
            this.pageAll = 1;
          }
        })
        .catch(function (error) {
          console.log("连接失败");
          console.log(error);
        });
    },
    goPage(index) {
      if (Number(index) > 0 && Number(index) <= this.pageAll) {
        this.page = Number(index);
        this.searchProject(this.page);
      }
    },
  },
  mounted() {
    this.searchProject(1);
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
