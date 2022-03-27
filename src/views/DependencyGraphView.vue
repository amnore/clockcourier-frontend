<template>
  <el-container direction="vertical">
    <page-header>
      <searcher category="mavenProjectInfo" @search="doSearch"/>
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
            :key="repo.libId"
            :index="repo.libId.toString()"
          >
            <span class="maven-repo-name">{{repo.artifactId}}</span>
            <span class="maven-repo-id">{{repo.groupId + ':' + repo.artifactId}}</span>
            <span class="maven-repo-description">{{repo.description}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main id="dependency-graph" ref="dependencyGraph">
        <el-popover
          id="node-info"
          ref="nodeInfo"
          :visible="nodeInfoVisible"
          placement="top"
        >
          <el-descriptions title="项目信息" :column="1">
            <el-descriptions-item
              v-for="(value, key) in projectInfo"
              :key="key"
              :label="projectInfoLabels[key]"
            >
              {{value}}
            </el-descriptions-item>
          </el-descriptions>
          <template #reference>
            <div id="node-info-anchor" ref="nodeInfoAnchor"/>
          </template>
        </el-popover>
      </el-main>
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

const projectInfoLabels = {
  name: '名称',
  groupId: 'GroupId',
  artifactId: 'ArtifactId',
}

export default {
  components: { PageHeader, Searcher },
  props: searchParams.dependencyInfo,
  data() {
    return {
      repos: [],
      nodeInfoVisible: false,
      projectInfo: {},
    }
  },
  methods: {
    doSearch(params) {
      console.log('doSearch', params)
      this.$router.push({
        name: 'DependencyGraph',
        params,
      })
    },
    loadMoreRepos() {
      search(
        'dependencyInfo',
        this.$props,
        [this.repos.length + 1, this.repos.length + 21],
        'GroupId',
        false
      ).then(resp => {
        console.log(resp)
        this.repos.push(...resp.data.libs)
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
            outEdges: [ { projectId: id + 1, weight: 1, } ],
          },
          {
            projectId: id + 1,
            name: 'dummy',
            outEdges: [ { projectId: id, weight: 0.1 } ],
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
            style: {
              lineWidth: 10 * e.weight,
              endArrow: {
                path: G6.Arrow.vee(Math.max(15 * e.weight, 7), Math.max(20 * e.weight, 10), 0),
                d: 0,
                fill: '#e0e0e0'
              },
            }
          })))
        })
      })
    },
  },
  computed: {
    projectInfoLabels() {
      return projectInfoLabels
    }
  },
  watch: {
    '$props': {
      deep: true,
      handler() {
        console.log('route changed')
        this.repos = []
        this.loadMoreRepos()
      },
    },
  },
  mounted() {
    const container = this.$refs.dependencyGraph.$el

    this.graph = new G6.Graph({
      container: container,
      height: container.clientHeight,
      width: container.clientWidth,
      modes: { default: [ 'drag-canvas', 'zoom-canvas' ] },
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSpacing: 100,
      },
      defaultNode: {
        type: 'circle',
        size: 50,
      },
      defaultEdge: {
        type: 'quadratic',
        style: {
          endArrow: true,
        }
      }
    })

    const _this = this
    this.graph.on('node:mouseover', ev => {
      const anchor = _this.$refs.nodeInfoAnchor
      const xdiff = ev.clientX - ev.canvasX
      const ydiff = ev.clientY - ev.canvasY
      const nodePos = ev.item._cfg.keyShape.cfg.cacheCanvasBBox

      anchor.style.top = `${nodePos.y + ydiff}px`
      anchor.style.left = `${nodePos.x + xdiff + nodePos.width / 2}px`
      _this.nodeInfoVisible = true
      Promise.resolve({
        name: 'dummy',
        groupId: 'hahaha',
        artifactId: 'xxxyyy',
      }).then(data => {
        _this.projectInfo = data
      })
    })
    this.graph.on('node:mouseout', () => {
      _this.nodeInfoVisible = false
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

#node-info-anchor {
  position: absolute;
}
</style>
