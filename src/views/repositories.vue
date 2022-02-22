<template>
  <div>
    <label>名称:</label>
    <input type="text" value="" placeholder="name" id="repo_name" />
    <label>平台:</label>
    <input type="text" value="" placeholder="platform" id="hostType" />
    <label>所有者:</label>
    <input type="text" value="" placeholder="owner" id="owner" />
    <label>所用语言:</label>
    <input type="text" value="" placeholder="language" id="language" />
    <label>仓库地址:</label>
    <input type="text" value="" placeholder="url" id="url" />
    <!--
    <label>创建时间:</label>
    <input type="date" value="2022-02-22" id="create_date" />
    <label>更新时间:</label>
    <input type="date" value="2022-02-22" id="update_date" />
    <label>最新push时间:</label>
    <input type="date" value="2022-02-22" id="latest_push_date" />
    -->
    <div>
      <label>能否fork</label>
      <input type="radio" name="can_be_fork" value="1" /><label>能</label>
      <input type="radio" name="can_be_fork" value="2" /><label>不能</label>
    </div>
    <button id="searchbutton" v-on:click="search_repo()">搜索</button>
  </div>
  <div>
    <p>排序方式</p>
    <input type="radio" name="sort" value="1" v-model="sort" /><label
      >名称</label
    >
    <input type="radio" name="sort" value="2" v-model="sort" /><label
      >创建日期</label
    >
    <input type="radio" name="sort" value="3" v-model="sort" /><label
      >更新日期</label
    >
    <input type="radio" name="sort" value="4" v-model="sort" /><label
      >最新发布日期</label
    >
    <br />
    <input type="radio" name="isReverse" value="0" v-model="isReverse" /><label
      >正序</label
    >
    <input type="radio" name="isReverse" value="1" v-model="isReverse" /><label
      >倒序</label
    >
  </div>
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
      <td>watchers数量</td>
      <td>stars数量</td>
      <td>贡献者数量</td>
      <td>issue数量</td>
      <td>默认分支</td>
    </tr>
    <tr v-for="repository in repository_data" v-bind:key="repository">
      <td width="80">{{ repository.repositoryName }}</td>
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
</template>

<script>
import { search_repo } from "../api/search_repo";
export default {
  name: "Repositories", //注册在路由（router.js）里的就是这个
  props: {},
  data() {
    return {
      repository_data: [],
      sort: 1,
      isReverse: 0,
    };
  },
  methods: {
    searchRepo() {
      search_repo(1, 2, 3, 4, 5, 6, 7, 8, 9)
        .then((res) => {
            console.log("连接成功"); //这里打印出来是为了更直观的看到连接成功了
            //console.log(res); //res是后端返回来的数据，如果连接成功，则把res打印出来
            this.repository_data = res.data.data;
        })
        .catch(function (error) {
            console.log("连接失败");
            console.log(error); //如果连接失败，则抛出错误的信息
        });
    },
  },
  mounted(){
      this.searchRepo();
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