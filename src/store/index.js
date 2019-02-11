import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import tagsView from './modules/tagsView'
import theme from './modules/theme'
import refresh from './modules/refresh'
import permission from './modules/permission'
import mainHeight from './modules/mainHeight'
import appMain from './modules/appMain' //主窗口的数据

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        tagsView,
        permission,
        theme,
        refresh,
        mainHeight,
        appMain
    },
    getters,
    state: {
        menus: "",
        authKey: '',
        autoHeight: '',
    },
    actions: {
        setMenus({ commit }, data) {
            commit('setMenus', data);
        },
        setAutoHeight({ commit }, data) {
            commit('setAutoHeight', data);
        },
        showLoading({ commit }, status) {
            commit('showLoading', status);
        },
        setUsers({ commit }, users) {
            commit('setUsers', users)
        },
        setAuthKey({ commit }, authKey) {
            commit('setAuthKey', authKey)
        }
    },
    mutations: {
        setMenus(state, data) {
            state.menus = data;
        },
        setAutoHeight(state, data) {
            state.autoHeight = data;
        },
        setAuthKey(state, authKey) {
            console.log(authKey)
            state.authKey = authKey;
        },
        setUsers(state, users) {
            state.users = users
        },
    }
})

/*vuex 模块化开发 hot进行热更替*/
if (module.hot) {
    module.hot.accept([

    ])
}

export default store