<template>
    <div class="specialSetting">
        <p class="title">首页板式</p>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content add" v-permission="[$api.setting.specialActivity.add]" style="cursor: pointer" @click="opModal()">
                    新增板式
                </div>
            </el-col>
            <el-col :span="12" v-for="(item, index) in listData" :key="index">
                <div class="grid-content">
                    <div class="top" @click="opModal(item)">
                        <div class="top-left">
                            <div class="banner-in table-img" :class="item.plate_index" @click.stop="opBannerModal(index)">
                                <div class="block" v-for="(i) in parseInt(item.num, 10)" :key="i">
                                    <img v-if="item.content && item.content[i-1] && item.content[i-1].image" class="banner-img" :src="item.content[i-1].image" alt=''/>
                                </div>
                            </div>
                        </div>
                        <div class="top-right">
                            <div>名称：{{item.name}}</div>
                            <div>类型：{{item.plate_type | plateName}}</div>
                            <div>板式数量：{{item.num}}</div>
                        </div>
                    </div>
                    <div class="center" @click="opModal(item)">
                        <div class="details">详细内容</div>
                        <div class="details-right" :style="{ color: item.enabled === '1' ? '#1890ff' : 'inherit'}">
                            <div v-for="(con, index) in item.content" :key="index">
                                {{ `${(index+1)}：${plateName(con.type)}` }}
                            </div>
                        </div>
                    </div>
                    <div class="bottom">
                        <el-button size="medium" :type="item.enabled === '1' ? 'primary' : 'info'"
                            v-permission="[$api.setting.specialActivity.editStatus]"
                            :plain="item.enabled === '1'  ? false : true" @click="start(index)">
                            {{ item.enabled === '1' ? '已生效' : '启用' }}
                        </el-button>
                        <el-button size="medium" :type="item.enabled === '1' ? 'info' : 'danger'"
                            v-permission="[$api.setting.specialActivity.editStatus]"
                            :plain="item.enabled === '1' ? true : false"
                            @click="item.enabled === '1' ? stop(index) : deleteItem(index)">
                            {{ item.enabled === '1' ? '停用' : '删除' }}
                        </el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <RightSidePopup noOutside :visible.sync="visible" style="width: 800px">
            <CreateSpecial :visible.sync="visible" ref="detail" :data="data"/>
        </RightSidePopup>
        <el-dialog title="板式预览" :width="'650px'" :visible.sync="bannerVisible">
            <div class="banner-in big" :class="listData[bannerIndex] && listData[bannerIndex].plate_index">
                <div class="block" v-for="v in (listData[bannerIndex] || {}).content" :key="v.id">
                    <img class="banner-img" :src="v.image" alt=''/>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import CreateSpecial from './commpnts/createSpecial'
    const PLATE_TYPE = {
        '1': '专题',
        '2': '拼团'
    }
    //专题列表
    export default {
        name: "specialSetting",
        data() {
            return {
                listData: [],
                visible: false,
                bannerVisible: false,
                bannerIndex: -1,
                data: undefined
            }
        },
        components: {
            CreateSpecial
        },
        computed: {
            plateName () {
                return function (type) {
                    return PLATE_TYPE[type]
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            opBannerModal (index) {
                this.bannerVisible = true
                this.bannerIndex = index
            },
            getList () {
                this.$api.setting.getSpecialActivityList().then(res => {
                    this.listData = res.data.data
                }).catch((err)=>{ })
            },
            opModal (item) {
                if (item && item.enabled === '1') {
                    return
                }
                this.data = item
                this.visible = true
            },
            start (index) {
                this.$api.setting.editStatusSpecialActivity({
                    id: this.listData[index].id,
                    enabled: '1'
                }).then(_ => {
                    this.getList()
                })
            },
            stop (index) {
                this.$api.setting.editStatusSpecialActivity({
                    id: this.listData[index].id,
                    enabled: '0'
                }).then(_ => {
                    this.getList()
                })
            },
            deleteItem (index) {
                this.$confirm('删除类型会删除关联的问题，是否继续', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                     this.$api.setting.editStatusSpecialActivity({
                        id: this.listData[index].id,
                        delflag: '1'
                    }).then(_ => {
                        this.listData.splice(index, 1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    })
                })
            },
        },
        watch: {
            visible (val) {
                if (!val) {
                    this.getList()
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .specialSetting{
        border: 1px solid #E4E4E4;
        background-color: #fff;
        .title {
            padding: 10px;
            border-bottom: 1px solid #E4E4E4;
            margin-bottom: 20px;
            font-weight: bold;
        }
        .el-col-12 {
            border-right: 1px solid #eee;
            margin-bottom: 50px;
        }
        .grid-content {
            width: 450px;
            height: 262px;
            margin: 0 auto;
            &.add {
                text-align: center;
                line-height: 262px;
                color: #ccc;
                font-weight: bolder;
                font-size: 25px;
                cursor: pointer;
                border: 1px solid #eee;
                &:hover {
                    border: 1px solid #ccc;
                    color: #999;
                }
            }
            .top {
                cursor: pointer;
                overflow: hidden;
                .top-left {
                    height: 140px;
                    border: 1px solid #eee;
                    float: left;
                    
                }
                .top-right {
                    width: 200px;
                    height: 140px;
                    float: left;
                    text-indent: 10px;
                    line-height: 40px;
                    margin-top: 10px;
                    margin-left: 10px;
                }
            }
            .center {
                line-height: 26px;
                margin-bottom: 10px;
                overflow: hidden;
                cursor: pointer;
                .details {
                    width: 100px;
                    float: left;
                }
                .details-right {
                    float: left;
                    width: calc(100% - 100px);
                }
            }
            .bottom {
                margin-top: 10px;
                .el-button:first-child{
                    width: calc(100% - 150px);
                }
                .el-button:last-child {
                    width: 100px;
                }
            }
        }
    }
    .banner-in.big {
        float: none;
        width: 600px;
        height: 420px;
        &:hover {
            border: 1px solid #eeeeee;
        }
         &.style_1_1 {
            padding: 30px;
            .block {
                width: 100%;
                height: 210px;
                margin-top: 75px;
            }
        }
        &.style_2_1 {
            margin-top: 0px;
            padding: 30px;
            .block {
                width: 46%;
                height: 240px;
                float: left;
                margin-left: 8%;
                margin-top: 60px;
            }
        }
        &.style_2_2 {
            padding: 30px;
            .block {
                width: 100%;
                height: 165px;
                margin-top: 30px;
                &:first-child {
                    height: 105px;
                }
            }
        }
        &.style_3_1 {
            padding: 30px;
            .block {
                height: 105px;
                margin-top: 30px;
                &:nth-child(2), &:nth-child(3){
                    height: 165px;
                }
                &:nth-child(3){
                    margin-left: 51px;
                }
            }
        }
        &.style_3_2 {
            padding: 30px;
            .block {
                height: 165px;
                margin-top: 165px;
                &:nth-child(1), &:nth-child(2){
                    height: 105px;
                    margin-top: 30px;
                }
                &:nth-child(2){
                    margin-left: 51px;
                }
            }
        }
        &.style_3_3 {
            padding: 30px;
            .block {
                width: 30%;
                height: 180px;
                margin-left: 4.5%;
                margin-top: 90px;
            }
        }
    }
    .banner-in {
        float: left;
        width: 200px;
        height: 140px;
        border: 1px solid #eeeeee;
        cursor: pointer;
        .block {
            color: #eeeeee;
            background-color: #eeeeee;
            text-align: center;
        }
        .banner-img {
            width: 100%;
            height: 100%;
        }
        margin-left: 10px;
        &:first-child {
            margin-left: 0;
        }
        &.style_1_1 {
            margin-top: 0px;
            padding: 10px;
            .block {
                width: 100%;
                height: 70px;
                margin-top: 25px;
                height: 70px;
            }
        }
        &.style_2_1 {
            margin-top: 0px;
            padding: 10px;
            .block {
                width: 46%;
                height: 80px;
                float: left;
                margin-left: 8%;
                margin-top: 20px;
                &:first-child {
                    margin-left: 0;
                }
            }
        }
        &.style_2_2 {
            margin-top: 0px;
            padding: 10px;
            .block {
                width: 100%;
                height: 55px;
                margin-top: 10px;
                &:first-child {
                    height: 35px;
                }
            }
        }
        &.style_3_1 {
            margin-top: 0px;
            padding: 10px;
            .block {
                width: 100%;
                height: 35px;
                margin-top: 10px;
                &:nth-child(2), &:nth-child(3){
                    height: 55px;
                    width: 45%;
                    float: left;
                }
                &:nth-child(3){
                    margin-left: 17px;
                }
            }
        }
        &.style_3_2 {
            margin-top: 0px;
            padding: 10px;
            .block {
                width: 100%;
                height: 55px;
                margin-top: 55px;
                &:nth-child(1), &:nth-child(2){
                    height: 35px;
                    width: 45%;
                    float: left;
                    margin-top: 10px;
                }
                &:nth-child(2){
                    margin-left: 17px;
                    &::after{
                        clear:both;content:'';display:block;width:0;height:0;visibility:hidden;
                    }
                }
            }
        }
        &.style_3_3 {
            margin-top: 0px;
            padding: 10px;
            .block {
                width: 30%;
                height: 60px;
                float: left;
                margin-left: 4.5%;
                margin-top: 30px;
                &:first-child {
                    margin-left: 0;
                }
            }
        }
        &:hover, &.choose {
            border: 1px solid #1890ff;
        }
        &.choose {
            .block {
                color: #ffffff;
                background-color: #1890ff !important;
            }
        }
    }
</style>
