(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-b06f"],{DaAV:function(t,e,a){"use strict";a.r(e);var n=a("pCtG"),r=a("rfOh"),i={name:"lifeMechanismAdd",mixins:[n.a],data:function(){return{tableData:[],tableHeight:null,loading:!1,form:{params:{start:"",end:""}}}},created:function(){},methods:{search:function(){var t=this;this.loading=!0,Object(r.c)(this.form).then(function(e){"error"!==e&&(console.log(e),t.tableData=e.data,t.loading=!1)})}}},o=(a("ovMK"),a("KHd+")),s=Object(o.a)(i,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"mainContainer",staticClass:"app_main_container"},[a("div",{staticClass:"page_table_box"},[a("div",{ref:"topAdd",staticClass:"filter-container"},[a("el-date-picker",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{type:"date",clearable:"",size:"small","value-format":"yyyy-MM-dd",placeholder:"请选择开始日期"},model:{value:t.form.params.start,callback:function(e){t.$set(t.form.params,"start",e)},expression:"form.params.start"}}),t._v(" "),a("el-date-picker",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{type:"date",clearable:"",size:"small","value-format":"yyyy-MM-dd",placeholder:"请选择结束日期"},model:{value:t.form.params.end,callback:function(e){t.$set(t.form.params,"end",e)},expression:"form.params.end"}}),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"warning",size:"small",icon:"el-icon-search"},on:{click:function(e){t.search()}}},[t._v("查询")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,"element-loading-text":"数据加载中",border:"","max-height":t.tableHeight}},[a("el-table-column",{attrs:{label:"公司名称",prop:"company_name"}}),t._v(" "),a("el-table-column",{attrs:{label:"标保",prop:"standard_total"}}),t._v(" "),a("el-table-column",{attrs:{label:"规保",prop:"total"}})],1)],1)])},[],!1,null,"86aa8ab4",null);s.options.__file="list.vue";e.default=s.exports},iO5v:function(t,e,a){},ovMK:function(t,e,a){"use strict";var n=a("iO5v");a.n(n).a},pCtG:function(t,e,a){"use strict";var n=a("7Qib");e.a={mounted:function(){var t=this;this.valHandle(),this.__resizeMainHanlder=Object(n.a)(function(){t.valHandle(0,0)},100),window.addEventListener("resize",this.__resizeMainHanlder)},methods:{valHandle:function(t,e){var a=this.$refs.mainContainer.offsetHeight-40-((this.$refs.topAdd?this.$refs.topAdd.offsetHeight:0)+(this.$refs.btmGroup?this.$refs.btmGroup.offsetHeight:20));this.tableHeight=a}},beforeDestroy:function(){window.removeEventListener("resize",this.__resizeMainHanlder)}}},rfOh:function(t,e,a){"use strict";a.d(e,"d",function(){return r}),a.d(e,"c",function(){return i}),a.d(e,"a",function(){return o}),a.d(e,"g",function(){return s}),a.d(e,"e",function(){return l}),a.d(e,"f",function(){return c}),a.d(e,"b",function(){return d});var n=a("t3Un");function r(t){return n.a.get("insurance/report/life_manual_team_report",t)}function i(t){return n.a.get("insurance/report/life_company_report",t)}function o(t){return n.a.get("insurance/report/add_user_award",t)}function s(t){return n.a.get("insurance/report/manager_award_and_train_award",t)}function l(t){return n.a.get("insurance/report/majordomo_manager_award",t)}function c(t){return n.a.get("insurance/report/majordomo_train_award",t)}function d(t){return n.a.get("insurance/report/fenghuang_plan",t)}}}]);