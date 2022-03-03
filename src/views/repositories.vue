<template>
  <el-form label-position="right" label-width="80px" :inline="true">
    <el-form-item label="名称:">
      <el-input
        type="text"
        value=""
        placeholder="name"
        id="repo_name"
        v-model="repo_name"
      />
    </el-form-item>

    <el-form-item label="平台:">
      <el-input
        type="text"
        value=""
        placeholder="platform"
        id="hostType"
        v-model="platform"
      />
    </el-form-item>
    <el-form-item label="所有者:">
      <el-input
        type="text"
        value=""
        placeholder="owner"
        id="owner"
        v-model="owner"
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
    <el-form-item label="仓库地址:">
      <el-input type="text" value="" placeholder="url" id="url" v-model="url" />
    </el-form-item>
    <!--
    <label>创建时间:</label>
    <el-input type="date" value="2022-02-22" id="create_date" />
    <label>更新时间:</label>
    <el-input type="date" value="2022-02-22" id="update_date" />
    <label>最新push时间:</label>
    <el-input type="date" value="2022-02-22" id="latest_push_date" />
    -->
    <el-form-item label="能否fork:">
      <el-radio name="can_be_fork" label="0" v-model="canFork"
        ><label>不选择</label></el-radio
      >
      <el-radio name="can_be_fork" label="1" v-model="canFork"
        ><label>能</label></el-radio
      >
      <el-radio name="can_be_fork" label="2" v-model="canFork"
        ><label>不能</label></el-radio
      >
    </el-form-item>
    <div>
      <el-button id="searchbutton" v-on:click="searchRepo(1)" round
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
      ><label>fork数量</label></el-radio
    >
    <el-radio name="sort_key" label="6" v-model="sort_key"
      ><label>watcher数量</label></el-radio
    >
    <el-radio name="sort_key" label="7" v-model="sort_key"
      ><label>star数量</label></el-radio
    >
    <el-radio name="sort_key" label="8" v-model="sort_key"
      ><label>贡献者数量</label></el-radio
    >
    <el-radio name="sort_key" label="9" v-model="sort_key"
      ><label>开放的issue数量</label></el-radio
    >
    <br />
    <el-radio name="sort_method" label="0" v-model="sort_method"
      ><label>正序</label></el-radio
    >
    <el-radio name="sort_method" label="1" v-model="sort_method"
      ><label>倒序</label></el-radio
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
      <td>watcher数量</td>
      <td>star数量</td>
      <td>贡献者数量</td>
      <td>issue数量</td>
      <td>默认分支</td>
    </tr>
    <tr v-for="repository in repository_data" v-bind:key="repository">
      <td class="repo-name">
        <router-link :to="'/repository/' + repository.repositoryId">{{
          repository.repositoryName
        }}</router-link>
      </td>
      <td class="repo-host-type">{{ repository.hostType }}</td>
      <td class="repo-owner">{{ repository.repositoryOwner }}</td>
      <td class="repo-lang">{{ repository.language }}</td>
      <td class="repo-url">
        <a :href="repository.homepageUrl">{{ repository.homepageUrl }}</a>
      </td>
      <td class="repo-creation-time">{{ repository.createT }}</td>
      <td class="repo-update-time">{{ repository.updateT }}</td>
      <td class="repo-latest-push-time">
        {{ repository.latestPushT }}
      </td>
      <td class="repo-canfork">{{ repository.canFork }}</td>
      <td class="repo-fork-count">{{ repository.forkCount }}</td>
      <td class="repo-watcher-count">
        {{ repository.watcherCount }}
      </td>
      <td class="repo-star-count">{{ repository.starCount }}</td>
      <td class="repo-contributor-count">
        {{ repository.contributorCount }}
      </td>
      <td class="repo-open-issue-count">
        {{ repository.openIssueCount }}
      </td>
      <td class="repo-default-branch">
        {{ repository.defaultBranch }}
      </td>
    </tr>
  </table>

  <div>
    <ul class="page">
      <li>
        <span v-if="page > 1"
          ><b @click="page--, searchRepo(page)">上一页</b></span
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
          ><b @click="page++, searchRepo(page)">下一页</b></span
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
      repo_name: "",
      platform: "",
      owner: "",
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
      sort_method: "0",
      canFork: "0",
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
      this.searchRepo(1);
    },
    changeSortMethod() {
      this.searchRepo(1);
    },
    searchRepo(page) {
      let name = document.getElementById("repo_name").value;
      let hostType = document.getElementById("hostType").value;
      let owner = document.getElementById("owner").value;
      let language = document.getElementById("language").value;
      if (language == "") {
        language = document.getElementById("language_text").value;
      }
      let url = document.getElementById("url").value;
      this.page = page;
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
      let canFork = null;
      if (can_be_fork == 1) {
        canFork = true;
      } else if (can_be_fork == 2) {
        canFork = false;
      }
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
        canFork,
        page,
        sort,
        isReverse
      )
        .then((res) => {
          console.log("连接成功"); //这里打印出来是为了更直观的看到连接成功了
          //console.log(res); //res是后端返回来的数据，如果连接成功，则把res打印出来
          this.repository_data = res.data.data.repositories;
          this.pageAll = res.data.data.pageAll;
          if (this.pageAll < 1) {
            this.pageAll = 1;
          }
        })
        .catch(function (error) {
          console.log("连接失败");
          console.log(error); //如果连接失败，则抛出错误的信息
        });
    },
    goPage(index) {
      if (Number(index) > 0 && Number(index) <= this.pageAll) {
        this.page = Number(index);
        this.searchRepo(this.page);
      }
    },
  },
  mounted() {
    this.searchRepo(1);
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
