(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-728d"],{"1vny":function(e,a,t){"use strict";t.r(a);var r=t("t3Un"),n={props:["url","type","date","update"],filters:{filterUnit:function(e){return"-"==e?e:e+"%"}},data:function(){return{allTableData:[],queryForm:{params:{date:"",type:""}},loading:!1}},watch:{update:function(){this.init()}},created:function(){this.init()},methods:{init:function(){var e=this;this.loading=!0,this.queryForm.params.type=this.type,this.queryForm.params.date=this.date,console.log(this.date),r.a.get(this.url,this.queryForm).then(function(a){console.log(a),"error"!==a&&(e.allTableData=a.data.map(function(e){return"-"!=e.day_aim_rate?e.day_aim_rate=Number(e.day_aim_rate)+"%":e.day_aim_rate="-","-"!=e.week_aim_rate?e.week_aim_rate=Number(e.week_aim_rate)+"%":e.week_aim_rate="-","-"!=e.aim_rate?e.aim_rate=Number(e.aim_rate)+"%":e.aim_rate="-",e}),e.loading=!1)})},sortRate:function(e,a){return("-"!=e.day_aim_rate?Number(e.day_aim_rate.substring(0,e.day_aim_rate.length-1)):-1e4)-("-"!=a.day_aim_rate?Number(a.day_aim_rate.substring(0,a.day_aim_rate.length-1)):-1e4)},sortRate1:function(e,a){return("-"!=e.week_aim_rate?Number(e.week_aim_rate.substring(0,e.week_aim_rate.length-1)):-1e4)-("-"!=a.week_aim_rate?Number(a.week_aim_rate.substring(0,a.week_aim_rate.length-1)):-1e4)},sortRate2:function(e,a){return("-"!=e.aim_rate?Number(e.aim_rate.substring(0,e.aim_rate.length-1)):-1e4)-("-"!=a.aim_rate?Number(a.aim_rate.substring(0,a.aim_rate.length-1)):-1e4)},getSummaries:function(e){var a=e.columns,t=e.data,r=[];return console.log(a),console.log(t),a.forEach(function(e,a){if(0!==a){var n=t.map(function(a){return Number(a[e.property])});n.every(function(e){return isNaN(e)})?r[a]="N/A":(r[a]=n.reduce(function(e,a){var t=Number(a);return isNaN(t)?e:e+a},0),r[a]=r[a].toFixed(2)+"")}else r[a]="总计"}),0==Number(r[2])?r[3]="-":r[3]=(Number(r[2])/Number(r[1])*100).toFixed(2)+"%",0==Number(r[5])?r[6]="-":r[6]=(Number(r[5])/Number(r[4])*100).toFixed(2)+"%",0==Number(r[8])?r[9]="-":r[9]=(Number(r[8])/Number(r[7])*100).toFixed(2)+"%",r}}},l=t("KHd+"),o=Object(l.a)(n,function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.allTableData,border:"","element-loading-text":"数据加载中","show-summary":"","summary-method":e.getSummaries}},[t("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"机构",prop:"org_name"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",label:"日目标",sortable:"",prop:"day_team_aim"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",label:"已达成",sortable:"",prop:"day_premium"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"达成率","sort-method":e.sortRate,sortable:"",prop:"day_aim_rate"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",{style:"color:"+(a.row.day_aim_rate.substring(0,a.row.day_aim_rate.length-1)>=100?"#67C23A":"")},[e._v(e._s(a.row.day_aim_rate))])]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",label:"周原目标",sortable:"",prop:"week_team_aim"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",label:"已达成",sortable:"",prop:"week_premium"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"达成率","sort-method":e.sortRate1,sortable:"",prop:"week_aim_rate"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",{style:"color:"+(a.row.week_aim_rate.substring(0,a.row.week_aim_rate.length-1)>=100?"#67C23A":"")},[e._v(e._s(a.row.week_aim_rate))])]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",label:"月目标",sortable:"",prop:"team_aim"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",label:"已达成",sortable:"",prop:"total"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"达成率","sort-method":e.sortRate2,sortable:"",prop:"aim_rate"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",{style:"color:"+(a.row.aim_rate.substring(0,a.row.aim_rate.length-1)>=100?"#67C23A":"")},[e._v(e._s(a.row.aim_rate))])]}}])})],1)],1)},[],!1,null,null,null);o.options.__file="template.vue";var i={data:function(){return{queryForm:{date:""},month:1,type:"",flag1:!0,flag2:!1,flag3:!1,update:!1}},components:{tabTemplate:o.exports},created:function(){var e=new Date;this.month=e.getMonth()+1,this.queryForm.date=_g.getNowFormatDate()},methods:{handleTime:function(e){},handleQuery:function(){var e=this.queryForm.date.split("-");this.month=e[1],this.update=!this.update},handleTabClick:function(e){0==e.index&&(this.flag1=!0,this.type=""),1==e.index&&(this.flag2=!0,this.type="1"),2==e.index&&(this.flag3=!0,this.type="2")}}},s=(t("Ot23"),Object(l.a)(i,function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticStyle:{"padding-bottom":"30px"}},[t("div",{staticClass:"filter-container"},[t("el-date-picker",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{size:"small",align:"right",type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},on:{change:e.handleTime},model:{value:e.queryForm.date,callback:function(a){e.$set(e.queryForm,"date",a)},expression:"queryForm.date"}}),e._v(" "),t("el-button",{staticClass:"filter-item",attrs:{type:"primary",size:"small"},on:{click:e.handleQuery}},[e._v("查询")]),e._v(" "),t("a",{staticClass:"filter-item",attrs:{href:e.urlAds+"insurance/export/org_day_caixian_export?date="+e.queryForm.date+"&type="+e.type}},[t("el-button",{attrs:{type:"primary",size:"small"}},[e._v("导出")])],1)],1),e._v(" "),t("el-row",{staticClass:"header-title"},[e._v(e._s(e.month)+"月各机构财险业绩报表 (截止"+e._s(e.queryForm.date)+")")]),e._v(" "),t("div",{staticClass:"financial-assessment",staticStyle:{border:"#e4e7ed 1px solid"}},[t("el-tabs",{on:{"tab-click":e.handleTabClick}},[t("el-tab-pane",{attrs:{label:"财险总计"}},[e.flag1?t("tab-template",{attrs:{url:"insurance/report/org_day_caixian_report",type:"",update:e.update,date:e.queryForm.date}}):e._e()],1),e._v(" "),t("el-tab-pane",{attrs:{label:"车险"}},[e.flag2?t("tab-template",{attrs:{url:"insurance/report/org_day_caixian_report",type:"1",update:e.update,date:e.queryForm.date}}):e._e()],1),e._v(" "),t("el-tab-pane",{attrs:{label:"非车"}},[e.flag3?t("tab-template",{attrs:{url:"insurance/report/org_day_caixian_report",type:"2",update:e.update,date:e.queryForm.date}}):e._e()],1)],1)],1)],1)},[],!1,null,"0c1a4c28",null));s.options.__file="index.vue";var c=s.exports,u={props:["url","type","date","update"],filters:{filterUnit:function(e){return"-"==e?e:e+"%"}},data:function(){return{allTableData:[],queryForm:{params:{date:"",type:""}},loading:!1}},watch:{update:function(){this.init()}},created:function(){this.init()},methods:{init:function(){var e=this;this.loading=!0,this.queryForm.params.type=this.type,this.queryForm.params.date=this.date.split("-")[0],console.log(this.date),r.a.get(this.url,this.queryForm).then(function(a){console.log(a),"error"!==a&&(e.allTableData=a.data.map(function(e){return"-"!=e.aim_rate?e.aim_rate=Number(e.aim_rate)+"%":e.aim_rate="-",e.aimHb=0,e}),e.loading=!1)})},sortRate:function(e,a){return("-"!=e.aim_rate?Number(e.aim_rate.substring(0,e.aim_rate.length-1)):-1e4)-("-"!=a.aim_rate?Number(a.aim_rate.substring(0,a.aim_rate.length-1)):-1e4)},sortRate1:function(e,a){return("-"!=e.aimHb?Number(e.aimHb.substring(0,e.aimHb.length-1)):-1e4)-("-"!=a.aimHb?Number(a.aimHb.substring(0,a.aimHb.length-1)):-1e4)},getSummaries:function(e){var a=e.columns,t=e.data,r=[];return console.log(a),console.log(t),a.forEach(function(e,a){if(0!==a){var n=t.map(function(a){return Number(a[e.property])});n.every(function(e){return isNaN(e)})?r[a]="N/A":(r[a]=n.reduce(function(e,a){var t=Number(a);return isNaN(t)?e:e+a},0),r[a]=r[a].toFixed(2)+"")}else r[a]="总计"}),0==Number(r[2])?r[3]="-":r[3]=(Number(r[2])/Number(r[1])*100).toFixed(2)+"%",0==Number(r[4])?r[5]="-":r[5]=(Number(r[1])/Number(r[4])*100).toFixed(2)+"%",r},handleHb:function(e){return 0==e.row.last_year_premium?e.row.aimHb="-":e.row.aimHb=(e.row.total/e.row.last_year_premium*100).toFixed(2)+"%",e.row.aimHb}}},m=(t("QTww"),Object(l.a)(u,function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.allTableData,border:"","element-loading-text":"数据加载中","summary-method":e.getSummaries,"show-summary":""}},[t("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"机构",prop:"org_name"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"当年保费",prop:"total"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"目标保费",prop:"org_aim"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"达成率","sort-method":e.sortRate},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",{staticStyle:{color:"#409EFF"}},[e._v(e._s(a.row.aim_rate))])]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"去年保费",prop:"last_year_premium"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",sortable:"",label:"环比","sort-method":e.sortRate1},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",{staticStyle:{color:"#67C23A"}},[e._v(e._s(e.handleHb(a)))])]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"1月",prop:"premium_1"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"2月",prop:"premium_2"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"3月",prop:"premium_3"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"4月",prop:"premium_4"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"5月",prop:"premium_5"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"6月",prop:"premium_6"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"7月",prop:"premium_7"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"8月",prop:"premium_8"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"9月",prop:"premium_9"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"10月",prop:"premium_10"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"11月",prop:"premium_11"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"12月",prop:"premium_12"}})],1)],1)},[],!1,null,"a4378ef4",null));m.options.__file="template.vue";var d={data:function(){return{queryForm:{date:""},type:"",update:!1,flag1:!0,flag2:!1,flag3:!1,year:""}},components:{tabTemplate:m.exports},created:function(){var e=new Date;this.year=e.getFullYear(),this.queryForm.date=_g.getNowFormatDate()},methods:{handleTime:function(e){console.log(e)},handleQuery:function(){this.year=this.queryForm.date.split("-")[0],this.update=!this.update},handleTabClick:function(e){0==e.index&&(this.flag1=!0,this.type=""),1==e.index&&(this.flag2=!0,this.type="1"),2==e.index&&(this.flag3=!0,this.type="2")}}},b=(t("MjaZ"),Object(l.a)(d,function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticStyle:{"padding-bottom":"30px"}},[t("el-row",{attrs:{type:"flex",align:"middle",justify:"space-between"}},[t("div",{staticClass:"filter-container"},[t("el-date-picker",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{size:"small",type:"year","value-format":"yyyy",placeholder:"选择年"},on:{change:e.handleTime},model:{value:e.queryForm.date,callback:function(a){e.$set(e.queryForm,"date",a)},expression:"queryForm.date"}}),e._v(" "),t("el-button",{staticClass:"filter-item",attrs:{type:"primary",size:"small"},on:{click:e.handleQuery}},[e._v("查询")]),e._v(" "),t("a",{staticClass:"filter-item",attrs:{href:e.urlAds+"insurance/export/org_year_caixian_export?date="+e.queryForm.date+"&type="+e.type}},[t("el-button",{attrs:{type:"primary",size:"small"}},[e._v("导出")])],1)],1),e._v(" "),t("div",{staticClass:"filter-container"})]),e._v(" "),t("el-row",{staticClass:"header-title"},[e._v(e._s(e.year)+"年各机构财险年度业绩报表")]),e._v(" "),t("div",{staticClass:"financial-assessment",staticStyle:{border:"#e4e7ed 1px solid"}},[t("el-tabs",{on:{"tab-click":e.handleTabClick}},[t("el-tab-pane",{attrs:{label:"财险总计"}},[e.flag1?t("tab-template",{attrs:{url:"insurance/report/org_year_caixian_report",update:e.update,date:e.queryForm.date,type:""}}):e._e()],1),e._v(" "),t("el-tab-pane",{attrs:{label:"车险"}},[e.flag2?t("tab-template",{attrs:{url:"insurance/report/org_year_caixian_report",update:e.update,date:e.queryForm.date,type:"1"}}):e._e()],1),e._v(" "),t("el-tab-pane",{attrs:{label:"非车"}},[e.flag3?t("tab-template",{attrs:{url:"insurance/report/org_year_caixian_report",update:e.update,date:e.queryForm.date,type:"2"}}):e._e()],1)],1)],1)],1)},[],!1,null,"3d876422",null));b.options.__file="index.vue";var _=b.exports,p={props:["url","date","update"],filters:{filterUnit:function(e){return"-"==e?e:e+"%"}},data:function(){return{allTableData:[],queryForm:{params:{date:""}},loading:!1}},watch:{update:function(){this.init()}},created:function(){this.init()},methods:{init:function(){var e=this;this.loading=!0,this.queryForm.params.date=this.date,console.log(this.date),r.a.get(this.url,this.queryForm).then(function(a){console.log(a),"error"!==a&&(e.allTableData=a.data.map(function(e){return 0==e.caixian_last_year_month_premium?e.caixian_tb="-":e.caixian_tb=(e.total/e.caixian_last_year_month_premium*100).toFixed(2)+"%",e.caixian_hb=0,e.car_bl=0,e.noncar_bl=0,e}),e.loading=!1)})},sortRate:function(e,a){return("-"!=e.caixian_tb?Number(e.caixian_tb.substring(0,e.caixian_tb.length-1)):-1e4)-("-"!=a.caixian_tb?Number(a.caixian_tb.substring(0,a.caixian_tb.length-1)):-1e4)},sortRate1:function(e,a){return("-"!=e.caixian_hb?Number(e.caixian_hb.substring(0,e.caixian_hb.length-1)):-1e4)-("-"!=a.caixian_hb?Number(a.caixian_hb.substring(0,a.caixian_hb.length-1)):-1e4)},sortRate2:function(e,a){return("-"!=e.car_bl?Number(e.car_bl.substring(0,e.car_bl.length-1)):-1e4)-("-"!=a.car_bl?Number(a.car_bl.substring(0,a.car_bl.length-1)):-1e4)},sortRate3:function(e,a){return("-"!=e.noncar_bl?Number(e.noncar_bl.substring(0,e.noncar_bl.length-1)):-1e4)-("-"!=a.noncar_bl?Number(a.noncar_bl.substring(0,a.noncar_bl.length-1)):-1e4)},getSummaries:function(e){var a=e.columns,t=e.data,r=[];return console.log(a),console.log(t),a.forEach(function(e,a){if(0!==a){var n=t.map(function(a){return Number(a[e.property])});n.every(function(e){return isNaN(e)})?r[a]="N/A":(r[a]=n.reduce(function(e,a){var t=Number(a);return isNaN(t)?e:e+a},0),console.log(r[a]),r[a]=r[a].toFixed(2)+"")}else r[a]="总计"}),0==Number(r[2])?(console.log("sss"),r[3]="-"):r[3]=(Number(r[1])/Number(r[2])*100).toFixed(2)+"%",0==Number(r[4])?r[5]="-":r[5]=(Number(r[1])/Number(r[4])*100).toFixed(2)+"%",r[7]=(Number(r[6])/(Number(r[6])+Number(r[8]))*100).toFixed(2)+"%",r[9]=(Number(r[8])/(Number(r[6])+Number(r[8]))*100).toFixed(2)+"%",r},handleCaixianTb:function(e){return 0==e.row.caixian_last_year_month_premium?e.row.caixian_tb="-":e.row.caixian_tb=(e.row.total/e.row.caixian_last_year_month_premium*100).toFixed(2)+"%",e.row.caixian_tb},handleCaixianHb:function(e){return 0==e.row.caixian_last_month_premium?e.row.caixian_hb="-":e.row.caixian_hb=(e.row.total/e.row.caixian_last_month_premium*100).toFixed(2)+"%",e.row.caixian_hb},handleCarBl:function(e){var a=e.row.car_month_premium+e.row.noncar_month_premium;return e.row.car_bl=(e.row.car_month_premium/a*100).toFixed(2),e.row.car_bl+"%"},handlenonCarBl:function(e){var a=e.row.car_month_premium+e.row.noncar_month_premium;return e.row.noncar_bl=(e.row.noncar_month_premium/a*100).toFixed(2),e.row.noncar_bl+"%"}}},h=(t("E6XP"),Object(l.a)(p,function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.allTableData,border:"","show-summary":"","element-loading-text":"数据加载中","summary-method":e.getSummaries}},[t("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"机构",prop:"org_name"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"当月保费",prop:"total"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"去年同期保费",prop:"caixian_last_year_month_premium"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"同比","sort-method":e.sortRate},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",{staticStyle:{color:"#67C23A"}},[e._v(e._s(a.row.caixian_tb))])]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"上月保费",prop:"caixian_last_month_premium"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",sortable:"",label:"环比","sort-method":e.sortRate1},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",{staticStyle:{color:"#409EFF"}},[e._v(e._s(e.handleCaixianHb(a)))])]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"车险保费",prop:"car_month_premium"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"比例","sort-method":e.sortRate2},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",{staticStyle:{color:"#409EFF"}},[e._v(e._s(e.handleCarBl(a)))])]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"非车保费",prop:"noncar_month_premium"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","class-name":"no-border","header-align":"center",sortable:"",label:"比例","sort-method":e.sortRate3},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",{staticStyle:{color:"#409EFF"}},[e._v(e._s(e.handlenonCarBl(a)))])]}}])})],1)],1)},[],!1,null,"73b74e9d",null));h.options.__file="template.vue";var g=h.exports,f={props:["url","date","update"],data:function(){return{allTableData:[],queryForm:{params:{date:""}},loading:!1}},watch:{update:function(){this.init()}},created:function(){this.init()},methods:{init:function(){var e=this;this.loading=!0,this.queryForm.params.date=this.date,console.log(this.date),r.a.get(this.url,this.queryForm).then(function(a){console.log(a),"error"!==a&&(e.allTableData=a.data.map(function(e){return e.caixian_tb=0,e.caixian_hb=0,e.car_bl=0,e.noncar_bl=0,e}),e.loading=!1)})},getSummaries:function(e){var a=e.columns,t=e.data,r=[];return console.log(a),console.log(t),a.forEach(function(e,a){if(0!==a){var n=t.map(function(a){return Number(a[e.property])});n.every(function(e){return isNaN(e)})?r[a]="N/A":(r[a]=n.reduce(function(e,a){var t=Number(a);return isNaN(t)?e:e+a},0),r[a]=r[a].toFixed(2)+"")}else r[a]="总计"}),0==Number(r[2])?r[3]="-":r[3]=(Number(r[1])/Number(r[2])*100).toFixed(2)+"%",0==Number(r[4])?r[5]="-":r[5]=(Number(r[1])/Number(r[4])*100).toFixed(2)+"%",0==Number(r[7])?r[8]="-":r[8]=(Number(r[6])/Number(r[7])*100).toFixed(2)+"%",0==Number(r[9])?r[10]="-":r[10]=(Number(r[6])/Number(r[9])*100).toFixed(2)+"%",r},handleCaixianTb:function(e){return 0==e.row.car_last_year_month_premium?"-":(e.row.car_month_premium/e.row.car_last_year_month_premium*100).toFixed(2)+"%"},handleCaixianHb:function(e){return 0==e.row.car_last_month_premium?"-":(e.row.car_month_premium/e.row.car_last_month_premium*100).toFixed(2)+"%"},handlenonCaixianTb:function(e){return 0==e.row.noncar_last_year_month_premium?"-":(e.row.noncar_month_premium/e.row.noncar_last_year_month_premium*100).toFixed(2)+"%"},handlenonCaixianHb:function(e){return 0==e.row.noncar_last_month_premium?"-":(e.row.car_month_premium/e.row.noncar_last_month_premium*100).toFixed(2)+"%"}}},y=Object(l.a)(f,function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.allTableData,border:"","show-summary":"","summary-method":e.getSummaries,"element-loading-text":"数据加载中"}},[t("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center"}},[t("el-table-column",{attrs:{align:"center","class-name":"bold-border","header-align":"center",label:"机构",prop:"org_name"}})],1),e._v(" "),t("el-table-column",{attrs:{align:"center","header-align":"center",label:"车险"}},[t("el-table-column",{attrs:{label:"当月保费",align:"center","header-align":"center",sortable:"",prop:"car_month_premium"}}),e._v(" "),t("el-table-column",{attrs:{label:"去年同期保费",align:"center","header-align":"center",sortable:"",prop:"car_last_year_month_premium"}}),e._v(" "),t("el-table-column",{attrs:{label:"同比",align:"center","header-align":"center",sortable:""},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",{staticStyle:{color:"#67C23A"}},[e._v(e._s(e.handleCaixianTb(a)))])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"上月保费",align:"center","header-align":"center",sortable:"",prop:"car_last_month_premium"}}),e._v(" "),t("el-table-column",{attrs:{label:"环比","class-name":"bold-border",align:"center",sortable:"","header-align":"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",{staticStyle:{color:"#409EFF"}},[e._v(e._s(e.handleCaixianHb(a)))])]}}])})],1),e._v(" "),t("el-table-column",{attrs:{align:"center","header-align":"center",label:"非车"}},[t("el-table-column",{attrs:{label:"当月保费",align:"center","header-align":"center",sortable:"",prop:"noncar_month_premium"}}),e._v(" "),t("el-table-column",{attrs:{label:"去年同期保费",align:"center","header-align":"center",sortable:"",prop:"noncar_last_year_month_premium"}}),e._v(" "),t("el-table-column",{attrs:{label:"同比",align:"center","header-align":"center",sortable:""},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",{staticStyle:{color:"#67C23A"}},[e._v(e._s(e.handlenonCaixianTb(a)))])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"上月保费",align:"center","header-align":"center",sortable:"",prop:"noncar_last_month_premium"}}),e._v(" "),t("el-table-column",{attrs:{label:"环比",align:"center","header-align":"center",sortable:""},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",{staticStyle:{color:"#409EFF"}},[e._v(e._s(e.handlenonCaixianHb(a)))])]}}])})],1)],1)],1)},[],!1,null,null,null);y.options.__file="carTemplate.vue";var v={data:function(){return{queryForm:{date:""},month:1,flag1:!0,flag2:!1,update:!1}},components:{tabTemplate:g,carTemplate:y.exports},created:function(){var e=new Date;this.month=e.getMonth()+1,this.queryForm.date=_g.getNowFormatDate().substring(0,7),console.log(this.queryForm.date)},methods:{handleTime:function(e){},handleQuery:function(){var e=this.queryForm.date.split("-");this.month=e[1],this.update=!this.update},handleTabClick:function(e){0==e.index&&(this.flag1=!0),1==e.index&&(this.flag2=!0)}}},x=(t("dhW9"),Object(l.a)(v,function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticStyle:{"padding-bottom":"30px"}},[t("el-row",{attrs:{type:"flex",align:"middle",justify:"space-between"}},[t("div",{staticClass:"filter-container"},[t("el-date-picker",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{size:"small","value-format":"yyyy-MM",type:"month",placeholder:"选择月"},on:{change:e.handleTime},model:{value:e.queryForm.date,callback:function(a){e.$set(e.queryForm,"date",a)},expression:"queryForm.date"}}),e._v(" "),t("el-button",{staticClass:"filter-item",attrs:{type:"primary",size:"small"},on:{click:e.handleQuery}},[e._v("查询")]),e._v(" "),t("a",{staticClass:"filter-item",attrs:{href:e.urlAds+"insurance/export/org_month_caixian_export?date="+e.queryForm.date}},[t("el-button",{attrs:{type:"primary",size:"small"}},[e._v("导出")])],1)],1),e._v(" "),t("div",{staticClass:"filter-container"})]),e._v(" "),t("el-row",{staticClass:"header-title"},[e._v(e._s(e.month)+"月各机构财险业绩报表")]),e._v(" "),t("div",{staticClass:"financial-assessment",staticStyle:{border:"#e4e7ed 1px solid"}},[t("el-tabs",{on:{"tab-click":e.handleTabClick}},[t("el-tab-pane",{attrs:{label:"财险总计"}},[e.flag1?t("tab-template",{attrs:{url:"insurance/report/org_month_caixian_report",update:e.update,date:e.queryForm.date}}):e._e()],1),e._v(" "),t("el-tab-pane",{attrs:{label:"车险非车"}},[e.flag2?t("car-template",{attrs:{url:"insurance/report/org_month_caixian_report",update:e.update,date:e.queryForm.date}}):e._e()],1)],1)],1)],1)},[],!1,null,"a0f142e2",null));x.options.__file="index.vue";var w={name:"orgSummaryList",components:{tabDay:c,tabYear:_,tabMonth:x.exports},data:function(){return{flag1:!0,flag2:!1,flag3:!1}},methods:{handleTabClick:function(e){0==e.index&&(this.flag1=!0),1==e.index&&(this.flag2=!0),2==e.index&&(this.flag3=!0)}}},N=Object(l.a)(w,function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{ref:"mainContainer",staticClass:"app_main_container assessment-tabs"},[t("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":e.handleTabClick}},[t("el-tab-pane",{attrs:{label:"日报表"}},[e.flag1?t("tab-day"):e._e()],1),e._v(" "),t("el-tab-pane",{attrs:{label:"月报表"}},[e.flag2?t("tab-month"):e._e()],1),e._v(" "),t("el-tab-pane",{attrs:{label:"年报表"}},[e.flag3?t("tab-year"):e._e()],1)],1)],1)},[],!1,null,null,null);N.options.__file="index.vue";a.default=N.exports},"4pBn":function(e,a,t){},E6XP:function(e,a,t){"use strict";var r=t("4pBn");t.n(r).a},MjaZ:function(e,a,t){"use strict";var r=t("zm9r");t.n(r).a},Ot23:function(e,a,t){"use strict";var r=t("pw78");t.n(r).a},QTww:function(e,a,t){"use strict";var r=t("pVoO");t.n(r).a},dhW9:function(e,a,t){"use strict";var r=t("ogGe");t.n(r).a},ogGe:function(e,a,t){},pVoO:function(e,a,t){},pw78:function(e,a,t){},zm9r:function(e,a,t){}}]);