(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-7a5f"],{"2brn":function(e,t,a){"use strict";var l=a("Mjg6");a.n(l).a},"7wN2":function(e,t,a){"use strict";a.r(t);var l=a("XINx"),n=a("pCtG"),i=a("w2ba"),o=a("tT7d"),s={name:"dataTableList",directives:{elDragDialog:l.a},mixins:[n.a],components:{uploadExcel:o.a},data:function(){return{checkList:[],value1:"",previewCaseList:null,designLoading:!0,tableHeight:null,previewForm:{caseId:"",file_name:""},res:null,previewList:[],excelForm:{caseTitle:""},form2:{text:"",numText:"",letterNumberText:"",realNameText:"",id:"",plateNumberText:"",webSiteText:"",mobileText:""},tableData:[],maxPage:"",loading:!0,designDialog:!1,excelDialog:!1,proviewDialog:!1,previewFlag:!1,tableName:"",fullscreenLoading:!1,dialogDataTable:[],defaultFlag:!1,loadTableFlag:!1,sureFlag:!1,excelData:{view_name:"user_organization",line:1},dialogForm:{field_name:"",name:"",Type:"",Null:"",Field:"",Default:"",Comment:""},excelOptions:[],fieldsOptions:null,caseOptions:[],rules:{caseTitle:[{required:!0,message:"请输入方案名称",trigger:"blur"}]}}},created:function(){var e=this;this.init(),bus.$on("dataTableList",function(t){e.init()})},mounted:function(){console.log(this.tableHeight)},methods:{handleCheckbox:function(e,t){t.flag=e,e||(t.index="")},init:function(){var e=this;this.loading=!0,Object(i.d)().then(function(t){"error"!==t&&(e.loading=!e.loading,e.tableData=t.data.list)})},tableSubmit:function(){var e=this,t={table_name:this.tableName,data:{}},a=!1;_(this.dialogDataTable).forEach(function(l,n){l.name&&""!==l.name?(e.defaultFlag?t.data[""+n]={name:l.name,field_name:l.field_name,field_type:l.field_type,allow_null:l.allow_null,field_default:l.field_default,field_coment:l.field_coment,id:l.id}:t.data[""+n]={name:l.name,field_name:l.Field,field_type:l.Type,allow_null:l.Null,field_default:l.Default,field_coment:l.Comment},a=!0):(a=!1,_g.toastMsg("error","请输入名称再保存"))}),a&&Object(i.g)(t).then(function(t){"error"!==t&&(_g.toastMsg("success","保存成功"),e.designDialog=!1,e.$refs.dialog.close(),e.init())})},tableNew:function(){var e=this;Object(i.a)(this.tableName).then(function(t){"error"!==t&&(e.dialogDataTable=t.data,_(t.data).forEach(function(e){}))})},handleDesign:function(e){var t=this;console.log(e),this.tableName=e.row.table_name;e.row.id;this.designDialog=!0,this.$refs.dialog.open(),Object(i.c)(this.tableName).then(function(e){"error"!==e&&(t.dialogDataTable=e.data.list,e.data.list&&e.data.list.length>0?(t.defaultFlag=!0,t.loadTableFlag=!1):(t.defaultFlag=!1,t.loadTableFlag=!0))})},handleExcelClose:function(){this.excelDialog=!1,this.$refs.excelDialog.close()},handlePreviewClose:function(){this.proviewDialog=!1,this.$refs.previewDialog.close()},handleClose:function(){this.designDialog=!1,this.$refs.dialog.close()}}},r=(a("2brn"),a("KHd+")),d=Object(r.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{ref:"mainContainer",staticClass:"app_main_container"},[a("div",{ref:"topAdd",staticClass:"top_add_menu_container"},[a("router-link",{attrs:{to:"add"}},[a("el-button",{attrs:{size:"mini",icon:"el-icon-plus",type:"primary"}},[e._v("添加数据表")])],1)],1),e._v(" "),a("div",{staticClass:"page_table_box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,"max-height":e.tableHeight,border:"","element-loading-text":"数据加载中"}},[a("el-table-column",{attrs:{label:"表格名称",prop:"name"}}),e._v(" "),a("el-table-column",{attrs:{label:"数据库表名",prop:"table_name"}}),e._v(" "),a("el-table-column",{attrs:{label:"数据库表引擎",prop:"table_engine"}}),e._v(" "),a("el-table-column",{attrs:{label:"表字段",width:"500px",prop:"table_fields"}}),e._v(" "),a("el-table-column",{attrs:{label:"添加时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v("\n            "+e._s(e._f("timestampToTime")(t.row.add_time))+"\n          ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{display:"block",position:"relative"}},[a("operates",[a("operate",{attrs:{label:"设计表",icon:"CirculationSheetTable",svgIcon:""},on:{change:function(a){e.handleDesign(t)}}})],1)],1)]}}])})],1)],1),e._v(" "),a("el-dialog",{directives:[{name:"el-drag-dialog",rawName:"v-el-drag-dialog"}],ref:"dialog",attrs:{width:"60%",title:"设计表","before-close":e.handleClose,visible:e.designDialog},on:{"update:visible":function(t){e.designDialog=t}}},[a("div",{ref:"innerbox",staticClass:"innerbox"},[a("div",{staticClass:"dialog-table-box",staticStyle:{"margin-bottom":"20px"}},[e.defaultFlag?a("el-table",{attrs:{data:e.dialogDataTable}},[a("el-table-column",{attrs:{label:"名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{placeholder:"请输入名称"},model:{value:t.row.name,callback:function(a){e.$set(t.row,"name",a)},expression:"scope.row.name"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"字段名称"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{value:e.row.field_name,disabled:""}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"字段类型"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{value:e.row.field_type,disabled:""}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"允许空"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{value:e.row.allow_null,disabled:""}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"默认值"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{value:e.row.field_default,disabled:""}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"字段注释"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{value:e.row.field_coment,disabled:""}})]}}])})],1):a("el-table",{attrs:{data:e.dialogDataTable}},[a("el-table-column",{attrs:{label:"名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{placeholder:"请输入名称"},model:{value:t.row.name,callback:function(a){e.$set(t.row,"name",a)},expression:"scope.row.name"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"字段名称"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{value:e.row.Field,disabled:""}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"字段类型"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{value:e.row.Type,disabled:""}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"允许空"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{value:e.row.Null,disabled:""}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"默认值"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{value:e.row.Default,disabled:""}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"字段注释"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{value:e.row.Comment,disabled:""}})]}}])})],1)],1)]),e._v(" "),a("div",[e.loadTableFlag?a("el-button",{attrs:{type:"primary",icon:"el-icon-download",size:"mini"},on:{click:e.tableNew}},[e._v("加载表信息")]):e._e(),e._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-check",size:"mini"},on:{click:e.tableSubmit}},[e._v("保存")])],1)])],1)},[],!1,null,"83873812",null);d.options.__file="list.vue";t.default=d.exports},Mjg6:function(e,t,a){},pCtG:function(e,t,a){"use strict";var l=a("7Qib");t.a={mounted:function(){var e=this;this.valHandle(),this.__resizeMainHanlder=Object(l.a)(function(){e.valHandle(0,0)},100),window.addEventListener("resize",this.__resizeMainHanlder)},methods:{valHandle:function(e,t){var a=this.$refs.mainContainer.offsetHeight-40-((this.$refs.topAdd?this.$refs.topAdd.offsetHeight:0)+(this.$refs.btmGroup?this.$refs.btmGroup.offsetHeight:20));this.tableHeight=a}},beforeDestroy:function(){window.removeEventListener("resize",this.__resizeMainHanlder)}}}}]);