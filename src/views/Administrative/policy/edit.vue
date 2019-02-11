<template>
    <div style="margin-top:30px">
        <div class="app_main_content">
            <el-tabs type="border-card" v-if="pangFlag">
                <el-tab-pane label="保单基本信息">
                    <base-policy></base-policy>
                </el-tab-pane>
                <el-tab-pane label="投保险种信息">
                    <risk-policy></risk-policy>
                </el-tab-pane>
                <el-tab-pane label="保单记录属性">
                    <record-policy></record-policy>
                </el-tab-pane>
                <el-tab-pane label="保单交费记录">
                    <pay-policy></pay-policy>
                </el-tab-pane>
            </el-tabs>
            
        </div>
    </div>
</template>
<script>
import basePolicy from './component/base'
import riskPolicy from './component/risk/index'
import payPolicy from './component/pay/index'
import recordPolicy from './component/record/index'
import { policyRead } from '@/api/policy'
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
            compangId:'',
            pangFlag:false,
        }
    },
    created() {
        this.init()
    },
    methods:{
        init() {
            this.pangFlag = true;
        }
    },
    
}
</script>
<style lang="scss" scoped>

</style>

