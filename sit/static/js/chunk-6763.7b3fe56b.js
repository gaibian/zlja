(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6763"],{"Y+MB":function(e,t,n){"use strict";n.r(t);var i=n("haJh"),a=n("pCtG"),l=n("0Rtu"),o=n("itRl"),s=n("rfXi"),r=n.n(s),d=n("Kw5r");function u(e,t,n,i,a){var l=[],o=[];return r()(e).forEach(function(e){void 0===e._expanded&&d.default.set(e,"_expanded",t);var s=1;if(void 0!==i&&null!==i&&(s=i+1),d.default.set(e,"_level",s),n?(d.default.set(e,"parent",n),l[s]||(l[s]=0),d.default.set(e,"_marginLeft",l[s]+n._marginLeft),d.default.set(e,"_width",e[a]/n[a]*n._width),l[s]+=e._width):(l[e.id]=[],l[e.id][s]=0,d.default.set(e,"_marginLeft",0),d.default.set(e,"_width",1)),o.push(e),e.children&&e.children.length>0){var r=u(e.children,t,e,s,a);o=o.concat(r)}}),o}var c={name:"lifeMechanismList",mixins:[a.a],components:{companyEdit:l.default,treeTable:o.a},data:function(){return{func:u,expandAll:!1,args:[null,null,"timeLine"],tableData:[],loading:!0,multipleSelection:[],centerDialogVisible:!1,tableHeight:null,data5:null,loadingEditIndex:null,rule:null}},created:function(){var e=this;this.init(),bus.$on("mechanismList",function(t){e.refresh()}),this.rule={deletesShow:this.deletesShow,enablesShow:this.enablesShow}},filters:{pName:function(e){return""===e?"顶级机构":e}},methods:{init:function(){var e=this;this.loading=!0,Object(i.f)(2).then(function(t){console.log(t),e.tableData=t.data.map(function(e){return e}),e.data5=t.data,e.loading=!e.loading})},getSelectVal:function(e){this.multipleSelection=e},dialogClose:function(){this.centerDialogVisible=!1,this.loading=!0,this.init()},editClick:function(e){this.editId=e.row.id,this.centerDialogVisible=!0,this.$refs.dialog.open()},handleClose:function(){this.centerDialogVisible=!1,this.$refs.dialog.close()},selectItem:function(e){this.multipleSelection=e},confirmDelete:function(e){var t=this;this.$confirm("确认删除该机构?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i.c)(e.row.id).then(function(e){_g.toastMsg("success","删除成功"),setTimeout(function(){t.refresh()})})}).catch(function(){})}},computed:{indexShow:function(){return _g.getHasRule("admin-organization-index")},addShow:function(){return _g.getHasRule("admin-organization-save")},readShow:function(){return _g.getHasRule("admin-organization-read")},deletesShow:function(){return _g.getHasRule("admin-organization-deletes")},enablesShow:function(){return _g.getHasRule("admin-organization-enables")},deleteShow:function(){return _g.getHasRule("admin-organization-delete")}},watch:{$route:function(e,t){e.name===t.name&&this.init()}}},f=(n("k6/V"),n("KHd+")),h=Object(f.a)(c,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"mainContainer",staticClass:"app_main_container"},[e.indexShow?n("div",{staticClass:"page_table_box"},[n("div",{ref:"topAdd",staticClass:"filter-container"},[n("router-link",{staticClass:"filter-item",attrs:{to:"add"}},[e.addShow?n("el-button",{staticClass:"add_btn",attrs:{type:"primary",size:"small",icon:"el-icon-plus"}},[e._v("添加机构")]):e._e()],1)],1),e._v(" "),n("tree-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"数据加载中",data:e.tableData,evalFunc:e.func,evalArgs:e.args,expandAll:e.expandAll,"max-height":e.tableHeight,border:""},on:{selectVal:e.getSelectVal}},[n("el-table-column",{attrs:{label:"上级机构","min-width":"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("pName")(t.row.p_title)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"层级",width:"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.level))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"地区","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.area_name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"状态",width:"70"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-tag",{attrs:{type:1===t.row.status?"":"warning"}},[n("span",[e._v(e._s(e._f("status")(t.row.status)))])])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"添加时间","min-width":"170"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("timestampToTime")(t.row.add_time)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"55",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("div",{staticClass:"pos_rel"},[n("operates",[e.readShow?n("operate",{attrs:{label:"编辑",svgIcon:"",icon:"operate-edit"},on:{change:function(n){e.editClick(t)}}}):e._e(),e._v(" "),e.deleteShow?n("operate",{attrs:{label:"删除",svgIcon:"",icon:"operate-delete"},on:{change:function(n){e.confirmDelete(t)}}}):e._e()],1)],1)]}}])})],1),e._v(" "),n("div",{ref:"btmGroup",staticStyle:{height:"70px"}},[n("el-row",{staticClass:"pos_rel",staticStyle:{height:"70px"},attrs:{type:"flex",align:"middle",justify:"space-between"}},[n("btnGroup",{attrs:{rule:e.rule,selectedData:e.multipleSelection,type:"admin/organization"},on:{change:e.refresh}})],1)],1)],1):e._e(),e._v(" "),n("el-dialog",{ref:"dialog",staticClass:"dialog-slider",attrs:{top:"0",width:"400px",visible:e.centerDialogVisible,"before-close":e.handleClose,title:"机构列表编辑"},on:{"update:visible":function(t){e.centerDialogVisible=t}}},[e.centerDialogVisible?n("company-edit",{attrs:{editId:e.editId},on:{close:e.dialogClose}}):e._e()],1)],1)},[],!1,null,"010b892a",null);h.options.__file="list.vue";t.default=h.exports},dihT:function(e,t,n){},jr1U:function(e,t,n){e.exports={default:n("wObO"),__esModule:!0}},"k6/V":function(e,t,n){"use strict";var i=n("dihT");n.n(i).a},pCtG:function(e,t,n){"use strict";var i=n("7Qib");t.a={mounted:function(){var e=this;this.valHandle(),this.__resizeMainHanlder=Object(i.a)(function(){e.valHandle(0,0)},100),window.addEventListener("resize",this.__resizeMainHanlder)},methods:{valHandle:function(e,t){var n=this.$refs.mainContainer.offsetHeight-40-((this.$refs.topAdd?this.$refs.topAdd.offsetHeight:0)+(this.$refs.btmGroup?this.$refs.btmGroup.offsetHeight:20));this.tableHeight=n}},beforeDestroy:function(){window.removeEventListener("resize",this.__resizeMainHanlder)}}},wObO:function(e,t){e.exports=function(){return Function.call.apply(Array.prototype.concat,arguments)}}}]);