<template>
    <div className="specialManager">
        <el-form label-position="right" label-width="100px">
            <el-row :gutter="20">
                <el-col :span="8" v-for="(form, index) in listData" :key="index">
                    <div class="grid-content">
                        <i class="el-icon-close" @click="deleteItem(form, index)" v-permission="[$api.activity.specialManager.delete]"/>
                        <div class="form-content">
                            <el-form-item label="专题名称：">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="实现方式：">
                                <el-radio v-for="item in wayList" :key="item.value" @change="onRadiochange(form, index)"
                                    v-model="form.way" :label="item.value">{{item.name}}</el-radio>
                                <el-select v-model="form.otherWay" placeholder="请选择活动区域" >
                                    <el-option v-for="item in wayListOther" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="参数：">
                                <el-input v-model="form.param"></el-input>
                            </el-form-item>
                            <el-form-item label="已选商品：" v-if="form.way === '1'">
                                <span class="detail-btn" @click.stop="showChooseGoods = true; choose_good_ids = form.extra.id || []; chooseIndex = index">查看详情</span>
                            </el-form-item>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content" style="cursor: pointer" @click="addItem" v-permission="[$api.activity.specialManager.edit]">
                        <i class="el-icon-plus"/>
                    </div>
                </el-col>
            </el-row>
        </el-form>
        <div class="submit">
            <el-button type="primary" size="medium" @click="submit" :loading="btnLoading" v-permission="[$api.activity.specialManager.edit]">提 交</el-button>
        </div>
        <ChooseGoods :specialId="(listData[chooseIndex] || {}).id" :choosedGoodsId.sync="choose_good_ids" :showChooseGoods.sync="showChooseGoods"></ChooseGoods>
    </div>
</template>

<script>
    import ChooseGoods from './components/specialChooseGoods'
    const wayList = [{
        value:'1',
        name:'H5链接'
    },{
        value:'2',
        name:'商品分类'
    }, {
        value:'3',
        name:'商品详情'
    }, {
        value:'other',
        name:'其他'
    }]
    const wayListOther = [{
        value:'7',
        name:'外联'
    }, {
        value:'4',
        name:'我的订单'
    }, {
        value:'5',
        name:'富文本(新人导航)'
    }, {
        value:'6',
        name:'优惠券'
    }, {
        value:'9',
        name:'直播'
    }, {
        value:'8',
        name:'不跳转'
    }]
    //专题列表
    export default {
        name: "specialManager",
        components:{
            ChooseGoods 
        },
        data() {
            return {
                listData: [],
                wayList,
                wayListOther,
                chooseIndex: -1,
                choose_good_ids: [],
                showChooseGoods:false,
                btnLoading: true
            }
        },
        created () {
            this.getList()
            // this.$api.activity.getWay().then(res => {
            //     console.log(res)
            // })
        },
        methods: {
            getList: function () {
                this.$api.activity.getSpecialList({}).then(res => {
                    res.data.data.forEach(v => {
                        v.otherWay = "7"
                        if (v.way) {
                            if (parseInt(v.way, 10) < 4) {
                                v.otherWay = "7"
                            } else {
                                v.otherWay = v.way
                                v.way = 'other'
                            }
                        }
                    })
                    this.listData = res.data.data
                    this.btnLoading = false
                }).catch((err)=>{ })
            },
            onRadiochange: function (form, index) {
                if (form.way === "1") {
                    this.chooseIndex = index
                    this.showChooseGoods = true
                    this.choose_good_ids = form.extra.id || []
                }
            },
            addItem: function () {
                this.listData.push({
                    otherWay: "7",
                    extra: {
                        id: []
                    }
                })
            },
            deleteItem: function (form, index) {
                if (form.id) {
                    this.$confirm('确认删除该专题设置，删除后不可恢复', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.btnLoading = true
                        this.$api.activity.deleteSpecial({
                            id: form.id
                        }).then(res => {
                            this.listData.splice(index, 1)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                        }).finally(_ => {
                            this.btnLoading = false
                        })
                    })
                } else {
                    this.listData.splice(index, 1)
                }
            },
            submit: function () {
                this.btnLoading = true
                let data = [...this.listData]
                data.forEach(v => {
                    if (v.way === 'other') {
                        v.way = v.otherWay
                    }
                    v.otherWay = undefined
                })
                this.$api.activity.editSpecial({
                    data
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '提交成功!'
                    })
                    this.getList()
                }).catch((err)=>{
                    this.btnLoading = false
                })
            }
        },
        watch: {
            showChooseGoods: {
                handler(v){
                    if (this.showChooseGoods === false) {
                        this.listData[this.chooseIndex].extra.id = this.choose_good_ids
                        this.chooseIndex = -1
                        this.choose_good_ids = []
                    }
                },
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-row {
        margin-bottom: 20px;
        &:last-child {
        margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 296px;
        margin-top: 20px;
        background-color: #fff;
        position: relative;
        padding-top: 20px;
        padding-right: 20px;
        overflow: hidden;

        .el-icon-close {
            position: absolute;
            right: 5px;
            top: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        .el-icon-plus {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
            font-size: 50px;
            color: #666;
        }
        .form-content {
            max-width: 270px;
            margin: 0 auto;
            .el-radio {
                display: block;
                margin-left: 0 !important;
                margin-top: 10px;
            }
            .el-form-item__content {
                position: relative;
                .el-select.el-select--small {
                    width: 75%;
                    position: absolute;
                    right: -20px;
                    bottom: -8px;
                }
            }
            .detail-btn {
                color: #1890ff;
                cursor: pointer;
            }
        }
    }
    .submit {
        // position: fixed;
        // bottom:114px;
        // left:50%;
        // transform: translateX(-50%);
        margin-top: 20px;
        text-align: center
    }
</style>
