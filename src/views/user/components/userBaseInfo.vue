<template>
    <div class="user-base-info">

        <div class="set-user">
            <el-dropdown @command="handleCommand">
                <img src="../../../assets/user/setting.png" alt="">
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-permission="[$api.user.userManage.edit]"
                        :command="{ name: 'updateUser' }"
                    >编辑资料
                    </el-dropdown-item>
                    <el-dropdown-item
                        :command="{ name: 'editType' }"
                    >修改类型
                    </el-dropdown-item>
                    <el-dropdown-item
                        :command="{ name: 'editSuperior' }"
                    >调整上级
                    </el-dropdown-item>

<!--                    <el-dropdown-item-->
<!--                        :command="{ name: 'mergeDataStatus' }"-->
<!--                    >-->
<!--                        合并数据-->
<!--                    </el-dropdown-item>-->

                    <el-dropdown-item
                        v-if="showMoneyBtn"
                        :command="{ name: 'sendMoney' }"
                    >调整余额
                    </el-dropdown-item>

                    <el-dropdown-item
                        :command="{ name: 'sendCoupon' }"
                    >发优惠卷
                    </el-dropdown-item>

<!--                    <el-dropdown-item-->
<!--                        :command="{ name: 'transferTeam' }"-->
<!--                        v-permission="[$api.user.userManage.modifyTeam]"-->
<!--                    >-->
<!--                        转移团队-->
<!--                    </el-dropdown-item>-->

                    <el-dropdown-item
                        :command="{ name: 'updataUserPwd' }"
                        v-permission="[$api.user.userManage.edit]"
                    >
                        修改密码
                    </el-dropdown-item>

                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <div class="avatar_name">
            <div class="avatar-box">

                <img v-if="userDetails.avatar !== 'https://img.ryg0212.com/img/img_default_user.png' && !!userDetails.avatar" width="60px"
                     :src="userDetails.avatar" alt="">

                <img v-else src="https://img.bingovip.shop/img/img_default_user.png" alt="">

                <div class="sex">
                    <img :src="sex"/>
                </div>
            </div>
            <div class="name">
                {{userDetails.username | validVal}}
            </div>
        </div>
        <!--        <div class="user-type">-->
        <!--            <svg-icon :icon-name="typeIcon" class-name="icon-class"/>-->
        <!--        </div>-->


        <div class="base-info">

            <div class="row">
                <div class="info-title">用户类型</div>
<!--                <div class="info-content">-->
<!--                    <svg-icon :icon-name="typeIcon" class-name="icon-class"/>-->
<!--                </div>-->
                <div class="info-content"> {{ userDetails.type_name }} </div>
            </div>

            <div class="row">
                <div class="info-title">用户ID</div>
                <div class="info-content">{{userDetails.id | validVal }}</div>
            </div>
            <div class="row">
                <div class="info-title">生日</div>
                <div class="info-content">{{userDetails.birthday }}</div>
            </div>
            <div class="row">
                <div class="info-title">注册时间</div>
                <div class="info-content">{{userDetails.created_at | validDateTime }}</div>
            </div>
            <div class="row">
                <div class="info-title">城市</div>
                <div class="info-content">{{ userDetails.residecity | validVal }}</div>
            </div>
            <div class="row">
                <div class="info-title">手机号</div>
                <div class="info-content">{{ userDetails.phone | validVal }}</div>
            </div>
            <div class="row">
                <div class="info-title">微信号</div>
                <div class="info-content">{{ userDetails.wechat | validVal }}</div>
            </div>
        </div>

<!--        <div class="label-box">-->
<!--            <div class="one box">圣所世界巡回演唱会</div>-->
<!--            <div class="two box">标签2</div>-->
<!--            <div class="three box">这个标签文字可以很长很长很长</div>-->

<!--            <div class="four box" v-popover:popover>-->
<!--                更多-->
<!--                <i class="el-icon-arrow-down"/>-->
<!--            </div>-->

