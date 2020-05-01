<template>
    <div class="taskReward-content">
        <p class="title">提现审核</p>
        <div class="card">
            <div>
                <div class="table-content">
                    <div class="table-row">
                        <div class="table-left">提现单号</div>
                        <div class="table-right">
                            <span class="s1">{{ detailData.withdraw_sn | validVal }}</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">提现金额(元)</div>
                        <div class="table-right">
                            <span class="s1">{{ detailData.money | validVal }}</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">手续费比例(%)</div>
                        <div class="table-right">
                            <span class="s1">{{ detailData.fee_scale | validVal }}</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">实际提现(元)</div>
                        <div class="table-right">
                            <span class="s1">{{ detailData.real_money | validVal }}</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">提现支付类型</div>
                        <div class="table-right">
                            <span class="s1">{{ payTypeFormat(detailData.pay_type) }}</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">账号</div>
                        <div class="table-right">
                            <span class="s1">{{ detailData.open_name | validVal }}</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">开户行</div>
                        <div class="table-right">
                            <span class="s1">{{ detailData.bank_card | validVal  }}</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">银行卡ID</div>
                        <div class="table-right">
                            <span class="s1">{{ detailData.bank_id | validVal  }}</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">真实姓名</div>
                        <div class="table-right">
                            <span class="s1">{{ detailData.real_name | validVal  }}</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">银行预留电话</div>
                        <div class="table-right">
                            <span class="s1">{{ detailData.cellphone | validVal  }}</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">创建时间</div>
                        <div class="table-right">
                            <span class="s1">{{ detailData.created_at | validVal  }}</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">提现状态</div>
                        <div class="table-right">
                            <span class="s1">{{ statusFormat(detailData.status) }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <el-form
                    v-if="detailData.status != 2 && detailData.status != 3"
                    style="margin-top: 20px;margin-left: 12px"
                    label-width="210px"
                    label-position="left">
                <el-form-item label="是否同意" prop="status">
                    <el-radio v-model="status" :label="2" style="color: red;">拒绝</el-radio>
                    <el-radio v-model="status" :label="3" style="color: green;" :disabled="detailData.status == 7">同意
                    </el-radio>
                </el-form-item>
                <el-form-item label="转帐图片" prop="name" v-if="status == 3">
                    <FileUpload :isOnly="true" @successUploadCBK="getsuccessUpload" width="100px"
                                height="100px"></FileUpload>
                </el-form-item>
                <el-form-item label="审核备注" prop="remark">
                    <el-input type="textarea" :rows="4" v-model="remark" style="width: 356px" placeholder="备注"/>
                </el-form-item>
            </el-form>
            <div style="margin-left: 224px;margin-top: 20px;">
                <div v-if="status == 2">
                    <el-button type="danger" @click="handleSubmit" :loading="isSend"
                               v-if="detailData.status == 0 || detailData.status == 1 || detailData.status == 7">拒绝
                    </el-button>
                </div>
                <div v-if="status == 3">
                    <!-- tips：同意转账分银行卡及其他；银行卡需根据银行进度区分转账与同意；其他则可以直接同意 -->
                    <el-button type="success" @click="handleSubmit" :loading="isSend"
                               v-if="(detailData.pay_type == 1 && (detailData.status >= 4)) || detailData.pay_type != 1">
                        同意
                    </el-button>
                    <el-button type="primary" @click="handleTransfer" :loading="isSend"
                               v-if="detailData.pay_type == 1 && (detailData.status == 0 || detailData.status == 1)">转账
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reconciliationsDetail",
        props: ['detailData'],
        data() {
            return {
                status: 2,
                remark: '',
                imgs: '',
                isSend: false
            }
        },
        mounted() {
            this.remark = this.detailData.remark;
        },
        methods: {
            payTypeFormat(payType) {
                switch (payType) {
                    case '0': return '全部';
                    case '1': return '银行卡';
                    case '2': return '支付宝';
                    case '3': return '微信小程序';
                    case '4': return '微信APP';
                    case '5': return '微信公众号';
                    case '6': return '消费余额';
                    case '7': return '旺旺薪银行';
                    case '8': return '旺旺薪微信';
                    case '9': return '旺旺薪支付宝';
                }
            },
            statusFormat(status) {
                switch (status) {
                    case '0':
                        return '未审核';
                    case '1':
                        return '审核中';
                    case '2':
                        return '拒绝申请';
                    case '3':
                        return '提现成功';
                    case '4':
                        return '转银行处理';
                    case '5':
                        return '银行处理中';
                    case '6':
                        return '银行退回';
                    case '7':
                        return '微信拒绝';
                    case '9':
                        return '旺旺薪处理中';
                    case '10':
                        return '旺旺薪退回';
                }
            },
            getsuccessUpload(val) {
                this.imgs = val[0];
            },
            async handleSubmit() {
                if (this.isSend === true) return
                this.isSend = true
                const params = {
                    id: this.detailData.id,
                    status: this.status,
                    remark: this.remark,
                    imgs: this.imgs
                }
                try {
                    await this.$api.finance.withdrawVerify(params);
                    this.$emit('success');
                    this.remark = '';
                    this.isSend = false
                } catch (e) {
                    this.isSend = false
                }
            },
            async handleTransfer() {
                if (this.isSend === true) return
                this.isSend = true
                try {
                    await this.$api.finance.withdrawTransfer({id: this.detailData.id});
                    this.$emit('success');
                    this.remark = '';
                    this.isSend = false
                } catch (e) {
                    this.isSend = false
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../styles/variables";

    .taskReward-content .title {
        font-size: 16px;
        font-weight: bold;
        padding-bottom: 10px;
    }

    .taskReward-content .card {
        margin: 20px
    }

    /*表格*/
    .table-content {
        display: flex;
        flex-direction: column;
        border: 1px solid #E4E4E4;
        border-bottom: 0;
        margin-top: 15px
    }

    .table-content .table-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid #E4E4E4;
        height: 40px
    }

    .table-content .table-left {
        padding: 0 10px;
        width: 200px;
        text-align: left;
        background: #f2f6fc;
        height: 100%;
        display: flex;
        align-items: center;
        color: #606266;
    }

    .table-content .table-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px 20px 10px 0;
        border-left: 1px solid #E4E4E4;
        height: 50px
    }

    .table-content .table-right .s1 {
        width: 150px;
        display: inline-block;
        margin: 0 10px;
        text-align: left;
    }

    .card .icon {
        color: #666;
        font-size: 18px
    }
</style>
