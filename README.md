[![node](https://img.shields.io/node/v/node.svg)](http://adtk.cn)
[![npm](https://img.shields.io/npm/v/npm.svg)](http://adtk.cn)

## 开发环境

> 如果不可用的话请全局安装`nodemon`

```
npm run dev
```

## 部署

```
npm run build
# build之后
npm run start
```

用 pm2 可以直接替换`npm run start` 命令

```
pm2 start index.js
```

### 在 config 目录下新建文件 key.json

sql 字段为数据库
email 字段为邮件发送

```
{
    "sql": {
        "host": "",
        "user": "",
        "password": "",
        "database": ""
    },
    "redis": {
        "host": "",
        "port": "6379",
        "password": ""
    },
    "email": {
        "host": "smtp.qq.com",
        "user": "",
        "pass": ""
    }
}
```

##### redis 没密码则注释掉
