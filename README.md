# 基于百度翻译 api 的翻译插件

node 后端、前端工程（vue、react、jq 之类）都可以用， 可以直接命令生成对应的其他语言版本文件，还可以启动翻译服务

### 直接使用百度翻译的弊端

<a href="https://api.fanyi.baidu.com/doc/21" target="_blank">百度翻译 api 文档</a>

- 1、分标准版、高级版、尊享版享用不同的并发数，而且超出并发直接报错
- 2、只能翻译字符串，我的插件可以翻译复杂对象，嵌套对象
- 3、sign 生成，需要 md5 加密多个字段的拼接

### 使用前提

注册百度翻译平台账号，开通通用翻译 api， `https://api.fanyi.baidu.com/doc/21`

### 前端项目、node 后端项目中使用

- 1、安装

```npm
npm i -s mys-translate
```

- 2、引入

```js
import MysKeyTranslate from 'mys-translate'

const translate = new MysKeyTranslate({
  // 必填参数，appid，secret 去百度翻译平台注册，标准版是完全免费的
  appid: "",
  secret: "",

  // 非必填参数
  showProgress: true, // 开启后每次调用的翻译都会console.log
  requestNumber: 1, // 并发数， 百度翻译标准版1s只有1个并发   高级版1s有10个并发   尊享版1s有100个并发
  agreement: "http", // 发送什么协议的请求
});

// 然后就可以直接使用
translate("天气") // 默认中转英

translate("good night", { from 'en', to: 'zh' }) // 传入from，to指定转什么

translate([{ name: "小明" }, { name: "小红" }])  // 可传入复杂对象，只翻译value，不翻译key
```

* 3、在前端项目中，浏览器同源策略会跨域，配置proxy。

<a href="https://blog.csdn.net/qq_29832217/article/details/102769793" target="_blank">参考vue项目中跨域配置</a>

### 启动一个翻译服务

如果你想自己启用一个翻译 api 的话，如下操作：

- 1、拉源码

```git
git clone https://github.com/mySkey/mys-translate.git
```

- 2、修改根目录 config.js

appid、secret 改为你的百度翻译平台的，https://api.fanyi.baidu.com/api/trans/product/desktop?req=developer

- 3、启动服务

```js
npm run server
```

### 利用一份文件直接生成其他语言版本文件

做过国际化的朋友应该知道，前端也要写各种语言版本的静态文案，尤其项目很大，还是新项目的话，要把人搞死，一句句去翻译效率太低，我这个插件直接能生成其他语言版本文件，步骤如下：

1、拉源码

```npm
git clone https://github.com/mySkey/mys-translate.git
```

2、修改根目录 config.js

配置 other 项

```js
const data = require("./locales/ZH_CN.ts"); // 我这里引入的是我提供的example，修改为你提供的文件

const config = {
  // 必须配置项
  appid: "",
  secret: "",

  // 非必须配置
  showProgress: true,
  requestNumber: 1, // 并发数， 百度翻译标准版1s只有1个并发   高级版1s有10个并发   尊享版1s有100个并发
  agreement: "http", // 发送什么协议的请求

  // 启用服务的话，可配置
  server: {
    port: 3000,
  },

  // 需要使用命令直接生成其他语言版本，才需配置
  other: {
    origin: data, // 源文件
    originType: "zh", // 源文件的语言版本
    types: ["en", "jp"], // 需要的语言版本
    outDir: "./", // 输出文件的目录，最好用绝对路径，相对路径的话已config.js目录为根目录
  },
};

module.exports = config;
```

3、执行命令

```npm
npm run other
```

### 语种对应表

```js
中文 	zh
英语 	en
韩语	kor
日语	jp
法语	fra
俄语	ru
```

完整版请参考百度翻译文档： http://api.fanyi.baidu.com/doc/21
