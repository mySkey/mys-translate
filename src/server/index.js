import Koa from "koa";
import config from "@root/config";
import MysKeyTranslate from "@/index";

const app = new Koa();

const {
  server: { port },
} = config;

const translate = new MysKeyTranslate({
  ...config,
});

const renderTranslate = async (ctx) => {
  const { from = "zh", to = "en", value = "" } = ctx.request.query;
  const res = await translate(value, { from, to });
  ctx.body = {
    from,
    to,
    origin: value,
    value: res,
  };
};

app.use(async (ctx) => {
  console.log("ctx", ctx.request.path, ctx.request.query);
  if (ctx.request.path === "/translate") {
    await renderTranslate(ctx);
  }
});

app.listen(port || 3000);
