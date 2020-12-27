import config from "@root/config";
import MysKeyTranslate from "@/index";
import fs from 'fs'
import path from 'path'

const translate = new MysKeyTranslate({
  ...config,
});

const {
  other: {
    types = [],
    origin = "",
    originType = "zh",
    outDir = "@root/locales",
  },
} = config;

types.forEach((item) => {
  translate(origin, { from: originType, to: item }).then((res) => {
    createFile(item, res);
  });
});

function createFile(fileName, fileContent) {
  fs.writeFileSync(
    `${path.resolve(__dirname, '../../', outDir)}/ZH_${fileName.toUpperCase()}.ts`,
    `export default ${JSON.stringify(fileContent)}`
  );
}
