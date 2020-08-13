import { request } from 'alita';
import { Toast } from 'antd-mobile';
const yapiUrl = '/mock/70943/';
const qqUrl = '/ws/district/v1/';
const gdUrl = '/v3/config/district';
// const apiUrl = 'http://yapi.demo.qunar.com/mock/70943/';
export async function post(url: string, params: any): Promise<any> {
  let options = {
    method: 'post',
    data: params
  };
  url = yapiUrl + url;
  return request(url, options).then(res => {
    return res;
  }).catch(error => {
    console.log(error);
  });
}

export async function qqGet(url: string, params: any): Promise<any> {
  let options = {
    method: 'get',
    params: params
  };
  url = qqUrl + url;
  return request(url, options).then(res => {
    if (res.status === 0) {
      return res;
    } else {
      Toast.fail(res.message || '请求失败，未知错位', Toast.SHORT);
    }
  }).catch(error => {
    Toast.fail(error.message || '请求失败，未知错位', Toast.SHORT);
    console.log(error);
  });
}

export async function gdGet(url: string, params: any): Promise<any> {
  let options = {
    method: 'get',
    params: params
  };
  url = gdUrl + url;
  return request(url, options).then(res => {
    if (res.status === '1') {
      return res;
    } else {
      Toast.fail(res.message || '请求失败，未知错误', Toast.SHORT);
    }
  }).catch(error => {
    Toast.fail(error.message || '请求失败，未知错误', Toast.SHORT);
    console.log(error);
  });
}

export async function requestWithContent(url: string, content: any): Promise<any> {
  let params = {
    content,
  };
  return post(url, params)
    // .then(checkStatus)
    // .then(parseJSON)
    // .then((data) => { console.log(data) })
    .then((res) => {
      console.log(params);
      console.log(res);
      return res;
    })
    .catch((err) => ({ err }));
}

// function parseJSON(response) {
//   return response.json();
// }

// function checkStatus(response) {
//   console.log(response)
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }

//   const error = new Error(response.statusText);
//   error.message = response;
//   throw error;
// }