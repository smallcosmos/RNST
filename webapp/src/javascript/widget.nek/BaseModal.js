/**
 * BaseModal
 */
define(['./base.mixin.js'
], function(BaseMixin) {
  return NEKUI.KLModal.extend({
    config: function(data) {
      this.supr(data);
    }
  }).use(BaseMixin);
});
