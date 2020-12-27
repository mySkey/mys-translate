const data = require("./locales/ZH_CN.ts");

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
    outDir: "./locales", // 输出文件的目录，最好用绝对路径，相对路径的话已config.js目录为根目录
  },
};

module.exports = config;
