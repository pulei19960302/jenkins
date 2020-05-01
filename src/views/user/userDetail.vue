<template>
    <div class="taskReward-content">
        <div class="side">
            <div>
                <user-base-info ref="userBaseInfo" :init-data="getUpdateUserDetail"/>
            </div>
        </div>
        <div class="infor">
            <el-row>
                <el-col :span="24" style="background: #fff;padding: 24px;border-radius:4px;height: 100%">
                    <template>
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="用户摘要" name="userAbstract" lazy>
                                <div v-if="activeName === 'userAbstract'">
                                    <user-abstract :uid="id" ref="userAbstract"/>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="团队关系" name="teamRelation" lazy>
                                <div v-if="activeName === 'teamRelation'">
                                    <team-relation :uid="id"/>
                                </div>
                            </el-tab-pane>

                            <el-tab-pane label="资金明细" name="fundsDetail" lazy>
                                <div v-if="activeName === 'fundsDetail'">
                                    <funds-detail :uid="id"/>
                                </div>
                            </el-tab-pane>

                            <el-tab-pane label="订单列表" name="orderDetail" lazy>
                                <div v-if="activeName === 'orderDetail'">
                                    <order-detail :uid="id"/>
                                </div>
                            </el-tab-pane>

                            <el-tab-pane label="优惠券" name="userCoupon" lazy>
                                <div v-if="activeName === 'userCoupon'">
                                    <user-coupon :uid="id"/>
                                </div>
                            </el-tab-pane>

                            <!--                        <el-tab-pane label="用户日志" name="userLogs" lazy>-->
                            <!--                            <user-logs :uid="id"/>-->
                            <!--                        </el-tab-pane>-->


                            <!--                        <el-tab-pane label="用户详情" name="read"></el-tab-pane>-->
                            <!--                        <el-tab-pane label="编辑资料" name="edit"></el-tab-pane>-->
                            <!--                        <el-tab-pane label="收货地址" name="address"></el-tab-pane>-->
                            <!--                         <el-tab-pane label="资金明细" name="money"></el-tab-pane>-->
                            <!--                         <el-tab-pane label="订单记录" name="order"></el-tab-pane>-->
                            <!--                        <el-tab-pane label="团队详情" name="team" v-if="userType>1"></el-tab-pane>-->
                            <!--                        <el-tab-pane label="用户日志" name="loginLog" lazy>-->
                            <!--                            &lt;!&ndash; 日志 &ndash;&gt;-->
                            <!--                            <div>-->
                            <!--                                <template>-->
                            <!--                                    <el-table-->
                            <!--                                        element-loading-spinner="el-icon-loading"-->
                            <!--                                        :highlight-current-row="true"-->
                            <!--                                        border-->
                            <!--                                        ref="multipleTable"-->
                            <!--                                        :data="tableData5"-->
                            <!--                                        tooltip-effect="dark"-->
                            <!--                                        style="width: 100%"-->
                            <!--                                        @selection-change="handleSelectionChange">-->
                            <!--                                        <el-table-column-->
                            <!--                                            align="center"-->
                            <!--                                            prop="p1"-->
                            <!--                                            label="时间">-->
                            <!--                                        </el-table-column>-->
                            <!--                                        <el-table-column-->
                            <!--                                            align="center"-->
                            <!--                                            label="IP"-->
                            <!--                                            prop="p2"-->
                            <!--                                            show-overflow-tooltip>-->
                            <!--                                        </el-table-column>-->
                            <!--                                        <el-table-column-->
                            <!--                                            align="center"-->
                            <!--                                            label="地区"-->
                            <!--                                            prop="p3">-->
                            <!--                                        </el-table-column>-->
                            <!--                                        <el-table-column-->
                            <!--                                            align="center"-->
                            <!--                                            label="登录方式"-->
                            <!--                                            prop="p4">-->
                            <!--                                        </el-table-column>-->
                            <!--                                    </el-table>-->
                            <!--                                    <Pagination-->
                            <!--                                        :current="current"-->
                            <!--                                        :pageSize="pageSize"-->
                            <!--                                        :count="count"-->
                            <!--                                        @pageChangeCBK="handlePageChange"-->
                            <!--                                        @sizeChangeCBK="handleSizeChange">-->
                            <!--                                    </Pagination>-->
                            <!--                                </template>-->
                            <!--                            </div>-->
                            <!--                        </el-tab-pane>-->
                        </el-tabs>
                    </template>
                    <div>
                        <!--                        &lt;!&ndash; 详情 &ndash;&gt;-->
                        <!--                        <section v-show="activeName=='read'">-->
                        <!--                            <div class="userInfo">-->
                        <!--                                <div class="headimg">-->
                        <!--                                    <img :src="detailsData.profile.avatar"/>-->
                        <!--                                    <p class="hover-point" @click="sign">{{ detailsData.phone | validVal }}-->
                        <!--                                        <svg class="icon f18" aria-hidden="true">-->
                        <!--                                            <use xlink:href="#icon-icon-test"></use>-->
                        <!--                                        </svg>-->
                        <!--                                    </p>-->
                        <!--                                    <span>{{ detailsData.type_name }}</span>-->
                        <!--                                    <span @click="chooseUsertype" class="hover-point" style="margin-top: 10px">修改类型</span>-->
                        <!--                                    <span @click="chooseTeam" class="hover-point" style="margin-top: 10px">修改团队</span>-->
                        <!--                                    <span @click="shopVisible=true" class="hover-point" style="margin-top: 10px">修改店铺</span>-->
                        <!--                                    <span @click="showBindUser" v-permission="[$api.user.userManage.modifyUserId]" class="hover-point" style="margin-top: 10px">绑定用户</span>-->
                        <!--                                    <span @click="showModifyTeam" v-permission="[$api.user.userManage.modifyTeam]" class="hover-point" style="margin-top: 10px">转移团队</span>-->

                        <!--                                    &lt;!&ndash;<span v-if="userType>1" @click="chooseShop" class="hover-point" style="margin-top: 10px">所属店铺</span>&ndash;&gt;-->
                        <!--                                </div>-->
                        <!--                                <div class="infoTable">-->
                        <!--                                    <div class="row">-->
                        <!--                                        <div>用户ID</div>-->
                        <!--                                        <div>{{ detailsData.id | validVal }}</div>-->
                        <!--                                    </div>-->
                        <!--                                    <div class="row">-->
                        <!--                                        <div>账户</div>-->
                        <!--                                        <div>{{ detailsData.username | validVal }}</div>-->
                        <!--                                    </div>-->
                        <!--                                    <div class="row">-->
                        <!--                                        <div>性别</div>-->
                        <!--                                        <div>{{ genderFormat(detailsData.profile.gender) }}</div>-->
                        <!--                                    </div>-->
                        <!--                                    <div class="row">-->
                        <!--                                        <div>生日</div>-->
                        <!--                                        <div>{{ detailsData.profile.birthday }}</div>-->
                        <!--                                    </div>-->
                        <!--                                    &lt;!&ndash;<div class="row">&ndash;&gt;-->
                        <!--                                    &lt;!&ndash;<div>用户来源</div>&ndash;&gt;-->
                        <!--                                    &lt;!&ndash;<div>{{ detailsData.profile.regfromName }}</div>&ndash;&gt;-->
                        <!--                                    &lt;!&ndash;</div>&ndash;&gt;-->
                        <!--                                    <div class="row">-->
                        <!--                                        <div>所属团队</div>-->
                        <!--                                        <div>{{ detailsData.team_name }}</div>-->
                        <!--                                    </div>-->
                        <!--                                    <div class="row">-->
                        <!--                                        <div>上级</div>-->
                        <!--                                        <div>-->
                        <!--                                <span class="click-color" @click="goUserDetail(detailsData.first_uid,1)" v-show="detailsData.first_name">-->
                        <!--                                {{ detailsData.first_name}}({{ detailsData.first_uid}})-->
                        <!--                                </span>-->
                        <!--                                        </div>-->
                        <!--                                    </div>-->

                        <!--                                    <div class="row">-->
                        <!--                                        <div>一级合伙人</div>-->
                        <!--                                        <div>-->
                        <!--                                <span class="click-color" @click="goUserDetail(detailsData.first_team_id,5)" v-show="detailsData.first_team.name">-->
                        <!--                                    {{ detailsData.first_team.name}}({{ detailsData.first_team_id}})-->
                        <!--                                </span>-->
                        <!--                                        </div>-->
                        <!--                                    </div>-->
                        <!--                                    <div class="row">-->
                        <!--                                        <div >选择上级</div>-->
                        <!--                                        <div><span @click="dialogVisible=true" class="button-choose">上级</span></div>-->
                        <!--                                    </div>-->
                        <!--                                </div>-->
                        <!--                                <div class="infoTable">-->
                        <!--                                    <div class="row">-->
                        <!--                                        <div>职业</div>-->
                        <!--                                        <div>{{ detailsData.profile.occupation | validVal }}</div>-->
                        <!--                                    </div>-->
                        <!--                                    <div class="row">-->
                        <!--                                        <div>个性签名</div>-->
                        <!--                                        <div>{{ detailsData.profile.signature | validVal }}</div>-->
                        <!--                                    </div>-->
                        <!--                                    <div class="row">-->
                        <!--                                        <div>喜欢的分类</div>-->
                        <!--                                        <div>{{ detailsData.profile.like_cate | validVal }}</div>-->
                        <!--                                    </div>-->
                        <!--                                    <div class="row">-->
                        <!--                                        <div>注册时间</div>-->
                        <!--                                        <div>{{ detailsData.created_at | validDateTime }}</div>-->
                        <!--                                    </div>-->
                        <!--                                    <div class="row">-->
                        <!--                                        <div>所属店铺</div>-->
                        <!--                                        <div>{{ detailsData.generalize_id}} {{ detailsData.top_store_name}}</div>-->
                        <!--                                    </div>-->
                        <!--                                    <div class="row">-->
                        <!--                                        <div>上上级</div>-->
                        <!--                                        <div>-->
                        <!--                                            <span class="click-color" @click="goUserDetail(detailsData.second_uid,1)" v-show="detailsData.second_name">{{ detailsData.second_name}}({{ detailsData.second_uid}})</span>-->
                        <!--                                        </div>-->
                        <!--                                    </div>-->
                        <!--                                    <div class="row">-->
                        <!--                                        <div>二级合伙人</div>-->
                        <!--                                        <div>-->
                        <!--                                <span class="click-color" @click="goUserDetail(detailsData.second_team_id,5)" v-show="detailsData.second_team.name">-->
                        <!--                                    {{ detailsData.second_team.name}}({{ detailsData.second_team_id}})-->
                        <!--                                </span>-->
                        <!--                                        </div>-->
                        <!--                                    </div>-->
                        <!--                                    <div class="row"  v-if="userType>1">-->
                        <!--                                        <div></div>-->
                        <!--                                        <div></div>-->
                        <!--                                    </div>-->
                        <!--                                </div>-->
                        <!--                            </div>-->

                        <!--                            <div class="card">-->
                        <!--                                <div>-->
                        <!--                                    <svg class="icon" aria-hidden="true">-->
                        <!--                                        <use xlink:href="#icon-icon_favorite"></use>-->
                        <!--                                    </svg>-->
                        <!--                                    <span class="f16">统计信息</span>-->
                        <!--                                    <div class="table-content">-->
                        <!--                                        <div class="table-row">-->
                        <!--                                            <div class="table-row-col">-->
                        <!--                                                <div class="">累计订单</div>-->
                        <!--                                                <div @click.stop="toogleRightList('order_num')" class="jump-btn">{{ statistical.order_num }}</div>-->
                        <!--                                            </div>-->
                        <!--                                            <div class="table-row-col">-->
                        <!--                                                <div class="">累计消费</div>-->
                        <!--                                                <div @click.stop="toogleRightList('order_sale')" class="jump-btn">￥{{ statistical.order_sale }}</div>-->
                        <!--                                            </div>-->
                        <!--                                            <div class="table-row-col">-->
                        <!--                                                <div class="">账户余额</div>-->
                        <!--                                                <div @click.stop="toogleRightList('balance')" class="jump-btn">￥{{ detailsData.balance }}</div>-->
                        <!--                                                &lt;!&ndash; <div>￥{{ detailsData.balance }}</div> &ndash;&gt;-->
                        <!--                                            </div>-->
                        <!--                                            <div class="table-row-col">-->
                        <!--                                                <div class="">累计充值</div>-->
                        <!--                                                <div @click.stop="toogleRightList('recharge')" class="jump-btn">￥{{ statistical.recharge }}</div>-->
                        <!--                                            </div>-->
                        <!--                                            <div class="table-row-col">-->
                        <!--                                                <div class="">累计提现</div>-->
                        <!--                                                <div @click.stop="toogleRightList('reflect')" class="jump-btn">￥{{ statistical.reflect }}</div>-->
                        <!--                                            </div>-->
                        <!--                                            <div class="table-row-col">-->
                        <!--                                                <div class="">累计退款</div>-->
                        <!--                                                <div @click.stop="toogleRightList('sale_refund')" class="jump-btn">￥{{ statistical.sale_refund }}</div>-->
                        <!--                                            </div>-->
                        <!--                                        </div>-->
                        <!--                                        <div class="table-row">-->
                        <!--                                            <div class="table-row-col">-->
                        <!--                                                <div class="">团队人数</div>-->
                        <!--                                                &lt;!&ndash;{{ statistical.first_num + statistical.second_num}}&ndash;&gt;-->
                        <!--                                                <div @click.stop="toogleRightList('team')" class="jump-btn">-->
                        <!--                                                    {{statistical.team}}-->
                        <!--                                                </div>-->
                        <!--                                            </div>-->
                        <!--                                            <div class="table-row-col">-->
                        <!--                                                <div class="">店主人数</div>-->
                        <!--                                                <div  @click.stop="toogleRightList('first_num')" class="jump-btn">{{ statistical.first_num }}</div>-->
                        <!--                                            </div>-->
                        <!--                                            <div class="table-row-col">-->
                        <!--                                                <div class="">客官人数</div>-->
                        <!--                                                <div @click.stop="toogleRightList('second_num')" class="jump-btn">{{ statistical.second_num }}</div>-->
                        <!--                                            </div>-->
                        <!--                                            <div class="table-row-col">-->
                        <!--                                                <div class="">团队奖励</div>-->
                        <!--                                                <div @click.stop="toogleRightList('teamFee')" class="jump-btn">{{ statistical.teamFee }}</div>-->
                        <!--                                            </div>-->
                        <!--                                            <div class="table-row-col">-->
                        <!--                                                <div class="">店主奖励</div>-->
                        <!--                                                <div @click.stop="toogleRightList('one_reward')" class="jump-btn">{{ statistical.one_reward }}</div>-->
                        <!--                                            </div>-->
                        <!--                                            <div class="table-row-col">-->
                        <!--                                                <div class="">客官奖励</div>-->
                        <!--                                                <div @click.stop="toogleRightList('two_reward')" class="jump-btn">{{ statistical.two_reward }}</div>-->
                        <!--                                            </div>-->
                        <!--                                        </div>-->

                        <!--                                    </div>-->
                        <!--                                </div>-->
                        <!--                            </div>-->
                        <!--                        </section>-->
                        <!--                        &lt;!&ndash; 编辑 &ndash;&gt;-->
                        <!--                        <section v-show="activeName=='edit'">-->
                        <!--                            <div class="editIonfo">-->
                        <!--                                <el-form label-position="right" style="width: 565px;margin: 20px auto" label-width="150px">-->
                        <!--                                    <el-form-item label="用户昵称：">-->
                        <!--                                        <el-input v-model="formLabelAlign.nickname" style="width: 220px" placeholder="请输入手机号码"></el-input>-->
                        <!--                                    </el-form-item>-->
                        <!--                                    <el-form-item label="手机号码：">-->
                        <!--                                        <el-input type="password" v-model="formLabelAlign.phone" style="width: 220px" placeholder="请输入手机号码"></el-input>-->
                        <!--                                    </el-form-item>-->
                        <!--                                    <el-form-item label="性别：">-->
                        <!--                                        <el-radio v-model="formLabelAlign.gender" :label="0">保密</el-radio>-->
                        <!--                                        <el-radio v-model="formLabelAlign.gender" :label="1">男</el-radio>-->
                        <!--                                        <el-radio v-model="formLabelAlign.gender" :label="2">女</el-radio>-->
                        <!--                                    </el-form-item>-->
                        <!--                                    <el-form-item label="生日：" style="width: 220px">-->
                        <!--                                        <el-date-picker-->
                        <!--                                            v-model="formLabelAlign.birthday"-->
                        <!--                                            value-format="yyyy-MM-dd"-->
                        <!--                                            type="date"-->
                        <!--                                            placeholder="选择日期">-->
                        <!--                                        </el-date-picker>-->
                        <!--                                    </el-form-item>-->
                        <!--                                    <el-form-item label="职业：">-->
                        <!--                                        <el-input v-model="formLabelAlign.occupation" style="width: 220px" placeholder="请输入职业"></el-input>-->
                        <!--                                    </el-form-item>-->
                        <!--                                    <el-form-item label="个性签名：" >-->
                        <!--                                        <el-input type="textarea" :rows="4" v-model="formLabelAlign.signature" style="width: 220px" placeholder="请输入个性签名"></el-input>-->
                        <!--                                    </el-form-item>-->
                        <!--                                    <el-form-item label="新密码：" >-->
                        <!--                                        <el-input v-model="formLabelAlign.password" style="width: 220px" placeholder="请输入密码" type="password"></el-input>-->
                        <!--                                        <p class="tips">不修改密码可不填写</p>-->
                        <!--                                    </el-form-item>-->
                        <!--                                    <el-button type="primary" class="submit" @click="handleSubmit" style="margin-left: 150px">提交</el-button>-->
                        <!--                                </el-form>-->
                        <!--                            </div>-->
                        <!--                        </section>-->
                        <!--                        &lt;!&ndash; 日志 &ndash;&gt;-->
                        <!--                        <section v-show="activeName=='loginLog'">-->
                        <!--                            <div>-->
                        <!--                                <template>-->
                        <!--                                    <el-table-->
                        <!--                                        element-loading-spinner="el-icon-loading"-->
                        <!--                                        :highlight-current-row="true"-->
                        <!--                                        border-->
                        <!--                                        ref="multipleTable"-->
                        <!--                                        :data="tableData5"-->
                        <!--                                        tooltip-effect="dark"-->
                        <!--                                        style="width: 100%"-->
                        <!--                                        @selection-change="handleSelectionChange">-->
                        <!--                                        <el-table-column-->
                        <!--                                            align="center"-->
                        <!--                                            prop="p1"-->
                        <!--                                            label="时间">-->
                        <!--                                        </el-table-column>-->
                        <!--                                        <el-table-column-->
                        <!--                                            align="center"-->
                        <!--                                            label="IP"-->
                        <!--                                            prop="p2"-->
                        <!--                                            show-overflow-tooltip>-->
                        <!--                                        </el-table-column>-->
                        <!--                                        <el-table-column-->
                        <!--                                            align="center"-->
                        <!--                                            label="地区"-->
                        <!--                                            prop="p3">-->
                        <!--                                        </el-table-column>-->
                        <!--                                        <el-table-column-->
                        <!--                                            align="center"-->
                        <!--                                            label="登录方式"-->
                        <!--                                            prop="p4">-->
                        <!--                                        </el-table-column>-->
                        <!--                                    </el-table>-->
                        <!--                                    <Pagination-->
                        <!--                                        :current="current"-->
                        <!--                                        :pageSize="pageSize"-->
                        <!--                                        :count="count"-->
                        <!--                                        @pageChangeCBK="handlePageChange"-->
                        <!--                                        @sizeChangeCBK="handleSizeChange">-->
                        <!--                                    </Pagination>-->
                        <!--                                </template>-->
                        <!--                            </div>-->
                        <!--                        </section>-->
                        <!--                        &lt;!&ndash;收货地址&ndash;&gt;-->
                        <!--                        <section v-show="activeName=='address'">-->
                        <!--                            <div class="card">-->
                        <!--                                <div>-->
                        <!--                                    <svg class="icon" aria-hidden="true">-->
                        <!--                                        <use xlink:href="#icon-icon_favorite"></use>-->
                        <!--                                    </svg>-->
                        <!--                                    <span class="f16">收货地址</span>-->
                        <!--                                    <el-table-->
                        <!--                                        element-loading-spinner="el-icon-loading"-->
                        <!--                                        :highlight-current-row="true"-->
                        <!--                                        border-->
                        <!--                                        ref="multipleTable"-->
                        <!--                                        :data="addressData"-->
                        <!--                                        tooltip-effect="dark"-->
                        <!--                                        style="width: 100%;margin-top: 15px"-->
                        <!--                                        @selection-change="handleSelectionChange">-->
                        <!--                                        <el-table-column-->
                        <!--                                            align="center"-->
                        <!--                                            width="140"-->
                        <!--                                            prop="name"-->
                        <!--                                            label="姓名">-->
                        <!--                                        </el-table-column>-->
                        <!--                                        <el-table-column-->
                        <!--                                            label="手机号码"-->
                        <!--                                            align="center"-->
                        <!--                                            width="140"-->
                        <!--                                            prop="phone">-->
                        <!--                                        </el-table-column>-->
                        <!--                                        <el-table-column-->
                        <!--                                            prop="full_address"-->
                        <!--                                            align="center"-->
                        <!--                                            label="详细地址">-->
                        <!--                                        </el-table-column>-->
                        <!--                                        <el-table-column-->
                        <!--                                            label="默认地址"-->
                        <!--                                            width="100"-->
                        <!--                                            align="center"-->
                        <!--                                            prop="sort">-->
                        <!--                                            <template slot-scope="scope">-->
                        <!--                                                <el-switch v-model="scope.row.is_default" active-value="1" inactive-value="0" disabled></el-switch>-->
                        <!--                                            </template>-->
                        <!--                                        </el-table-column>-->
                        <!--                                    </el-table>-->
                        <!--                                </div>-->
                        <!--                            </div>-->
                        <!--                        </section>-->
                        <!--                        &lt;!&ndash;资金明细&ndash;&gt;-->
                        <!--                        <section v-show="activeName=='money'">-->
                        <!--                            <div class="card">-->
                        <!--                                <div>-->
                        <!--                                    <svg class="icon" aria-hidden="true">-->
                        <!--                                        <use xlink:href="#icon-icon_favorite"></use>-->
                        <!--                                    </svg>-->
                        <!--                                    <span class="f16">资金明细</span>-->
                        <!--                                    <el-table-->
                        <!--                                        element-loading-spinner="el-icon-loading"-->
                        <!--                                        :highlight-current-row="true"-->
                        <!--                                        v-loading="loading3"-->
                        <!--                                        border-->
                        <!--                                        ref="multipleTable"-->
                        <!--                                        :data="tableData3"-->
                        <!--                                        tooltip-effect="dark"-->
                        <!--                                        style="width: 100%;margin-top: 15px"-->
                        <!--                                        @selection-change="handleSelectionChange">-->
                        <!--                                        <el-table-column-->
                        <!--                                            align="center"-->
                        <!--                                            prop="type_name"-->
                        <!--                                            label="收支类型">-->
                        <!--                                        </el-table-column>-->
                        <!--                                        <el-table-column-->
                        <!--                                            label="金额"-->
                        <!--                                            align="center"-->
                        <!--                                            prop="money">-->
                        <!--                                        </el-table-column>-->
                        <!--                                        <el-table-column-->
                        <!--                                            prop="balance"-->
                        <!--                                            align="center"-->
                        <!--                                            label="交易后余额">-->
                        <!--                                        </el-table-column>-->
                        <!--                                        <el-table-column-->
                        <!--                                            label="备注"-->
                        <!--                                            align="center"-->
                        <!--                                            width="100"-->
                        <!--                                            prop="remark">-->
                        <!--                                        </el-table-column>-->
                        <!--                                        <el-table-column-->
                        <!--                                            label="创建时间"-->
                        <!--                                            align="center"-->
                        <!--                                            prop="created_at">-->
                        <!--                                        </el-table-column>-->
                        <!--                                    </el-table>-->
                        <!--                                    <el-pagination-->
                        <!--                                        @current-change="handlePageChange($event, '3')"-->
                        <!--                                        small-->
                        <!--                                        layout="prev, pager, next"-->
                        <!--                                        :total="count3">-->
                        <!--                                    </el-pagination>-->
                        <!--                                </div>-->
                        <!--                            </div>-->
                        <!--                        </section>-->
                        <!--                        &lt;!&ndash;订单记录&ndash;&gt;-->
                        <!--                        <section v-show="activeName=='order'">-->
                        <!--                            <div class="card">-->
                        <!--                                <div>-->
                        <!--                                    <svg class="icon" aria-hidden="true">-->
                        <!--                                        <use xlink:href="#icon-icon_favorite"></use>-->
                        <!--                                    </svg>-->
                        <!--                                    <span class="f16">订单记录</span>-->
                        <!--                                    <el-table-->
                        <!--                                        v-loading="loading4"-->
                        <!--                                        element-loading-spinner="el-icon-loading"-->
                        <!--                                        :highlight-current-row="true"-->
                        <!--                                        border-->
                        <!--                                        ref="multipleTable"-->
                        <!--                                        :data="tableData4"-->
                        <!--                                        tooltip-effect="dark"-->
                        <!--                                        style="width: 100%;margin-top: 15px"-->
                        <!--                                        @selection-change="handleSelectionChange">-->
                        <!--                                        <el-table-column-->
                        <!--                                            align="center"-->
                        <!--                                            prop="order_sn"-->
                        <!--                                            label="订单编号">-->
                        <!--                                        </el-table-column>-->
                        <!--                                        <el-table-column-->
                        <!--                                            prop="buyer_nickname"-->
                        <!--                                            align="center"-->
                        <!--                                            label="用户账号">-->
                        <!--                                        </el-table-column>-->
                        <!--                                        <el-table-column-->
                        <!--                                            prop="goods_title"-->
                        <!--                                            align="center"-->
                        <!--                                            label="商品名称">-->
                        <!--                                        </el-table-column>-->
                        <!--                                        <el-table-column-->
                        <!--                                            label="订单金额"-->
                        <!--                                            align="center"-->
                        <!--                                            prop="total_fee"-->
                        <!--                                            show-overflow-tooltip>-->
                        <!--                                        </el-table-column>-->
                        <!--                                        <el-table-column-->
                        <!--                                            label="支付方式"-->
                        <!--                                            align="center"-->
                        <!--                                            prop="pay_type"-->
                        <!--                                            show-overflow-tooltip>-->
                        <!--                                        </el-table-column>-->
                        <!--                                        <el-table-column-->
                        <!--                                            label="订单来源"-->
                        <!--                                            align="center"-->
                        <!--                                            prop="from"-->
                        <!--                                            show-overflow-tooltip>-->
                        <!--                                            <template slot-scope="scope">-->
                        <!--                                                {{ scope.row.from | validVal }}-->
                        <!--                                            </template>-->
                        <!--                                        </el-table-column>-->
                        <!--                                        <el-table-column-->
                        <!--                                            label="订单状态"-->
                        <!--                                            align="center"-->
                        <!--                                            prop="status">-->
                        <!--                                            <template slot-scope="scope">-->
                        <!--                                                {{ transStatus(scope.row.status) }}-->
                        <!--                                            </template>-->
                        <!--                                        </el-table-column>-->
                        <!--                                    </el-table>-->
                        <!--                                    <el-pagination-->
                        <!--                                        @current-change="handlePageChange($event, '4')"-->
                        <!--                                        small-->
                        <!--                                        layout="prev, pager, next"-->
                        <!--                                        :total="count4">-->
                        <!--                                    </el-pagination>-->
                        <!--                                </div>-->
                        <!--                            </div>-->
                        <!--                        </section>-->
                        <!--                        <section v-show="activeName=='team'">-->
                        <!--                            <Search-->
                        <!--                                :searchOPtions=searchOPtions-->
                        <!--                                @selectChange=handelselectChange-->
                        <!--                                @searchCallback=handelSearch>-->
                        <!--                            </Search>-->
                        <!--                            <el-table-->
                        <!--                                element-loading-spinner="el-icon-loading"-->
                        <!--                                :highlight-current-row="true"-->
                        <!--                                v-loading="loading"-->
                        <!--                                border-->
                        <!--                                ref="multipleTable"-->
                        <!--                                :data="teamData"-->
                        <!--                                tooltip-effect="dark"-->
                        <!--                                style="width: 100%;"-->
                        <!--                                @sort-change="sortChange">-->
                        <!--                                <el-table-column-->
                        <!--                                    sortable="custom"-->
                        <!--                                    align="center"-->
                        <!--                                    prop="id"-->
                        <!--                                    label="用户ID">-->
                        <!--                                </el-table-column>-->
                        <!--                                <el-table-column-->
                        <!--                                    align="center"-->
                        <!--                                    prop="nickname"-->
                        <!--                                    label="用户昵称">-->
                        <!--                                </el-table-column>-->
                        <!--                                <el-table-column-->
                        <!--                                    align="center"-->
                        <!--                                    prop="phone"-->
                        <!--                                    label="手机号">-->
                        <!--                                    <template slot-scope="scope">-->
                        <!--                                        {{ scope.row.phone | validVal }}-->
                        <!--                                    </template>-->
                        <!--                                </el-table-column>-->
                        <!--                                <el-table-column-->
                        <!--                                    align="center"-->
                        <!--                                    prop="relation"-->
                        <!--                                    label="成员关系">-->
                        <!--                                </el-table-column>-->
                        <!--                                <el-table-column-->
                        <!--                                    align="center"-->
                        <!--                                    prop="totalFee"-->
                        <!--                                    sortable-->
                        <!--                                    label="返利">-->
                        <!--                                </el-table-column>-->
                        <!--                                <el-table-column-->
                        <!--                                    sortable-->
                        <!--                                    align="center"-->
                        <!--                                    prop="order_num"-->
                        <!--                                    label="累计订单量">-->
                        <!--                                </el-table-column>-->
                        <!--                                <el-table-column-->
                        <!--                                    sortable-->
                        <!--                                    align="center"-->
                        <!--                                    prop="consumption"-->
                        <!--                                    label="消费额">-->
                        <!--                                </el-table-column>-->
                        <!--                                <el-table-column-->
                        <!--                                    sortable-->
                        <!--                                    align="center"-->
                        <!--                                    label="加入时间"-->
                        <!--                                    prop="reg_time"-->
                        <!--                                    show-overflow-tooltip>-->
                        <!--                                </el-table-column>-->
                        <!--                            </el-table>-->
                        <!--                            <Pagination-->
                        <!--                                :current="current5"-->
                        <!--                                :pageSize="pageSize5"-->
                        <!--                                :count="count5"-->
                        <!--                                @pageChangeCBK="handlePageChange($event, '5')"-->
                        <!--                                @sizeChangeCBK="handleSizeChange5">-->
                        <!--                            </Pagination>-->
                        <!--                        </section>-->
                    </div>

                </el-col>
            </el-row>
        </div>


        <!--        <template>-->
        <!--            <el-tabs v-model="activeName">-->
        <!--                <el-tab-pane label="用户详情" name="read"></el-tab-pane>-->
        <!--                <el-tab-pane label="编辑资料" name="edit"></el-tab-pane>-->
        <!--                <el-tab-pane label="收货地址" name="address"></el-tab-pane>-->
        <!--                &lt;!&ndash; <el-tab-pane label="资金明细" name="money"></el-tab-pane> &ndash;&gt;-->
        <!--                &lt;!&ndash; <el-tab-pane label="订单记录" name="order"></el-tab-pane> &ndash;&gt;-->
        <!--                <el-tab-pane label="团队详情" name="team" v-if="userType>1"></el-tab-pane>-->
        <!--                <el-tab-pane label="登录日志" name="loginLog"></el-tab-pane>-->
        <!--            </el-tabs>-->
        <!--        </template>-->
        <!--        <div style="border:1px solid #E4E4E4;">-->
        <!--            &lt;!&ndash; 详情 &ndash;&gt;-->
        <!--            <section v-show="activeName=='read'">-->
        <!--                <div class="userInfo">-->
        <!--                    <div class="headimg">-->
        <!--                        <img :src="detailsData.profile.avatar"/>-->
        <!--                        <p class="hover-point" @click="sign">{{ detailsData.phone | validVal }}-->
        <!--                            <svg class="icon f18" aria-hidden="true">-->
        <!--                                <use xlink:href="#icon-icon-test"></use>-->
        <!--                            </svg>-->
        <!--                        </p>-->
        <!--                        <span>{{ detailsData.type_name }}</span>-->
        <!--                        <span @click="chooseUsertype" class="hover-point" style="margin-top: 10px">修改类型</span>-->
        <!--                        <span @click="chooseTeam" class="hover-point" style="margin-top: 10px">修改团队</span>-->
        <!--                        <span @click="shopVisible=true" class="hover-point" style="margin-top: 10px">修改店铺</span>-->
        <!--                        <span @click="showBindUser" v-permission="[$api.user.userManage.modifyUserId]" class="hover-point" style="margin-top: 10px">绑定用户</span>-->
        <!--                        &lt;!&ndash;<span v-if="userType>1" @click="chooseShop" class="hover-point" style="margin-top: 10px">所属店铺</span>&ndash;&gt;-->
        <!--                    </div>-->
        <!--                    <div class="infoTable">-->
        <!--                        <div class="row">-->
        <!--                            <div>用户ID</div>-->
        <!--                            <div>{{ detailsData.id | validVal }}</div>-->
        <!--                        </div>-->
        <!--                        <div class="row">-->
        <!--                            <div>账户</div>-->
        <!--                            <div>{{ detailsData.profile.nickname | validVal }}</div>-->
        <!--                        </div>-->
        <!--                        <div class="row">-->
        <!--                            <div>性别</div>-->
        <!--                            <div>{{ genderFormat(detailsData.profile.gender) }}</div>-->
        <!--                        </div>-->
        <!--                        <div class="row">-->
        <!--                            <div>生日</div>-->
        <!--                            <div>{{ detailsData.profile.birthday }}</div>-->
        <!--                        </div>-->
        <!--                        &lt;!&ndash;<div class="row">&ndash;&gt;-->
        <!--                            &lt;!&ndash;<div>用户来源</div>&ndash;&gt;-->
        <!--                           &lt;!&ndash;<div>{{ detailsData.profile.regfromName }}</div>&ndash;&gt;-->
        <!--                        &lt;!&ndash;</div>&ndash;&gt;-->
        <!--                        <div class="row">-->
        <!--                            <div>所属团队</div>-->
        <!--                            <div>{{ detailsData.team_name }}</div>-->
        <!--                        </div>-->
        <!--                        <div class="row">-->
        <!--                            <div>上上级</div>-->
        <!--                            <div>-->
        <!--                                <span class="click-color" @click="goUserDetail(detailsData.second_uid,1)" v-show="detailsData.second_name">{{ detailsData.second_name}}({{ detailsData.second_uid}})</span>-->
        <!--                            </div>-->
        <!--                        </div>-->
        <!--                        <div class="row">-->
        <!--                            <div>一级合伙人</div>-->
        <!--                            <div>-->
        <!--                                <span class="click-color" @click="goUserDetail(detailsData.first_team_id,5)" v-show="detailsData.first_team.name">-->
        <!--                                    {{ detailsData.first_team.name}}({{ detailsData.first_team_id}})-->
        <!--                                </span>-->
        <!--                            </div>-->
        <!--                        </div>-->
        <!--                        <div class="row">-->
        <!--                            <div >选择上级</div>-->
        <!--                            <div><span @click="dialogVisible=true" class="button-choose">上级</span></div>-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                    <div class="infoTable">-->
        <!--                        <div class="row">-->
        <!--                            <div>职业</div>-->
        <!--                            <div>{{ detailsData.profile.occupation | validVal }}</div>-->
        <!--                        </div>-->
        <!--                        <div class="row">-->
        <!--                            <div>个性签名</div>-->
        <!--                            <div>{{ detailsData.profile.signature | validVal }}</div>-->
        <!--                        </div>-->
        <!--                        <div class="row">-->
        <!--                            <div>喜欢的分类</div>-->
        <!--                            <div>{{ detailsData.profile.like_cate | validVal }}</div>-->
        <!--                        </div>-->
        <!--                        <div class="row">-->
        <!--                            <div>注册时间</div>-->
        <!--                            <div>{{ detailsData.created_at | validDateTime }}</div>-->
        <!--                        </div>-->
        <!--                        <div class="row">-->
        <!--                            <div>所属群</div>-->
        <!--                            <div>{{ detailsData.group_name}}</div>-->
        <!--                        </div>-->
        <!--                        <div class="row">-->
        <!--                            <div>上级</div>-->
        <!--                            <div>-->
        <!--                                <span class="click-color" @click="goUserDetail(detailsData.first_uid,1)" v-show="detailsData.first_name">-->
        <!--                                    {{ detailsData.first_name}}({{ detailsData.first_uid}})-->
        <!--                                </span>-->
        <!--                            </div>-->
        <!--                        </div>-->
        <!--                        <div class="row">-->
        <!--                            <div>二级合伙人</div>-->
        <!--                            <div>-->
        <!--                                <span class="click-color" @click="goUserDetail(detailsData.second_team_id,5)" v-show="detailsData.second_team.name">-->
        <!--                                    {{ detailsData.second_team.name}}({{ detailsData.second_team_id}})-->
        <!--                                </span>-->
        <!--                            </div>-->
        <!--                        </div>-->
        <!--                        <div class="row"  v-if="userType>1">-->
        <!--                            <div></div>-->
        <!--                            <div></div>-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                </div>-->

        <!--                <div class="card">-->
        <!--                    <div>-->
        <!--                        <svg class="icon" aria-hidden="true">-->
        <!--                            <use xlink:href="#icon-icon_favorite"></use>-->
        <!--                        </svg>-->
        <!--                        <span class="f16">统计信息</span>-->
        <!--                        <div class="table-content">-->
        <!--                            <div class="table-row">-->
        <!--                                <div class="table-row-col">-->
        <!--                                    <div class="">累计订单</div>-->
        <!--                                    <div class="">{{ statistical.order_num }}</div>-->
        <!--                                </div>-->
        <!--                                <div class="table-row-col">-->
        <!--                                    <div class="">累计消费</div>-->
        <!--                                    <div class="">￥{{ statistical.order_sale }}</div>-->
        <!--                                </div>-->
        <!--                                <div class="table-row-col">-->
        <!--                                    <div class="">账户余额</div>-->
        <!--                                    <div class="">￥{{ detailsData.balance }}</div>-->
        <!--                                </div>-->
        <!--                                <div class="table-row-col">-->
        <!--                                    <div class="">累计充值</div>-->
        <!--                                    <div class="">￥{{ statistical.recharge }}</div>-->
        <!--                                </div>-->
        <!--                                <div class="table-row-col">-->
        <!--                                    <div class="">累计提现</div>-->
        <!--                                    <div class="">￥{{ statistical.reflect }}</div>-->
        <!--                                </div>-->
        <!--                                <div class="table-row-col">-->
        <!--                                    <div class="">累计退款</div>-->
        <!--                                    <div class="">￥{{ statistical.sale_refund }}</div>-->
        <!--                                </div>-->
        <!--                            </div>-->
        <!--                            <div class="table-row">-->
        <!--                                <div class="table-row-col">-->
        <!--                                    <div class="">团队人数</div>-->
        <!--                                    &lt;!&ndash;{{ statistical.first_num + statistical.second_num}}&ndash;&gt;-->
        <!--                                    <div class="">-->
        <!--                                        {{statistical.team}}-->
        <!--                                    </div>-->
        <!--                                </div>-->
        <!--                                <div class="table-row-col">-->
        <!--                                    <div class="">一级人数</div>-->
        <!--                                    <div class="">{{ statistical.first_num }}</div>-->
        <!--                                </div>-->
        <!--                                <div class="table-row-col">-->
        <!--                                    <div class="">二级人数</div>-->
        <!--                                    <div class="">{{ statistical.second_num }}</div>-->
        <!--                                </div>-->
        <!--                                <div class="table-row-col">-->
        <!--                                    <div class="">团队奖励</div>-->
        <!--                                    <div class="">{{ statistical.teamFee }}</div>-->
        <!--                                </div>-->
        <!--                                <div class="table-row-col">-->
        <!--                                    <div class="">一级奖励</div>-->
        <!--                                    <div class="">{{ statistical.one_reward }}</div>-->
        <!--                                </div>-->
        <!--                                <div class="table-row-col">-->
        <!--                                    <div class="">二级奖励</div>-->
        <!--                                    <div class="">{{ statistical.two_reward }}</div>-->
        <!--                                </div>-->
        <!--                            </div>-->

        <!--                        </div>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </section>-->
        <!--            &lt;!&ndash; 编辑 &ndash;&gt;-->
        <!--            <section v-show="activeName=='edit'">-->
        <!--                <div class="editIonfo">-->
        <!--                    <el-form label-position="right" style="width: 565px;margin: 20px auto" label-width="150px">-->
        <!--                        <el-form-item label="用户昵称：">-->
        <!--                            <el-input v-model="formLabelAlign.nickname" style="width: 220px" placeholder="请输入手机号码"></el-input>-->
        <!--                        </el-form-item>-->
        <!--                        <el-form-item label="手机号码：">-->
        <!--                            <el-input type="password" v-model="formLabelAlign.phone" style="width: 220px" placeholder="请输入手机号码"></el-input>-->
        <!--                        </el-form-item>-->
        <!--                        <el-form-item label="性别：">-->
        <!--                            <el-radio v-model="formLabelAlign.gender" :label="0">保密</el-radio>-->
        <!--                            <el-radio v-model="formLabelAlign.gender" :label="1">男</el-radio>-->
        <!--                            <el-radio v-model="formLabelAlign.gender" :label="2">女</el-radio>-->
        <!--                        </el-form-item>-->
        <!--                        <el-form-item label="生日：" style="width: 220px">-->
        <!--                            <el-date-picker-->
        <!--                                value-format="timestamp"-->
        <!--                                v-model="formLabelAlign.birthday"-->
        <!--                                type="date"-->
        <!--                                placeholder="选择日期">-->
        <!--                            </el-date-picker>-->
        <!--                        </el-form-item>-->
        <!--                        <el-form-item label="职业：">-->
        <!--                            <el-input v-model="formLabelAlign.occupation" style="width: 220px" placeholder="请输入职业"></el-input>-->
        <!--                        </el-form-item>-->
        <!--                        <el-form-item label="个性签名：" >-->
        <!--                            <el-input type="textarea" :rows="4" v-model="formLabelAlign.signature" style="width: 220px" placeholder="请输入个性签名"></el-input>-->
        <!--                        </el-form-item>-->
        <!--                        <el-form-item label="新密码：" >-->
        <!--                            <el-input v-model="formLabelAlign.password" style="width: 220px" placeholder="请输入密码" type="password"></el-input>-->
        <!--                            <p class="tips">不修改密码可不填写</p>-->
        <!--                        </el-form-item>-->
        <!--                        <el-button type="primary" class="submit" @click="handleSubmit" style="margin-left: 150px">提交</el-button>-->
        <!--                    </el-form>-->
        <!--                </div>-->
        <!--            </section>-->
        <!--            &lt;!&ndash; 日志 &ndash;&gt;-->
        <!--            <section v-show="activeName=='loginLog'">-->
        <!--                <div>-->
        <!--                    <template>-->
        <!--                        <el-table-->
        <!--                            element-loading-spinner="el-icon-loading"-->
        <!--                            :highlight-current-row="true"-->
        <!--                            border-->
        <!--                            ref="multipleTable"-->
        <!--                            :data="tableData5"-->
        <!--                            tooltip-effect="dark"-->
        <!--                            style="width: 100%"-->
        <!--                            @selection-change="handleSelectionChange">-->
        <!--                            <el-table-column-->
        <!--                                align="center"-->
        <!--                                prop="p1"-->
        <!--                                label="时间">-->
        <!--                            </el-table-column>-->
        <!--                            <el-table-column-->
        <!--                                align="center"-->
        <!--                                label="IP"-->
        <!--                                prop="p2"-->
        <!--                                show-overflow-tooltip>-->
        <!--                            </el-table-column>-->
        <!--                            <el-table-column-->
        <!--                                align="center"-->
        <!--                                label="地区"-->
        <!--                                prop="p3">-->
        <!--                            </el-table-column>-->
        <!--                            <el-table-column-->
        <!--                                align="center"-->
        <!--                                label="登录方式"-->
        <!--                                prop="p4">-->
        <!--                            </el-table-column>-->
        <!--                        </el-table>-->
        <!--                        <Pagination-->
        <!--                            :current="current"-->
        <!--                            :pageSize="pageSize"-->
        <!--                            :count="count"-->
        <!--                            @pageChangeCBK="handlePageChange"-->
        <!--                            @sizeChangeCBK="handleSizeChange">-->
        <!--                        </Pagination>-->
        <!--                    </template>-->
        <!--                </div>-->
        <!--            </section>-->
        <!--            &lt;!&ndash;收货地址&ndash;&gt;-->
        <!--            <section v-show="activeName=='address'">-->
        <!--                <div class="card">-->
        <!--                    <div>-->
        <!--                        <svg class="icon" aria-hidden="true">-->
        <!--                            <use xlink:href="#icon-icon_favorite"></use>-->
        <!--                        </svg>-->
        <!--                        <span class="f16">收货地址</span>-->
        <!--                        <el-table-->
        <!--                            element-loading-spinner="el-icon-loading"-->
        <!--                            :highlight-current-row="true"-->
        <!--                            border-->
        <!--                            ref="multipleTable"-->
        <!--                            :data="addressData"-->
        <!--                            tooltip-effect="dark"-->
        <!--                            style="width: 100%;margin-top: 15px"-->
        <!--                            @selection-change="handleSelectionChange">-->
        <!--                            <el-table-column-->
        <!--                                align="center"-->
        <!--                                width="140"-->
        <!--                                prop="name"-->
        <!--                                label="姓名">-->
        <!--                            </el-table-column>-->
        <!--                            <el-table-column-->
        <!--                                label="手机号码"-->
        <!--                                align="center"-->
        <!--                                width="140"-->
        <!--                                prop="phone">-->
        <!--                            </el-table-column>-->
        <!--                            <el-table-column-->
        <!--                                prop="full_address"-->
        <!--                                align="center"-->
        <!--                                label="详细地址">-->
        <!--                            </el-table-column>-->
        <!--                            <el-table-column-->
        <!--                                label="默认地址"-->
        <!--                                width="100"-->
        <!--                                align="center"-->
        <!--                                prop="sort">-->
        <!--                                <template slot-scope="scope">-->
        <!--                                    <el-switch v-model="scope.row.is_default" active-value="1" inactive-value="0" disabled></el-switch>-->
        <!--                                </template>-->
        <!--                            </el-table-column>-->
        <!--                        </el-table>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </section>-->
        <!--            &lt;!&ndash;资金明细&ndash;&gt;-->
        <!--            <section v-show="activeName=='money'">-->
        <!--                <div class="card">-->
        <!--                    <div>-->
        <!--                        <svg class="icon" aria-hidden="true">-->
        <!--                            <use xlink:href="#icon-icon_favorite"></use>-->
        <!--                        </svg>-->
        <!--                        <span class="f16">资金明细</span>-->
        <!--                        <el-table-->
        <!--                            element-loading-spinner="el-icon-loading"-->
        <!--                            :highlight-current-row="true"-->
        <!--                            v-loading="loading3"-->
        <!--                            border-->
        <!--                            ref="multipleTable"-->
        <!--                            :data="tableData3"-->
        <!--                            tooltip-effect="dark"-->
        <!--                            style="width: 100%;margin-top: 15px"-->
        <!--                            @selection-change="handleSelectionChange">-->
        <!--                            <el-table-column-->
        <!--                                align="center"-->
        <!--                                prop="type_name"-->
        <!--                                label="收支类型">-->
        <!--                            </el-table-column>-->
        <!--                            <el-table-column-->
        <!--                                label="金额"-->
        <!--                                align="center"-->
        <!--                                prop="money">-->
        <!--                            </el-table-column>-->
        <!--                            <el-table-column-->
        <!--                                prop="balance"-->
        <!--                                align="center"-->
        <!--                                label="交易后余额">-->
        <!--                            </el-table-column>-->
        <!--                            <el-table-column-->
        <!--                                label="备注"-->
        <!--                                align="center"-->
        <!--                                width="100"-->
        <!--                                prop="remark">-->
        <!--                            </el-table-column>-->
        <!--                            <el-table-column-->
        <!--                                label="创建时间"-->
        <!--                                align="center"-->
        <!--                                prop="created_at">-->
        <!--                            </el-table-column>-->
        <!--                        </el-table>-->
        <!--                        <el-pagination-->
        <!--                            @current-change="handlePageChange($event, '3')"-->
        <!--                            small-->
        <!--                            layout="prev, pager, next"-->
        <!--                            :total="count3">-->
        <!--                        </el-pagination>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </section>-->
        <!--            &lt;!&ndash;订单记录&ndash;&gt;-->
        <!--            <section v-show="activeName=='order'">-->
        <!--                <div class="card">-->
        <!--                    <div>-->
        <!--                        <svg class="icon" aria-hidden="true">-->
        <!--                            <use xlink:href="#icon-icon_favorite"></use>-->
        <!--                        </svg>-->
        <!--                        <span class="f16">订单记录</span>-->
        <!--                        <el-table-->
        <!--                            v-loading="loading4"-->
        <!--                            element-loading-spinner="el-icon-loading"-->
        <!--                            :highlight-current-row="true"-->
        <!--                            border-->
        <!--                            ref="multipleTable"-->
        <!--                            :data="tableData4"-->
        <!--                            tooltip-effect="dark"-->
        <!--                            style="width: 100%;margin-top: 15px"-->
        <!--                            @selection-change="handleSelectionChange">-->
        <!--                            <el-table-column-->
        <!--                                align="center"-->
        <!--                                prop="order_sn"-->
        <!--                                label="订单编号">-->
        <!--                            </el-table-column>-->
        <!--                            <el-table-column-->
        <!--                                prop="buyer_nickname"-->
        <!--                                align="center"-->
        <!--                                label="用户账号">-->
        <!--                            </el-table-column>-->
        <!--                            <el-table-column-->
        <!--                                prop="goods_title"-->
        <!--                                align="center"-->
        <!--                                label="商品名称">-->
        <!--                            </el-table-column>-->
        <!--                            <el-table-column-->
        <!--                                label="订单金额"-->
        <!--                                align="center"-->
        <!--                                prop="total_fee"-->
        <!--                                show-overflow-tooltip>-->
        <!--                            </el-table-column>-->
        <!--                            <el-table-column-->
        <!--                                label="支付方式"-->
        <!--                                align="center"-->
        <!--                                prop="pay_type"-->
        <!--                                show-overflow-tooltip>-->
        <!--                            </el-table-column>-->
        <!--                            <el-table-column-->
        <!--                                label="订单来源"-->
        <!--                                align="center"-->
        <!--                                prop="from"-->
        <!--                                show-overflow-tooltip>-->
        <!--                                <template slot-scope="scope">-->
        <!--                                    {{ scope.row.from | validVal }}-->
        <!--                                </template>-->
        <!--                            </el-table-column>-->
        <!--                            <el-table-column-->
        <!--                                label="订单状态"-->
        <!--                                align="center"-->
        <!--                                prop="status">-->
        <!--                                <template slot-scope="scope">-->
        <!--                                    {{ transStatus(scope.row.status) }}-->
        <!--                                </template>-->
        <!--                            </el-table-column>-->
        <!--                        </el-table>-->
        <!--                        <el-pagination-->
        <!--                            @current-change="handlePageChange($event, '4')"-->
        <!--                            small-->
        <!--                            layout="prev, pager, next"-->
        <!--                            :total="count4">-->
        <!--                        </el-pagination>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </section>-->
        <!--            <section v-show="activeName=='team'">-->
        <!--                <Search-->
        <!--                    :searchOPtions=searchOPtions-->
        <!--                    @selectChange=handelselectChange-->
        <!--                    @searchCallback=handelSearch>-->
        <!--                </Search>-->
        <!--                <el-table-->
        <!--                    element-loading-spinner="el-icon-loading"-->
        <!--                    :highlight-current-row="true"-->
        <!--                    v-loading="loading"-->
        <!--                    border-->
        <!--                    ref="multipleTable"-->
        <!--                    :data="teamData"-->
        <!--                    tooltip-effect="dark"-->
        <!--                    style="width: 100%;"-->
        <!--                    @sort-change="sortChange">-->
        <!--                    <el-table-column-->
        <!--                        sortable="custom"-->
        <!--                        align="center"-->
        <!--                        prop="id"-->
        <!--                        label="用户ID">-->
        <!--                    </el-table-column>-->
        <!--                    <el-table-column-->
        <!--                        align="center"-->
        <!--                        prop="nickname"-->
        <!--                        label="用户昵称">-->
        <!--                    </el-table-column>-->
        <!--                    <el-table-column-->
        <!--                        align="center"-->
        <!--                        prop="phone"-->
        <!--                        label="手机号">-->
        <!--                        <template slot-scope="scope">-->
        <!--                            {{ scope.row.phone | validVal }}-->
        <!--                        </template>-->
        <!--                    </el-table-column>-->
        <!--                    <el-table-column-->
        <!--                        align="center"-->
        <!--                        prop="relation"-->
        <!--                        label="成员关系">-->
        <!--                    </el-table-column>-->
        <!--                    <el-table-column-->
        <!--                        align="center"-->
        <!--                        prop="totalFee"-->
        <!--                        sortable-->
        <!--                        label="返利">-->
        <!--                    </el-table-column>-->
        <!--                    <el-table-column-->
        <!--                        sortable-->
        <!--                        align="center"-->
        <!--                        prop="order_num"-->
        <!--                        label="累计订单量">-->
        <!--                    </el-table-column>-->
        <!--                    <el-table-column-->
        <!--                        sortable-->
        <!--                        align="center"-->
        <!--                        prop="consumption"-->
        <!--                        label="消费额">-->
        <!--                    </el-table-column>-->
        <!--                    <el-table-column-->
        <!--                        sortable-->
        <!--                        align="center"-->
        <!--                        label="加入时间"-->
        <!--                        prop="reg_time"-->
        <!--                        show-overflow-tooltip>-->
        <!--                    </el-table-column>-->
        <!--                </el-table>-->
        <!--                <Pagination-->
        <!--                    :current="current5"-->
        <!--                    :pageSize="pageSize5"-->
        <!--                    :count="count5"-->
        <!--                    @pageChangeCBK="handlePageChange($event, '5')"-->
        <!--                    @sizeChangeCBK="handleSizeChange5">-->
        <!--                </Pagination>-->
        <!--            </section>-->
        <!--        </div>-->


        <el-dialog
            title="选择上级"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form
                :model="shopForm"
                :rules="rules"
                ref="shopForm"
                label-width="120px"
                label-position="right">
                <el-form-item label="选择上级：" prop="store_id" :rules="[simpleRule]">
                    <el-select style="width: 70%;" filterable remote reserve-keyword v-model="shopForm.store_id"
                               placeholder="请输入id搜索" :remote-method="remoteMethod"
                               :loading="loading">
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择上上级：" prop="store_fid">
                    <el-select style="width: 70%;" clearable filterable remote reserve-keyword
                               v-model="shopForm.store_fid" placeholder="请输入id搜索" :remote-method="remoteMethod_f"
                               :loading="loading">
                        <el-option
                            v-for="item in options_f"
                            :key="item.fId"
                            :label="item.fName"
                            :value="item.fId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="请输入密码：" prop="password" :rules="[simpleRule]">
                    <el-input type="password" v-model="shopForm.password"></el-input>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="submitShop">
                    确定
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="绑定用户"
            :visible.sync="showBindUserDialog"
            width="30%"
        >
            <el-form
                :model="bindUserForm"
                ref="bindUserForm"
            >
                <el-form-item label="迁移用户id" prop="to_id" :rules="[simpleRule]">
                    <el-input style="width: 60%;" v-model="bindUserForm.to_id"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showBindUserDialog = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="submitBindUser">
                    确定
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="选择店铺"
            :visible.sync="shopVisible"
            width="30%">
            <el-form
                :model="shop2Form"
                :rules="rules"
                ref="shop2Form"
                label-width="120px"
                label-position="right">
                <el-form-item label="选择店铺：" prop="generalize_id" :rules="[simpleRule]">
                    <el-select style="width: 70%;" filterable remote reserve-keyword v-model="shop2Form.generalize_id"
                               placeholder="请选择" :remote-method="remoteMethod"
                               :loading="loading">
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <!--<el-input v-model="store_id"></el-input>-->
                </el-form-item>
                <!-- <el-form-item label="请输入密码：" prop="pwd" :rules="[simpleRule]">
                    <el-input type="password" v-model="shop2Form.pwd"></el-input>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="shopVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="submitShop2">
                    确定
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="选择类型"
            :visible.sync="dialogVisibletype"
            width="30%">
            <el-form
                :model="typeobj"
                :rules="rules"
                ref="typeobj"
                label-width="120px"
                label-position="right">
                <el-form-item label="选择类型：" prop="level" :rules="[simpleRule]">
                    <el-select style="" filterable remote reserve-keyword v-model="typeobj.level" placeholder="请选择"
                               :remote-method="remoteMethod"
                               :loading="loading">
                        <el-option
                            v-for="item in optionstype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!--<el-input v-model="store_id"></el-input>-->
                </el-form-item>
                <!-- <el-form-item label="请输入密码：" prop="password" :rules="[simpleRule]">
                    <el-input type="password" v-model="typeobj.password"></el-input>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibletype = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="submitType">
                    确定
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="选择团队"
            :visible.sync="dialogVisiblteam"
            width="30%">
            <el-form
                :model="teamForm"
                :rules="rules"
                ref="teamForm"
                label-width="120px"
                label-position="right">
                <el-form-item label="选择团队：">
                    <el-select style="width: 70%;" clearable filterable remote reserve-keyword
                               v-model="teamForm.team_id" placeholder="请选择" :remote-method="partneruser"
                               :loading="loading">
                        <el-option
                            v-for="item in optionsteam_id"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择一级合伙人：">
                    <el-select style="width: 70%;" clearable filterable remote reserve-keyword
                               v-model="teamForm.first_partner_id" placeholder="请选择" :remote-method="firstpartner"
                               :loading="loading">
                        <el-option
                            v-for="item in optionsfirst_partner_id"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择二级合伙人：">
                    <el-select style="width: 70%;" clearable filterable remote reserve-keyword
                               v-model="teamForm.second_partner_id" placeholder="请选择" :remote-method="second_partner"
                               :loading="loading">
                        <el-option
                            v-for="item in optionssecond_partner_id"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <input style="opacity:0">
                <!-- <el-form-item label="请输入密码：" prop="password" :rules="[simpleRule]">
                    <el-input type="password" v-model="teamForm.password"></el-input>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisiblteam = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="submitTeam">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {common} from '@/OMS/mixins';

    import UserBaseInfo from "./components/userBaseInfo";
    import UserAbstract from "./components/userAbstract";
    import TeamRelation from "./components/teamRelation";
    import FundsDetail from "./components/fundsDetail";
    import OrderDetail from "./components/orderDetail";
    import UserCoupon from "./components/userCoupon";
    import UserLogs from "./components/userLogs";


    // 用户详情编辑资料登录日志
    export default {
        name: "userDetail",
        mixins: [common],
        components: {
            UserLogs,
            UserCoupon,
            OrderDetail,
            FundsDetail,
            TeamRelation,
            UserAbstract,
            UserBaseInfo,
        },
        data() {
            const {id, type} = this.$route.params;
            return {
                id,
                showBindUserDialog: false,
                bindUserForm: {
                    to_id: ''
                },
                current: 1,
                current5: 1,
                pageSize: 10,
                pageSize5: 10,
                count: 0,
                count5: 0,
                detailsData: {
                    profile: {},
                    first_team: {},
                    second_team: {},
                },
                addressData: [],
                tableData2: [],
                tableData3: [],
                count3: 0,
                page3: 1,
                loading3: false,
                tableData4: [],
                count4: 0,
                page4: 1,
                loading4: false,
                tableData5: [],
                // activeName: this.$route.params.type,
                activeName: 'userAbstract',

                formLabelAlign: {},
                options: [],
                options_f: [],
                statistical: {},
                value: '',
                radio: '',
                value2: '',
                value1: '',
                userType: 1,
                dialogVisible: false,
                shopVisible: false,
                dialogVisibletype: false,
                dialogVisiblteam: false,
                shopForm: {
                    store_id: '',
                    store_fid: '',
                    // password:'',
                },
                shop2Form: {
                    generalize_id: '',
                    // pwd:'',
                },
                teamForm: {
                    // password:'',
                    team_id: '',
                    first_partner_id: '',
                    second_partner_id: '',
                },
                optionsteam_id: [],
                optionsfirst_partner_id: [],
                optionssecond_partner_id: [],
                teamData: [],
                loading: false,
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'keywords',
                        placeholder: '用户ID/账户/手机号码'
                    },
                    {
                        type: 'select',
                        key: 'level',
                        placeholder: '他的下级',
                        options: [
                            {label: '全部', value: -1, name: '全部',},
                            {label: '下级', value: 11, name: '下级',},
                            {label: '下下级', value: 2, name: '下下级',},
                        ]
                    },
                    {
                        type: 'dateRangePicker',
                        key: 'start_at-end_at',
                        placeholder: '加入时间',
                    }
                ],
                query: {},
                listType: this.$route.params.listType,
                rules: {},
                optionstype: [
                    {label: '会员', value: 1},
                    {label: 'svip', value: 20},
                    {label: '白银', value: 30},
                    {label: '黄金', value: 52},
                    {label: '钻石', value: 51},
                ],
                typeobj: {
                    level: '',
                    // password:'',
                }

            }
        },
        watch: {
            '$route'(to) {
                if (to.name === 'userDetail') {
                    this.id = this.$route.params.id;
                    this.activeName = 'userAbstract';
                    this.$refs.userAbstract && this.$refs.userAbstract.initData(this.id);
                    this.initData();
                }
            },
            'shopForm.store_id'(v) {
                this.options_f = this.options
                this.shopForm.store_fid = this.options[0].fId
            }
        },
        created() {
            this.initData();
        },

        mounted() {
            const el = document.getElementsByClassName('app-main');
            el[0].style.paddingBottom = '16px';

            const ele = document.getElementsByClassName('app-main-box');
            ele[0].style.height = 'calc(100% - 40px)';

        },
        // 销毁的时候还回来padding-bottom 和外层盒子的高度
        destroyed() {
            const el = document.getElementsByClassName('app-main');
            el[0].style.paddingBottom = '100px';

            const ele = document.getElementsByClassName('app-main-box');
            ele[0].style.height = '';
        },


        methods: {
            showBindUser() {
                this.showBindUserDialog = true
                this.$nextTick(() => {
                    this.$refs.bindUserForm.resetFields()
                })
            },
            submitBindUser() {
                this.$refs.bindUserForm.validate(v => {
                    if (v) {
                        this.$api.user.modifyUserId(Object.assign(this.bindUserForm, {
                            id: this.id
                        })).then(res => {
                            this.showBindUserDialog = false
                        })
                    }
                })
            },
            goUserDetail(id, userType) {
                this.$router.push({
                    name: "userDetail",
                    params: {
                        type: 'read',
                        id,
                        listType: userType
                    }
                })
            },
            initData() {
                this.getUpdateUserDetail();


                this.getData();
                this.getBalanceData();
                this.getOrderData();
                if (this.listType != 1) {
                    this.getGroup();
                }
                if (this.listType == 5) {
                    this.searchOPtions.splice(1, 0,
                        {
                            type: 'select',
                            key: 'type',
                            placeholder: '直属',
                            options: [
                                {label: '直属', value: 1},
                                {label: '团队', value: 2},
                            ]
                        },
                    );
                }
            },
            async remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    const {data} = await this.$api.user.storeUser({name: query});
                    this.options = data;
                    this.loading = false;
                } else {
                    this.options = [];
                }
            },
            async remoteMethod_f(query) {
                if (query !== '') {
                    this.loading = true;
                    const {data} = await this.$api.user.storeUser({fname: query});
                    this.options_f = data;
                    this.loading = false;
                } else {
                    this.options_f = [];
                }
            },
            async partneruser(query) {
                if (query !== '') {
                    this.loading = true;
                    const {data} = await this.$api.user.partneruser({name: query, level: 1});
                    this.optionsteam_id = data;
                    this.loading = false;
                } else {
                    this.options = [];
                }
            },
            async firstpartner(query) {
                if (query !== '') {
                    this.loading = true;
                    const {data} = await this.$api.user.partneruser({name: query, level: 2});
                    this.optionsfirst_partner_id = data;
                    this.loading = false;
                } else {
                    this.options = [];
                }
            },
            async second_partner(query) {
                if (query !== '') {
                    this.loading = true;
                    const {data} = await this.$api.user.partneruser({name: query, level: 2});
                    this.optionssecond_partner_id = data;
                    this.loading = false;
                } else {
                    this.options = [];
                }
            },
            handlePageChange(page, type) {
                this[`page${type}`] = page;
                switch (type) {
                    case '3':
                        this.getBalanceData();
                        break;
                    case '4':
                        this.getOrderData();
                        break;
                    case '5':
                        this.current5 = page;
                        this.getGroup();
                        break;
                }

            },
            // 资金明细
            async getBalanceData() {
                try {
                    this.loading3 = true;
                    const {data} = await this.$api.finance.balanceRecordList({
                        uid: this.id,
                        pagesize: 10,
                        page: this.page3
                    });
                    this.tableData3 = data.items;
                    this.count3 = data.count;
                    this.loading3 = false;
                } catch (e) {
                    this.loading3 = false;
                }
            },
            // 订单明细
            async getOrderData() {
                try {
                    this.loading4 = true;
                    const {data} = await this.$api.order.orderList({
                        uid: this.id,
                        pagesize: 10,
                        page: this.page4
                    });
                    this.tableData4 = data.items;
                    this.count4 = data.count;
                    this.loading4 = false;
                } catch (e) {
                    this.loading4 = false;
                }
            },
            genderFormat(gender) {
                switch (gender) {
                    case 0:
                        return '保密';
                    case 1:
                        return '男';
                    case 2:
                        return '女';
                }
            },
            regfromFormat(regfrom) {
                switch (regfrom) {
                    case 1:
                        return 'wechat';
                    case 2:
                        return '小程序';
                    case 3:
                        return 'ios';
                    case 4:
                        return '安卓';
                    case 5:
                        return '后台';
                }
            },
            transStatus(status) {
                switch (status) {
                    case 0:
                        return '已取消';
                    case 1:
                        return '待支付';
                    case 2:
                        return '待发货';
                    case 3:
                        return '待收货';
                    case 4:
                        return '待反馈';
                    case 5:
                        return '已完成';
                    case 6:
                        return '售后';
                    case 7:
                        return '已关闭';
                }
            },
            async handleSubmit() {
                try {
                    const params = Object.assign({}, this.formLabelAlign);
                    params.id = this.id;
                    params.birthday = String(params.birthday / 1000);
                    await this.$api.user.userEdit(params);
                    this.$router.push({name: 'userList'});
                } catch (e) {
                    throw new Error(e);
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            async getData() {
                try {
                    const {data} = await this.$api.user.getUserManageDetail({id: this.id, position: this.listType});
                    this.detailsData = data;
                    this.formLabelAlign = data.profile;
                    this.formLabelAlign.phone = data.phone;
                    this.formLabelAlign.birthday = data.profile.birthday * 1000;
                    this.addressData = data.address;
                    this.statistical = data.statistical;
                    this.userType = data.type;


                    //团队
                    if (data.team.id != 0) {
                        this.teamForm.team_id = data.team.id;
                        this.optionsteam_id.push(data.team);
                    }
                    if (data.first_team.id != 0) {
                        this.teamForm.first_partner_id = data.first_team.id;
                        this.optionsfirst_partner_id.push(data.first_team);
                    }
                    if (data.second_team.id != 0) {
                        this.teamForm.second_partner_id = data.second_team.id;
                        this.optionssecond_partner_id.push(data.second_team);
                    }
                } catch (e) {
                    throw new Error(e);
                }
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            handleSizeChange5(val) {
                this.pageSize = val;
                this.getGroup();
            },
            async showTel(pwd) {
                const {data} = await this.$api.user.checkPwd({pwd: pwd, uid: this.id});
                this.detailsData.phone = data.phone;
            },
            sign() {
                this.$prompt('请输入密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputType: 'password'
                }).then(({value}) => {
                    this.showTel(value);
                }).catch(() => {

                });
            },
            chooseUsertype() {
                this.dialogVisibletype = true;
            },
            submitType() {
                this.$refs.typeobj.validate(async (valid) => {
                    if (valid) {
                        let obj = {...this.typeobj};
                        obj.uid = this.id;
                        await this.$api.user.partnerType(obj);
                        this.getData();
                        this.dialogVisibletype = false;
                        this.typeobj.level = '';
                        // this.typeobj.password='';
                    }

                });
            },
            chooseShop() {
                this.dialogVisible = true;
            },
            submitShop() {
                this.$refs.shopForm.validate(async (valid) => {
                    if (valid) {
                        await this.$api.user.changeStore({
                            // pwd:this.shopForm.password,
                            store_id: this.shopForm.store_id,
                            store_fid: this.shopForm.store_fid,
                            id: this.id
                        });
                        this.getData();
                        this.dialogVisible = false;
                        // this.shopForm.password='';
                    }
                });
            },
            submitShop2() {
                this.$refs.shop2Form.validate(async (valid) => {
                    if (valid) {
                        await this.$api.user.changegeneralize({
                            // pwd:this.shop2Form.pwd,
                            generalize_id: this.shop2Form.generalize_id,
                            id: this.id
                        });
                        this.getData();
                        this.shopVisible = false;
                        // this.shop2Form.pwd='';
                    }
                });
            },
            chooseTeam() {
                this.dialogVisiblteam = true;
            },
            submitTeam() {
                this.$refs.teamForm.validate(async (valid) => {
                    if (valid) {
                        await this.$api.user.changeteam({
                            // pwd:this.teamForm.password,
                            team_id: this.teamForm.team_id || 0,
                            first_partner_id: this.teamForm.first_partner_id || 0,
                            second_partner_id: this.teamForm.second_partner_id || 0,
                            id: this.id,
                        });
                        this.getData();
                        this.dialogVisiblteam = false;
                        // this.teamForm.password='';
                        this.optionsteam_id = [];
                        this.optionsfirst_partner_id = [];
                        this.optionssecond_partner_id = [];
                    }
                });
            },
            async getGroup() {
                try {
                    this.loading = true;
                    const {data} = await this.$api.user.teamDetail({
                        ...this.query,
                        id: this.id,
                        pageSize: this.pageSize5,
                        page: this.current5,
                    });
                    this.teamData = data.list;
                    this.count5 = data.total_num;
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        this.query = {...query};
                        this.current5 = 1;
                        this.getGroup();
                    },
                    reset: () => {
                        this.query = {};
                        this.pageSize5 = 10;
                        this.current5 = 1;
                        this.getGroup();
                    }
                }
                todo[type]();
            },
            sortChange({prop, order}) {
                if (order === 'ascending' || !order) {
                    this.query.sort = prop;
                } else {
                    this.query.sort = `-${prop}`;
                }
                this.getGroup();
            },
            handelselectChange(val, key) {
                //选择回调
                if (key == 'type' && val == 2 && this.searchOPtions.length != 3) {
                    this.searchOPtions.splice(2, 1);
                } else if (this.searchOPtions.length == 3) {
                    this.searchOPtions.splice(2, 0,
                        {
                            type: 'select',
                            key: 'level',
                            placeholder: '他的下级',
                            options: [
                                {label: '全部', value: -1},
                                {label: '下级', value: 1},
                                {label: '下下级', value: 2},
                            ]
                        },
                    );
                }
            },

            // add pulei 2019/12/26  新版本个人基本信息查询
            async getUpdateUserDetail() {
                const {data} = await this.$api.updateUser.getUserDetail({uid: this.id});
                this.$refs.userBaseInfo && this.$refs.userBaseInfo.setData(data);
            }
            // end
        }
    }
