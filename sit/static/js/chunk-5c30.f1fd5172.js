(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5c30"],{BkL8:function(t,n,e){"use strict";e.r(n);e("iz2W");var a={name:"noCarCirculationRateList",data:function(){return{tableData:[],tableHeight:null,loading:!1,update:!1,searchForm:{}}},created:function(){var t=this;bus.$on("noCarCirculationRateList",function(n){console.log("jinlai"),t.update=!t.update})},methods:{handleExamine:function(t){this.$router.push({name:"noCarCirculationRateExamine",params:{id:t.row.id},query:{pageClick:_g.editRefresh("noCarCirculationRateExamine")}})},handlePaging:function(t){var n=this;this.loading=!0,setTimeout(function(){n.tableData=t.map(function(t){return t.isEditLoading=!1,t.isDeleteLoading=!1,t}),n.loading=!n.loading,console.log(n.tableData)},300)}}},i=e("KHd+"),l=Object(i.a)(a,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{ref:"mainContainer",staticClass:"app_main_container"},[e("div",{staticClass:"page_table_box"},[e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.tableData,border:"","element-loading-text":"数据加载中",stripe:"","max-height":t.tableHeight}},[e("el-table-column",{attrs:{label:"订单日期",prop:"write_date","min-width":"100"}}),t._v(" "),e("el-table-column",{attrs:{label:"被保人",prop:"insured_name","min-width":"150"}}),t._v(" "),e("el-table-column",{attrs:{label:"承保公司",prop:"company_name","min-width":"200"}}),t._v(" "),e("el-table-column",{attrs:{label:"投保险种",prop:"kind","min-width":"150"}}),t._v(" "),e("el-table-column",{attrs:{label:"业务员(工号)",prop:"salesman_name","min-width":"165"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("div",[t._v(t._s(n.row.salesman_name)+"("+t._s(n.row.username)+")")])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"状态","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("div",[e("el-tag",{attrs:{type:t._f("statusFilter")(n.row.status)}},[t._v("\n                        "+t._s(t._f("finish")(n.row.status))+"\n                    ")])],1)]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"操作",width:"94",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(e){t.handleExamine(n)}}},[e("svg-icon",{staticStyle:{"margin-right":"4px"},attrs:{"icon-class":"operate-yes"}}),t._v("审核")],1)]}}])})],1),t._v(" "),e("div",{ref:"btmGroup",staticStyle:{height:"70px"}},[e("el-row",{staticClass:"pos_rel",staticStyle:{height:"70px"},attrs:{type:"flex",align:"middle",justify:"end"}},[e("paging",{attrs:{type:"admin/noncarCirculationSheet/getRateCheckList",updateType:"policy",update:t.update,pagingdata:t.searchForm},on:{loadingChange:function(n){t.loading=!0},policyPaging:t.handlePaging}})],1)],1)],1)])},[],!1,null,null,null);l.options.__file="list.vue";n.default=l.exports},iz2W:function(t,n,e){"use strict";e.d(n,"d",function(){return i}),e.d(n,"a",function(){return l}),e.d(n,"b",function(){return o}),e.d(n,"c",function(){return r});var a=e("t3Un");function i(t){return a.a.delete("admin/noncarCirculationSheet/"+t)}function l(t){return a.a.post("admin/noncarCirculationSheet",t)}function o(t){return a.a.get("admin/noncarCirculationSheet/"+t)}function r(t,n){return a.a.put("admin/noncarCirculationSheet/",t,n)}}}]);