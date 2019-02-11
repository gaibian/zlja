import Layout from "@/views/layout/Layout";

const dataDictionaryRouter = {
    path: '/shuju',
    component: Layout,
    meta: {
        title: '数据字典管理',
        icon: 'menuAdmin'
    },
    children: [{
        path: "dataDictionary",
        name: "dataDictionary",
        component: () =>
            import ("@/views/Administrative/system/dataDictionary"),
        meta: {
            title: "数据字典",
            icon: "menuAdmin",
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }, {
        path: "dataDictionary/add",
        name: "dataDictionaryAdd",
        hidden: true,
        component: () =>
            import ("@/views/Administrative/system/dataDictionary/add"),
        meta: {
            title: "数据字典-添加",
            icon: "menuAdmin",
            module: "Administrative",
            menu: "menu",
            requireAuth: true
        }
    }]
}

export default dataDictionaryRouter;