</script>

<style scoped>
    .taskReward-content {
        min-width: 1200px;
        background: rgba(240, 242, 245, 1);
        display: flex;
        height: 100%;
        overflow: hidden;
    }

    .taskReward-content .side {
        background: #fff;
        margin-right: 16px;
        border-radius: 4px;
        overflow-y: hidden;
        overflow-x: hidden;
    }

    .taskReward-content .side:hover {
        overflow-y: auto;
    }

    .taskReward-content .infor {
        min-width: calc(1024px - 336px);
        width: calc(100% - 336px);
    }


    .taskReward-content .title {
        padding: 10px;
        border-bottom: 1px solid #E4E4E4;
    }

    .taskReward-content .f16 {
        font-size: 16px
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
        align-items: stretch;
    }

    .card .icon {
        color: #666;
        font-size: 18px
    }

    .table-content .table-row-col {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .table-row-col div:first-child {
        height: 45px;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 15px;
    }

    .table-row-col div:last-child {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding: 10px;
        flex: 1;
        line-height: 20px
    }

    .table-row-col div {
        border-bottom: 1px solid #E4E4E4;
        min-height: 45px;
        border-right: 1px solid #E4E4E4
    }

    .table-content .table-row-col:last-child div {
        border-right: 0
    }

    .table-content .table-row-col img {
        width: 70px;
        height: 50px;
        background-size: cover
    }

    .mune-content span:first-child {
        font-size: 16px;
        display: flex;
        flex: 1
    }

    .block {
        margin: 10px 0
    }

    /*用户信息*/
    .userInfo {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #E4E4E4;
    }

    .userInfo img {
        width: 75px;
        height: 75px;
        background-size: cover;
        border-radius: 50%
    }

    .userInfo .infoTable {
        display: flex;
        flex: 1;
        flex-direction: column
    }

    .headimg {
        width: 240px;
        border-right: 1px solid #E4E4E4;
        justify-content: center;
        align-items: center;
        text-align: center;
        display: flex;
        flex-direction: column;
    }

    .headimg p {
        text-align: center;
        margin: 10px;
    }

    .headimg span {
        background-color: #F04844;
        color: #fff;
        padding: 5px 15px;
        border-radius: 15px;
    }

    .userInfo .infoTable .row {
        display: flex;
        flex-direction: row
    }

    .userInfo .infoTable .row div {
        border-right: 1px solid #E4E4E4;
        border-bottom: 1px solid #E4E4E4;
        display: flex;
        min-height: 45px;
        align-items: center;
        padding: 10px 0;
    }

    .userInfo .infoTable .row:last-child div {
        border-bottom: 0;
    }

    .userInfo .row div:first-child {
        width: 125px
    }

    .userInfo .row div:last-child {
        display: flex;
        flex: 1
    }

    .userInfo .infoTable:last-child .row div:last-child {
        border-right: 0;
    }

    /*.userInfo .infoTable:last-child .row{border-right: 0}*/
    .userInfo .infoTable .row div:first-child {
        width: 100px;
        justify-content: flex-end;
        padding-right: 10px;
    }

    .userInfo .infoTable .row div:last-child {
        padding-left: 10px;
    }

    .f18 {
        font-size: 18px
    }

    .hover-point {
        cursor: pointer;
    }

    .button-choose {
        cursor: pointer;
        background-color: #F04844;
        color: #fff;
        padding: 5px 15px;
        border-radius: 15px;
    }

    .click-color, .jump-btn {
        color: #1790FF;
        cursor: pointer;
    }
</style>

<style lang="scss">
    .taskReward-content {
        .infor {
            .el-row {
                height: 100%;
                .el-tabs {
                    height: 100%;
                    .el-tabs__content {
                        height: 100%;
                        overflow-y: hidden;
                        overflow-x: hidden;
                        &:hover {
                            overflow-y: auto;
                        }
                    }

                }

            }
        }
    }
</style>
