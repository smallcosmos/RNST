<#function containsId list url>
    <#local flag = false />
    <#list list as item>
        <#if item.url == url>
            <#local flag = true />
        </#if>
    </#list>
    <#return flag>
</#function>

<#function isHomePage url>
    <#local flag = false />
    <#if url == "/index">
        <#local flag = true />
    </#if>
    <#return flag>
</#function>

<#-- 左侧菜单 -->
<#macro leftMenu menuObj=[] curMenuId=''>
<div class="g-sd ${from!''}"  id="J-sidebar">
  <div class="head">
    <a href="/" class="logo"></a>
    <h1>财务系统</h1>
    <span id="username">${currentUser.nickname!''}(${(currentUser.username)!''})</span>
    <ul class="f-mt10 f-mb10">
      <li class="tag">中文</li>
    </ul>
    <a class="s-fc-white" href="/logout">退出</a>
  </div>
<#-- 输出一级菜单 -->
  <div class="m-nav">
      <#list menuObj as menu>
        <div class="nav-item <#if containsId(menu.childsList![], curMenuId) || (menu_index == 0 && isHomePage(curMenuId))>active</#if>">
          <h3 class="nav-header">${menu.name}</h3>
          <ul class="nav-pills">
          <#-- 输出二级菜单 -->
              <#local subMenuList=menu.childsList/>
              <#list subMenuList as subMenu>
                <li>
                  <a href="${subMenu.url}" class="link <#if curMenuId==subMenu.url>selected</#if>">${subMenu.name}</a>
                </li>
              </#list>
          </ul>
        </div>
      </#list>
  </div>
  <div class="u-toggle" id="j-toggle">
    <span class="u-icon u-icon-step-backward"></span>
  </div>
</div>
<script>
  (function(tagId) {
    var script = document.createElement('script');
    var span = document.createElement('span');
    span.style.display = 'none';
    span.id = 'feedback-collect-tool';
    span.dataset.username = tagId;
    var src = '//feedback.kaola.com/dist/feedback.js';
    var today = new Date();
    var version = '?t=' + today.getMonth()  + '-' + today.getDate();
    script.src = src + version;
    document.body.appendChild(span);
    document.body.appendChild(script);
  }('username'))
</script>
</#macro>
