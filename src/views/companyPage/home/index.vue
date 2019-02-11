<template>
    <div class="page">
        <el-table :data="tableData" border>
            <el-table-column label="老罗"></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:"companyHome",
    data() {
        return {
            tableData:[],
        }
    },
    created() {
        console.log('2222')
    }
}
</script>
<style lang="scss" scoped>
.page{
    padding:30px;
    box-sizing:border-box;
}
</style>



