(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6db7"],{"5WQC":function(t,e,a){},"8T0q":function(t,e,a){"use strict";a.d(e,"r",function(){return r}),a.d(e,"a",function(){return s}),a.d(e,"f",function(){return o}),a.d(e,"g",function(){return l}),a.d(e,"h",function(){return i}),a.d(e,"b",function(){return c}),a.d(e,"d",function(){return u}),a.d(e,"e",function(){return m}),a.d(e,"c",function(){return f}),a.d(e,"i",function(){return d}),a.d(e,"j",function(){return p}),a.d(e,"k",function(){return b}),a.d(e,"l",function(){return _}),a.d(e,"q",function(){return k}),a.d(e,"m",function(){return h}),a.d(e,"n",function(){return v}),a.d(e,"o",function(){return y}),a.d(e,"p",function(){return g});var n=a("t3Un");function r(t){return n.a.get("insurance/company",t)}function s(t){return n.a.post("insurance/company",t)}function o(t){return n.a.delete("insurance/company/"+t)}function l(t){return n.a.get("insurance/company/"+t)}function i(t,e){return n.a.put("insurance/company/",t,e)}function c(t){return n.a.post("insurance/companyRate",t)}function u(t){return n.a.get("insurance/companyRate/"+t)}function m(t,e){return n.a.put("insurance/companyRate/",t,e)}function f(t){return n.a.delete("insurance/companyRate/"+t)}function d(t){return n.a.post("insurance/ask",t)}function p(t){return n.a.delete("insurance/ask/"+t)}function b(t){return n.a.get("insurance/ask/"+t)}function _(t,e){return n.a.put("insurance/ask/",t,e)}function k(t){return n.a.get("insurance/ask/logIndex",t)}function h(t){return n.a.post("insurance/ask/logSave",t)}function v(t){return n.a.delete("insurance/ask/logDelete/?id="+t,"")}function y(t){return n.a.get("insurance/ask/logRead/?id="+t)}function g(t,e){return n.a.put("insurance/ask/logUpdate/",t,e)}},"o+Ci":function(t,e,a){"use strict";a.r(e);var n=a("8T0q"),r={name:"noCarInquiryAdd",data:function(){return{form:{write_date:"",salesman:"",salesman_phone:"",status:1,customer:"",customer_phone:"",ask_content:"",ask_detail:"",remark:""},userData:{type:1},options4:[],statusOptions:[{label:"有意向",id:1},{label:"报价中",id:2},{label:"投保中",id:3},{label:"已完成",id:4},{label:"已关闭",id:5}],isLoading:!1}},created:function(){this.form.write_date=(new Date).format("yyyy-MM-dd")},methods:{handleEmpty:function(){this.form={write_date:"",salesman:"",salesman_phone:"",status:1,customer:"",customer_phone:"",ask_content:"",ask_detail:"",remark:""}},handleSubmit:function(){var t=this;console.log(this.form),this.isLoading=!0,Object(n.i)(this.form).then(function(e){"error"!==e?(_g.toastMsg("success","添加成功"),setTimeout(function(){t.addRefresh("noCarInquiryList")},1500),t.isLoading=!1):t.isLoading=!1})}}},s=(a("r0UZ"),a("KHd+")),o=Object(s.a)(r,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("sticky",{attrs:{className:"sub-navbar",stickyTop:84}},[a("div",{ref:"appMainFixed",staticClass:"app-main-btm-fixed"},[a("h1",{staticClass:"page-title-box"},[t._v("\n                非车受理记录添加\n            ")]),t._v(" "),a("div",[a("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-close"},on:{click:function(e){t.handleEmpty()}}},[t._v("清空表单")]),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-check",size:"mini",loading:t.isLoading},on:{click:t.handleSubmit}},[t._v("保存")])],1)])]),t._v(" "),a("div",{staticClass:"app_main_content"},[a("el-form",{ref:"form",attrs:{model:t.form,"label-position":"top"}},[a("div",{staticClass:"block-box"},[a("h1",{staticClass:"block-header-box"},[a("i"),t._v("\n                    日志消息\n                ")]),t._v(" "),a("div",{staticClass:"block-content-box"},[a("el-row",{attrs:{gutter:30}},[a("el-col",{staticClass:"col-item",attrs:{span:6}},[a("el-form-item",{attrs:{label:"记录日期"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date","value-format":"yyyy-MM-dd",clearable:"",placeholder:"选择日期"},model:{value:t.form.write_date,callback:function(e){t.$set(t.form,"write_date",e)},expression:"form.write_date"}})],1)],1),t._v(" "),a("el-col",{staticClass:"col-item",attrs:{span:6}},[a("el-form-item",{attrs:{label:"业务员"}},[a("user-input",{attrs:{url:"admin/users",data:t.userData,placeholder:"请输入业务员"},model:{value:t.form.salesman,callback:function(e){t.$set(t.form,"salesman",e)},expression:"form.salesman"}})],1)],1),t._v(" "),a("el-col",{staticClass:"col-item",attrs:{span:6}},[a("el-form-item",{attrs:{label:"业务员联系方式"}},[a("el-input",{attrs:{placeholder:"请输入业务员联系方式",clearable:""},model:{value:t.form.salesman_phone,callback:function(e){t.$set(t.form,"salesman_phone",e)},expression:"form.salesman_phone"}})],1)],1),t._v(" "),a("el-col",{staticClass:"col-item",attrs:{span:6}},[a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择状态",clearable:""},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}},t._l(t.statusOptions,function(t){return a("el-option",{key:t.id,attrs:{label:t.label,value:t.id}})}))],1)],1)],1),t._v(" "),a("el-row",{attrs:{gutter:30}},[a("el-col",{staticClass:"col-item2",attrs:{span:12}},[a("el-form-item",{attrs:{label:"客户/单位"}},[a("el-input",{attrs:{placeholder:"请输入客户/单位名称",clearable:""},model:{value:t.form.customer,callback:function(e){t.$set(t.form,"customer",e)},expression:"form.customer"}})],1)],1),t._v(" "),a("el-col",{staticClass:"col-item2",attrs:{span:12}},[a("el-form-item",{attrs:{label:"客户/单位联系方式"}},[a("el-input",{attrs:{placeholder:"请输入客户/单位联系方式",clearable:""},model:{value:t.form.customer_phone,callback:function(e){t.$set(t.form,"customer_phone",e)},expression:"form.customer_phone"}})],1)],1)],1),t._v(" "),a("el-row",{attrs:{gutter:30}},[a("el-col",{staticClass:"col-item2",attrs:{span:12}},[a("el-form-item",{attrs:{label:"咨询内容"}},[a("el-input",{attrs:{placeholder:"请输入咨询内容",clearable:""},model:{value:t.form.ask_content,callback:function(e){t.$set(t.form,"ask_content",e)},expression:"form.ask_content"}})],1)],1)],1),t._v(" "),a("el-row",{attrs:{gutter:30}},[a("el-col",{staticClass:"col-item2",attrs:{span:12}},[a("el-form-item",{attrs:{label:"询价进展"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入询价进展内容",clearable:""},model:{value:t.form.ask_detail,callback:function(e){t.$set(t.form,"ask_detail",e)},expression:"form.ask_detail"}})],1)],1)],1),t._v(" "),a("el-row",{attrs:{gutter:30}},[a("el-col",{staticClass:"col-item2",attrs:{span:12}},[a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入备注信息",clearable:""},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)],1)],1)],1)])])],1)],1)},[],!1,null,"227caec8",null);o.options.__file="add.vue";e.default=o.exports},r0UZ:function(t,e,a){"use strict";var n=a("5WQC");a.n(n).a}}]);