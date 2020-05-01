<template>
        <div class="temp">
            <div class="item">
                <el-table
                    border
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                        align="center"
                        prop="color"
                        label="运送到">
                        <template slot-scope="scope">
                            <div style="display: flex;align-items: center;justify-content: space-between">
                                <div style="width: 80%;">
                                    <span v-for="(item, index) in scope.row.area_ids" :key="index">
                                        {{ item.name }}
                                        <span v-show="index != (scope.row.area_ids.length-1)">、</span>
                                    </span>
                                </div>
                                <div  style="width: 20%;">
                                    <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="money"
                        label="首体积(m³)">
                        <template slot="header" slot-scope="scope">
                            <div class="flex-center">
                                <span>首{{ transFormName(priceType) }}</span>
                                <el-input
                                    v-model="first_num"
                                    style="width: 60px;"
                                    size="mini"
                                    placeholder=""/>
                                <i class="el-icon-sort-down" @click="batchUse('first_num')"></i>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.first_num"
                                size="mini"
                                style="width: 80%"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="money"
                        label="首费(元)">
                        <template slot="header" slot-scope="scope">
                            <div class="flex-center">
                                <span>首费(元)</span>
                                <el-input
                                    v-model="first_price"
                                    style="width: 60px;"
                                    size="mini"
                                    placeholder=""/>
                                <i class="el-icon-sort-down" @click="batchUse('first_price')"></i>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.first_price"
                                size="mini"
                                style="width: 80%"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="money"
                        label="续体积(m³)">
                        <template slot="header" slot-scope="scope">
                            <div class="flex-center">
                                <span>续{{ transFormName(priceType) }}</span>
                                <el-input
                                    v-model="follow_num"
                                    style="width: 60px;"
                                    size="mini"
                                    placeholder=""/>
                                <i class="el-icon-sort-down" @click="batchUse('follow_num')"></i>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.follow_num"
                                size="mini"
                                style="width: 80%"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="money"
                        label="续费(元)">
                        <template slot="header" slot-scope="scope">
                            <div class="flex-center">
                                <span>续费(元)</span>
                                <el-input
                                    v-model="follow_price"
                                    style="width: 60px;"
                                    size="mini" />
                                <i class="el-icon-sort-down" @click="batchUse('follow_price')"></i>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.follow_price"
                                size="mini"
                                style="width: 80%"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="money"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" style="color: red;" @click="handelDel(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-button type="text" size="mini" @click="handleAdd">为指定地区城市设置运费</el-button>
            <el-dialog
                top="4vh"
                title="选择区域"
                :visible.sync="dialogVisible"
                width="50%">
                <div>
                    <el-row :span="6" v-for="current in areaData" :key="current.id" style="margin-bottom: 10px;">
                        <div class="erea">
                            <el-checkbox-group
                                v-model="areaChecked">
                                <el-checkbox :label="current">
                                    {{ current.name }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <el-checkbox-group
                            v-model="provinceChecked">
                            <el-col :span="6" v-for="curr in current.items" :key="curr.id">
                                <el-checkbox :label="curr" class="province" :indeterminate="curr.id == cityPid">
                                    {{ curr.name }}
                                    <CityPopover
                                        :cityCheckedDefault="cityChecked"
                                        :cityData="curr.items"
                                        v-show="curr.id === activeId"
                                        :activeId.sync="activeId"
                                        @changeCBK="changeCBK"
                                        ref="cityPopover"></CityPopover>
                                </el-checkbox>
                                <i class="el-icon-caret-bottom" @click="handleClick(curr.id)" style="font-size: 14px;margin-left: 4px;cursor: pointer"></i>
                            </el-col>
                        </el-checkbox-group>
                    </el-row>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button
                        type="primary"
                        @click="add">
                        确定
                    </el-button>
                </div>
            </el-dialog>
        </div>
</template>

<script>
    import CityPopover from './CityPopover';

    let i = 0;
    export default {
        name: 'AdressSet',
        props: {
            priceType: {
                type: [String, Number]
            },
            type: {
                type: [String, Number]
            },
            detailData: {
                type: Array,
                default: () => []
            }
        },
        components: { CityPopover },
        data() {
            return {
                isIndeterminate: false,
                first_num: '',
                first_price: '',
                follow_num: '',
                follow_price: '',
                activeId: null,
                options: [],
                dialogVisible: false,
                addressId: null,
                cityPid: null,
                provinceData: [],
                provinceChecked: [],
                areaChecked: [],
                cityData: [],
                cityChecked: [],
                tableData: [],
                areaData: []
            }
        },
        computed: {},
        watch: {
            dialogVisible(val) {
                if(!val) this.activeId = null;
            },
            areaChecked(val, oldval) {
                if(val) {
                    let arr = [];
                    val.map(curr => {
                        arr = arr.concat(curr.items);
                    })
                    this.provinceChecked = arr;
                    return;
                }
                this.provinceChecked = [];
            },
            provinceChecked(val) {
                // 选择区域后，仅仅筛选出省份，过滤市区
                const areaIds = this.areaChecked.map(curr => curr.id);
                const realProvinceChecked = val.filter(current => !areaIds.includes(current.pid));
                // if(realProvinceChecked) {
                //     let arr = [];
                //     realProvinceChecked.map(curr => {
                //         arr = arr.concat(curr.items);
                //     })
                //     this.cityChecked = arr;
                //     return;
                // }
                this.cityChecked = [];
            }
        },
        created() {

        },
        mounted() {
            this.addressId = 1;
            this.tableData = [];
            this.getData()
                .then((data) => {
                    if(this.detailData.length > 0) {
                        const arrids = [];
                        this.detailData.map(curr => {
                            curr.area_ids = curr.areas;
                            curr.areas.map(val => {
                                arrids.push(val.id);
                            })
                        })
                        this.tableData = this.detailData;
                    }
                })
        },
        methods: {
            transFormName(type) {
                if(type == 1) return '件数(件)';
                if(type == 2) return '重量(g)';
                if(type == 3) return '体积(m³)';
            },
            handelDel(id) {
                this.tableData = this.tableData.filter(val => val.id !== id);
            },
            batchUse(val) {
                this.tableData.forEach(curr => {
                    this.$set(curr, val, this[val]);
                });
            },
            handleEdit(row) {
                // this.reset();
                this.addressId = row.id;
                const arrids = [];
                const arr = [];
                row.area_ids.map(curr => {
                    arrids.push(curr.id);
                })
                this.areaData.map(curr => {
                    curr.items.map(current => {
                        if (arrids.includes(current.id)) {
                            arr.push(current);
                        }
                    })
                })
                this.provinceChecked = [...arr];
                // this.provinceChecked = [...arr];

                this.dialogVisible = true;
                // this.getData();
            },
            handleAdd() {
                i++
                this.tableData.push(
                    {area_ids: [{ name:'未添加地区' }], first_num: '', first_price: '',follow_num: '', follow_price: '',id:i, type: this.type}
                );
            },
            reset() {
                this.provinceChecked = [];
                this.cityChecked = [];
                this.cityPid = null;
            },
            handleClick(id) {
                this.activeId = id;
                this.cityData = [];
                this.getData();
            },
            async getData() {
                try {
                    const { data } = await this.$api.common.getAllCity();
                    // this[`${type}Data`] = data;
                    this.areaData = data;
                    return Promise.resolve(data);
                } catch (e) {
                    throw new Error(e);
                }
            },
            add() {
                // 如果有市，过滤对应省份
                this.cityChecked.map(val => {
                    this.provinceChecked.map(current => {
                        this.provinceChecked = this.provinceChecked.filter(curr => curr.pid == current.id)
                    })
                })

                const arr = [...this.provinceChecked, ...this.cityChecked];
                this.tableData.forEach(val => {
                    if(this.addressId === val.id) {
                        val.area_ids = arr;
                    }
                });
                this.dialogVisible = false;
            },
            handlecallBack() {
                this.$emit('successCBK', this.tableData, this.type);
            },
            changeCBK(val) {
                this.cityChecked = val;
                if(this.cityChecked.length > 0) {
                    this.cityChecked.map(val => {
                        this.cityPid = val.pid
                    })
                } else {
                    this.cityPid = null;
                }
            },
        }
    }
</script>

<style lang="scss">
    @import "../../../styles/variables";
    .temp {
        .erea {
            border-bottom: 1px solid $border;
            .el-checkbox {
                color: #ccc;
            }
        }
        .flex-center {
            display: flex;
            justify-content: center;
            align-items: center;
            i {
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                color: $theme;
                &:hover {
                    opacity: .7;
                }
            }
        }
        /*.el-table th > .cell {*/
            /*padding: 0 4px;*/
        /*}*/
        /*.el-table th div {*/
            /*padding: 0;*/
        /*}*/
    }
</style>
