import axios from "axios";

var baseurl = "https://clockcourier.xyz:8081/api/it1"
export function search_project(data) {
  return axios({
    url: baseurl + `/project/query`, //后端的接口地址
    method: "post",
    data,
  })
}

export function get_project_by_id(id) {
  return axios({
    url: baseurl + `/project/` + id + `/get`, //后端的接口地址
    method: "get"
  })
}

export function get_project_dependency(project_id, project_version, dependency_name, dependency_platform, dependency_type, page, isReverse) {
  return axios({
    url: baseurl + `/project/` + project_id + `/dependency/query`, //后端的接口地址
    method: "post",
    data: {
      "projectVersion": project_version,
      "dependencyProjectName": dependency_name,
      "dependencyProjectPlatform": dependency_platform,
      "dependencyType": dependency_type,
      "page": page,
      "isReverse": isReverse
    },
  })
}
