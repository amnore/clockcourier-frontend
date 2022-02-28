import Header from '@/components/Header.vue'
import { mount } from '@vue/test-utils'

const projectId = 'link-projects'
const repoId = 'link-repos'
const projectUrl = '/projects'
const repoUrl = '/repositories'

test('header redirect exists', async () => {
  const wrapper = mount(Header)

  expect(wrapper.find(`#${projectId}`).attributes('to')).toEqual(projectUrl)
  expect(wrapper.find(`#${repoId}`).attributes('to')).toEqual(repoUrl)
})
