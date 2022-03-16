<template>
  <el-table :data="contentData" v-on:sort-change="changeSort" border>
    <el-table-column
      v-for="item in columnInfo"
      :key="item"
      :sortable="item.sortable"
      :label="item.columnName"
      :prop="item.keyword"
    >
      <template #default="scope">
        <el-link
          v-if="item.isRouter"
          type="primary"
          v-on:click="
            $router.push(item.targetURL + scope.row[item.paramKeyword])
          "
        >
          {{ scope.row[item.keyword] }}
        </el-link>

        <el-link
          v-else-if="item.isURL"
          type="primary"
          :href="scope.row[item.keyword]"
        >
          {{ scope.row[item.keyword] }}
        </el-link>
        <p v-else-if="item.isDate">
          {{ dateFormat(scope.row[item.keyword]) }}
        </p>
        <p v-else>{{ scope.row[item.keyword] }}</p>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { dateFormatter } from "@/scripts/DateFormatter.js";
export default {
  name: "MyTable",
  props: {
    contentData: Array,
    columnInfo: Array,
    changeSort: Function,
  },
  data() {
    return {};
  },
  methods: {
    dateFormat(date) {
      return dateFormatter(date);
    },
  },
};
</script>