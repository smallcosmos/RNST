const path = require('path');

module.exports = {
  // Listen port for moky server, OPTIONAL
  localPort: 3077,

  // Asnyc api mock directory, OPTIONAL
  // eg: GET /test/api  -> get/test/api.js{on}
  asyncMockPath: path.join(__dirname, 'moky_mock/async_mock'),

  // Template mock directory, OPTIONAL
  // eg: /user/home  ->  user/home.js{on}
  // Tips: this's useful ONLY if your application is template-engine based 
  viewsMockPath: path.join(__dirname, 'moky_mock/views_mock'),

  // Default async mock data, OPTIONAL
  // If mock file is missing or empty, then return this
  defaultMock: {},

  /* Default mock data, OPTIONAL */
  defaultMock: { code: 200, message: 'ok' },

  // Root directory for template rendering, REQUIRED
  viewsPath: path.join(__dirname, 'WEB-INF/views'),

  // Static router, OPTIONAL but usually required
  publicPaths: {
    '/src': path.join(__dirname, 'src'),
  },

  // Template engine settings, the same as koa-views, REQUIRED
  viewConfig: {
    extension: 'ftl',
    map: {
      ftl: 'freemarker'
    },
  },

  // Host name of proxy, works for `virtual hosts`, OPTIONAL
  // hostName: 'randomuser.me',

  // Settings for proxy, OPTIONAL
  // Value can be like: <URL1>#<URL2>,
  // here <URL1> is for page proxy, <URL2> is for async api proxy
  // Tips: if <URL1> is missing, then page uses mock data
  proxyMaps: {
    local: 'http://127.0.0.1:8081',
    stable_dev: 'http://finance.kaola.com',
    jxc_test5: 'http://10.165.125.109:8269'
  },

  // Settings for template page routing, REQUIRED
  // Tips: path prefix and file suffix are not required
  urlMaps: require('./moky.urlMaps'),
}
