import test from './test.vue'
// export default (Vue) => {
//   Vue.component(test.name,test)
// }

test.install = function(Vue) {
    Vue.component(test.name, test);
}
export default test