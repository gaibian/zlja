(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6bea"],{"GRC/":function(t,e,n){"use strict";var a=n("xJXj");n.n(a).a},bpyx:function(t,e,n){"use strict";n.r(e);var a=n("qL4L"),i={name:"circulationFileAdmin",data:function(){return{tableData:[],height:null,loading:!0,fileAdminFlag:!1,need:"",headerNumber:"",fileData:{number:"",id:""}}},created:function(){this.init()},activated:function(){this.$route.query.pageClick&&this.init()},mounted:function(){var t=this,e=this.$refs.appMainContainer,n=this.$refs.blockBox;this.height=e.offsetHeight-n.offsetHeight-40-12,window.addEventListener("resize",function(){t.height=e.offsetHeight-n.offsetHeight-40-12},!1)},methods:{init:function(){var t=this;this.fileData.id=this.$route.params.id,this.loading=!0,this.fileAdminFlag=!1,Object(a.d)(this.fileData.id).then(function(e){"error"!==e&&(t.need=e.data.need,t.tableData=[{write_date:e.data.write_date,car_license_num:e.data.car_license_num,insured_name:e.data.insured_name,company_name:e.data.company_name,policy_num:e.data.policy_num,force_policy_num:e.data.force_policy_num,salesman_name:e.data.salesman_name,employee_number:e.data.employee_number,risks_num:e.data.risks_num}],t.headerNumber=e.data.number,t.fileData.number=e.data.car_license_num,t.loading=!1,t.fileAdminFlag=!0)})}}},r=(n("GRC/"),n("KHd+")),o=Object(r.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"appMainContainer",staticClass:"app_main_container"},[n("div",{ref:"blockBox",staticClass:"block-box",attrs:{id:"block-box"}},[n("div",{staticClass:"block-header-box"},[n("div",{staticClass:"h-title"},[n("i"),t._v("\n                流水号:"+t._s(t.headerNumber)+"\n            ")])]),t._v(" "),n("div",{staticClass:"block-content-box",staticStyle:{"padding-bottom":"20px"}},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,"element-loading-text":"数据加载中"}},[n("el-table-column",{attrs:{label:"订单日期",prop:"write_date"}}),t._v(" "),n("el-table-column",{attrs:{label:"车牌号(被保人)"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",[t._v(t._s(e.row.car_license_num))]),t._v(" "),n("div",[t._v(t._s(e.row.insured_name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"保险公司",prop:"company_name"}}),t._v(" "),n("el-table-column",{attrs:{label:"保单号"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",[t._v("商"+t._s(e.row.policy_num))]),t._v(" "),n("div",[t._v("交"+t._s(e.row.force_policy_num))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"业务员(工号)"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",[t._v(t._s(e.row.salesman_name)+"("+t._s(e.row.employee_number)+")")])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"出险次数",prop:"risks_num",width:"90"}})],1)],1)]),t._v(" "),n("div",{staticClass:"block-box",staticStyle:{"margin-bottom":"30px"}},[t._m(0),t._v(" "),n("div",{staticClass:"block-content-box"},[n("div",{staticClass:"details-content"},[t._v("\n                "+t._s(t.need)+"\n            ")])])]),t._v(" "),t.fileAdminFlag?n("file-admin",{attrs:{fileData:t.fileData,height:t.height}}):t._e()],1)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"block-header-box"},[e("div",{staticClass:"h-title"},[e("i"),this._v("\n                欠件信息\n            ")])])}],!1,null,"40c2c124",null);o.options.__file="index.vue";e.default=o.exports},qL4L:function(t,e,n){"use strict";n.d(e,"g",function(){return i}),n.d(e,"a",function(){return r}),n.d(e,"d",function(){return o}),n.d(e,"c",function(){return l}),n.d(e,"h",function(){return s}),n.d(e,"b",function(){return c}),n.d(e,"e",function(){return u}),n.d(e,"f",function(){return d});var a=n("t3Un");function i(t){return a.a.delete("admin/circulationSheet/"+t)}function r(t){return a.a.post("admin/circulationSheet",t)}function o(t){return a.a.get("admin/circulationSheet/"+t)}function l(t,e){return a.a.put("admin/circulationSheet/",t,e)}function s(t){return a.a.post("flow/flow/btn",t)}function c(t){return a.a.get("admin/systemParameter/itemIndex?parameter_id=6")}function u(t){return a.a.get("admin/circulationSheet/getCarInfo?car_license_num="+t)}function d(){return a.a.get("admin/circulationSheet/getNumber")}},xJXj:function(t,e,n){}}]);