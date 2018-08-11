module.exports = {
    srcDir: "app/",
    dev:false,
    cache: false,
    analyze: true,
    build: {
        extractCSS: { allChunks: true },//chenzhe modify
        vendor: ['axios',"~/plugins/axios.js", "~/plugins/MuseUI.js"]
    },
    head: {
        link: [
            {
                rel: "stylesheet",
                href:
                    "https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css"
            }
        ]
    },
    router: {
        // 路由中间件
        middleware: "i18n"
    },
    babel:{
        plugins:[
            ["import", {
              "libraryName": "muse-ui",
              "libraryDirectory": "lib",
              "camel2DashComponentName": false
            }]
          ]
    },
    plugins: [
        { src: "~/plugins/MuseUI.js" },
        {
            src: "~/plugins/i18n.js", ssr: true
        }
    ],
    // css: ["muse-ui/dist/muse-ui.css"]
};
