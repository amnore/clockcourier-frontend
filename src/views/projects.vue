<template>
  <page-header>
    <searcher category="projectInfo" />
  </page-header>
  <!-- <el-form
    id="search-form"
    label-position="left"
    label-width="80px"
    :inline="true"
  >
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
      <el-autocomplete
        v-model="language_text"
        :fetch-suggestions="getLanguages"
        placeholder="language"
        id="language_text"
      />
    </el-form-item>
    <el-form-item label="项目地址:">
      <el-input type="text" value="" placeholder="url" id="url" v-model="url" />
    </el-form-item>
    <label>创建时间:</label>
    <el-input type="date" value="2022-02-22" id="create_date" />
    <label>更新时间:</label>
    <el-input type="date" value="2022-02-22" id="update_date" />
    <label>最新发布时间:</label>
    <el-input type="date" value="2022-02-22" id="latest_pub_date" />
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
  </el-form> -->
  <!-- <div>
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
  </div> -->
  <div>
    <el-table
      :data="project_data"
      :default-sort="{ prop: 'projectName', order: 'ascending' }"
      v-on:sort-change="changeSort"
      border
    >
      <el-table-column prop="projectName" label="名称" sortable="custom">
        <template #default="scope">
          <el-link
            type="primary"
            v-on:click="$router.push('/project/' + scope.row.projectId)"
          >
            {{ scope.row.projectName }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="platform" label="平台" />
      <el-table-column prop="language" label="所用语言" />
      <el-table-column prop="homepageUrl" label="地址">
        <template #default="scope">
          <el-link type="primary" :href="scope.row.homepageUrl">{{
            scope.row.homepageUrl
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="createT" label="创建时间" sortable="custom">
        <template #default="scope">
          <p>{{ dateFormat(scope.row.createT) }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="updateT" label="更新时间" sortable="custom">
        <template #default="scope">
          <p>{{ dateFormat(scope.row.updateT) }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="latestReleaseN" label="版本" sortable="custom" />
      <el-table-column prop="repositoryUrl" label="仓库地址">
        <template #default="scope">
          <el-link type="primary" :href="scope.row.repositoryUrl">{{
            scope.row.repositoryUrl
          }}</el-link>
        </template>
      </el-table-column>
    </el-table>
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
      <li>到</li>
      <li><el-input type="text" value="1" v-model="jumpPage" /></li>
      <li>页</li>
      <el-button v-on:click="goPage(jumpPage)">确定</el-button>
    </ul>
  </div>
</template>

<script>
import { search_project } from "../api/search_project";
import getLanguageList from "@/scripts/LanguageSelector.js";
import { dateFormatter } from "@/scripts/DateFormatter.js";
import Searcher from '../components/Searcher.vue';
import { searchParams } from '@/scripts/DataSchema.js'
import PageHeader from '@/components/PageHeader.vue'

const sortKeys = {
  projectName: "Name",
  createT: "CreateT",
  updateT: "UpdateT",
  latestReleaseT: "LatestReleaseT",
  latestReleaseN: "LatestReleaseN",
};

export default {
  components: { Searcher, PageHeader },
  name: "Projects", //注册在路由（router.js）里的就是这个
  props: searchParams.projectInfo,
  data() {
    return {
      project_data: [],
      page: 1,
      pageAll: 1,
      jumpPage: "",
      sortKey: "Name",
      sortReverse: false,
    };
  },
  watch: {
    '$route.params': function(newParams, oldParams) {
      newParams, oldParams
      console.log('route changed')
      this.searchProject(newParams, 1)
    }
  },
  methods: {
    changeSort(ev) {
      if (ev.prop === null) {
        this.sortKey = "Name";
        this.sortReverse = false;
      } else {
        this.sortKey = sortKeys[ev.prop];
        this.sortReverse = ev.order === "descending";
      }
      this.searchProject(this.$props, 1);
    },
    searchProject(params, page) {
      // console.log(Object.fromEntries(Object.keys(searchParams.projectInfo).map(k => [k, this[k]])))
      this.page = page;
      search_project({
        page,
        sort: this.sortKey,
        isReverse: this.sortReverse,
        ...params
      }).then((res) => {
        console.log(res.data.msg);
        this.project_data = res.data.data.projects;
        this.pageAll = res.data.data.pageAll;
        if (this.pageAll < 1) {
          this.pageAll = 1;
        }
      }).catch(function (error) {
        console.log("连接失败");
        console.log(error);
      });
    },
    goPage(index) {
      if (Number(index) > 0 && Number(index) <= this.pageAll) {
        this.page = Number(index);
        this.searchProject(this.$props, this.page);
      }
    },
    getLanguages(input, cb) {
      getLanguageList(input, cb);
    },
    dateFormat(date) {
      return dateFormatter(date);
    },
  },
  mounted() {
    this.searchProject(this.$props, 1);
  },
  created() {},
};
</script>

<style scoped>
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

#search-form {
  margin: 2% auto;
}

::v-deep .el-input.searcher-main-input {
  --searcher-main-input-height: var(--el-header-height);
  --searcher-main-input-width: calc(100% - var(--header-logo-width));
  /* height: var(--el-header-height); */
  float: left;
  border-bottom: none;
}
</style>
