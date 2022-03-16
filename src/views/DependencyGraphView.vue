<template>
  <page-header>
    <searcher category="mavenRepositoryInfo"/>
  </page-header>
  <el-menu id="maven-repo-list" v-infinite-scroll="loadMoreRepos">
    <el-menu-item v-for="repo in repos" :key="repo.projectId">
      <span class="maven-repo-name">{{repo.name}}</span>
      <span class="maven-repo-id">{{repo.groupId + ':' + repo.artifactId}}</span>
      <span class="maven-repo-description">{{repo.description}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import Searcher from '@/components/Searcher.vue'

export default {
  components: { PageHeader, Searcher },
  data() {
    return {
      repos: []
    }
  },
  methods: {
    loadMoreRepos() {
      const loadUntil = this.repos.length + 20

      for (let i = this.repos.length; i < loadUntil; i++) {
        this.repos.push({
          projectId: i,
          name: 'dummy',
          groupId: 'dummy',
          artifactId: 'dummy',
          versions: ['0.0.1'],
          description: 'dummy',
          url: 'http://example.com',
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/styles/searcher-in-header.scss';

#maven-repo-list {
  overflow: auto;
  height: calc(100vh - 60px);
  width: 20vw;
}

.maven-repo-id, .maven-repo-description {
  margin-inline-start: 4px;
  color: var(--el-color-info);
  font-size: 80%;
}
</style>
