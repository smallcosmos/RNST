define([
  'pro/base/util',
  'base/util',
  './BaseComponent.js'
], function(_, _ut, BaseComponent){

  var ListComponent = BaseComponent.extend({
    watchedAttr: ['pageNo', 'pageSize'],
    events:{
      'updatelist':function() {
        this.__getList();
      }
    },
    config: function(data){
      this.defaults({
        total: 1,
        pageNo: 1,
        pageSize: 20,
        condition: {},
        list: [],
        loading: false,
      });

      this.supr(data);

      this.$watch(this.watchedAttr, function(){
        if(this.shouldUpdateList()){
          this.__getList();
        }
      });
    },
    // @子类修改
    shouldUpdateList: function(data){
      return true;
    },
    getExtraParam:function(){
      return this.data.condition;
    },
    refresh:function(_data, isExtend){
      var data = this.data;
      data.pageNo = 1;
      if (isExtend) {
        data.condition = _.extend(_data, data.condition);
      } else {
        data.condition = _data || data.condition;
      }
      this.$emit('updatelist');
    },
    /* @子类修改 重置表单筛选项 */
    reset: function() {
      this.data.condition = {};
    },
    getListParam: function(){
      var data = this.data;

      var _obj = _.extend({
        pageNo: data.pageNo,
        pageSize: data.pageSize
      }, this.getExtraParam(data));
      _.filterParam(_obj);
      return _obj;
    },
    __bodyResolver:function(json) {
      if ( json.code != 200 ) {
        NEKUI.Notify.error(json.message);
      }

      var result = json.data,
        list = result.list || [];

      this.data.total = result.total;
      this.data.list = list;
      this.$update();
    },
    __handleReset: function() {
      this.$update('condition', {});
    },
    // update loading
    __getList: function(){
      this.data.loading = true;
      var option = {
        progress: true,
        data: this.getListParam(),
        type: 'json',
        onload: function(json){
          this.__bodyResolver(json);
          this.$update('loading', false);
        },
        onerror: function() {
          this.$update('loading', false);
        }
      };
      if(this.xdrOption){
        var xdrOpt = this.xdrOption();
        if(xdrOpt.norest){
          option.data = _ut._$object2query(this.getListParam());
          option.norest = true;
        }

        option.method = xdrOpt.method||'GET';

      }
      this.$request(this.url, option)
    }
  });
  return ListComponent;
})