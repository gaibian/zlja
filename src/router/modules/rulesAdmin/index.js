import Layout from "@/views/layout/Layout";

const rulesAdminRouter = {
    path: '/rulesAdmin',
    component: Layout,
    meta: { title: '权限规则管理', icon: 'home' },
    children: [{
        path: "rulesList",
        name: "rules",
        component: () =>
            import ("@/views/Administrative/rulesAdmin/rules"),
        meta: {
            title: "权限列表",
            icon: "menuAdmin",
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: "dataType",
        name: "dataType",
        component: () =>
            import ("@/views/Administrative/rulesAdmin/dataType"),
        meta: {
            title: "数据类型",
            icon: "menuAdmin",
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }]
}

export default rulesAdminRouter;