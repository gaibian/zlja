(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-f7cf","chunk-0732"],{"2Yt4":function(t,e,n){"use strict";n.r(e);var i=n("P2sY"),a=n.n(i),s=n("YkbD"),o={status:"draft",title:"",content:"",content_short:"",source_uri:"",image_uri:"",source_name:"",display_time:void 0,id:void 0,platforms:["a-platform"],comment_disabled:!1},r={name:"newsAdminAdd",components:{Tinymce:n("glbJ").a},data:function(){return{form:{title:"",content:"",sort:""},formLoading:!1,tinyForm:a()({},o),isLoading:!1}},activated:function(){this.$route.query.pageClick&&this.init()},created:function(){this.init()},methods:{init:function(){var t=this;this.$store.dispatch("setLoading",!0);var e=this.$route.params.id;Object(s.c)(e).then(function(e){"error"!==e&&(t.form=e.data,t.tinyForm.content=e.data.content,t.$store.dispatch("setLoading",!1))})},add:function(){var t=this;this.isLoading=!0;var e=this.$route.params.id;this.form.content=this.tinyForm.content,Object(s.d)(e,this.form).then(function(e){"error"!==e&&(_g.toastMsg("success","保存成功"),setTimeout(function(){t.addRefresh("newsAdmin")})),t.isLoading=!1})},handleEmpty:function(){this.form={title:"",content:"",sort:""},this.tinyForm.content=""}},computed:{editShow:function(){return _g.getHasRule("insurance-news-update")}}},l=n("KHd+"),c=Object(l.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("sticky",{attrs:{className:"sub-navbar",stickyTop:84}},[n("div",{ref:"appMainFixed",staticClass:"app-main-btm-fixed"},[n("h1",{staticClass:"page-title-box"},[t._v("\n      新闻管理"),n("em"),n("span",[t._v("/添加列表项")])]),t._v(" "),n("div",[n("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-close"},on:{click:function(e){t.handleEmpty()}}},[t._v("清空表单")]),t._v(" "),t.editShow?n("el-button",{attrs:{type:"primary",icon:"el-icon-check",size:"mini",loading:t.isLoading},on:{click:t.add}},[t._v("保存")]):t._e()],1)])]),t._v(" "),n("div",{staticClass:"app_main_content"},[n("el-form",{ref:"form",attrs:{model:t.form,"label-width":"50px","label-position":"top"}},[n("div",{staticClass:"block-box"},[n("h1",{staticClass:"block-header-box"},[n("i"),t._v("\n                基本信息\n            ")]),t._v(" "),n("div",{staticClass:"block-content-box"},[n("el-row",{attrs:{gutter:30}},[n("el-col",{staticClass:"col-item",attrs:{span:6}},[n("el-form-item",{attrs:{label:"标题"}},[n("el-input",{attrs:{placeholder:"请输入新闻标题",clearable:""},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1)],1),t._v(" "),n("el-col",{staticClass:"col-item",attrs:{span:6}},[n("el-form-item",{attrs:{label:"排序"}},[n("el-input",{attrs:{placeholder:"请输入排序",clearable:""},model:{value:t.form.sort,callback:function(e){t.$set(t.form,"sort",e)},expression:"form.sort"}})],1)],1)],1),t._v(" "),n("el-row",{staticStyle:{"margin-right":"0"},attrs:{gutter:30}},[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"描述"}},[n("tinymce",{ref:"editor",attrs:{height:200},model:{value:t.tinyForm.content,callback:function(e){t.$set(t.tinyForm,"content",e)},expression:"tinyForm.content"}})],1)],1)],1)],1)])])],1)],1)},[],!1,null,null,null);c.options.__file="edit.vue";e.default=c.exports},C879:function(t,e,n){"use strict";n.r(e);var i=n("pCtG"),a=n("YkbD"),s=n("2Yt4"),o={name:"newsAdmin",mixins:[i.a],components:{newsEdit:s.default},data:function(){return{tableData:[],searchForm:{},update:!1,loading:!1,tableHeight:null}},created:function(){var t=this;bus.$on("newsAdmin",function(){t.update=!t.update})},methods:{handleEdit:function(t){this.$router.push({name:"newsAdminEdit",params:{id:t.row.id},query:{pageClick:_g.editRefresh("newsAdminEdit")}})},handleDelete:function(t){var e=this;this.$confirm("确定删除该新闻?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(a.b)(t.row.id).then(function(t){"error"!==t&&(_g.toastMsg("success","删除成功"),setTimeout(function(){e.update=!e.update}))})})},handlePaging:function(t){var e=this;this.loading=!0,setTimeout(function(){e.tableData=t.map(function(t){return t}),e.loading=!e.loading},300)}},computed:{indexShow:function(){return _g.getHasRule("insurance-news-index")},addShow:function(){return _g.getHasRule("insurance-news-save")},readShow:function(){return _g.getHasRule("insurance-news-read")},deleteShow:function(){return _g.getHasRule("insurance-news-delete")}}},r=n("KHd+"),l=Object(r.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"mainContainer",staticClass:"app_main_container"},[n("div",{staticClass:"page_table_box"},[n("div",{ref:"topAdd",staticClass:"filter-container"},[t.addShow?n("router-link",{staticClass:"btn-link-large add-btn",attrs:{to:"add"}},[n("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-plus"}},[t._v("添加新闻")])],1):t._e()],1),t._v(" "),t.indexShow?n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.tableData,border:"",maxHeight:t.tableHeight,"element-loading-text":"数据加载中"}},[n("el-table-column",{attrs:{label:"名称",prop:"title","min-width":"250"}}),t._v(" "),n("el-table-column",{attrs:{label:"排序",prop:"sort",width:"80"}}),t._v(" "),n("el-table-column",{attrs:{label:"发布时间","min-width":"170"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("timestampToTime")(e.row.add_time)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",width:"185"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",[t.readShow?n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){t.handleEdit(e)}}},[n("svg-icon",{staticStyle:{"margin-right":"6px"},attrs:{"icon-class":"operate-edit"}}),t._v("编辑")],1):t._e(),t._v(" "),t.deleteShow?n("el-button",{staticStyle:{"margin-left":"4px"},attrs:{size:"mini",type:"danger"},on:{click:function(n){t.handleDelete(e)}}},[n("svg-icon",{staticStyle:{"margin-right":"6px"},attrs:{"icon-class":"operate-delete"}}),t._v("删除")],1):t._e()],1)]}}])})],1):t._e(),t._v(" "),n("div",{ref:"btmGroup",staticStyle:{height:"60px"}},[n("el-row",{staticClass:"pos_rel",staticStyle:{height:"60px"},attrs:{type:"flex",align:"middle",justify:"end"}},[n("div",{staticClass:"block pages"},[n("paging",{attrs:{type:"insurance/news",updateType:"sheet",pagingdata:t.searchForm,update:t.update},on:{loadingChange:function(e){t.loading=!0},sheetPaging:t.handlePaging}})],1)])],1)],1)])},[],!1,null,null,null);l.options.__file="list.vue";e.default=l.exports},YkbD:function(t,e,n){"use strict";n.d(e,"a",function(){return a}),n.d(e,"b",function(){return s}),n.d(e,"c",function(){return o}),n.d(e,"d",function(){return r});var i=n("t3Un");function a(t){return i.a.post("insurance/news",t)}function s(t){return i.a.delete("insurance/news/"+t)}function o(t){return i.a.get("insurance/news/"+t)}function r(t,e){return i.a.put("insurance/news/",t,e)}},pCtG:function(t,e,n){"use strict";var i=n("7Qib");e.a={mounted:function(){var t=this;this.valHandle(),this.__resizeMainHanlder=Object(i.a)(function(){t.valHandle(0,0)},100),window.addEventListener("resize",this.__resizeMainHanlder)},methods:{valHandle:function(t,e){var n=this.$refs.mainContainer.offsetHeight-40-((this.$refs.topAdd?this.$refs.topAdd.offsetHeight:0)+(this.$refs.btmGroup?this.$refs.btmGroup.offsetHeight:20));this.tableHeight=n}},beforeDestroy:function(){window.removeEventListener("resize",this.__resizeMainHanlder)}}}}]);