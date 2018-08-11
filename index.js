const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')();

app.listen(3000);

// Body parser，用来封装 req.body
app.use(bodyParser.json())

// Sessions 来创建 req.session
app.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
}))


// 加载所有api
var api = require('./api/index.js');
app.use('/api', api);


// 我们用这些选项初始化 Nuxt.js：
const isProd = process.env.NODE_ENV === 'development'
var config = require('./nuxt.config.js');
config.dev = isProd;

const nuxt = new Nuxt(config);

// 生产模式不需要 build
if (isProd) {
    const builder = new Builder(nuxt)
    builder.build();
}
app.use(nuxt.render);
// app.listen(3000);
console.log('Server is listening on http://localhost:3000')