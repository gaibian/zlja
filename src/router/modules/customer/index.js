import Layout from "@/views/layout/Layout";
import Layout1 from "@/views/layout/Layout1";
const customerRouter = {
    path: '/customerAdmin',
    component: Layout,
    meta: { title: '客户管理', icon: 'home' },
    children: [{
        path: 'list',
        name: 'customerList',
        component: () =>
            import ("@/views/Administrative/customerAdmin/index"),
        meta: {
            title: '客户列表',
            icon: 'home',
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: 'add',
        name: 'customerAdd',
        hidden: true,
        component: () =>
            import ("@/views/Administrative/customerAdmin/operate"),
        meta: {
            title: '客户列表',
            subTitle: '客户列表-添加',
            icon: 'home',
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: 'edit/:id',
        name: 'customerEdit',
        hidden: true,
        component: () =>
            import ("@/views/Administrative/customerAdmin/edit"),
        meta: {
            title: '客户列表',
            subTitle: '客户列表-编辑',
            icon: 'home',
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }]
}

export default customerRouter;