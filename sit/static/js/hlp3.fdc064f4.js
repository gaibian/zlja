(window.webpackJsonp=window.webpackJsonp||[]).push([["hlp3"],{hlp3:function(i,t,e){"use strict";e.r(t);var n={name:"addFileAdmin",data:function(){return{fileAdminFlag:!0,height:null,index:0,fileData:{number:"",id:""}}},created:function(){this.init()},activated:function(){this.$route.query.pageClick&&this.init()},methods:{init:function(){this.index++,this.fileData.number=this.$route.params.number}},mounted:function(){var i=this,t=this.$refs.appMainContainer,e=this.$refs.blockBox;e?(this.height=t.offsetHeight-e.offsetHeight-40-12,window.addEventListener("resize",function(){i.height=t.offsetHeight-e.offsetHeight-40-12},!1)):(this.height=t.offsetHeight-0-40-12,window.addEventListener("resize",function(){i.height=t.offsetHeight-0-40-12},!1))}},s=e("KHd+"),a=Object(s.a)(n,function(){var i=this.$createElement,t=this._self._c||i;return t("div",{ref:"appMainContainer",staticClass:"app_main_container"},[this.fileAdminFlag?t("file-admin",{key:this.index,attrs:{fileData:this.fileData,height:this.height}}):this._e()],1)},[],!1,null,null,null);a.options.__file="list.vue";t.default=a.exports}}]);