/**
 * 表单字段生成组件
 * author yuqijun(yuqijun@corp.netease.com)
 */

NEJ.define([
    'base/util'
], function(_u, _p) {
    // common filter
    _p.format = function(date, format) {
        if ( !date ) { return ''; }
        return _u._$format(date, format || "yyyy-MM-dd");
    }

    _p.escape = _u._$escape;

    /**
     * by hzwuyuedong
     * 字符串截取， 中英文都算一个len
     */
    _p.formatTime = {
        set:function(value){
            return  value?new Date(value).getTime():"" ;
        },
        get:function(value){
            return  value? _u._$format(value, "yyyy-MM-dd HH:mm:ss"):null;
        }
    }

    /**
     * 时间戳转字符串日期类型
     */
    _p.formatTimeToStr = {
      set: function(value, format) {
        format = format || 'yyyy-MM-dd HH:mm:ss';
        return  value ? _u._$format(value, format) : '';
      },
      get: function(value, format) {
        format = format || 'yyyy-MM-dd HH:mm:ss';
        return  value? _u._$format(value, format):null;
      }
    }

    _p.cutstr = function(str, len) {
        var temp,
            icount = 0,
            patrn = /[^\x00-\xff]/,
            strre = "";
        for (var i = 0; i < str.length; i++) {
            if (icount < len - 1) {
                temp = str.substr(i, 1);
                if (patrn.exec(temp) == null) {
                    icount = icount + 1
                } else {
                    icount = icount + 2
                }
                strre += temp
            } else {
                break;
            }
        }
        return strre + "..."
    };


    _p.concatObjValue = function(_object, _str) {
        var _join = [];
        _u._$forIn(_object, function(_item, _index, _this) {
            _join.push(_item);
        });
        return _join.join(_str);
    };

    /**
     * by hzwuyuedong
     * 浮点数值保留指定位数小数点
     */
    _p.fixed = function(_data, _len) {
        return _u._$fixed(_data, _len);
    };
    _p.percent = function(_data, _len) {
        return parseFloat(_data) * 100 + '%';
    };

    _p.importType = function(_type) {
        var map = {'0': '直邮', '1': '保税', '2': '海淘', '3': '一般贸易'};
        return map[_type];
    };

    // 格式化数字， 加入千分位，保留小数后1/2位
    _p.number = _p.currencyFormat = function(_val, _keep) {
        if ( isNaN(_val) || _val == null || _val == undefined ) { return ''; }

        if ( isNaN(_keep) ) {
            _keep = 2;
        }

        _val = _val/1;
        _val = _val.toFixed(_keep) + ''; // 保留两位小数

        _val = _val.replace(/^(\d+)((\.\d+)?)$/, function(v1, v2, v3) {
            return v2.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,') + (v3 || '.00');
        });
        return _val;
    }

    _p.integer = function(_val) {
        if ( isNaN(_val) || _val == null || _val == undefined ) { return ''; }
        return parseInt(_val);
    }
    //两位小数
    _p.float2 = {
        set: function (value) {
            return _p.format2Float(value);
        },
        get: function (value) {
            return _p.format2Float(value);
        }
    }
    _p.format2Float = function (value) {
        value = value + '';
        var val = value.trim().replace(/[^(\d.)]/g, '');
        var tempValues = val.split(".");
        if (tempValues.length >= 2 && tempValues[1] > 0 && tempValues[1].length >= 2) {
            val = parseFloat(val).toFixed(2);
        }
        return val;
    }
    //输入整数
    _p.int = {
        set: function (value) {
            var val = value.trim().replace(/[^(\d)]/g, '');
            return val;
        },
        get: function (value) {
            return value;
        }
    }

    if (window.NEKUI) {
      NEKUI.KLTable.filter(_p);
    }

    return _p;
});