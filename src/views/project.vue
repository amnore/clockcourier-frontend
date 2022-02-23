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
          <router-link :to="'/project?id=' + project.projectId">{{
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
</template>


<script>
import { get_project_by_id } from "../api/search_project";
export default {
  name: "Project", //注册在路由（router.js）里的就是这个
  props: {},
  data() {
    return {
      project: {
        projectId: 0,
        projectName: "string",
        platform: "string",
        language: "string",
        description: "string",
        homepageUrl: "string",
        createT: "2022-02-22T16:38:00.814Z",
        updateT: "2022-02-22T16:38:00.814Z",
        latestReleaseT: "2022-02-22T16:38:00.814Z",
        lastestReleaseN: "string",
        repositoryId: 0,
        repositoryUrl: "string",
        licenses: ["string"],
      },
    };
  },
  methods: {},
  mounted() {
    let id = document.URL.split("?")[1].split("=")[1];
    get_project_by_id(Number(id))
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
  created() {},
};
</script>

<style>
.table {
  text-align: center;
  margin: auto;
}
</style>