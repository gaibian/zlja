import { constantRouterMap, asyncRouterMap } from "../../router/index";
/*
 * 通过权限来过滤路由
 *
 * */

const permission = {
    state: {
        routers: constantRouterMap, //整合的路由表
        routers1: constantRouterMap,
        addRouters: [], //这是根据权限来增加的路由表
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
            state.routers1 = constantRouterMap.concat(routers);
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const roles = data;
                //首先根据name来进行判断顶层路由
                function getItem(asyncRouterMap, roles) {
                    const accessedRouters = asyncRouterMap.filter(route => {
                        let flag = false;
                        if ('meta' in route) {
                            let name = route.meta.title;
                            _(roles).forEach(value => {
                                if (name === value.name) {
                                    flag = true;
                                    if (route.children && route.children.length) {
                                        route.children = getItem(route.children, value.child);
                                    }
                                    return false;
                                };
                            })
                        } else {
                            if (route.path === '*') {
                                flag = true;
                            }
                        }
                        return flag;
                    })

                    return accessedRouters;
                };

                const newRouters = getItem(asyncRouterMap, roles);
                commit('SET_ROUTERS', newRouters);
                resolve();
            })
        }
    }
}

export default permission