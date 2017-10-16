/*
 * 统一网络请求，只用于有 NEKUI 的页面
 */
define([
  'util/ajax/rest',
  'util/ajax/xdr',
  'base/util',
  'pro/base/util',
], function(rest, xdr, _ut, _) {

  var noop = function() {/**/};
  // 如果请求不写错误方法则默认用这个 Added by Cody
  var NEKUI = window.NEKUI;
  var _onerror = function(json) {
    var msg = json.message || json.msg || 'UNKOWN ERROR';
    NEKUI.KLModal.alert(msg);
  };

  /**
   * 平台request, 避免后续需要统一处理
   * opt:  其他参数如 $request
   *   - progress:  是否使用进度条提示(假)
   *   - norest:  是否 不使用REST接口
   */
  var request = function(url, opt) {
    opt = opt || {};
    var olderror = typeof opt.onerror === 'function' ? opt.onerror : _onerror,
      oldload = typeof opt.onload === 'function' ? opt.onload : noop;

    opt.onload = function(json) {
      if (json && json.code < 400 && json.code >= 200) {
        oldload.apply(this, arguments);
      } else {
        olderror.apply(this, arguments);
      }
    };
    opt.onerror = function(json) {
      olderror.apply(this, arguments);
    };
    if ((opt.method && opt.method.toLowerCase() == 'get') || !opt.method) {
      if (!opt.data) {
        opt.data = {};
      }
      opt.data.t = +new Date();
    }
    if (!opt.data) {
      opt.data = {};
    }
    opt.headers = opt.headers || {};
    opt.headers['X-Requested-With'] = 'XMLHttpRequest';
    opt.type = 'json';
    
    if (opt.norest) {
      xdr._$request(url, opt);
    } else {
      rest._$request(url, opt);
    }
  };
  return request;
});