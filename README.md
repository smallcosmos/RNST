# RNST  

[![npm version](https://img.shields.io/badge/npm-4.2.0-green.svg)]()  

Regular+Nekui Scaffold Template

### 使用

1. `npm install nek -g`
2. `nek scaffold -i nekui+regular`
3. `cd webapp`
4. `npm install`
5. `nek build -u /backend/xxx/xxx`
6. `nek moky`
7. open `localhost:3077/backend/xxx/xxx` in chrome

### nek scaffold

**options：**

  --help      显示帮助信息               [布尔]  
  --version   显示版本号                 [布尔]  
  -i, --init  选择要创建的工程类型并创建   [字符串]  
  -a, --add   添加映射                [字符串]  
  -d, --del   删除映射                [字符串]  
  -l, --list  映射列表                  [布尔]  

1. `nek scaffold -a [keyword] [url]`添加一条映射,  
映射关系通过nek-server api保存在数据库中，比如:
`nek scaffold -a regular+nekui https://github.com/smallcosmos/RNST/archive/master.zip`
2. `nek scaffold -d [keyword]`删除一条已有的映射
3. `nek scaffold -l`查看已有的所有映射
4. `nek scaffold -i [keyword]`拉取一份前端框架模板

通过nek scaffold命令行管理的各类框架模板包含了  
Nej+Regular+Nekui，  
Webpack+Regular+Nekui SPA，  
以及Webpack+Vue+Elementui等等，  
还可以自定义配置各种框架模板，通过nek scaffold -a加入映射关系。

### nek build -u

nek build命令可以自动创建一些初始文件结构，对于非单页应用，可以省去很多开发重复工作，并保持工程目录结构规范一致。  
`cd webapp`  
`nek build -u ／backend/xxx/xxx/xxx`

<!-- more -->
参见 [NEK](https://github.com/kaola-fed/NEK)

### nek moky

nek moky提供了静态开发所需的数据模拟，通过查看/webapp/moky.config.js查看各模拟数据的获取位置。

参见 [moky](https://github.com/kaola-fed/moky)
