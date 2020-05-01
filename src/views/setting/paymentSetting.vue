<template>
    <div>
        <!--表单-->
        <template>
            <el-table
                border
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}" 
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    align="center"
                    sortable
                    prop="p1"
                    label="支付方式名称">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="支付方式描述"
                    prop="p2"
                    >
                </el-table-column>
                <el-table-column
                    prop="p3"
                    align="center"
                    label="是否启用">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.p10"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="排序"
                    prop="p4"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    width="120px"
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <span class="look-word" type="primary" plain size="mini" @click="edit">编辑</span>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
    //运费模板
    export default {
        name: "paymentSetting",
        data() {
            return {
                current: 1,
                pageSize: 10,
                count: 9,
                tableData3: [
                    {
                        p1:'微信支付',
                        p2: '微信支付，是基于客户端提供的服务功能。同时向商户提供销售经营分析、账户和资金管理的功能支持。用户通过扫描二维码、微信内打开商品页面购买等多种方式调起微信支付模块完成支付。',
                        p3: '',
                        p4:"1",
                    },
                    {
                        p1:'微信支付',
                        p2: '微信支付，是基于客户端提供的服务功能。同时向商户提供销售经营分析、账户和资金管理的功能支持。用户通过扫描二维码、微信内打开商品页面购买等多种方式调起微信支付模块完成支付。',
                        p3: '',
                        p4:"1",
                    },
                    {
                        p1:'微信支付',
                        p2: '微信支付，是基于客户端提供的服务功能。同时向商户提供销售经营分析、账户和资金管理的功能支持。用户通过扫描二维码、微信内打开商品页面购买等多种方式调起微信支付模块完成支付。',
                        p3: '',
                        p4:"1",
                    },
                ],
                multipleSelection: [],
                value2:'',
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handlePageChange(val) {
                this.current = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            edit(){
                this.$router.push({
                    name: 'editPayWay',
                });
            }
        }
    }
</script>

<style scoped>
    .block{margin-top: 10px}
</style>
