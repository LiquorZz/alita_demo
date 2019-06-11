export default {
  appType: 'h5',
  proxy: {
    '/mock/70943': {
      target: 'http://yapi.demo.qunar.com',
      changeOrigin: true,
      // "pathRewrite": { "/api/specialOperation/rest.json": "" }
    },
  },
};
