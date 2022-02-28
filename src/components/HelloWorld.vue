<template>
  <h1 id="hello" v-on:click="update">{{ count }}</h1>
  <ul id="hello2">
    <li class="hello2" v-for="n in arr" v-bind:key="n">{{ n }}</li>
  </ul>
</template>

<script>
import axios from 'axios';
export default {
  name: "HelloWorld",
  data() {
    return {
      count: 0,
      arr: []
    }
  },
  methods: {
    update() {
      axios('/data').then(res => this.arr = res)
    }
  },
  mounted() {
    this.update()
  }
};
</script>

<style scoped>
</style>
