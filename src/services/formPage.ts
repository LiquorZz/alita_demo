import { requestWithContent, qqGet, gdGet } from './api';

// export function qryDistrictList(data) {
//     console.log(data);
//     return qqGet('list', {
//         key: 'ZNSBZ-Z33CI-UH7GM-5UUF5-TSI2S-YEFXO'
//     })
// }

export function qryDistrictList(data) {
    return gdGet('', {
        key: 'c1242e702ac050f2d1618d4822694e9d',
        subdistrict: '3'
    })
}
export function qryCommodityData(data) {
    return requestWithContent('commodityInfo', {
        commodity_id: data.commodity_id
    })
}
export function submit(data) {
    return requestWithContent('createOrder', {
        package_name: data.packageName,
        package_id:data.packageId,
        oper_name:data.operName,
        address:data.address,
        phone_num:data.phoneNum,
    })
}