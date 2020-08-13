import { requestWithContent } from "./api";

export function qryExpend() {
    return requestWithContent('companyExpend', {
        id: 1
    });
}

export function qryClassify() {
    return requestWithContent('classifyQry', {
        id: 1
    });
}
