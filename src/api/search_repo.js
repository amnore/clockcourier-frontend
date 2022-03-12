import axios from "axios";

var baseurl = "https://clockcourier.xyz:8081/api/it1"
export function search_repo(name, hostType, owner, language, url, can_be_fork, page, sort, isReverse) {
  return axios({
    url: baseurl + `/repository/query`, //后端的接口地址
    method: "post",
    params: {},
    data: {
      "hostType": hostType,
      "repositoryName": name,
      "repositoryOwner": owner,
      "language": language,
      "homepageUrl": url,
      "canFork": can_be_fork,
      "page": page,
      "sort": sort,
      "isReverse": isReverse
    }
  })
}

export function get_repo_by_id(id) {
  return axios({
    url: baseurl + `/repository/` + id + `/get`, //后端的接口地址
    method: "get",
  })
}

export function get_repo_dependency(repo_id, dependency_name, dependency_type, page, isReverse) {
  return axios({
    url: baseurl + `/repository/` + repo_id + `/dependency/query`, //后端的接口地址
    method: "post",
    params: {},
    data: {
      "dependencyProjectName": dependency_name,
      "dependencyType": dependency_type,
      "page": page,
      "isReverse": isReverse
    }
  })
}
