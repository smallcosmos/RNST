/*
 * --------------------------------------------
 * 项目内工具函数集合，此页面尽量写注释
 * @version  1.0
 * @author   yuqijun(yuqijun@corp.netease.com)
 * --------------------------------------------
 */
define([
    'base/util'
], function(_ut) {

    var _ = {},
        noop = function(){};


    // 类型判断， 同typeof
    _.typeOf = function (o) {
        return o == null ? String(o) : ({}).toString.call(o).slice(8, -1).toLowerCase();
    }
    //获取不带参数的url路径
    _.getUrlPath = function(url){
        return url.split("?")?url.split("?")[0]:"";
    }
    _.findInList = function(id, list, ident){
        ident = ident || "id";
        var len = list.length;
        for(; len--;){
            if(list[len][ident] == id) return len
        }
        return -1;
    }
    /**
     * 格式化时间
     * @param date 需要格式化的时间
     * @param flag false-00:00:00 ture-23:59:59
     * @returns {*}
     */
    _.formatDate2Long = function(date, flag) {
        if (date == null || typeof  date == 'undefined' || !date) {
            return null;
        }
        var timeStr = _ut._$format(new Date(date), 'yyyy-MM-dd ') + (flag ?' 23:59:59' : ' 00:00:00');
        return new Date(timeStr).getTime();
    }

    _.merge = function(obj1, obj2){
        var
            type1 = _.typeOf(obj1),
            type2 = _.typeOf(obj2),
            len;

        if(type1 !== type2) return obj2;
        switch(type2){
            case 'object':
                for(var i in obj2){
                    if(obj2.hasOwnProperty(i)){
                        obj1[i] = _.merge(obj1[i], obj2[i]);
                    }
                }
                break;
            case "array":
                for(var i = 0, len = obj2.length; i < len; i++ ){
                    obj1[i] = _.merge(obj1[i], obj2[i]);
                }
                obj1.length = obj2.length;
                break;
            default:
                return obj2;
        }
        return obj1;
    }  // meregeList
    /**
     * list merge原列表
     * list2 新列表
     * 最后改动的list
     */
    _.mergeList = function(list, list2, ident){
        ident = ident || "id";
        var len = list.length;
        for(; len--;){
            for(var i = 0, len1 = list2.length; i < len1; i++){
                if(list2[i][ident] != null&&list2[i][ident] === list[len][ident]){
                    list.splice(len, 1, _.merge(list2[i],list[len]));
                    break;
                }
            }
        }
    }
    // 深度clone
    _.clone = function(obj){
        var type = _.typeOf(obj);
        switch(type){
            case "object":
                var cloned = {};
                for(var i in obj){
                    cloned[i] = _.clone(obj[i])
                }
                return cloned;
            case 'array':
                return obj.map(_.clone);
            default:
                return obj;
        }
        return obj;
    }

    _.extend = function(o1, o2 ,override){
        for( var i in o2 ) if( o1[i] == undefined || override){
            o1[i] = o2[i]
        }
        return o1;
    }

    _.copyObject = function(obj){
        var result;
        if(_ut._$isArray(obj,'array')){
            result =[];
            for(var i=0,l=obj.length;i<l;i++){
                if(typeof obj[i] =='object'){
                    result.push(_.copyObject(obj[i]));
                } else{
                    result.push(obj[i]);
                }
            }
        } else if(_ut._$isObject(obj,'array')){
            result ={};
            for(var i in obj){
                if(obj.hasOwnProperty(i)){
                    if(typeof obj[i]=='object'){
                        result[i] = _.copyObject(obj[i]);
                    } else{
                        result[i] = obj[i];
                    }
                }
            }
        }
        return result;
    };
    /**
     * 压缩regular模版
     * @param htmlstr
     * @returns {XML|string}
     * add by xuejimiao 2016/02/25
     */
    _.compressHtml = function(htmlstr){
        //防止nej打包模版后报错
        if(typeof htmlstr !== "string"){
            return htmlstr;
        }
        return htmlstr.replace(/[\r\n]|\s+(?=[<{])/g,'').replace(/[}>]\s+/g, function(value){
            return value.substr(0,1);
        })
    };
    _.filterNoneData = function(_data){
        for(var _key in _data){

            if(_data.hasOwnProperty(_key)){
                if(typeof _data[_key] == 'number' && isNaN(_data[_key])){
                    delete _data[_key];
                }
            }
        }
    };
    _.filterParam = function(_obj) {
        for (var key in _obj) {
            if (_obj[key] === null || _obj[key] === "" || typeof _obj[key] ==='undefined') {
                delete _obj[key];
            }
        }
        return _obj;
    }
    
    /**
     * 节流函数
     * @param fn  源函数
     * @param delay  节流时间 可选 默认 300毫秒
     * @param mustRunDelay 必须触发的时间段 可选
     * @returns {Function}
     */
    _.throttle = function(fn, delay, mustRunDelay){
        delay = typeof delay === 'undefined' ? 800 : Number(delay);
        var timer = null,
            startTime = null;
        return function(){
            var context = this, arg = arguments, callTime = +new Date();
            clearTimeout(timer);
            if(!startTime){
                startTime = callTime;
            }
            if(callTime - startTime >= mustRunDelay){
                fn.apply(context, arg);
                startTime = callTime;
            }else{
                timer = setTimeout(function(){
                    fn.apply(context, arg);
                }, delay)
            }
        }
    };

    return _;

});
