<#-- Created by zmm on 20/11/14. -->
<#-- error跳转页面：/error-->

<html lang="en">
<head>
    <title>Error</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="shortcut icon" href="/favicon.ico"/>
    <!-- @NOPARSE -->
    <link href="http://fonts.googleapis.com/css?family=Creepster" rel="stylesheet" type="text/css">
    <!-- /@NOPARSE -->
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        body {
            font-family: arial, helvetica, sans-serif;background:#eee;
        }
        .error-code {
            font-family: 'Creepster', arial, helvetica, sans-serif;
            font-size: 100px;
            color: #7d0d0a;
            color: rgba(255, 255, 255, 0.98);
            text-align: center;
            margin-top: 5%;
            margin-bottom:20px;
            text-shadow: 5px 5px hsl(0, 0%, 25%);
        }

        .clear {
            float: none;
            clear: both;
        }
        .content {
            text-align: center;
            line-height: 30px;
            font-family: 'Creepster', cursive, arial, helvetica, sans-serif;
        }
        .content p{
            margin-bottom: 10px;
        }
        a {
            text-decoration: none;
            color: #008000;
            text-shadow: 0px 0px 1px #fff;
        }
        a:hover {
            color: #9ECDFF;
        }
        a.login {
            display: block;
            margin-top: 20px;
            font-size: 20px;
            text-shadow: 0 0 1px #F7A;
        }
        span {
            -webkit-animation: twinkling 2s infinite ease-in-out;
        }

        .m-content { position:absolute; box-sizing:border-box; width:736px; height:301px; padding:145px 0 0 60px; margin:auto; left:0; right:0; top:100px; background:url(http://haitao.nos.netease.com/465778aeaf0446c6b106e464807982a3.png); }

        .m-content .title { font-size:16px; color:#333; margin-bottom:15px; }
        .m-content .title:before { content:''; display:inline-block; width:2px; height:10px; margin-right:7px; background:#E01A3B;}
        .m-content .message { font-size:14px; color:#666; line-height:30px; }
        .m-exception { position:absolute; z-index:10; width:600px; height:300px; left:50%; margin-left:-300px; top:100px; padding:15px; font-size:12px; color:#666; line-height:15px;  overflow:auto; background:#fff; box-shadow:1px 2px 10px rgba(0,0,0,0.2); }

        #mask { display:none; position:fixed; z-index:9; top:0; left:0; right:0; bottom:0; background:#000; opacity:0.8; }

        #exceptionmsg { display:none; }
    </style>
</head>

<body>
<section class="m-content">
    <h2 class="title">出错原因：</h2>
    <ul class="message">
    <#if error_msg??><li>${(error_msg)!''}, <a href="/">返回首页</a></li></#if>
    <#if exception??><li>服务器出现异常，<a href="javascript:;" id="button">查看异常</a>, <a href="/">返回首页</a></li></#if>
    <#if !error_msg?? && !exception??><li>您访问了不存在的页面, <a href="/">返回首页</a></li></#if>
    </ul>
</section>


<#if exception??>
<div id="mask"></div>
<p class="m-exception" id="exceptionmsg">
${exception}
<p>
</#if>
    <script type="text/javascript">
        <#if exception??>
        window.load = function(){
            var exceptionBtn =document.getElementById('button'),
                    mask = document.querySelector('#mask'),
                    exceptionmsgElem = document.getElementById('exceptionmsg');
            exceptionBtn.onclick= function(){
                exceptionmsgElem.style.display = "block";
                mask.style.display = 'block';
            };

            mask.onclick= function() {
                exceptionmsgElem.style.display = 'none';
                mask.style.display = 'none';
            }
        }();
        </#if>
    </script>
</body>
</html>
