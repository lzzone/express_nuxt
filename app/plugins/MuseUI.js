import "muse-ui/lib/styles/base.less";
import Vue from "vue";

import {
    AppBar,
    Button,
    Icon,
    Drawer,
    Divider,
    LoadMore,
    List,
    Snackbar
} from "muse-ui";

// import theme from "muse-ui/lib/theme";
import "muse-ui/lib/styles/theme.less";

import Toast from "muse-ui-toast";
Vue.use(Toast);

// import "muse-ui/dist/muse-ui.css";
Vue.use(AppBar);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Divider);
Vue.use(LoadMore);

Vue.use(List);
Vue.use(Snackbar);

// theme.addCreateTheme(theme => {
//     return `
//     .nav-appbar .mu-appbar-title {
//       color: ${theme.text.secondary};
//     }
//     .nuxt-link-exact-active .mu-item-action {
//       color: ${theme.primary};
//     }
//     .nuxt-link-exact-active .mu-item {
//       color: ${theme.primary};
//     }
//     `;
// });
