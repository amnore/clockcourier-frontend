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
        <router-link :to="'/repository?id=' + repository.repositoryId">{{
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
</template>
<script>
export default {
  name: "Repository", //注册在路由（router.js）里的就是这个
  props: {},
  data() {
    return {
      repository: {
        repositoryId: 0,
        hostType: "string",
        repositoryName: "string",
        repositoryOwner: "string",
        language: "string",
        description: "string",
        homepageUrl: "string",
        createT: "2022-02-22T16:08:00.906Z",
        updateT: "2022-02-22T16:08:00.906Z",
        latestPushT: "2022-02-22T16:08:00.906Z",
        canFork: true,
        forkCount: 0,
        watcherCount: 0,
        starCount: 0,
        contributorCount: 0,
        openIssueCount: 0,
        defaultBranch: "string",
        licenses: ["string"],
      },
    };
  },
  methods: {},
  created() {},
};
</script>