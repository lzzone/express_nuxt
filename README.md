## 开发环境
 >如果不可用的话请全局安装`nodemon`
```
npm run dev
```

## 部署
```
npm run build
# build之后
npm run start
```

用pm2可以直接替换`npm run start` 命令
```
pm2 start index.js
```