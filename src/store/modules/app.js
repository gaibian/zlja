import Cookies from 'js-cookie'
const app = {
    state: {
        sidebar: {
            opened: !+Cookies.get('sidebarStatus'),
            withoutAnimation: false
        },
        device: 'desktop',
        gLoading: false,
        newsNum: 0,
    },
    mutations: {
        //消息未读数量
        NEWS_NUM: (state, num) => {
            state.newsNum = num;
        },
        //全局loading
        LOADING_STATUS: (state, flag) => {
            state.gLoading = flag;
        },
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
            state.sidebar.opened = !state.sidebar.opened
            state.sidebar.withoutAnimation = false
        },
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            Cookies.set('sidebarStatus', 1)
            state.sidebar.opened = false
            state.sidebar.withoutAnimation = withoutAnimation
        },
        TOGGLE_DEVICE: (state, device) => {
            state.device = device
        },
        showLoading: (state, status) => {
            state.globalLoading = status;
        }
    },
    actions: {
        setNews: ({ commit }, num) => {
            commit('NEWS_NUM', num)
        },
        setLoading: ({ commit }, flag) => {
            commit('LOADING_STATUS', flag)
        },
        ToggleSideBar: ({ commit }) => {
            commit('TOGGLE_SIDEBAR')
        },
        CloseSideBar({ commit }, { withoutAnimation }) {
            commit('CLOSE_SIDEBAR', withoutAnimation)
        },
        ToggleDevice({ commit }, device) {
            commit('TOGGLE_DEVICE', device)
        }
    }
}

export default app