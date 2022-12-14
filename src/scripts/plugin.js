import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    message: {
      hello: 'hello...',
      select: 'Select your Language',
      depMigGraph: 'Dependency Migration Graph',
      groupId: 'GroupID',
      artifactId: 'ArtifactId',
      uploadPom: 'Upload POM',
      recommendationIndex: 'Recommendataion Index',
      description: 'Description',
      projectInfo: 'Project Information',
      previous: 'Previous',
      next: 'Next',
      to: 'To',
      page: 'Page',
      ok: 'OK!',
      migInfo: 'Migration Information',
      sourceLib: 'Source Library',
      targetLib: 'Target Library',
      confidence: 'Confidence',
      relProjects: 'Projects such migration was applied to',
      startCommit: 'Start Commit',
      endCommit: 'End Commit',
      modifiedFiles: 'Relative Modified Files',
      waiting: "Waiting for jumping out..."
    }
  },
  zh: {
    message: {
      hello: '你好...',
      select: '选择您的语言',
      depMigGraph: '依赖迁移图',
      groupId: '组织名',
      artifactId: '组件名',
      uploadPom: '上传 POM 文件',
      recommendationIndex: '推荐指数',
      description: '描述',
      projectInfo: '项目信息',
      previous: '上一页',
      next: '下一页',
      to: '到',
      page: '页',
      ok: '确认!',
      migInfo: '迁移信息',
      sourceLib: '源库',
      targetLib: '目标库',
      confidence: '置信度',
      relProjects: '使用过此迁移的项目',
      startCommit: '开始 Commit',
      endCommit: '结束 Commit',
      modifiedFiles: '相关修改文件',
      waiting: "等待跳转..."
    }
  },
}
export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})
