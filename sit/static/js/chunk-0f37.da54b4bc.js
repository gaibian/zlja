(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0f37"],{"8VmU":function(e,t,n){"use strict";n.r(t);var a=n("tT7d"),i=n("pCtG"),o=n("t3Un"),s={components:{uploadExcel:a.a},mixins:[i.a],data:function(){return{tableData:[],loading:!0,tableHeight:null,pageCount:1,num:0,number:null}},methods:{selected:function(e){this.pageCount=e.data.page_count,this.number=e.data.number,this.upload()},handleReset:function(){console.log("重置"),this.num=0,this.pageCount=1},upload:function(){var e=this;this.num++;var t={number:this.number,page:this.num};o.a.post("insurance/policy/import",t).then(function(t){"error"!==t&&(e.num>=e.pageCount?e.loading=!1:e.upload())})}}},l=n("KHd+"),r=Object(l.a)(s,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"mainContainer",staticClass:"app_main_container"},[n("div",{ref:"topAdd",staticClass:"top_add_menu_container"},[n("upload-excel",{attrs:{url:"insurance/policy/import",num:e.num,pageCount:e.pageCount},on:{"on-selected-file":e.selected,reset:e.handleReset}})],1),e._v(" "),n("el-table",{attrs:{data:e.tableData,"max-height":e.tableHeight,"element-loading-text":"拼命加载中"}},[n("el-table-column",{attrs:{label:"代理人",prop:"realname"}}),e._v(" "),n("el-table-column",{attrs:{label:"保单号",prop:"policy_number"}}),e._v(" "),n("el-table-column",{attrs:{label:"错误信息",prop:"msg"}})],1)],1)},[],!1,null,null,null);r.options.__file="list.vue";t.default=r.exports},pCtG:function(e,t,n){"use strict";var a=n("7Qib");t.a={mounted:function(){var e=this;this.valHandle(),this.__resizeMainHanlder=Object(a.a)(function(){e.valHandle(0,0)},100),window.addEventListener("resize",this.__resizeMainHanlder)},methods:{valHandle:function(e,t){var n=this.$refs.mainContainer.offsetHeight-40-((this.$refs.topAdd?this.$refs.topAdd.offsetHeight:0)+(this.$refs.btmGroup?this.$refs.btmGroup.offsetHeight:20));this.tableHeight=n}},beforeDestroy:function(){window.removeEventListener("resize",this.__resizeMainHanlder)}}}}]);