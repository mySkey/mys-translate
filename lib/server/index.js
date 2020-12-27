(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["koa", "../../config", "./.."], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("koa"), require("../../config"), require("./.."));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.koa, global.config, global._);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_koa, _config, _) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  _koa = _interopRequireDefault(_koa);
  _config = _interopRequireDefault(_config);
  _ = _interopRequireDefault(_);
  const app = new _koa.default();
  const {
    server: {
      port
    }
  } = _config.default;
  const translate = new _.default({ ..._config.default
  });

  const renderTranslate = async ctx => {
    const {
      from = "zh",
      to = "en",
      value = ""
    } = ctx.request.query;
    const res = await translate(value, {
      from,
      to
    });
    ctx.body = {
      from,
      to,
      origin: value,
      value: res
    };
  };

  app.use(async ctx => {
    console.log("ctx", ctx.request.path, ctx.request.query);

    if (ctx.request.path === "/translate") {
      await renderTranslate(ctx);
    }
  });
  app.listen(port || 3000);
});