const appMain = {
    state: {
        scrollTop: 0,
        scrollLeft: 0,
        width: 0,
        menuArrCount: [],
        newsId: '',
        dataDictionary: {}
    },
    mutations: {
        SET_DICTIONARY: (state, val) => {
            state.dataDictionary = val
        },
        SET_WIDTH: (state, val) => {
            state.width = val
        },
        SET_NEWSID: (state, val) => {
            state.newsId = val
        },
        SET_SCROLLTOP: (state, val) => {
            state.scrollTop = val;
        },
        SET_SCROLLLEFT: (state, val) => {
            state.scrollLeft = val
        },
        SET_MENU_COUNT: (state, val) => {
            state.menuArrCount = val
        }
    },
    actions: {
        setDictionary({ commit }, val) {
            commit('SET_DICTIONARY', val)
        },
        setWidth({ commit }, val) {
            commit('SET_WIDTH', val)
        },
        setScrollTop({ commit }, val) {
            commit('SET_SCROLLTOP', val)
        },
        setScrollLeft({ commit }, val) {
            commit('SET_SCROLLLEFT', val)
        },
        setMenuCount({ commit }, val) {
            commit('SET_MENU_COUNT', val)
        },
        setNewsId({ commit }, val) {
            commit('SET_NEWSID', val)
        },

    }
}

export default appMain