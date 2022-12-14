<template>
  <div>
    <ul class="page">
      <li>
        <span v-if="page > 1">
          <b @click="page--, goPage(page)">
            {{ $t("message.previous") }}
          </b>
        </span>
        <span v-if="page == 1">
          {{ $t("message.previous") }}
        </span>
        <span v-if="Number(pageAll) <= 10">
          <span
            v-for="index in pageAll"
            :key="index"
            :class="{ active: page == index }"
            @click="(page = index), goPage(index)"
            >{{ index }}</span
          ></span
        >
        <span v-if="Number(pageAll) > 10">
          <span @click="(page = 1), goPage(1)">1</span>
          <span v-if="page > 3">...</span>
          <span v-if="page > 2" @click="page--, goPage(page)">{{
            page - 1
          }}</span>
          <span v-if="page > 1 && page < pageAll" @click="goPage(page)">{{
            page
          }}</span>
          <span v-if="page < pageAll - 1" @click="page++, goPage(page)">{{
            page + 1
          }}</span>
          <span v-if="page < pageAll - 2">...</span>
          <span @click="(page = pageAll), goPage(pageAll)">{{ pageAll }}</span>
        </span>
        <span v-if="page != pageAll"
          ><b @click="page++, goPage(page)">
          {{ $t("message.next") }}
          </b></span
        >
        <span v-if="page == pageAll">
          {{ $t("message.next") }}
        </span>
      </li>
      <li>{{ page }} / {{ pageAll }}</li>
      <li>{{ $t("message.to") }}</li>
      <li><el-input type="text" value="1" v-model="jumpPage" /></li>
      <li>{{ $t("message.page") }}</li>
      <el-button v-on:click="(page = Number(jumpPage)), goPage(jumpPage)"
        >
        {{ $t("message.ok") }}
      </el-button
      >
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Page",
    props: {
      pageAll: Number,
      goPage: new Function(),
    },
    data() {
      return {
        jumpPage: "",
        page: 1,
      };
    },
    methods: {
      changePage(index) {
        this.page = index;
      },
    },
  };
</script>


<style scoped>
.page li span {
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #dfdfdf;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
}

.page li {
  display: inline-block;
  margin: 0 5px;
}
</style>
