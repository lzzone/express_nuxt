const { Nuxt, Builder } = require("nuxt");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = require("express")();
var RedisStore = require("connect-redis")(session);
var key = require("./config/key.json");

app.listen(3000);

// Body parser，用来封装 req.body
app.use(bodyParser.json());

// Sessions 来创建 req.session
app.use(
    session({
        store: new RedisStore({
            host: key.redis.host,
            port: key.redis.port || 6739,
            pass: key.redis.pass
        }),

        secret: key.secret || "secret",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 600000 }
    })
);
//检查 redis是否可用
app.use(function(req, res, next) {
    if (!req.session) {
        res.send({ errno: -1, data: "无法提供服务", errmsg: "session异常" });
    }
    next(); // otherwise continue
});

// 加载所有api
var api = require("./api/index.js");
app.use("/api", api);

// 我们用这些选项初始化 Nuxt.js：
const isProd = process.env.NODE_ENV === "development";
var config = require("./nuxt.config.js");
config.dev = isProd;

const nuxt = new Nuxt(config);

// 生产模式不需要 build
if (isProd) {
    const builder = new Builder(nuxt);
    builder.build();
}
app.use(nuxt.render);
// app.listen(3000);
console.log("Server is listening on http://localhost:3000");
