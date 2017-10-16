/**
 * BaseComponent
 */
define(['./base.mixin.js'], function(BaseMixin) {
  return Regular.extend({
    config: function(data) {
      this.supr(data);
    },
  }).use(BaseMixin);
});