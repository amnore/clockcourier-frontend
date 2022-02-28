import Repositories from '@/views/repositories.vue'
import { flushPromises, mount } from '@vue/test-utils'
import axios from 'axios'

const mockResponse = {
  data: {
    "code": 0,
    "message": "success",
    "data": {
      "pageAll": 0,
      "pageSize": 2,
      "repositories": [
        {
          "repositoryId": 1,
          "hostType": "host1",
          "repositoryName": "repo1",
          "repositoryOwner": "owner1",
          "language": "lang1",
          "description": "desc1",
          "homepageUrl": "url1",
          "createT": "2022-02-28T09:26:40.694Z",
          "updateT": "2022-02-28T09:26:40.694Z",
          "latestPushT": "2022-02-28T09:26:40.694Z",
          "canFork": true,
          "forkCount": 1,
          "watcherCount": 1,
          "starCount": 1,
          "contributorCount": 1,
          "openIssueCount": 1,
          "defaultBranch": "branch1",
          "licenses": [
            "lic1"
          ]
        },
        {
          "repositoryId": 2,
          "hostType": "host2",
          "repositoryName": "repo2",
          "repositoryOwner": "owner2",
          "language": "lang2",
          "description": "desc2",
          "homepageUrl": "url2",
          "createT": "2022-02-29T09:26:40.694Z",
          "updateT": "2022-02-29T09:26:40.694Z",
          "latestPushT": "2022-02-29T09:26:40.694Z",
          "canFork": false,
          "forkCount": 2,
          "watcherCount": 2,
          "starCount": 2,
          "contributorCount": 2,
          "openIssueCount": 2,
          "defaultBranch": "branch2",
          "licenses": [
            "lic2"
          ]
        }
      ]
    }
  }
}

const mappings = [
  { key: "repositoryName", class: "repo-name" },
  { key: "hostType", class: "repo-host-type" },
  { key: "repositoryOwner", class: "repo-owner" },
  { key: "language", class: "repo-lang" },
  { key: "homepageUrl", class: "repo-url" },
  { key: "createT", class: "repo-creation-time" },
  { key: "updateT", class: "repo-update-time" },
  { key: "latestPushT", class: "repo-latest-push-time" },
  { key: "canFork", class: "repo-canfork" },
  { key: "forkCount", class: "repo-fork-count" },
  { key: "watcherCount", class: "repo-watcher-count" },
  { key: "starCount", class: "repo-star-count" },
  { key: "contributorCount", class: "repo-contributor-count" },
  { key: "openIssueCount", class: "repo-open-issue-count" },
  { key: "defaultBranch", class: "repo-default-branch" },
]

jest.mock('axios')

test('render repos', async () => {
  axios.mockResolvedValue(mockResponse)

  const wrapper = mount(Repositories, {
    attachTo: document.body
  })
  await flushPromises()
  
  mappings.forEach(({ key: k, class: c }) => {
    const data = mockResponse.data.data.repositories.map(entry => `${entry[k]}`)
    const nodes = wrapper.findAll(`.${c}`)
    expect(nodes.map(elem => elem.text())).toEqual(data)
  })
})
