(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0732"],{"2Yt4":function(t,e,n){"use strict";n.r(e);var i=n("P2sY"),o=n.n(i),a=n("YkbD"),s={status:"draft",title:"",content:"",content_short:"",source_uri:"",image_uri:"",source_name:"",display_time:void 0,id:void 0,platforms:["a-platform"],comment_disabled:!1},r={name:"newsAdminAdd",components:{Tinymce:n("glbJ").a},data:function(){return{form:{title:"",content:"",sort:""},formLoading:!1,tinyForm:o()({},s),isLoading:!1}},activated:function(){this.$route.query.pageClick&&this.init()},created:function(){this.init()},methods:{init:function(){var t=this;this.$store.dispatch("setLoading",!0);var e=this.$route.params.id;Object(a.c)(e).then(function(e){"error"!==e&&(t.form=e.data,t.tinyForm.content=e.data.content,t.$store.dispatch("setLoading",!1))})},add:function(){var t=this;this.isLoading=!0;var e=this.$route.params.id;this.form.content=this.tinyForm.content,Object(a.d)(e,this.form).then(function(e){"error"!==e&&(_g.toastMsg("success","保存成功"),setTimeout(function(){t.addRefresh("newsAdmin")})),t.isLoading=!1})},handleEmpty:function(){this.form={title:"",content:"",sort:""},this.tinyForm.content=""}},computed:{editShow:function(){return _g.getHasRule("insurance-news-update")}}},c=n("KHd+"),l=Object(c.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("sticky",{attrs:{className:"sub-navbar",stickyTop:84}},[n("div",{ref:"appMainFixed",staticClass:"app-main-btm-fixed"},[n("h1",{staticClass:"page-title-box"},[t._v("\n      新闻管理"),n("em"),n("span",[t._v("/添加列表项")])]),t._v(" "),n("div",[n("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-close"},on:{click:function(e){t.handleEmpty()}}},[t._v("清空表单")]),t._v(" "),t.editShow?n("el-button",{attrs:{type:"primary",icon:"el-icon-check",size:"mini",loading:t.isLoading},on:{click:t.add}},[t._v("保存")]):t._e()],1)])]),t._v(" "),n("div",{staticClass:"app_main_content"},[n("el-form",{ref:"form",attrs:{model:t.form,"label-width":"50px","label-position":"top"}},[n("div",{staticClass:"block-box"},[n("h1",{staticClass:"block-header-box"},[n("i"),t._v("\n                基本信息\n            ")]),t._v(" "),n("div",{staticClass:"block-content-box"},[n("el-row",{attrs:{gutter:30}},[n("el-col",{staticClass:"col-item",attrs:{span:6}},[n("el-form-item",{attrs:{label:"标题"}},[n("el-input",{attrs:{placeholder:"请输入新闻标题",clearable:""},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1)],1),t._v(" "),n("el-col",{staticClass:"col-item",attrs:{span:6}},[n("el-form-item",{attrs:{label:"排序"}},[n("el-input",{attrs:{placeholder:"请输入排序",clearable:""},model:{value:t.form.sort,callback:function(e){t.$set(t.form,"sort",e)},expression:"form.sort"}})],1)],1)],1),t._v(" "),n("el-row",{staticStyle:{"margin-right":"0"},attrs:{gutter:30}},[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"描述"}},[n("tinymce",{ref:"editor",attrs:{height:200},model:{value:t.tinyForm.content,callback:function(e){t.$set(t.tinyForm,"content",e)},expression:"tinyForm.content"}})],1)],1)],1)],1)])])],1)],1)},[],!1,null,null,null);l.options.__file="edit.vue";e.default=l.exports},YkbD:function(t,e,n){"use strict";n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a}),n.d(e,"c",function(){return s}),n.d(e,"d",function(){return r});var i=n("t3Un");function o(t){return i.a.post("insurance/news",t)}function a(t){return i.a.delete("insurance/news/"+t)}function s(t){return i.a.get("insurance/news/"+t)}function r(t,e){return i.a.put("insurance/news/",t,e)}}}]);