<!--            <el-popover-->
<!--                ref="popover"-->
<!--                placement="right"-->
<!--                width="200"-->
<!--                trigger="hover"-->
<!--                content="标签1,标签2,标签3,标签4">-->
<!--            </el-popover>-->
<!--        </div>-->

        <div class="line"></div>

        <div class="cooperation-card">
            <div class="card-box" v-for="(item , index) in userDetails.superiors" :key="index">
                <div class="card-img">
                    <img :src="item.avatar" alt="" v-if="item.avatar !== 'https://img.ryg0212.com/img/img_default_user.png'"/>
                    <img src="https://img.bingovip.shop/img/img_default_user.png" alt="" v-else/>

                </div>
                <div class="card-context">
                    <p @click="jumTo(item.superior_id)" style="color: #2295ff;cursor: pointer">（{{item.superior_id}}）{{item.nickname}}</p>
                    <p>{{item.phone}}</p>
                </div>
                <div class="superior-type">
                    {{item.superior_type}}
                </div>
            </div>
        </div>

        <!-- 发优惠卷没有，合并数据 -->

        <!-- 修改资料 -->
        <update-user-infor :id="uid" :visable.sync="updateUserStatus" :init-data="initData"/>

        <!-- 修改上级 -->
        <update-superior :id="uid" :visable.sync="updateSuperior" :superiorId="firstSuperiorId" :init-data="initData"/>


        <!-- 加扣款 -->
        <send-money :uid="uid" :show-user-filter="false" :visable.sync="sendMoneyVisable"
                    :money_way_options="money_way_options"
        />

        <!-- 合并数据 -->
        <merge-data :user-name="columnSelectName" :visable.sync="mergeDataStatus" :id="uid"/>

        <send-coupon :visable.sync="sendCouponStatus" :id="uid"/>

        <!-- 修改类型 -->
        <choose-type-dialog :visable.sync="chooseTypeStatus" :id="uid" :init-data="initData"/>

        <!-- 转移团队 -->
        <transfer-team :visable.sync="transferTeamStatus" :id="uid" :init-data="initData"/>

        <!-- 修改密码 -->
        <updata-password :visable.sync="updateUserPwdStatus" :id="uid" :init-data="initData"/>
    </div>
</template>

<script>

    import {mapState} from "vuex";
    import {Loading} from 'element-ui';
    import UpdateUserInfor from "./updateUserInfor";
    import UpdateSuperior from "./updateSuperior";
    import SendMoney from "./sendMoney";
    import IntegrationOperation from "./integrationOperation";
    import SendMessageDialog from "./sendMessageDialog";
    import ChooseTypeDialog from "./chooseTypeDialog";
    import TransferTeam from "./transferTeam";
    import UpdataPassword from "./updataPassword";
    import MergeData from "./mergeData";
    import SendCoupon from "./SendCoupon";

    export default {
        // 用户基本信息
        name: "userBaseInfo",
        components: {
            SendCoupon,
            MergeData,
            UpdataPassword,
            TransferTeam,
            ChooseTypeDialog,
            SendMessageDialog,
            IntegrationOperation,
            SendMoney,
            UpdateSuperior,
            UpdateUserInfor
        },
        props: {
            initData: {
                type: Function,
                default: () => {
                }
            }
        },
        data() {
            return {
                userDetails: {
                    username: '',
                    phone: '',
                    avatar: '',
                    birthday: '',
                    created_at: '',
                    gender: null,
                    wechat: '',
                    superiors: [],
                    type_name: '',
                    residecity: ''
                },
                loadingInstance: '', // loading 实例
                typeIcon: '', // icon name

                uid: '',
                updateUserStatus: false, // 修改用户

                updateSuperior: false, // 修改上级
                firstSuperiorId: '', // 上级id

                showMoneyBtn: false, // money
                money_way_options: [], // money
                sendMoneyVisable: false, // money

                integrationStatus: false, // 积分调整

                sendMessageStatus: false, // 发送消息
                columnSelectName: '', // 发送消息

                sendCouponStatus: false, // 发优惠卷

                mergeDataStatus: false, // 合并数据

                columnSelect: [],

                chooseTypeStatus: false, // 选择类型

                transferTeamStatus: false, // 转移团队

                updateUserPwdStatus: false, // 修改密码
            }
        },
        mounted() {
            this.loadingInstance = Loading.service({
                target: '.user-base-info'
            })
        },

        created() {
            if (this.button_permissions.includes(this.$api.finance.balance_record.updatemoney)) {
                this.money_way_options.push({label: '余额', value: 1});
            }
            if (this.button_permissions.includes(this.$api.finance.balance_record.updatemoney2)) {
                this.money_way_options.push({label: '可提现', value: 2});
            }
            if (this.money_way_options.length > 0) {
                this.showMoneyBtn = true;
            }
        },

        methods: {

            handleCommand(command) {
                this.uid = this.userDetails.id;
                if (command.name === "updateUser") {
                    this.updateUserStatus = true;
                    return;
                }

                if (command.name === 'editSuperior') {
                    this.updateSuperior = true;
                    this.firstSuperiorId = this.userDetails.first_superior_id;
                    return;
                }

                if (command.name === 'sendCoupon') {
                    this.sendCouponStatus = true;
                    return;
                }

                if (command.name === 'mergeDataStatus') {
                    this.mergeDataStatus = true;
                    this.columnSelectName = this.userDetails.nickname;
                    return;
                }


                if (command.name === 'integration') {
                    this.integrationStatus = true;
                    return;
                }
                if (command.name === 'sendMessage') {
                    this.columnSelect = [this.userDetails.id];
                    this.columnSelectName = this.userDetails.nickname;
                    this.sendMessageStatus = true;
                    return;
                }

                if (command.name === 'editType') {
                    this.chooseTypeStatus = true;
                    return;
                }

                if (command.name === 'transferTeam') {
                    this.transferTeamStatus = true;
                    return;
                }

                if (command.name === 'updataUserPwd') {
                    this.updateUserPwdStatus = true;
                    return;
                }
                if (command.name === 'sendMoney') {
                    this.sendMoneyVisable = true;
                    return;
                }
            },

            setData(data) {
                this.userDetails = {...this.userDetails, ...data};
            //    this.switchImg(this.userDetails.type_name);
                this.loadingInstance.close();
            },

            // switchImg(typeName) {
            //     switch (typeName) {
            //         case '店主':
            //             this.typeIcon = 'tag-dianzhu';
            //             break;
            //         case '客官':
            //             this.typeIcon = 'tag-fensi';
            //             break;
            //         case '粉丝':
            //             this.typeIcon = 'tag-fensi';
            //             break;
            //         case '优秀店主':
            //             this.typeIcon = 'tag-yxdianzhu';
            //             break;
            //     }
            // }

            jumTo(id) {
                this.$router.push({name: "userDetail", params: {read: 'read', id}});
            }
        },

        computed: {
            sex() {
                if (this.userDetails && this.userDetails.gender) {
                    return require(`../../../assets/sex/${this.userDetails.gender}.png`);
                }
                return '';
            },
            ...mapState("user", ["button_permissions"]),
        }
    }
