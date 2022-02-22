import axios from "axios";

export function search_repo(name, hostType, owner, language, url, can_be_fork, page, sort, isReverse) {
    return axios({
        url: `/API/repository`, //后端的接口地址
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