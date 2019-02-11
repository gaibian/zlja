<template>
    <div>
        <div id="editorElem" style="width:100%"></div>
        <el-button @click="getContent">查看内容</el-button>
    </div>
</template>
<script>
// $(document).ready(function(e) {
//             $("#content").children().each(function(index, element) {
//                 var tagName = $(this).get(0).tagName;
//                 if (tagName.substr(0, 1).toUpperCase() == "H") {
//                     var contentH = $(this).html(); //获取内容
//                     var markid = "mark-" + tagName + "-" + index.toString();
//                     $(this).attr("id", markid); //为当前h标签设置id
//                     $(".menu").append("<a href='#" + markid + "'>" + contentH + "</a>"); //在目标DIV中添加内容   
//                 }
//             });
//         });
import E from 'wangeditor'
export default {
    name:'test',
    data() {
        return {
            editorContent:'',
        }
    },
    methods:{
        getContent() {
            alert(this.editorContent)
        }
    },
    mounted() {
        const editor = new E("#editorElem")
        editor.customConfig.menus = ['head','bold','italic','underline','image','foreColor'];
        //editor.customConfig.colors = [];
        editor.customConfig.showLinkImg = true
        editor.customConfig.uploadImgShowBase64 = true
        editor.customConfig.onchange = (html) => {
            this.editorContent = html
        }
        editor.create();
    },
}
</script>
<style lang="scss" scoped>

</style>

