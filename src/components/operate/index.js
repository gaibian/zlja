import operates from './operates.vue'
import operate from './operate.vue'

export default (Vue) => {
    Vue.component(operates.name, operates)
    Vue.component(operate.name, operate)
}