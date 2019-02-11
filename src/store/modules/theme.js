/*
* 主题颜色值得存储
* */
const theme = {
  state: {
    themeColor:'#409EFF'  //设定默认颜色
  },
  mutations: {
    SET_THEME: (state,color)=>{
      state.themeColor = color
    }
  },
  actions: {
    setTheme({ commit },color){
      commit('SET_THEME',color)
    }
  },

}

export default theme
