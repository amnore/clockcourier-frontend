<template>
  <div>
    <label>名称:</label>
    <input type="text" value="" placeholder="name" id="project_name" />
    <label>平台:</label>
    <input type="text" value="" placeholder="platform" id="platform" />
    <label>所用语言:</label>
    <select name="language" id="language">
      <option value="">请选择语言</option>
      <option
        v-for="language in language_list"
        v-bind:key="language"
        v-bind:value="language.name"
      >
        {{ language.name }}
      </option>
    </select>
    <label>项目地址:</label>
    <input type="text" value="" placeholder="url" id="url" />
    <!--
    <label>创建时间:</label>
    <input type="date" value="2022-02-22" id="create_date" />
    <label>更新时间:</label>
    <input type="date" value="2022-02-22" id="update_date" />
    <label>最新发布时间:</label>
    <input type="date" value="2022-02-22" id="latest_pub_date" />
	-->
    <label>版本:</label>
    <input type="text" value="" placeholder="version" id="lastestReleaseN" />
    <label>依赖库:</label>
    <input type="text" value="" placeholder="dependency" id="dependency" />
    <label>所属仓库:</label>
    <input type="text" value="" placeholder="repository" id="repository" />
    <div>
      <button id="searchbutton" v-on:click="searchProject()">搜索</button>
    </div>
  </div>
  <div>
    <p>排序方式</p>
    <input type="radio" name="sort_key" value="1" v-model="sort_key" /><label
      >名称</label
    >
    <input type="radio" name="sort_key" value="2" v-model="sort_key" /><label
      >创建日期</label
    >
    <input type="radio" name="sort_key" value="3" v-model="sort_key" /><label
      >更新日期</label
    >
    <input type="radio" name="sort_key" value="4" v-model="sort_key" /><label
      >最新发布日期</label
    >
    <input type="radio" name="sort_key" value="5" v-model="sort_key" /><label
      >最新发布版本</label
    >
    <br />
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
      <tr v-for="project in project_data" v-bind:key="project">
        <td width="80">
          <router-link :to="'/project/?id=' + project.projectId">{{
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
        <td width="80">{{ project.lastestReleaseN }}</td>
        <td width="80">{{ project.language }}</td>
        <td width="80">{{ project.repositoryUrl }}</td>
      </tr>
    </table>
  </div>
  <div>
    <ul class="page">
      <li>
        <span v-if="page > 1"
          ><b @click="page--, searchProject()">上一页</b></span
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
          ><b @click="page++, searchProject()">下一页</b></span
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

      language_list: [
        {
          name: "C",
        },
        {
          name: "C++",
        },
        {
          name: "Java",
        },
        {
          name: "Python",
        },
        {
          name: "PHP",
        },
        {
          name: "JavaScript",
        },
        {
          name: "Ruby",
        },
        {
          name: "Groovy",
        },
        {
          name: "Scala",
        },
        {
          name: "",
        },
      ],
      sort_key: 1,
      sort_method: 1,
      page: 1,
      pageAll: 11,
      jumpPage: "",
    };
  },
  watch: {
    sort_key: "searchProject",
    sort_method: "searchProject",
  },
  methods: {
    searchProject() {
      let name = document.getElementById("project_name").value;
      let platform = document.getElementById("platform").value;
      let language = document.getElementById("language").value;
      let url = document.getElementById("url").value;
      let lastestReleaseN = document.getElementById("lastestReleaseN").value;
      let dependency = document.getElementById("dependency").value;
      let page = this.page;
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
        lastestReleaseN,
        dependency,
        page,
        sort,
        isReverse
      )
        .then((res) => {
          console.log("连接成功"); //这里打印出来是为了更直观的看到连接成功了
          //console.log(res); //res是后端返回来的数据，如果连接成功，则把res打印出来
          this.project_data = res.data.data;
        })
        .catch(function (error) {
          console.log("连接失败");
          console.log(error); //如果连接失败，则抛出错误的信息
        });
    },
    goPage(index) {
      if (Number(index) > 0 && Number(index) <= this.pageAll) {
        this.page = Number(index);
        this.searchProject();
      }
    },
  },
  mounted() {
    this.searchProject();
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