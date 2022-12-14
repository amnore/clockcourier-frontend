import { backendUrl } from '@/api/url.js';
import axios from "axios";

const basePath = `/migration/mvn/rule/`

export function searchRuleInstance(ruleId, page) {
    return axios({
        url: backendUrl + basePath + ruleId + `/instance/get`,
        method: "get",
        params: {
            page: page
        }
    })
}

export function searchRuleBaseInfo(ruleId) {
    return axios({
        url: backendUrl + basePath + ruleId + `/get`,
        method: "get",
    })
}
