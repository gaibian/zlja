import Layout from "@/views/layout/Layout";

const rulesRouter = {
    path: '/rules',
    component: Layout,
    meta: { title: '权限管理', icon: 'home' },
    children: [{
        path: 'menus',
        name: 'rulesMenus',
        component: () =>
            import ("@/views/Administrative/rules/menus/index"),
        meta: {
            title: '菜单列表',
            icon: 'home',
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: 'user',
        name: 'rulesUser',
        component: () =>
            import ("@/views/Administrative/rules/user/index"),
        meta: {
            title: '用户列表',
            icon: 'home',
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: 'role',
        name: 'rulesRole',
        component: () =>
            import ("@/views/Administrative/rules/role/index"),
        meta: {
            title: '角色列表',
            icon: 'home',
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }]
}

export default rulesRouter;