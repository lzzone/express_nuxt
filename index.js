const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')();
var query=require("./api/sql.js");
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

var api = require('./api/index.js');
/* 加载所有api */
app.use('/api', api);

app.post('/api/login', function (req, res) {
    
    query(`SELECT * FROM user WHERE name = "${req.body.data.name}"`,function(err,vals,fields){
        //do something
        req.session.authUser = vals;
        return res.json(req.session)
    });
    
})
// app.post('/api/logout', function (req, res) {
//     delete req.session.authUser
//     res.json({ ok: true })
// })

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