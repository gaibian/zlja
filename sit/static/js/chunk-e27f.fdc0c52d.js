(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-e27f"],{"8/u/":function(t,e,n){"use strict";n.d(e,"g",function(){return r}),n.d(e,"h",function(){return o}),n.d(e,"b",function(){return a}),n.d(e,"e",function(){return s}),n.d(e,"f",function(){return l}),n.d(e,"d",function(){return u}),n.d(e,"a",function(){return c}),n.d(e,"c",function(){return d});var i=n("t3Un");function r(t){return i.a.get("admin/users",t)}function o(t){return i.a.delete("admin/users/"+t)}function a(t){return i.a.post("admin/users",t)}function s(){return i.a.get("admin/groups")}function l(t,e){return i.a.put("admin/users/",t,e)}function u(t){return i.a.get("admin/users/"+t)}function c(t){return i.a.post("admin/users/followSave",t)}function d(t){return i.a.delete("admin/users/followDelete/"+t)}},EQ7u:function(t,e,n){"use strict";n.r(e);var i=n("8/u/"),r={name:"financialRelationUserAdd",data:function(){return{postForm:{status:"draft"},form:{name:"",main_user_id:null,follow_user_id:null},relationList:[],pid:null,isLoading:!1,rules:{name:[{required:!0,message:"请填写名称"}]}}},created:function(){this.form.main_user_id=Number(this.$route.params.pid),console.log(this.form.main_user_id),this.init()},methods:{remoteMethod:function(t){var e=this;if(""!==t){var n={params:{keywords:t,type:1}};Object(i.g)(n).then(function(t){"error"!==t?(e.relationList=t.data.list,console.log(e.relationList)):e.relationList=[]})}else console.warn("请输入关键词")},init:function(){this.getRelationData()},handelSubmit:function(){var t=this;this.$refs.form.validate(function(e){e&&(t.isLoading=!t.isLoading,Object(i.a)(t.form).then(function(e){"error"!==e&&(_g.toastMsg("success","添加成功"),setTimeout(function(){t.addRefresh("relationUserList"),t.isLoading=!t.isLoading},1500))}))})},getRelationData:function(){var t=this;Object(i.g)().then(function(e){"error"!==e&&(t.relationList=e.data.list)})}}},o=(n("cs1S"),n("KHd+")),a=Object(o.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("sticky",{attrs:{className:"sub-navbar "+t.postForm.status,stickyTop:84}},[n("div",{ref:"appMainFixed",staticClass:"app-main-btm-fixed"},[n("h1",{staticClass:"page-title-box"},[t._v("\n        代理人"),n("em"),n("span",[t._v("/关联添加")])]),t._v(" "),n("div",[n("el-button",{attrs:{type:"danger",icon:"el-icon-close",size:"mini"},on:{click:function(e){t.handleEmpty()}}},[t._v("清空")]),t._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-check",size:"mini",loading:t.isLoading},on:{click:function(e){t.handelSubmit("form")}}},[t._v("保存")])],1)])]),t._v(" "),n("div",{staticClass:"app_main_content"},[n("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"80px"}},[n("div",{staticClass:"block-box"},[n("h1",{staticClass:"block-header-box"},[n("i"),t._v("\n          基本信息\n        ")]),t._v(" "),n("div",{staticClass:"block-content-box"},[n("el-row",{attrs:{gutter:30}},[n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"名称",prop:"name"}},[n("el-input",{attrs:{placeholder:"请输入名称",clearable:""},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"关联列表",prop:"follow_user_id"}},[n("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",remote:"","reserve-keyword":"",clearable:"","remote-method":t.remoteMethod,placeholder:"请输入关联账号搜索"},model:{value:t.form.follow_user_id,callback:function(e){t.$set(t.form,"follow_user_id",e)},expression:"form.follow_user_id"}},t._l(t.relationList,function(t,e){return n("el-option",{key:e,attrs:{label:t.realname,value:t.id}})}))],1)],1)],1)],1)])])],1)],1)},[],!1,null,null,null);a.options.__file="add.vue";e.default=a.exports},VJAe:function(t,e,n){},cs1S:function(t,e,n){"use strict";var i=n("VJAe");n.n(i).a}}]);