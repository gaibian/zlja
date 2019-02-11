import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import Lockr from "lockr";
import axios from "axios";
import _g from "@/utils/global";
import Cookies from "js-cookie";
import filter from "@/utils/filter"; //导入全局的vue过滤器
import _ from "lodash";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // progress bar style
import Element from "element-ui";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import "element-ui/lib/theme-chalk/index.css";
import "./permission";
import "./component";
import "@/styles/index.scss";
import i18n from './lang' // Internationalization
import "@/icons"; // icon
import mixins from "./utils/mixins";
Vue.use(mixins);

import 'babel-polyfill';



/*阻止vue在启动时生成生产提示*/
Vue.config.productionTip = false;
let bus = new Vue();
//绑定第三方插件到window全局
window.router = router;
window.axios = axios;
window._g = _g;
window._ = _;
window.bus = bus;
window.Lockr = Lockr;
window.store = store;
window.Cookies = Cookies;


Vue.use(Element, {
    size: "medium", // set element-ui default size
    zhLocale
});
/* element框架的中英文切换 */
// Vue.use(Element, {
//     size: 'medium',
//     i18n: (key, value) => i18n.t(key, value)
// });

// axios.defaults.headers.authKey = Lockr.get("authKey");
// axios.defaults.headers.sessionId = Lockr.get("sessionId");

Vue.prototype.$appName = "My App";
Vue.prototype.timeTemplate = null;
Vue.prototype.urlAds = process.env.BASE_API;
Vue.prototype.dictionary = (options, val) => {
    let text = '';
    _(options).forEach(item => {
        if (item.value == val) {
            text = item.label
        }
    })
    return text
}

new Vue({
    el: '#app',
    router,
    store,
    filters: filter,
    i18n,
    render: h => h(App)
})