import { request } from 'alita';

const apiUrl = '/mock/70943/';
// const apiUrl = 'http://yapi.demo.qunar.com/mock/70943/';
export async function post(url: String, params: any): Promise<any> {
  let options = {
    method: 'post',
    data: params
  };
  url = apiUrl + url;
  console.log(url)
  return request(url, options).then(res => {
    console.log(res)
    return res;
  }).catch(error => {
    console.log(error);
  });
}

export async function requestWithContent(url: String, content: any): Promise<any> {
  let params = {
    content,
  };
  console.log(params)
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