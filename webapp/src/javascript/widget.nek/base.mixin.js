define(['pro/base/util'
  ,'./request.js'
  ,'pro/widget.nek/filter'
], function(_, request, filter) {
  return function(Component) {
    var NEKUI = window.NEKUI;
    var _onerror = function(json) {
      var msg = json.message || json.msg || 'UNKOWN ERROR';
      NEKUI.KLModal.alert(msg);
    };

    Component.implement({
      events: {
        '$config': function() {
          this.defaults({
            accessMap: window.accessMap || {},
          });
        }
      },
      defaults: function(defaults) {
        _.extend(this.data, defaults);
      },
      rules: function(rules) {
        _.extend(this.data, {
          rules: rules
        });
      },
      $request: function(url, options) {
        var self = this,
          btn = options.btn,
          olderror = options.onerror || _onerror,
          oldload = options.onload || noop;

        btn && btn.$update('loading', true);

        function beforecall() {
          btn && btn.$update('loading', false);
        }

        function oncomplete() { 
          self.$update();
        }

        options.onload = oldload._$aop(beforecall, oncomplete).bind(this);
        options.onerror = olderror._$aop(beforecall, oncomplete).bind(this);

        request(url, options);
      }
    });
    Component.filter(filter);
  }
});