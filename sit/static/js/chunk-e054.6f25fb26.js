(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-e054"],{"7jsS":function(e,t,a){"use strict";var r=a("sVu9");a.n(r).a},DYHV:function(e,t,a){"use strict";var r=a("yBUW");a.n(r).a},DYYU:function(e,t,a){"use strict";var r=a("GuDX");a.n(r).a},GuDX:function(e,t,a){},P8hO:function(e,t,a){"use strict";var r=a("w79x");a.n(r).a},SvSB:function(e,t,a){"use strict";var r=a("YKQT");a.n(r).a},Xq5J:function(e,t,a){"use strict";a.r(t);var r=a("t3Un"),n={props:["url","type","date","update"],data:function(){return{allTableData:[],queryForm:{params:{date:"",type:""}},month:"",monthOptions:[],loading:!1}},watch:{update:function(){this.init()}},created:function(){this.init()},methods:{init:function(){var e=this;this.loading=!0,this.queryForm.params.type=this.type,this.queryForm.params.date=this.date;var t=this.queryForm.params.date.split("-");this.month=t[1],console.log(this.date),r.a.get(this.url,this.queryForm).then(function(t){if(console.log(t),"error"!==t){e.allTableData=t.data;var a=0;for(var r in e.allTableData[0])-1!==r.indexOf("new_")&&(a++,e.monthOptions.push({label:a}));console.log(e.monthOptions),e.loading=!1}})}}},l=(a("DYHV"),a("KHd+")),o=Object(l.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.allTableData,border:"","max-height":"600","element-loading-text":"数据加载中","show-summary":""}},[a("el-table-column",{directives:[{name:"show",rawName:"v-show",value:0==e.monthOptions.length,expression:"monthOptions.length == 0 ? true : false"}],attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"机构",prop:"org_name"}}),e._v(" "),e._l(e.monthOptions,function(t,r){return a("el-table-column",{key:r,attrs:{align:"center","class-name":"","header-align":"center",label:e.month+"月"+t.label+"日"}},[a("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",label:"新增",prop:"new_"+t.label,sortable:""}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",label:"出单",prop:"out_"+t.label,sortable:""}})],1)})],2)],1)},[],!1,null,"335823c1",null);o.options.__file="template.vue";var s={components:{tabTemplate:o.exports},data:function(){return{queryForm:{date:""},update:!1}},created:function(){var e=new Date;this.month=e.getMonth()+1,this.queryForm.date=_g.getNowFormatDate()},methods:{handleQuery:function(){var e=this.queryForm.date.split("-");this.month=e[1],this.update=!this.update}}},i=(a("DYYU"),Object(l.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{"padding-bottom":"30px"}},[a("div",{staticClass:"filter-container"},[a("el-date-picker",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{size:"small",align:"right",type:"month",placeholder:"选择日期","value-format":"yyyy-MM"},model:{value:e.queryForm.date,callback:function(t){e.$set(e.queryForm,"date",t)},expression:"queryForm.date"}}),e._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",size:"small"},on:{click:e.handleQuery}},[e._v("查询")]),e._v(" "),a("a",{staticClass:"filter-item",attrs:{href:e.urlAds+"insurance/export/org_manPower_details_export?date="+e.queryForm.date}},[a("el-button",{attrs:{type:"primary",size:"small"}},[e._v("导出")])],1)],1),e._v(" "),a("el-row",{staticClass:"header-title"},[e._v(e._s(e.month)+"月各机构财险人力报表日明细")]),e._v(" "),a("div",{staticClass:"financial-assessment1",staticStyle:{border:"#e4e7ed 1px solid"}},[a("el-tabs",[a("el-tab-pane",{attrs:{label:"财险总计"}},[a("tab-template",{attrs:{url:"insurance/report/org_manPower_details_report",type:"",update:e.update,date:e.queryForm.date}})],1)],1)],1)],1)},[],!1,null,"46d07a34",null));i.options.__file="index.vue";var u=i.exports,c={props:["url","type","date","update"],data:function(){return{allTableData:[],queryForm:{params:{date:"",type:""}},month:"",monthOptions:[],loading:!1}},watch:{update:function(){this.init()}},created:function(){this.init(),console.log("进来了")},methods:{init:function(){var e=this;this.loading=!0,this.queryForm.params.type=this.type,this.queryForm.params.date=this.date;var t=this.queryForm.params.date.split("-");this.month=t[1],r.a.get(this.url,this.queryForm).then(function(t){console.log(t),"error"!==t&&(e.allTableData=t.data.map(function(e){return e.total=Number(e.total),e.yx=0,e.hb=0,e}),e.loading=!1)})},sortRate:function(e,t){return("-"!=e.yx?Number(e.yx.substring(0,e.yx.length-1)):-1e4)-("-"!=t.yx?Number(t.yx.substring(0,t.yx.length-1)):-1e4)},sortRate1:function(e,t){var a=0,r=0;return a="-"!=e.hb?Number(e.hb.substring(0,e.hb.length-1)):-1e4,r="-"!=t.hb?Number(t.hb.substring(0,t.hb.length-1)):-1e4,console.log(a),console.log(r),a-r},yxFun:function(e){return 0==e.row.month_newOutManpower?e.row.yx="-":e.row.yx=(e.row.month_newOutManpower/e.row.month_newManpower*100).toFixed(2)+"%",e.row.yx},hbFun:function(e){return 0==e.row.last_month_newManpower?e.row.hb="-":e.row.hb=(e.row.month_newManpower/e.row.last_month_newManpower*100).toFixed(2)+"%",e.row.hb},getSummaries:function(e){var t=e.columns,a=e.data,r=[];return console.log(t),console.log(a),t.forEach(function(e,t){if(0!==t){var n=a.map(function(t){return Number(t[e.property])});n.every(function(e){return isNaN(e)})?r[t]="N/A":(r[t]=n.reduce(function(e,t){var a=Number(t);return isNaN(a)?e:e+t},0),r[t]=r[t].toFixed(2)+"")}else r[t]="总计"}),0==Number(r[5])?r[8]="-":r[8]=(Number(r[7])/Number(r[5])*100).toFixed(2)+"%",0==Number(r[9])?r[10]="-":r[10]=(Number(r[5])/Number(r[9])*100).toFixed(2)+"%",r}}},d=(a("7jsS"),Object(l.a)(c,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.allTableData,border:"","max-height":"600","summary-method":e.getSummaries,"element-loading-text":"数据加载中","show-summary":""}},[a("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"机构",prop:"org_name"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"当月保费",sortable:"",prop:"total"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"当月目标",sortable:"",prop:"org_aim"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"车险单数",sortable:"",prop:"car_count"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"非车单数",sortable:"",prop:"noncar_count"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"新增人力",sortable:"",prop:"month_newManpower"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"出单人力",sortable:"",prop:"month_manpower"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"新增出单人力",sortable:"",prop:"month_newOutManpower"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"有效人力率",sortable:"","sort-method":e.sortRate},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.yxFun(t)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"上月新增人力",sortable:"",prop:"last_month_newManpower"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"环比",prop:"team_name",sortable:"","sort-method":e.sortRate1},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.hbFun(t)))])]}}])})],1)],1)},[],!1,null,"2bbe1b94",null));d.options.__file="template.vue";var m={components:{tabTemplate:d.exports},data:function(){return{queryForm:{date:""},update:!1}},created:function(){var e=new Date;this.month=e.getMonth()+1,this.queryForm.date=_g.getNowFormatDate()},methods:{handleQuery:function(){var e=this.queryForm.date.split("-");this.month=e[1],this.update=!this.update}}},h=(a("P8hO"),Object(l.a)(m,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{"padding-bottom":"30px"}},[a("div",{staticClass:"filter-container"},[a("el-date-picker",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{size:"small",align:"right",type:"month",placeholder:"选择日期","value-format":"yyyy-MM"},model:{value:e.queryForm.date,callback:function(t){e.$set(e.queryForm,"date",t)},expression:"queryForm.date"}}),e._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",size:"small"},on:{click:e.handleQuery}},[e._v("查询")]),e._v(" "),a("a",{staticClass:"filter-item",attrs:{href:e.urlAds+"insurance/export/org_manPower_export?date="+e.queryForm.date}},[a("el-button",{attrs:{type:"primary",size:"small"}},[e._v("导出")])],1)],1),e._v(" "),a("el-row",{staticClass:"header-title"},[e._v(e._s(e.month)+"月各机构财险人力报表")]),e._v(" "),a("div",{staticClass:"financial-assessment1",staticStyle:{border:"#e4e7ed 1px solid"}},[a("el-tabs",[a("el-tab-pane",{attrs:{label:"财险总计"}},[a("tab-template",{attrs:{url:"insurance/report/org_manPower_report",type:"",update:e.update,date:e.queryForm.date}})],1)],1)],1)],1)},[],!1,null,"f57e07be",null));h.options.__file="index.vue";var p={name:"orgManpowerList",components:{tabDay:u,tabMonth:h.exports},data:function(){return{flag1:!0,flag2:!1}},methods:{handleTabClick:function(e){0==e.index&&(this.flag1=!0),1==e.index&&(this.flag2=!0),2==e.index&&(this.flag3=!0)}}},b=(a("SvSB"),Object(l.a)(p,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{ref:"mainContainer",staticClass:"app_main_container assessment-tabs"},[t("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":this.handleTabClick}},[t("el-tab-pane",{attrs:{label:"月报表"}},[this.flag1?t("tab-month"):this._e()],1),this._v(" "),t("el-tab-pane",{attrs:{label:"日数据"}},[this.flag2?t("tab-day"):this._e()],1)],1)],1)},[],!1,null,"fd24df4c",null));b.options.__file="index.vue";t.default=b.exports},YKQT:function(e,t,a){},sVu9:function(e,t,a){},w79x:function(e,t,a){},yBUW:function(e,t,a){}}]);