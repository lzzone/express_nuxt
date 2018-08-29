const nodeExternals = require("webpack-node-externals");
module.exports = {
    srcDir: "app/",
    dev: false,
    cache: false,
    // analyze: true,
    modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],
    axios: { proxy: true, retry: { retries: 3 } },
    proxy: {
        "/api/": {
            target: "http://localhost:3000/api"
        }
    },

    build: {
        extractCSS: true, //chenzhe modify
        // 'axios', ,
        vendor: [
            "~/plugins/axios.js",
            "~/plugins/MuseUI.js",
            "~/plugins/i18n.js"
        ],
        babel: {
            plugins: [
                [
                    "import",
                    {
                        libraryName: "muse-ui",
                        libraryDirectory: "lib",
                        camel2DashComponentName: false
                    }
                ]
            ]
        },
        extend(config, { isDev, isClient, isServer }) {
            if (isServer) {
                config.externals = [nodeExternals({ whitelist: [/^muse-ui/] })];
            }
        }
    },
    head: {
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" }
        ],
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

    plugins: [
        { src: "~/plugins/MuseUI.js" },
        { src: "~/plugins/axios.js" },
        {
            src: "~/plugins/i18n.js",
            ssr: true
        }
        // {
        //     src: "~/plugins/VueQuillEditor.js", ssr: false
        // }
    ]

    // css: ["muse-ui/dist/muse-ui.css"]
};
