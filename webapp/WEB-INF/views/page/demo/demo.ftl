<@compress>
  <#include "/common/macro.nek.ftl" />
  <@nekHeader title="首页" />
  <body>
    <@pageContentTpl menus=menus currentUrl=currentUrl />

    <script src="${nejRoot}"></script>
    <script>
      NEJ.define([
        'pro/page/demo/entry'
      ], function (m) {
        m._$$Module._$allocate();
      });
    </script>
  </body>
</@compress>