</script>

<style scoped lang="scss">
    .user-base-info {
        width: 320px;
        padding-right: 19px;
        position: relative;
        background: #fff;

        .set-user {
            position: absolute;
            top: 16px;
            right: 16px;
            cursor: pointer;

            img {
                width: 22px;
                height: 22px;
            }
        }

        .avatar {
            padding-top: 56px;
            text-align: center;
            display: flex;
            justify-content: center;
            margin-bottom: 21px;

            .avatar-box {
                position: relative;
                width: 100px;
                height: 100px;

                > img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    border: 1px solid #ededed;
                    box-sizing: border-box;
                }

                .sex {
                    position: absolute;
                    bottom: -5px;
                }
            }
        }

        .avatar_name {
            display: flex;
            padding: 56px 24px 0 24px;
            box-sizing: content-box;
            height: 64px;

            .avatar-box {
                margin-right: 16px;
                position: relative;

                > img {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    border: 1px solid #ededed;
                    box-sizing: border-box;
                }

                .sex {
                    position: absolute;
                    bottom: -5px;
                    right: 8px
                }
            }

            .name {
                font-size: 14px;
                font-weight: 500;
                color: rgba(34, 34, 34, 1);
                line-height: 20px;
                margin: auto 0;
            }
        }

        .base-info {
            padding-left: 24px;
            padding-top: 48px;
            padding-bottom: 8px;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;

            .row {
                margin-bottom: 12px;
                display: flex;
                justify-content: start;

                .info-title {
                    width: 80px;
                    color: rgba(120, 120, 120, 0.77);
                }

                .info-content {
                    color: rgba(34, 34, 34, 1);
                    flex: 1;
                    position: relative;
                    .icon-class {
                        position: absolute;
                        left: -63px;
                        height: 17px;
                        width: 100%;
                    }
                }
            }
        }

        .line {
            margin-left: 20px;
            border-bottom: 1px solid #D8D8D8;
            opacity: 0.5;
        }

        .label-box {
            padding-left: 24px;
            margin: 5px 0 12px 0;
            display: flex;
            flex-wrap: wrap;

            .box {
                margin-right: 13px;
                margin-bottom: 13px;
                padding: 0 10px;
                height: 24px;
                border-radius: 4px;
                text-align: center;
                line-height: 24px;
                font-size: 12px;
                font-weight: 400;
                cursor: pointer;
            }

            .one {
                color: #1890FF;
                background: rgba(230, 247, 255, 1);
                border: 1px solid rgba(145, 213, 255, 1);
            }

            .two {
                color: #13C2C2;
                background: rgba(230, 255, 251, 1);
                border: 1px solid rgba(135, 232, 222, 1);
            }

            .three {
                color: #52C41A;
                background: rgba(246, 255, 237, 1);
                border: 1px solid rgba(183, 235, 143, 1);
            }

            .four {
                color: #8F8F8F;
                background: rgba(247, 247, 247, 1);
                border: 1px solid rgba(222, 222, 222, 1);
            }
        }

        .cooperation-card {
            padding-left: 17px;
            margin-top: 24px;

            .card-box {
                margin-bottom: 24px;
                display: flex;
                position: relative;

                .card-img {
                    margin-right: 16px;

                    > img {
                        box-sizing: border-box;
                        border: 1px solid #ededed;
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                    }
                }

                .card-context {
                    font-weight: 400;
                    line-height: 14px;

                    :first-child {
                        color: #222222;
                        margin-bottom: 8px;
                        width: 154px;
                        font-size: 14px;
                        color: rgba(34, 34, 34, 1);
                    }

                    :last-child {
                        font-size: 12px;
                        color: rgba(102, 102, 102, 1);
                    }
                }

                .superior-type {
                    position: absolute;
                    right: 0;
                    opacity: 0.77;
                    font-size: 14px;
                    color: rgba(120, 120, 120, 0.77);
                }
            }
        }
    }
</style>
