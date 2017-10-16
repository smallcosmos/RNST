/*
 * 页面模块基类实现文件
 *
 * Auto build by NEI Builder
 */
NEJ.define([
    'base/klass',
    'util/event',
    'base/element',
    'base/event',
    'util/ajax/xdr'
], function (k, t,_e,_v, _j, p, pro) {
    /**
     * 页面模块基类，实现页面的通用逻辑
     *
     * @class   _$$Module
     * @extends util/event._$$EventTarget
     * @param  {Object} options - 模块输入参数
     */
    p._$$Module = k._$klass();
    pro = p._$$Module._$extend(t._$$EventTarget);
    /**
     * 模块初始化
     * @protected
     * @param  {Object} options - 输入参数信息
     * @return {Void}
     */
    pro.__init = function(options){
        this.__super(options);
        this.__initLeft();
        this.__initUpload();
        setTimeout(function() {
            this.__initFixedHeader();
        }._$bind(this), 500);
        // TODO something if necessary
    };
    /**
     * 模块重置逻辑
     * @protected
     * @param  {Object} options - 输入参数信息
     * @return {Void}
     */
    pro.__reset = function(options){
        this.__super(options);
        // TODO something if necessary
    };
    /**
     *上传方法加异步请求标识
     * header{X-Requested-With：'XMLHttpRequest'}
     */
    pro.__initUpload = function (){
        _j._$upload = _j._$upload._$aop(function(rsts){
            var _option = rsts.args[1];
            _option.headers =_option.headers || {};
            _option.headers['X-Requested-With'] = 'XMLHttpRequest';
        },null).bind(this);
    };
    
    //初始化左侧菜单栏
    //初始化左侧菜单栏
    pro.__initLeft = function(){

        var LeftSidebar = document.querySelector('#J-sidebar');
        var navHeaders =_e._$getByClassName(LeftSidebar,"nav-item");
        for(var item in navHeaders){
            _v._$addEvent(navHeaders[item],"click",function(event){
                var currentElem = event.target;
                if(currentElem.parentNode.className.indexOf('show')<0){
                    for(var itm in navHeaders){
                        _e._$delClassName(navHeaders[itm],'show');
                    }
                    _e._$addClassName(currentElem.parentNode,'show');
                }else{
                    _e._$delClassName(currentElem.parentNode,'show');
                }

            });
        }
        this.__initToggle();
    };
    pro.__initToggle = function() {
        var toggleElem = _e._$get('j-toggle'),
            sidebar = _e._$get('J-sidebar'),
            bodyElem = _e._$getByClassName(document,'g-bd')[0],
            icon = _e._$getByClassName(toggleElem,'u-icon')[0];

        _v._$addEvent(toggleElem,'click', function() {
            if (sidebar.className.indexOf('g-sd-close') > -1) { //隐藏左侧导航
                _e._$delClassName(sidebar,'g-sd-close');
                _e._$delClassName(bodyElem,'g-bd-open');
                _e._$delClassName(icon,'u-icon-step-forward');
                _e._$addClassName(icon,'u-icon-step-backward');
            } else {
                _e._$addClassName(sidebar,'g-sd-close');
                _e._$addClassName(bodyElem,'g-bd-open');
                _e._$delClassName(icon,'u-icon-step-backward');
                _e._$addClassName(icon,'u-icon-step-forward');
            }
        });
    };

    pro.__initFixedHeader = function() {
        var $header = document.querySelector('.m-header'),
            $body   = document.querySelector('.g-bd');

        if ( !$header || !$body ) { return; }

        _v._$addEvent($body, 'scroll', function() {
            var origOffsetY = $header.offsetTop;
            if (  $body.scrollTop > origOffsetY ) {
                $header.classList.add('f-pf');
            } else {
                $header.classList.remove('f-pf');
            }
        });
    }
    /**
     * 模块销毁逻辑
     * @protected
     * @return {Void}
     */
    pro.__destroy = function(){
        this.__super();
        // TODO something if necessary
    };
});