import Layout from "@/views/layout/Layout";
const companyRouter = {
    path: '/insuranceCompany',
    component: Layout,
    meta: { title: '保险公司管理', icon: 'home' },
    children: [{
        path: 'company',
        name: 'companyList',
        component: () =>
            import ("@/views/Administrative/insuranceCompany/index"),
        meta: {
            title: '保险公司',
            icon: "menuAdmin",
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: 'company/add',
        name: 'companyAdd',
        hidden: true,
        component: () =>
            import ("@/views/Administrative/insuranceCompany/add"),
        meta: {
            title: '保险公司',
            subTitle: '保险公司-添加',
            icon: "menuAdmin",
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: 'company/edit/:id',
        name: 'companyEdit',
        hidden: true,
        component: () =>
            import ("@/views/Administrative/insuranceCompany/edit"),
        meta: {
            title: '保险公司',
            subTitle: '保险公司-编辑',
            icon: "menuAdmin",
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: 'risk',
        name: 'riskList',
        component: () =>
            import ("@/views/Administrative/risk/index"),
        meta: {
            title: '险种',
            icon: "menuAdmin",
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: 'risk/add',
        name: 'riskAdd',
        hidden: true,
        component: () =>
            import ("@/views/Administrative/risk/add"),
        meta: {
            title: '险种',
            subTitle: '险种-添加',
            icon: "menuAdmin",
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: 'risk/edit/:id',
        name: 'riskEdit',
        hidden: true,
        component: () =>
            import ("@/views/Administrative/risk/edit"),
        meta: {
            title: '险种',
            subTitle: '险种-编辑',
            icon: "menuAdmin",
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }]
}


export default companyRouter;