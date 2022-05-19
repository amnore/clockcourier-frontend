import { backendUrl } from './Url';
import axios from "axios";

const basePath = `/migration/mvn/rule/`

export function searchRule(ruleId, page) {
    return axios({
        url: backendUrl + basePath + ruleId + `/instance/get`,
        method: "get",
        params: {
            page: page
        }
    })
}