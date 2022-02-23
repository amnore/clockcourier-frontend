<template>
  <div>
    <label>名称:</label>
    <input type="text" value="" placeholder="name" id="repo_name" />
    <label>平台:</label>
    <input type="text" value="" placeholder="platform" id="hostType" />
    <label>所有者:</label>
    <input type="text" value="" placeholder="owner" id="owner" />
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
      <input
        type="radio"
        name="can_be_fork"
        value="0"
        v-model="canFork"
      /><label>不选择</label>
      <input
        type="radio"
        name="can_be_fork"
        value="1"
        v-model="canFork"
      /><label>能</label>
      <input
        type="radio"
        name="can_be_fork"
        value="2"
        v-model="canFork"
      /><label>不能</label>
    </div>
    <button id="searchbutton" v-on:click="searchRepo()">搜索</button>
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
      >fork数量</label
    >
    <input type="radio" name="sort_key" value="6" v-model="sort_key" /><label
      >watcher数量</label
    >
    <input type="radio" name="sort_key" value="7" v-model="sort_key" /><label
      >star数量</label
    >
    <input type="radio" name="sort_key" value="8" v-model="sort_key" /><label
      >贡献者数量</label
    >
    <input type="radio" name="sort_key" value="9" v-model="sort_key" /><label
      >开放的issue数量</label
    >
    <br />
    <input
      type="radio"
      name="sort_method"
      value="0"
      v-model="sort_method"
    /><label>正序</label>
    <input
      type="radio"
      name="sort_method"
      value="1"
      v-model="sort_method"
    /><label>倒序</label>
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
      <td>watcher数量</td>
      <td>star数量</td>
      <td>贡献者数量</td>
      <td>issue数量</td>
      <td>默认分支</td>
    </tr>
    <tr v-for="repository in repository_data" v-bind:key="repository">
      <td width="80">
        <router-link :to="'/repository/?id=' + repository.repositoryId">{{
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

  <div>
    <ul class="page">
      <li>
        <span v-if="page > 1"><b @click="page--, searchRepo()">上一页</b></span>
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
          ><b @click="page++, searchRepo()">下一页</b></span
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
import { search_repo } from "../api/search_repo";
export default {
  name: "Repositories", //注册在路由（router.js）里的就是这个
  props: {},
  data() {
    return {
      repository_data: [],
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
      sort_method: 0,
      canFork: 0,
      page: 1,
      pageAll: 11,
      jumpPage: "",
    };
  },
  watch: {
    sort_key: "searchRepo",
    sort_method: "searchRepo",
  },
  methods: {
    searchRepo() {
      let name = document.getElementById("repo_name").value;
      let hostType = document.getElementById("hostType").value;
      let owner = document.getElementById("owner").value;
      let language = document.getElementById("language").value;
      let url = document.getElementById("url").value;
      let page = this.page;
      let sort = "";
      if (this.sort_key == 1) {
        sort = "Name";
      } else if (this.sort_key == 2) {
        sort = "CreateT";
      } else if (this.sort_key == 3) {
        sort = "UpdateT";
      } else if (this.sort_key == 4) {
        sort = "LatestPushT";
      } else if (this.sort_key == 5) {
        sort = "ForkCount";
      } else if (this.sort_key == 6) {
        sort = "WatcherCount";
      } else if (this.sort_key == 7) {
        sort = "StarCount";
      } else if (this.sort_key == 8) {
        sort = "ContributorCount";
      } else if (this.sort_key == 9) {
        sort = "OpenIssueCount";
      }
      let can_be_fork = this.canFork;
      let isReverse = true;
      if (this.sort_method == 1) {
        isReverse = false;
      }
      search_repo(
        name,
        hostType,
        owner,
        language,
        url,
        can_be_fork,
        page,
        sort,
        isReverse
      )
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
    goPage(index) {
      if (Number(index) > 0 && Number(index) <= this.pageAll) {
        this.page = Number(index);
        this.searchRepo();
      }
    },
  },
  mounted() {
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