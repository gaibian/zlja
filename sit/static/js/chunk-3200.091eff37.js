(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3200"],{AQA1:function(t,e,a){"use strict";a.r(e);var n=a("pCtG"),i=(a("haJh"),a("t3Un")),r={name:"policyExpireList",mixins:[n.a],data:function(){return{tableData:[],loading:!1,tableHeight:null,organization_id:0,pagingData:{start:"",end:""},isBtnActive:!1,queryLoading:!1,defaultProps:{children:"children",label:"label"}}},created:function(){},methods:{init:function(){var t=this;i.a.get("insurance/report/org_report").then(function(e){"error"!==e&&(t.loading=!1,setTimeout(function(){t.tableData=e.data},300))})},handleSure:function(){var t=this,e={params:this.pagingData};this.loading=!0,i.a.get("insurance/report/org_report",e).then(function(e){"error"!==e&&(t.loading=!1,setTimeout(function(){t.tableData=e.data},300))})}},computed:{indexShow:function(){return _g.getHasRule("insurance-report-org_report")}}},o=(a("GNfc"),a("KHd+")),l=Object(o.a)(r,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"mainContainer",staticClass:"app_main_container"},[a("div",{staticClass:"page_table_box"},[a("div",{ref:"topAdd",staticClass:"filter-container"},[a("el-date-picker",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{type:"date",size:"small","value-format":"yyyy-MM-dd",clearable:"",placeholder:"请选择开始日期"},model:{value:t.pagingData.start,callback:function(e){t.$set(t.pagingData,"start",e)},expression:"pagingData.start"}}),t._v(" "),a("el-date-picker",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{type:"date",size:"small","value-format":"yyyy-MM-dd",clearable:"",placeholder:"请选择结束日期"},model:{value:t.pagingData.end,callback:function(e){t.$set(t.pagingData,"end",e)},expression:"pagingData.end"}}),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{icon:"el-icon-search",size:"small",loading:t.queryLoading,type:"warning"},on:{click:t.handleSure}},[t._v("查询")])],1),t._v(" "),t.indexShow?a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,"max-height":t.tableHeight,"element-loading-text":"数据加载中",border:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"机构名称",prop:"name"}}),t._v(" "),a("el-table-column",{attrs:{label:"业绩",prop:"total"}})],1):t._e()],1)])},[],!1,null,"750989f6",null);l.options.__file="list.vue";e.default=l.exports},GNfc:function(t,e,a){"use strict";var n=a("SCpq");a.n(n).a},SCpq:function(t,e,a){},haJh:function(t,e,a){"use strict";a.d(e,"f",function(){return i}),a.d(e,"a",function(){return r}),a.d(e,"e",function(){return o}),a.d(e,"d",function(){return l}),a.d(e,"c",function(){return s}),a.d(e,"b",function(){return d});var n=a("t3Un");function i(t){return n.a.get("admin/organization?type="+t)}function r(t){return n.a.post("admin/organization",t)}function o(t){return n.a.get("admin/organization/"+t)}function l(t,e){return n.a.put("admin/organization/",t,e)}function s(t){return n.a.delete("admin/organization/"+t)}function d(t){return n.a.get("admin/organization/getChildArea/"+t)}},pCtG:function(t,e,a){"use strict";var n=a("7Qib");e.a={mounted:function(){var t=this;this.valHandle(),this.__resizeMainHanlder=Object(n.a)(function(){t.valHandle(0,0)},100),window.addEventListener("resize",this.__resizeMainHanlder)},methods:{valHandle:function(t,e){var a=this.$refs.mainContainer.offsetHeight-40-((this.$refs.topAdd?this.$refs.topAdd.offsetHeight:0)+(this.$refs.btmGroup?this.$refs.btmGroup.offsetHeight:20));this.tableHeight=a}},beforeDestroy:function(){window.removeEventListener("resize",this.__resizeMainHanlder)}}}}]);