define([
  'pro/base/util',
  'pro/widget.nek/ListComponent',
  'text!./page.html'
], function(_, ListComponent, tpl){
  return ListComponent.extend({
    url: '/demo/list',
    template: tpl,
    config: function(data) {
      this.supr(data);
    }
  });
});