<template>
<table border="1">
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
      <td>许可证</td>
    </tr>
    <tr v-for="project in project_data" v-bind:key="project">
        <td width=180>{{project.name}}</td>
        <td width=180>{{project.platform}}</td>
        <td width=180>{{project.info}}</td>
        <td><a :href="project.url">{{project.url}}</a></td>
    </tr>
</table>
</template>

<script>
export default {
  name: "Projects", //注册在路由（router.js）里的就是这个
  props: {},
  data() {
    return {
      project_data: [
        {
          number: 1,
          name: "test1",
          platform:"github",
          info: "测试表格1",
          url:"https://baidu.com"
        },
        {
          number: 2,
          name: "test2",
          platform:"github",
          info: "测试表格2",
          url:"https://baidu.com"
        },
      ]
    };
  },
  methods: {
    submitlogin() {
      this.verifycode = "hello";
    },
  },
  created() {},
};
</script>