import Vue from 'vue';
import axios from 'axios';

// 请求拦截
axios.interceptors.request.use(
    function(config) {
        // 在发送请求之前做些什么
        if (typeof config.data === "object") {
            // config.data = qs.stringify(config.data); //转换数据json to query
        }
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

//   响应拦截
axios.interceptors.response.use(
    function(response) {
        var randomColor = `rgba(${parseInt(Math.random() * 255)},${parseInt(
            Math.random() * 255
        )},${parseInt(Math.random() * 255)})`;

        console.log(
            "%c┍------------------------------------------------------------------┑",
            `color:${randomColor};`
        );
        console.log(response.config);
        console.log("| 请求地址：", response.config.url);
        console.log("| 请求参数：", response.config.method=='post'?response.config.data:response.config.params);
        console.log("| 返回数据：", response.data);
        console.log(
            "%c┕------------------------------------------------------------------┙",
            `color:${randomColor};`
        );
        if (response.data.errno == -10003) {
            router.replace({ path: "/" });
        }

        return response.data;
    },
    function(err) {
        var config = err.config;
        if (config && !config.retry) {
            config.retry = 2;
        }
        if (config && !config.retryDelay) {
            config.retryDelay = 3;
        }

        config.__retryCount = config.__retryCount || 0;

        if (config.__retryCount >= config.retry) {
            // Toast.error("网络错误");
            return Promise.reject(err);
        }

        config.__retryCount += 1;

        var backoff = new Promise(function(resolve) {
            // Toast.error(`网络错误：${config.retryDelay}秒后重新发送...`);
            console.log(
                `网络错误：重发${config.__retryCount}次，最多重发${
                    config.retry
                }次`
            );
            setTimeout(function() {
                resolve();
            }, config.retryDelay * 1000);
        });

        return backoff.then(function() {
            return axios(config);
        });
    }
);

Vue.prototype.$http = axios;

