<template>
    <div style="margin-top:30px">
        <div class="app_main_content">
            <el-tabs type="border-card">
                <el-tab-pane label="保单基本信息">
                    <base-policy></base-policy>
                </el-tab-pane>
            </el-tabs>
            
        </div>
    </div>
</template>
<script>
import basePolicy from './base'
import riskPolicy from '../component/risk/index'
import payPolicy from '../component/pay/index'
import recordPolicy from '../component/record/index'
export default {
    name:'policyEdit',
    components:{
        basePolicy,
        riskPolicy,
        payPolicy,
        recordPolicy
    },
    data() {
        return {
            
            
        }
    },
    activated() {
        let boo = this.$route.query.pageClick;
        if(boo){
            console.log('jinqule')
            //this.init();
        }
    },
    created() {

    },
    methods:{
        
        
        
    },
    
}
</script>
<style lang="scss" scoped>

</style>

