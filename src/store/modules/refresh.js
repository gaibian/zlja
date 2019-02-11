//页面的刷新
const refresh = {
    state: {
        activeDate: true,
    },
    mutations: {
        SET_ACTIVE_DATE: (state, ) => {
            state.activeDate = !state.activeDate;
            state.activeDate = true;
        }
    },
    actions: {
        setRefresh({ commit }) {
            commit('SET_ACTIVE_DATE')
        }
    }
}

export default refresh