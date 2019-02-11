const mainHeight = {
    state: {
        height: 0
    },
    mutations: {
        SET_HEIGHT: (state, val) => {
            state.height = val;
        }
    },
    actions: {
        setHeight({ commit }, height) {
            commit('SET_HEIGHT', height)
        }
    }
}

export default mainHeight