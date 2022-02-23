import axios from "axios";

export function search_project(name, platform, language, url, lastestReleaseN, dependency, page, sort, isReverse) {
    return axios({
        url: `/API/project/query`, //后端的接口地址
        method: "post",
        data: {
            "name": name,
            "platform": platform,
            "language": language,
            "homepageUrl": url,
            "lastestReleaseN": lastestReleaseN,
            "dependency":dependency,
            "page": page,
            "sort": sort,
            "isReverse": isReverse
        },
    })
}

export function get_project_by_id(id) {
    console.log(id);
    return axios({
        url: `/API/project/`+id+`/get`, //后端的接口地址
        method: "get"
    })
}