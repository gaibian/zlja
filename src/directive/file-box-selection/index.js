import file from './file'

const install = function(Vue) {
  Vue.directive('el-file-box-selection',file)
}

if(window.Vue){
  window['el-file-box-selection'] = file
  Vue.use(install)
}

file.install = install
export default file
