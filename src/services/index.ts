import { requestWithContent } from "./api";

export function qryExpend(data) {
    console.log(data);
    return requestWithContent('companyExpend', {
        id: 1
    })
}