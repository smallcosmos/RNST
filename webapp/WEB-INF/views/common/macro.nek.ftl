<#include "/common/config.ftl">
<#include "/common/function.ftl">
<#include "/common/base.ftl">

<#assign CDN = "${jsRoot}lib/nek-ui/dist" />

<#macro nekcss>
<!--@noparse-->
<link rel="stylesheet" type="text/css" href="${CDN}/css/nek-ui.default.min.css">
<!--/@noparse-->
<!-- @STYLE -->
<link href="${csRoot}reset.css" rel="stylesheet" type="text/css"/>
<link href="${csRoot}base.css" rel="stylesheet" type="text/css"/>
<link href="${csRoot}nekui.reset.css" rel="stylesheet" type="text/css"/>
</#macro>

<#macro nekHeader title="">
<!DOCTYPE HTML>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>${title}</title>
    <@nekcss />
    <#nested>
</head>
</#macro>

<#macro nekFooter>
<!--@noparse-->
    <script src="${CDN}/vendor/regular.min.js"></script>
    <script src="${CDN}/js/nek-ui.min.js"></script>
<!--/@noparse-->
</#macro>

<#macro pageContentTpl menus=[] currentUrl="">
    <@leftMenu menuObj=menus curMenuId=currentUrl />
    <div class="g-bd" id="j-bd">
      <div class="g-bdc">
        <div id="app"></div>
        <p class="g-ft">本系统由网易无尾熊(杭州)科技有限公司提供技术支持</p>
      </div>
    </div>
    <@nekFooter />
</#macro>