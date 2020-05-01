<template>
    <div class="customerServiceSecord">
        <p class="title">当前客服：小优</p>
        <div class="number">
            <div class="col">
                <div>历史接待次数</div>
                <div>100</div>
            </div>
            <div class="col">
                <div>历史接待人数</div>
                <div>100</div>
            </div>
            <div class="col">
                <div>今日接待次数</div>
                <div>100</div>
            </div>
            <div class="col">
                <div>今日接待人数</div>
                <div>100</div>
            </div>
        </div>
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
        </Search>
        <div class="table">
            <div class="mb10">
                <el-radio-group v-model="tabPosition" style="border-bottom: 0">
                    <el-radio-button label="top">今天</el-radio-button>
                    <el-radio-button label="right">最近一周</el-radio-button>
                    <el-radio-button label="bottom">最近一月</el-radio-button>
                    <el-radio-button label="left">全部</el-radio-button>
                </el-radio-group>
                <el-button type="primary" plain>导出</el-button>
            </div>
            <div class="record-list">
                <div class="left">
                    <div class="left-list">
                        <i class="head" style="background: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541742743865&di=1697a43105bde42f780bb5bffe6a3f5d&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3841743209%2C952064471%26fm%3D214%26gp%3D0.jpg')"></i>
                        <div class="serviceInfo">
                            <div class="name">大荔</div>
                            <div class="time">开始时间：2017-08-10 11:40:03   结束时间：2017-08-10 11:50:55</div>
                        </div>
                    </div>
                    <div class="left-list">
                        <i class="head" style="background: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541742743865&di=1697a43105bde42f780bb5bffe6a3f5d&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3841743209%2C952064471%26fm%3D214%26gp%3D0.jpg')"></i>
                        <div class="serviceInfo">
                            <div class="name">大荔</div>
                            <div class="time">开始时间：2017-08-10 11:40:03   结束时间：2017-08-10 11:50:55</div>
                        </div>
                    </div>
                    <Pagination
                        :current="current"
                        :pageSize="pageSize"
                        :count="count"
                        @pageChangeCBK="handlePageChange"
                        @sizeChangeCBK="handleSizeChange">
                    </Pagination>
                </div>
                <div class="right">
                    <div class="detail">
                        <p class="begin-time">2017-08-10 10:47:42</p>
                        <div class="detail-list">
                             <div class="name-time">小优  2017-08-10 10:47:42</div>
                             <div class="word">您好！小优很高兴为您服务~活动期间咨询人数较多，请您耐心等候！</div>
                        </div>
                        <div class="detail-list">
                            <div class="name-time">小优  2017-08-10 10:47:42</div>
                            <div class="word">您好！小优很高兴为您服务~活动期间咨询人数较多，请您耐心等候！</div>
                        </div>
                        <div class="detail-list">
                            <div class="name-time">小优  2017-08-10 10:47:42</div>
                            <div class="word">您好！小优很高兴为您服务~活动期间咨询人数较多，请您耐心等候！</div>
                        </div>
                    </div>

                    <Pagination
                        :current="current"
                        :pageSize="pageSize"
                        :count="count"
                        @pageChangeCBK="handlePageChange"
                        @sizeChangeCBK="handleSizeChange">
                    </Pagination>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    //客服记录
    export default {
        name: "customerServiceSecord",
        data() {
            return {
                tabPosition: 'top',
                query:{},
                current: 1,
                pageSize: 10,
                count: 9,
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'keywords',
                        placeholder: '搜索关键字'
                    },
                    {
                        type: 'datePicker',
                        key: 'sdate2',
                        placeholder: '选择时间'
                    },
                ]
            };
        },
        methods:{
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        this.query = { ...query };
                        this.current = 1;
                        this.getData();
                    },
                    reset: () => {
                        this.query = {};
                        this.pageSize = 10;
                        this.current = 1;
                        this.getData();
                    }
                }
                todo[type]();
            },
            getData(){
                //获取列表数据
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            handlePageChange(val) {
                this.current = val;
                this.getData();
            }
        }
    }
</script>

<style scoped>
    .customerServiceSecord{border: 1px solid #E4E4E4}
    .customerServiceSecord .title{border-bottom: 1px solid #E4E4E4;padding: 10px;margin: 0;font-size: 14px;margin-bottom: 20px;}
    .number{display: flex;flex-direction: row;margin: 20px;border:1px solid #E4E4E4 }
    .number .col{display: flex;flex: 1;align-items: center;justify-content: center;flex-direction: column;height: 90px}
    .number .col div{display: flex;flex: 1;align-items: center;width: 100%;justify-content: center }
    .number .col div:first-child{border-bottom: 1px solid #E4E4E4;}
    .number .col div{border-right: 1px solid #E4E4E4;}
    .number .col:last-child div{border-right: 0}
    .table{margin: 20px}
    .record-list{display: flex;flex-direction: row;border: 1px solid #E4E4E4}
    .record-list .left, .record-list .right, .left-list{display: flex;flex: 1}
    .record-list .left{border-right: 1px solid #E4E4E4;}
    .left .head{
        display: flex;
        width: 50px;
        height: 50px;
        background-size:cover!important;
        border-radius: 50%;
    }
    .record-list .left{
        display: flex;
        flex-direction: column;
    }
    .record-list .left-list:last-child{border-bottom: 0;}
    .left-list{height: 80px;align-items: center;padding:0 20px;border-bottom: 1px solid #E4E4E4;max-height: 80px}
    .serviceInfo{display: flex;flex: 1;margin-left: 20px;flex-direction: column;height: 100%;}
    .serviceInfo div:first-child{    margin: 20px 0 15px;}
    .serviceInfo .time{color: #999;font-size: 12px}
    .block{margin: 10px}
    .table .el-radio-button__inner{border-bottom: 0!important;}
    /*右边*/
    .table .right{flex-direction: column;font-size: 12px}
    .table .right .begin-time{text-align: center;color: #999;margin-bottom: 30px}
    .table .right .detail{padding: 20px;border-bottom:1px solid #E4E4E4;min-height: 400px }
    .detail-list{margin-bottom: 20px;}
    .detail-list .name-time{color: #999;margin-bottom: 10px}
    .detail-list .word{line-height: 18px}
</style>
