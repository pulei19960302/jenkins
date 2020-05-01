<template>
    <div class="team-relation">
        <div class="header">
            <div style="display: flex;justify-content: space-between">
                <div style="width: 33.3%;margin-right: 32px">
                    <div class="card">
                        <div class="card-title">总人数（人）</div>
                        <div class="number color-blue">{{ team.count }}</div>
                        <div class="comparison">
                            <div class="title">较上月</div>
                            <div class="number color-blue">{{ team.chang }}</div>
                        </div>
                    </div>
                </div>

                <div style="width: 33.3%;margin-right: 32px">
                    <div class="card">
                        <div class="card-title">团长（人）</div>
                        <div class="number color-gray">{{ store.count }}</div>
                        <div class="comparison">
                            <div class="title">较上月</div>
                            <div class="number color-gray">{{ store.chang }}</div>
                        </div>
                    </div>
                </div>


                <div style="width: 33.3%">
                    <div class="card">
                        <div class="card-title">会员数（人）</div>
                        <div class="number color-green">{{ vip.count }}</div>
                        <div class="comparison">
                            <div class="title">较上月</div>
                            <div class="number color-green">{{ vip.chang }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <el-row style="margin-bottom: 16px">
                <el-col :span="24" style="text-align: right">
                    <el-select placeholder="" style="width: 186px;margin-right: 8px" clearable v-model="type">
                        <el-option label="全部类型" value=""/>
                        <el-option
                            v-for="item in type_map"
                            :key="item.key"
                            :label="item.text"
                            :value="item.key"
                        />
                    </el-select>
<!--                    <el-input placeholder="用户ID/账号/手机号" style="width: 186px;margin-right: 8px" v-model="keywords"/>-->

                    <el-date-picker
                        v-model="times"
                        value-format="yyyy-MM-dd"
                        style="height: 32px !important;margin-right: 8px"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>

                    <el-button type="primary" style="margin-right: 8px !important" @click="loading=true,initData()">搜索</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    :header-cell-style="tableHeaderColor"
                    v-loading="loading"
                >
                    <el-table-column
                        prop="id"
                        label="id"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="头像"
                        width="180">
                        <template slot-scope="scope">
                            <div class="avatar">
                                <img :src="scope.row.avatar" alt="">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="昵称">
                        <template slot-scope="scope">
                            <div style="color: #1890FF">{{scope.row.nickname}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="type_name"
                        label="类型">
                    </el-table-column>
                    <el-table-column
                        sortable
                        :sort-method="(a, b) => sortMethod(a, b, 'consumption')"
                        prop="consumption"
                        label="消费">
                    </el-table-column>
                    <el-table-column
                        sortable
                        :sort-method="(a, b) => sortMethod(a, b, 'balance')"
                        prop="balance"
                        label="贡献">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="手机号">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="created_at"
                        label="注册时间">
                    </el-table-column>
                </el-table>
                <el-pagination
                    v-if="count !== 0"
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="count">
                </el-pagination>
            </el-row>
        </div>
    </div>
</template>

<script>
    import { Loading } from 'element-ui';
    // 团队关系
    export default {
        name: "teamRelation",
        props: {
            uid: {
                type: [String, Number],
                default: ''
            }
        },
        data(){
            return {
                loadingInstance: null,
                tableData: [],
                current: 1,
                page: 1,
                pageSize: 10,
                count: 0,
                type: '',
                keywords: '',
                start_time: '',
                end_time: '',
                type_map: [
                    {text:'会员',key:1},
                    {text:'svip',key:20},
                    {text:'白银',key:30},
                    {text:'黄金',key:52},
                    {text:'钻石',key:51},
                ],
                times: [],
                team: {
                    count: '',
                    chang: ''
                },
                store: {
                    count: '',
                    chang: ''
                },
                vip: {
                    count: '',
                    chang: ''
                },
                loading: false

            }
        },
        mounted() {
            this.loadingInstance = Loading.service({
                target: '.team-relation'
            });
            this.initData();
        },
        methods: {
            tableHeaderColor({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return'font-size:14px;font-weight:500;color:rgba(0,0,0,0.85);line-height:22px;background: #f2f2f2'
                }
            },
            showType() {
                this.current = this.current ===1 ? 2 : 1
            },

            getRequestParam() {
                return {
                    uid: this.uid,
                    page: this.page,
                    pageSize: this.pageSize,
                    type: this.type,
                    keywords: this.keywords,
                    start_time: this.start_time,
                    end_time: this.end_time,
                }
            },

            async initData () {
                try {
                    const { data } = await this.$api.updateUser.getTeamRelation(this.getRequestParam());
                    this.team = data && data.team;
                    this.store = data && data.store;
                    this.vip = data && data.vip;
                    this.tableData = data && data.items;
                    this.count = data && Number(data.count);
                    this.type_map = data && data.type_map;
                } catch (e) {
                    console.log(e);
                } finally {
                    this.loadingInstance.close();
                    this.loading = false;
                }
            },

            handleCurrentChange (v) {
                this.loading = true;
                this.page = v;
                this.initData();
            },
            async reset () {
                this.loading = true;
                this.page = 1;
                this.type = '';
                this.keywords = '';
                this.times = null;
                this.start_time = '';
                this.end_time = '';
                await this.initData();
            },

            sortMethod(a,b,type) {
                const at = a[type];
                const bt = b[type];
                return (Number(at) > Number(bt)) ? 1 : -1;
            },
        },
        watch: {
            times (val) {
                if (!!val) {
                    this.start_time = val[0];
                    this.end_time = val[1];
                } else {
                    this.start_time = "";
                    this.end_time = "";
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .team-relation {
        margin-top: 25px;
        .header {
            .card {
                height: 130px;
                padding: 24px 24px 22px 24px;
                border-radius:10px;
                border:2px solid rgba(237,237,237,1);
                position: relative;
                .card-title {
                    font-size:16px;
                    font-weight:400;
                    color:rgba(119,119,119,1);
                    line-height:28px;
                    margin-bottom: 8px;
                }
                .number {
                    font-size:34px;
                    font-weight:600;
                    line-height:48px;
                }
                .comparison {
                    position: absolute;
                    right: 24px;
                    top: 43px;
                    .title {
                        font-size:12px;
                        font-weight:400;
                        color:rgba(119,119,119,1);
                        line-height:17px;
                        margin-bottom: 8px;
                    }
                    .number {
                        font-size:14px;
                        font-weight:600;
                        line-height:20px;
                    }
                }
            }

            .color-blue {
                color:rgba(45,154,255,1);
            }
            .color-org {
                color:rgba(255, 158, 45, 1)
            }

            .color-green {
                color:rgba(53, 194, 55, 1)
            }
        }
        .content {
            margin: 15px 0 16px 0;
            .change-block {
                display: flex;
                div{
                    cursor: pointer;
                    text-align: center;
                    line-height: 32px;
                    width:60px;
                    height:32px;
                    box-sizing: content-box;
                    border:1px solid rgba(217,217,217,1);
                }
                :first-child{
                    border-right: 0;
                    border-radius:4px 0 0 4px;
                }
                :last-child {
                    border-left: 0;
                    border-radius:0 4px 4px 0;
                }
            }
            .avatar {
                height: 40px;
                width: 40px;
                img {
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                }
            }
        }

        .active {
            color: #ffffff;
            background: rgba(24, 144, 255, 1);
            border-color: rgba(24, 144, 255, 1);
        }
        .isActive {
            background:rgba(255,255,255,1);
            border-color:rgba(217,217,217,1);
            color:rgba(0,0,0,0.65);
        }
    }
</style>
