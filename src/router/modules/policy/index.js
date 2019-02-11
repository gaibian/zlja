import Layout from "@/views/layout/Layout";
const policyRouter = {
    path: '/policy',
    component: Layout,
    meta: {
        title: '保单管理',
        icon: 'menuAdmin'
    },
    children: [{
        path: "policy",
        name: "policyList",
        component: () =>
            import ("@/views/Administrative/policy/index"),
        meta: {
            title: "保单",
            icon: "menuAdmin",
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: "policy/add",
        name: "policyAdd",
        hidden: true,
        component: () =>
            import ("@/views/Administrative/policy/add"),
        meta: {
            title: "保单",
            subTitle: '保单-添加',
            icon: "menuAdmin",
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: "policy/edit/:id",
        name: "policyEdit",
        hidden: true,
        component: () =>
            import ("@/views/Administrative/policy/edit"),
        meta: {
            title: "保单",
            subTitle: '保单-编辑',
            icon: "menuAdmin",
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: "policy/import",
        name: "policyImport",
        hidden: true,
        component: () =>
            import ("@/views/Administrative/policy/import"),
        meta: {
            title: "保单",
            subTitle: '保单-导入',
            icon: "menuAdmin",
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: "policy/noExamine",
        name: "policyNoExamine",
        component: () =>
            import ("@/views/Administrative/policy/noExamine/index"),
        meta: {
            title: "待审核",
            subTitle: '保单-待审核',
            icon: "menuAdmin",
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: "policy/examine/:id",
        name: "policyExamineExamine",
        hidden: true,
        component: () =>
            import ("@/views/Administrative/policy/noExamine/examine"),
        meta: {
            title: "待审核",
            subTitle: '保单-待审核-审核',
            icon: "menuAdmin",
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: "policy/financeExamine",
        name: "financeExamine",
        component: () =>
            import ("@/views/Administrative/policy/financeExamine/index"),
        meta: {
            title: "财务审核",
            subTitle: '保单-财务审核',
            icon: "menuAdmin",
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }]
}

export default policyRouter;