import pageConfig from './index.vue'

export default (Vue) => {
    Vue.component(pageConfig.name, pageConfig)
}