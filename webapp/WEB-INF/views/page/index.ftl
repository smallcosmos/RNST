<@compress>
  <#include "/common/macro.nek.ftl" />
  <@nekHeader title="首页" />
  <body>
    <@leftMenu menuObj=menus curMenuId=currentUrl />
    <!-- Page Content Here -->
    <div class="g-bd">
        <div class="g-bdc">
            <div class="u-message u-message-info">welcome</div>
        </div>
    </div>

    <script src="${nejRoot}"></script>
    <script>
      NEJ.define([
        'pro/page/index'
      ], function (m) {
        m._$$Module._$allocate();
      });
    </script>
  </body>
</@compress>