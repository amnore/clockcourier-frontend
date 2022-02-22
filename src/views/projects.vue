<template>
  <div>
    <label>名称:</label>
    <input type="text" value="" placeholder="name" id="project_name" />
    <label>平台:</label>
    <input type="text" value="" placeholder="platform" id="platform" />
    <label>所用语言:</label>
    <input type="text" value="" placeholder="language" id="language" />
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
        <td width="80">{{ project.projectName }}</td>
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
</template>

<script>
import { search_project } from "../api/search_project";
export default {
  name: "Projects", //注册在路由（router.js）里的就是这个
  props: {},
  data() {
    return {
      project_data: [
        {
          projectId: 0,
          projectName: "string",
          platform: "string",
          language: "string",
          description: "string",
          homepageUrl: "string",
          createT: "2022-02-22T15:34:00.587Z",
          updateT: "2022-02-22T15:34:00.587Z",
          latestReleaseT: "2022-02-22T15:34:00.587Z",
          lastestReleaseN: "string",
          repositoryId: 0,
          repositoryUrl: "string",
          licenses: ["string"],
        },
      ],
      sort_key: 1,
      sort_method: 1,
    };
  },
  methods: {
    searchProject() {
      search_project(1,2,3,4,5,6,7,8,9)
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
</style>