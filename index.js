const { Nuxt, Builder } = require("nuxt");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = require("express")();

var key = require("./config/key.json");

var redis = require("redis"),
    client = redis.createClient({
        host: key.redis.host,
        port: key.redis.port || 6379,
        // password: key.redis.pass,
        no_ready_check:true
    });

var RedisStore = require("connect-redis")(session);

app.listen(3000);

// Body parser，用来封装 req.body
app.use(bodyParser.json());

// Sessions 来创建 req.session
app.use(
    session({
        store: new RedisStore({
            client: client,
            ttl: 600000
        }),

        secret: key.secret || "secret",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 600000 }
    })
);
//检查 redis是否可用
app.use(function (req, res, next) {
    if (!req.session) {
        res.send({ errno: -1, data: [], errmsg: "session异常" });
    }
    req.redis=client;
    next(); // otherwise continue
});

// 加载所有api
var api = require("./api/index.js");
app.use("/api", api);


// app.use(function(err, req, res, next) {
//     res.status(err.status || 500); // 状态码默认为500（服务器内部错误）
//     res.render('error', {
//         message: err.message,
//         error: err    // 生产环境中应设为 `error: {}`，禁止输出错误
//     });
// });

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
