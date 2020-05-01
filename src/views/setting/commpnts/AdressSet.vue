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
                        min-width="500"
                        align="center"
                        prop="color"
                        label="运送到">
                        <template slot-scope="scope">
                            <div style="display: flex;align-items: center;justify-content: space-between;width:100%;">
                                <!-- style="width: 80%;" -->
                                <!-- <div>
                                    <span v-for="(item, index) in scope.row.area_ids" :key="index">
                                        {{ item ? item.name : '' }}
                                        <span v-show="index != (scope.row.area_ids.length-1)">、</span>
                                    </span>
                                </div> -->
                                <!-- 后台返回城市等区域均未返回pid，不能正确回显，故编辑先隐藏 -->
                                <!-- style="width: 20%;" -->
                                <div style="width:100%">
                                    <!-- :checkedKeys="defaultCheckedKeys" -->
                                    <tree-select :options="areaData" :value="scope.row.area_ids" @getValue="ids => getValue(ids, scope.$index)"
                                        :props="{ children: 'items', label: 'name', value: 'id' }" :accordion="true"/>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="money"
                        width="220px"
                        label="首体积(m³)">
                        <template slot="header" slot-scope="scope">
                            <div class="flex-center">
                                <span>首{{ transFormName(priceType) }}</span>
                                <el-input
                                    v-model="first_num"
                                    style="width: 80px;"
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
                        width="220px"
                        label="首费(元)">
                        <template slot="header" slot-scope="scope">
                            <div class="flex-center">
                                <span>首费(元)</span>
                                <el-input
                                    v-model="first_price"
                                    style="width: 80px;"
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
                        width="220px"
                        label="续体积(m³)">
                        <template slot="header" slot-scope="scope">
                            <div class="flex-center">
                                <span>续{{ transFormName(priceType) }}</span>
                                <el-input
                                    v-model="follow_num"
                                    style="width: 80px;"
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
                        width="220px"
                        label="续费(元)">
                        <template slot="header" slot-scope="scope">
                            <div class="flex-center">
                                <span>续费(元)</span>
                                <el-input
                                    v-model="follow_price"
                                    style="width: 80px;"
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
                        fixed="right"
                        align="center"
                        prop="money"
                        width="80px"
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
                    <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
                    <!--:disabled="true"-->
                    <el-row :span="6" v-for="current in areaData" :key="current.id" style="margin-bottom: 10px;">
                        <div class="erea">
                            <el-checkbox-group
                                :indeterminate="isIndeterminate"
                                v-model="areaChecked">
                                <el-checkbox :label="current">
                                    {{ current.name }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <el-checkbox-group
                            v-model="provinceChecked">
                            <el-col :span="4" v-for="curr in current.items" :key="curr.id">
                                <el-checkbox :label="curr" class="province" :indeterminate="curr.id == cityPid" :disabled="realProvinceCheckIds.includes(curr.id) && !provinceCheckIds.includes(curr.id)">
                                    {{ curr.name }}
                                    <div class="cityPopover" v-if="curr.id === activeId">
                                        <el-checkbox-group
                                            @change="handleCheckedCitiesChange($event, curr)"
                                            v-model="cityChecked">
                                            <el-checkbox :label="val" class="province"  v-for="val in curr.items" :key="val.id">
                                                {{ val ? val.name : '' }}
                                            </el-checkbox>
                                        </el-checkbox-group>
                                        <el-button type="text" size="mini" @click="activeId=null" style="float: right;margin-top: 10px;">关闭</el-button>
                                    </div>
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
    import TreeSelect from './TreeSelect';

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
        components: { CityPopover, TreeSelect },
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
                areaData: [],
                realCities: []
            }
        },
        computed: {
            realProvinceCheckIds() {
                const arr = [];
                this.tableData.map(c => {
                    if(c.area_ids) {
                        c.area_ids.map(v => {
                            arr.push(v.id);
                        })
                    }
                });
                return arr;
            },
            provinceCheckIds() {
                return this.provinceChecked.map(c => c.id);
            },
        },
        watch: {
            areaChecked(val, oldval) {
                if(val) {
                    let arr = [];
                    val.map(curr => {
                        arr = arr.concat(curr.items);
                    })
                    this.provinceChecked = arr;
                    this.isIndeterminate = false;
                    return;
                }
                this.provinceChecked = [];
            },
            provinceChecked(val, oldval) {
                if(val) {
                    let arr = [];
                    val.map(curr => {
                        arr = arr.concat(curr.items);
                    })
                    this.cityChecked = arr;
                    return;
                }
                this.cityChecked = [];
            },
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
            getValue(ids, index) {
                // this.$emit('successCBK', arr, this.type);
                this.tableData[index].area_id = ids
            },
            handleEdit(row) {
                this.realCities = []
                this.addressId = row.id;
                const arrids = [];
                const arr = [];
                const correspondCityData = {};
                const a = [];
                let pid;
                row.area_ids.forEach(curr => {
                    arrids.push(curr ? curr.id : '');
                    if(curr.pid && curr.pid !== '0') {
                        pid = curr.pid;
                        a.push(curr.id);
                    }
                })
                if(!Object.keys(correspondCityData).includes(pid)) {
                    if(pid) correspondCityData[pid] = [...a];
                }
                // 回显对应的city
                this.areaData.map(curr => {
                    curr.items.map(current => {
                        if (arrids.includes(current.id)) {
                            arr.push(current);
                        }
                    })
                })
                this.provinceChecked = [...arr];

                // 回显对应的city
                // 后台返回城市等区域均未返回pid，不能正确回显，先隐藏
                // const checkedCount = value.length;
                // this.checkAll = checkedCount === this.exportOptionsValues.length;
                // this.isIndeterminate = checkedCount > 0 && checkedCount < this.exportOptionsValues.length;
                // console.log(correspondCityData, 'correspondCityData')
                if(!row.area_ids[0] || !row.area_ids[0].id) this.areaChecked = [];
                this.dialogVisible = true;
            },
            handleCheckedCitiesChange(val, curr) {
                const ids = val.map(current => {if(current) {
                    return current.id
                }});
                const bool = curr.items.every(current => ids.includes(current.id))
                if(!bool) {
                    const arr = val.filter(current => {
                        if(current) {
                            return current.pid === curr.id
                        }
                    })
                    this.realCities = this.realCities.concat(arr);
                }
            },
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
            handleAdd() {
                i++
                this.tableData.push(
                    { area_ids: [{ name:'未添加地区' }], first_num: '', first_price: '', follow_num: '', follow_price: '', id: `${i}`, type: this.type }
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
            },
            async getData() {
                try {
                    const { data } = await this.$api.common.getAllCity();
                    this.areaData = data;
                    return Promise.resolve(data);
                } catch (e) {
                    throw new Error(e);
                }
            },
            add() {
                let realProvince = [];
                if(this.realCities.length > 0) {
                    realProvince = this.provinceChecked.filter(currs => currs.id !== this.realCities[0].pid);
                } else {
                    realProvince = this.provinceChecked;
                }

                const arr = [...realProvince, ...this.realCities];
                this.tableData.forEach(val => {
                    if(this.addressId === val.id) {
                        val.area_ids = arr;
                    }
                });
                this.dialogVisible = false;
            },
            handlecallBack() {
                const arr = JSON.parse(JSON.stringify(this.tableData))
                arr.forEach(curr => {
                    if(curr.areas) delete curr.areas;
                })
                this.$emit('successCBK', arr, this.type);
            },
            changeCBK(val) {
                this.cityChecked = val;
                if(this.cityChecked.length > 0) {
                    this.cityChecked.map(val => {
                        this.cityPid = val.pid;
                    })
                } else {
                    this.cityPid = null;
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../styles/variables";
    .temp {
        .el-dialog__body {
            padding: 10px;
        }
        .erea {
            border-bottom: 1px solid $border;
            .el-checkbox {
                font-weight: 600;
                font-size: 16px !important;
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
        .cityPopover {
            position: absolute;
            width: 180px;
            max-height: 200px;
            overflow-x: hidden;
            overflow-y: scroll;
            background: $border;
            padding: 10px;
            flex-wrap: wrap;
            z-index: 10;
            .province {
                display: block;
            }
            .el-checkbox + .el-checkbox {
                margin-left: 0;
            }
        }
    }
</style>
