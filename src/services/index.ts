import { requestWithContent } from "./api";

export function qryExpend(data) {
    return requestWithContent('companyExpend', {
        id: 1
    })
}
export function qryClassify(data) {
    return requestWithContent('classifyQry', {
        id: 1
    })
}