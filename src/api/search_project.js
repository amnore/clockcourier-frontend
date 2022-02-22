import axios from "axios";

export function search_project(name, platform, language, url, lastestReleaseN, dependency, page, sort, isReverse) {
    return axios({
        url: `/API/project`, //后端的接口地址
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