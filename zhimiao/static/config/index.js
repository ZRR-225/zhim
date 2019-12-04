/**
 * 开发环境
 */
;(function () {
  window.SITE_CONFIG = {};

  // api接口请求地址
  // window.SITE_CONFIG['baseUrl'] = 'https://zhimiao.sc-msr.com/zhimiao'; //正式
  window.SITE_CONFIG['baseUrl'] = 'https://sys.sc-msr.com/zhimiao'; //验证
  // window.SITE_CONFIG['baseUrl'] = 'http://192.168.1.127:8080/zhimiao'; //本地
  // window.SITE_CONFIG['baseUrl'] = 'http://192.168.1.106:8080/zhimiao'; //本地

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain']  = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;
})();


