<template>
    <div class="user-setting">
        <div class="member">
            <div class="title">
                <div>
                    <svg-icon icon-name="icon_favorite" class="icon" />
                    粉丝设置
                </div>
                <p class="tips">设置粉丝等级，设置粉丝分享赚自购省金额或优惠比例</p>
            </div>
            <el-table
                border
                :data="tableData1"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                    width="140"
                    align="center"
                    prop="name"
                    label="等级名称">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="默认等级"
                    prop="description">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="粉丝状态"
                    prop="description">
                    <template slot-scope="scope">
                        <el-switch :active-value="10" :inactive-value="0"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="购买金额"
                    prop="description">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="购物金额"
                    prop="description">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="下单数"
                    prop="description">
                </el-table-column>
                <el-table-column
                    width="300"
                    align="center"
                    label="分享赚自购省"
                    prop="description">
                    <template slot-scope="scope">
                        <el-radio v-model="radio" label="1">折扣9.5</el-radio>
                        <el-radio v-model="radio" label="2">每单省¥1.2</el-radio>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="备注"
                    prop="description">
                </el-table-column>
                <el-table-column
                    width="120"
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" plain @click.stop="rghtPopupVisible=true">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="member">
            <div class="title">
                <div>
                    <svg-icon icon-name="icon_favorite" class="icon" />
                    白银设置
                </div>
                <p class="tips">设置粉丝等级晋升机制及返利体系</p>
            </div>
            <el-table
                border
                :data="tableData1"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                    width="140"
                    align="center"
                    prop="name"
                    label="等级名称">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="白银状态"
                    prop="description">
                    <template slot-scope="scope">
                        <el-switch :active-value="10" :inactive-value="0"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="直属人数"
                    prop="description">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="下单数"
                    prop="description">
                </el-table-column>
                <el-table-column
                    width="300"
                    align="center"
                    label="返利体系"
                    prop="description">
                    <template slot-scope="scope">
                        <p style="margin-bottom: 4px;">
                            <el-radio v-model="radio" label="1">上级返5%</el-radio>
                            <el-radio v-model="radio" label="2">上级¥2.00</el-radio>
                        </p>
                        <p>
                            <el-radio v-model="radio" label="1">上上级5%</el-radio>
                            <el-radio v-model="radio" label="2">上上级¥1.00</el-radio>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="备注"
                    prop="description">
                </el-table-column>
                <el-table-column
                    width="120"
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" plain @click.stop="rghtPopupVisible=true">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="member">
            <div class="title">
                <div>
                    <svg-icon icon-name="icon_favorite" class="icon" />
                    网红达人
                </div>
                <p class="tips">设置流量主等级晋升机制及佣金体系</p>
            </div>
            <el-table
                border
                :data="tableData1"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                    width="140"
                    align="center"
                    prop="name"
                    label="达人名称">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="白银状态"
                    prop="description">
                    <template slot-scope="scope">
                        <el-switch :active-value="10" :inactive-value="0"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="粉丝数"
                    prop="description">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="销售额"
                    prop="description">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="下单数"
                    prop="description">
                </el-table-column>
                <el-table-column
                    width="300"
                    align="center"
                    label="佣金体系"
                    prop="description">
                    <template slot-scope="scope">
                        销售额5%～10%/5000元
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="备注"
                    prop="description">
                </el-table-column>
                <el-table-column
                    width="120"
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" plain @click.stop="rghtPopupVisible=true">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="member">
            <div class="title">
                <div>
                    <svg-icon icon-name="icon_favorite" class="icon" />
                    合伙人
                </div>
                <p class="tips">设置合伙人晋升机制及平台分成体系</p>
            </div>
            <el-table
                border
                :data="tableData1"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                    width="140"
                    align="center"
                    prop="name"
                    label="合伙人名称">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="合伙状态人"
                    prop="description">
                    <template slot-scope="scope">
                        <el-switch :active-value="10" :inactive-value="0"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="团队数"
                    prop="description">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="销售额"
                    prop="description">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="下单数"
                    prop="description">
                </el-table-column>
                <el-table-column
                    width="300"
                    align="center"
                    label="分享赚自购省"
                    prop="description">
                    <template slot-scope="scope">
                        提该团队的5-10%
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="备注"
                    prop="description">
                </el-table-column>
                <el-table-column
                    width="120"
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" plain @click.stop="rghtPopupVisible=true">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="submit">
            <el-button type="success" size="mini" style="width: 100px;">提交</el-button>
        </div>
        <RightSidePopup :visible.sync="rghtPopupVisible" width="40%">
            <AddMemberType ref="detail" @successCBK="successCallback"/>
        </RightSidePopup>
    </div>
</template>

<script>
    import AddMemberType from './components/AddMemberType';

    export default {
        name: 'UserSet',
        props: {},
        components: { AddMemberType },
        data() {
            return {
                rghtPopupVisible: false,
                tableData1: [
                    { name: '普通粉丝' }
                ],
                radio: '1',
            }
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {
            successCallback() {

            }
        }
    }
</script>

<style scoped lang="scss">
    .user-setting {
        background: #fff;
        padding: 10px;
        .title {
            display: flex;
            justify-content: start;
            align-items: center;
            margin-bottom: 20px;
            >div {
                font-size: 18px;
                margin-right: 20px;
            }
        }
        .member {
            &:not(:first-child) {
                margin-top: 40px;
            }
        }
        .submit {
            margin-top: 20px;
            text-align: center;
        }
    }
</style>
