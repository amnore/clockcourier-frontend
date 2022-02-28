import Projects from '@/views/projects.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { nextTick, watch } from 'vue'
import axios from 'axios'

const mockResponse = {
  data: {
    "code": 0,
    "message": "success",
    "data": {
      "pageAll": 0,
      "pageSize": 2,
      "projects": [
        {
          "projectId": 1,
          "projectName": "proj1",
          "platform": "pypi",
          "language": "python",
          "description": "desc1",
          "homepageUrl": "url1",
          "createT": "2022-02-27T15:51:28.491Z",
          "updateT": "2022-02-27T15:51:28.491Z",
          "latestReleaseT": "2022-02-27T15:51:28.491Z",
          "latestReleaseN": "0.0.1",
          "repositoryId": 1,
          "repositoryUrl": "repo1",
          "licenses": [
            "license1"
          ]
        },
        {
          "projectId": 2,
          "projectName": "proj2",
          "platform": "npmjs",
          "language": "js",
          "description": "desc2",
          "homepageUrl": "url2",
          "createT": "2022-02-28T15:51:28.491Z",
          "updateT": "2022-02-28T15:51:28.491Z",
          "latestReleaseT": "2022-02-28T15:51:28.491Z",
          "latestReleaseN": "0.0.2",
          "repositoryId": 2,
          "repositoryUrl": "repo2",
          "licenses": [
            "license2"
          ]
        }
      ]
    }
  }
}

const mappings = [
  { key: 'projectName', class: 'project-name' },
  { key: 'platform', class: 'project-platform' },
  { key: 'language', class: 'project-language' },
  { key: 'homepageUrl', class: 'project-url' },
  { key: 'createT', class: 'project-creation-time' },
  { key: 'updateT', class: 'project-update-time' },
  { key: 'latestReleaseT', class: 'project-release-time' },
  { key: 'latestReleaseN', class: 'project-version' },
  { key: 'repositoryUrl', class: 'project-repo-url' },
]

jest.mock('axios')

test('render projects', async () => {
  axios.mockResolvedValue(mockResponse)

  const wrapper = mount(Projects, {
    attachTo: document.body
  })
  await flushPromises()
  
  mappings.forEach(({ key: k, class: c }) => {
    const data = mockResponse.data.data.projects.map(entry => entry[k])
    const nodes = wrapper.findAll(`.${c}`)
    expect(nodes.map(elem => elem.text())).toEqual(data)
  })
})
