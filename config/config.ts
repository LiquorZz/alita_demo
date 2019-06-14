export default {
  appType: 'h5',
  proxy: {
    '/mock/70943': {
      target: 'http://yapi.demo.qunar.com',
      changeOrigin: true,
      // "pathRewrite": { "/api/specialOperation/rest.json": "" }
    },
    // 腾讯地图api
    '/ws/district/v1': {
      target: 'https://apis.map.qq.com',
      changeOrigin: true,
      // "pathRewrite": { "/api/specialOperation/rest.json": "" }
    },
    // 高德地图api
    '/v3/config/district': {
      target: 'https://restapi.amap.com',
      changeOrigin: true,
      // "pathRewrite": { "/api/specialOperation/rest.json": "" }
    },
  },
};
