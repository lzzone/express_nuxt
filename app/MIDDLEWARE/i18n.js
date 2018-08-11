export default function({ isHMR, app, store, route, params, error, redirect }) {
    const defaultLocale = app.i18n.fallbackLocale;
    // If middleware is called from hot module replacement, ignore it
    // 如果从热模块替换中调用中间件，请忽略它
    if (isHMR) return;
    // Get locale from params
    const locale = params.lang || defaultLocale;
    if (store.state.locales.indexOf(locale) === -1) {
        return error({
            message: "暂时没有此语言的翻译",
            statusCode: 404
        });
    }
    // Set locale
    store.commit("SET_LANG", locale);

    app.i18n.locale = store.state.locale;
    // If route is /<defaultLocale>/... -> redirect to /...
    if (
        locale === defaultLocale &&
        route.fullPath.indexOf("/" + defaultLocale) === 0
    ) {
        const toReplace =
            "^/" +
            defaultLocale +
            (route.fullPath.indexOf("/" + defaultLocale + "/") === 0
                ? "/"
                : "");
        const re = new RegExp(toReplace);
        return redirect(route.fullPath.replace(re, "/"));
    }
}
