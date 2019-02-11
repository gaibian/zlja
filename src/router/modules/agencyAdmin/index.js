import Layout from "@/views/layout/Layout";
import Layout1 from "@/views/layout/Layout1";
const agencyAdminRouter = {
    path: '/agentAdmin',
    component: Layout,
    meta: { title: '人事机构管理', icon: 'home' },
    children: [{
        path: 'list',
        name: 'agentList',
        component: () =>
            import ("@/views/Administrative/agent/index"),
        meta: {
            title: '代理人列表',
            icon: 'home',
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: 'add',
        name: 'agentAdd',
        hidden: true,
        component: () =>
            import ("@/views/Administrative/agent/add"),
        meta: {
            title: '代理人列表',
            subTitle: '代理人列表-添加',
            icon: 'home',
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: 'edit/:id',
        name: 'agentEdit',
        hidden: true,
        component: () =>
            import ("@/views/Administrative/agent/edit"),
        meta: {
            title: '代理人列表',
            subTitle: '代理人列表-编辑',
            icon: 'home',
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: 'agency',
        name: 'agencyList',
        component: () =>
            import ("@/views/Administrative/agency/index"),
        meta: {
            title: '组织机构列表',
            icon: 'home',
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }]
}

export default agencyAdminRouter;