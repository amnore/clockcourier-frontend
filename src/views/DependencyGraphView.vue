<template>
  <el-container direction="vertical">
    <page-header>
      <searcher category="mavenProjectInfo"/>
    </page-header>
    <el-container>
      <el-aside>
        <el-menu
          id="maven-repo-list"
          v-infinite-scroll="loadMoreRepos"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="repo in repos"
            :key="repo.projectId"
            :index="repo.projectId.toString()"
          >
            <span class="maven-repo-name">{{repo.name}}</span>
            <span class="maven-repo-id">{{repo.groupId + ':' + repo.artifactId}}</span>
            <span class="maven-repo-description">{{repo.description}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main id="dependency-graph" ref="dependencyGraph"/>
    </el-container>
  </el-container>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import Searcher from '@/components/Searcher.vue'
import { searchParams } from '@/scripts/DataSchema.js'
import search from '@/api/Search.js'
import getGraph from '@/api/DependencyGraph.js'
import G6 from '@antv/g6'

export default {
  components: { PageHeader, Searcher },
  props: searchParams.mavenProjectInfo,
  data() {
    return {
      repos: [],
    }
  },
  methods: {
    loadMoreRepos() {
      search(
        'mavenProjectInfo',
        this.$props,
        [this.repos.length, this.repos.length + 20],
        'Name',
        false
      ).then(resp => {
        console.log(resp)
        this.repos.push(/*...resp.data*/{
          projectId: this.repos.length,
          name: 'dummy',
          groupId: 'dummy',
          artifactId: 'dummy',
          versions: ['0.0.1'],
          description: 'dummy',
          url: 'http://example.com',
        })
      })
    },
    handleSelect(id) {
      getGraph(id).then(resp => {
        console.log(resp)
        id = Number.parseInt(id)
        const nodes = /*resp.data*/[
          {
            projectId: id,
            name: 'dummy',
            outEdges: [ { projectId: id + 1, weight: 0.5, } ],
          },
          {
            projectId: id + 1,
            name: 'dummy',
            outEdges: [ { projectId: id, weight: 0.3 } ],
          }
        ]

        this.graph.changeData({
          nodes: nodes.map(n => Object.assign({
            id: n.projectId.toString(),
            label: `${n.name}${n.projectId}`,
          })),
          edges: nodes.flatMap(n => n.outEdges.map(e => Object.assign({
            source: n.projectId.toString(),
            target: e.projectId.toString(),
          })))
        })
      })
    },
  },
  mounted() {
    const container = this.$refs.dependencyGraph.$el

    this.graph = new G6.Graph({
      container: container,
      height: container.clientHeight,
      width: container.clientWidth,
      layout: { type: 'force' },
    })

    new ResizeObserver(entries => {
      const size = entries[0].contentRect
      this.graph.changeSize(size.width, size.height - 6)
      this.graph.fitCenter()
    }).observe(container)

    this.graph.read({
      nodes: [
        { id: '1', label: 'dummy1', },
      ],
      edges: [],
    })
  }
}
</script>

<style lang='scss' scoped>
@import '@/styles/searcher-in-header.scss';

#maven-repo-list {
  overflow: auto;
  height: calc(100vh - 60px);
  width: var(--el-aside-width);
}

.maven-repo-id, .maven-repo-description {
  margin-inline-start: 4px;
  color: var(--el-color-info);
  font-size: 80%;
}

#dependency-graph {
  height: calc(100vh - 60px);
  width: calc(100vw - 300px);
}
</style>
