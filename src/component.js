import Vue from 'vue'

/*在全局注册组件*/
import test from '@/test'
Vue.use(test)

import testOne from '@/test/test-one.js'
Vue.use(testOne);

import Paging from '@/components/Paging'
Vue.use(Paging);

import BtnGroup from '@/components/btnGroup'
Vue.use(BtnGroup)

import dialogScroll from '@/components/dialogScroll'
Vue.use(dialogScroll)

import dragDialog from '@/components/dragDialog'
Vue.use(dragDialog)

import Sticky from '@/components/Sticky'
Vue.use(Sticky)

import ImportExcel from '@/components/ImportExcel'
Vue.use(ImportExcel)

import ExportExcel from '@/components/exportExcel'
Vue.use(ExportExcel)

import MultiPicker from '@/components/MultiPicker'
Vue.use(MultiPicker)

import Operates from '@/components/operate'
Vue.use(Operates)

import SidePopup from '@/components/SidePopup'
Vue.use(SidePopup)

import fileAdmin from '@/components/fileAdmin'
Vue.use(fileAdmin)

import pageLoading from '@/components/pageLoading'
Vue.use(pageLoading)

import userInput from '@/components/userInput'
Vue.use(userInput)

import companyInput from '@/components/companyInput'
Vue.use(companyInput)

import pageConfig from '@/components/pageConfig'
Vue.use(pageConfig)

import tableColumn from '@/components/tableColumn'
Vue.use(tableColumn)

// import Tabs from '@/components/tabs'
// Vue.use(Tabs)

// import Tab from '@/components/tabs/tab'
// Vue.use(Tab)