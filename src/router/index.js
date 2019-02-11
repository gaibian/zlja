import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import Layout from "../views/layout/Layout";
import companyLayout from "../views/layout/companyLayout"
// import systemAdminRouter from './modules/systemAdmin/index'
import companyRouter from './modules/company/index'
import policyRouter from './modules/policy/index'
import dataDictionaryRouter from './modules/dataDictionary/index'
import customerRouter from './modules/customer/index'
import rulesAdminRouter from './modules/rulesAdmin/index'
import agencyAdminRouter from './modules/agencyAdmin/index'
import rulesRouter from './modules/rules/index'


//不需要权限判断的路由表


export const constantRouterMap = [{
        path: "/login",
        component: () =>
            import ("@/views/login/index"),
        name: "login",
        type: "common",
        hidden: true
    },
    {
        path: "/404",
        component: () =>
            import ("@/views/errorPage/404"),
        type: "common",
        hidden: true
    },
    /*页面没有访问权限 跳转到401*/
    {
        path: "/401",
        component: () =>
            import ("@/views/errorPage/401"),
        type: "common",
        hidden: true
    },
    {
        path: "",
        component: Layout,
        redirect: "/home",
        type: "common",
        children: [{
            path: "home",
            component: () =>
                import ("@/views/home/index"),
            name: "home",
            meta: { title: "首页", icon: "home", requireAuth: true }
        }]
    },
    {
        path: "/home",
        component: Layout,
        hidden: true,
        children: [{
            path: "/refresh",
            component: () =>
                import ("@/components/refresh/index"),
            name: "refresh",
            meta: {
                noCache: true
            }
        }]
    }
];

//需要进行权限判断的路由表
export const asyncRouterMap = [
    companyRouter,
    policyRouter,
    dataDictionaryRouter,
    customerRouter,
    agencyAdminRouter,
    rulesAdminRouter,
    rulesRouter,
    { path: "*", redirect: "/404", hidden: true }
];

export default new Router({
    //mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});