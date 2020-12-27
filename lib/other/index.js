(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../../config", "./..", "fs", "path"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../../config"), require("./.."), require("fs"), require("path"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.config, global._, global.fs, global.path);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_config, _, _fs, _path) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  _config = _interopRequireDefault(_config);
  _ = _interopRequireDefault(_);
  _fs = _interopRequireDefault(_fs);
  _path = _interopRequireDefault(_path);
  const translate = new _.default({ ..._config.default
  });
  const {
    other: {
      types = [],
      origin = "",
      originType = "zh",
      outDir = "@root/locales"
    }
  } = _config.default;
  types.forEach(item => {
    translate(origin, {
      from: originType,
      to: item
    }).then(res => {
      createFile(item, res);
    });
  });

  function createFile(fileName, fileContent) {
    _fs.default.writeFileSync(`${_path.default.resolve(__dirname, '../../', outDir)}/ZH_${fileName.toUpperCase()}.ts`, `export default ${JSON.stringify(fileContent)}`);
  }
});