<template>
    <div>
        <el-dialog
            title="修改收货人信息"
            :visible.sync="dialogStatus"
            width="30%">
            <el-form
                v-loading="loading"
                :model="buyer"
                ref="buyerForm"
                label-width="120px"
                label-position="right">
                <el-form-item label="收货人姓名：" prop="title">
                    <el-input
                        v-model="buyer.receiver_name"
                        autocomplete="off"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
                <el-form-item label="手机号码：" prop="title">
                    <el-input
                        v-model="buyer.receiver_mobile"
                        autocomplete="off"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
                <el-form-item label="所在区域：" prop="content">
                    <el-select clearable filterable style="width: 70%;margin:0 5% 10px 0"
                               v-model="buyer.receiver_province_id" placeholder="省" @change="handleSelectChange('province')">
                        <el-option
                            v-for="item in provinceData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select clearable filterable style="width: 70%;margin:0 5% 10px 0"
                               v-model="buyer.receiver_city_id" placeholder="市" @change="handleSelectChange('city')">
                        <el-option
                            v-for="item in cityData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select clearable filterable style="width: 70%;margin:0 5% 10px 0"
                               v-model="buyer.receiver_district_id" placeholder="区县" @change="handleSelectChange('county')">
                        <el-option
                            v-for="item in countyData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select clearable filterable style="width: 70%;margin:0 5% 10px 0"
                               v-model="buyer.receiver_street_id" placeholder="街道">
                        <el-option
                            v-for="item in townData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="详细地址：" prop="title">
                    <el-input
                        type="textarea"
                        :rows="4"
                        v-model="buyer.receiver_address"
                        autocomplete="off"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button
                    type="primary"
                    @click="submit">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "editOrderAddressDialog",
        props: {
            visable: {
                type: Boolean,
                default: false,
            },
            id: {
                type: [String, Number],
                default: ''
            },

            initData: {
                type: Function,
                default: () => {
                }
            }
        },
        data() {
            return {
                loading: false,
                dialogStatus: false,
                buyer: {
                    receiver_name: '',
                    receiver_mobile: '',
                    receiver_province_id: '',
                    receiver_city_id: '',
                    receiver_district_id: '',
                    receiver_street_id: '',
                    receiver_address: '',
                },
                provinceData: [],
                cityData: [],
                countyData: [],
                townData: []
            }
        },
        mounted() {
            this.getCityData(0, 'province');
        },

        methods: {
            async getCityData(pid, type) {
                try {
                    const {data} = await this.$api.common.getAreaList({pid});
                    this[`${type}Data`] = data;
                } catch (e) {
                    throw new Error(e);
                }
            },

            async submit() {
                try {
                    const params = Object.assign({}, this.buyer);
                    params.id = this.id;
                    await this.$api.order.modifyReceive(params);
                    this.cancel();
                    this.initData && this.initData();
                } catch (e) {
                    console.log(e);
                }
            },

            cancel() {
                this.$refs.buyerForm.resetFields();
                this.buyer = {
                    receiver_name: '',
                    receiver_mobile: '',
                    receiver_province_id: '', // 一级
                    receiver_city_id: '', // 二级
                    receiver_district_id: '', // 三级
                    receiver_street_id: '',
                    receiver_address: '',
                };
                this.dialogStatus = false;
            },

            async getReceiverInfo() {
                try {
                    this.loading = true;
                    const {data} = await this.$api.order.getReceiverService({id: this.id});
                    this.buyer = {...this.buyer, ...data};

                    await Promise.all([
                        this.getCityData(this.buyer.receiver_province_id, 'city'),
                        this.getCityData(this.buyer.receiver_city_id, 'county'),
                        this.getCityData(this.buyer.receiver_district_id, 'town')
                    ]);
                } catch (e) {
                    console.log(e)
                } finally {
                    this.loading = false;
                }

            },

            handleSelectChange(type) {
                if (type === 'province') {
                    this.buyer.receiver_city_id = ''
                    this.buyer.receiver_district_id = ''
                    this.buyer.receiver_street_id = ''
                    this.cityData = []
                    this.countyData = []
                    this.townData = []
                    this.getCityData(this.buyer.receiver_province_id, 'city')
                }
                if (type === 'city') {
                    this.buyer.receiver_district_id = ''
                    this.buyer.receiver_street_id = ''
                    this.countyData = []
                    this.townData = []
                    this.getCityData(this.buyer.receiver_city_id, 'county')
                }
                if (type === 'county') {
                    this.buyer.receiver_street_id = ''
                    this.townData = []
                    this.getCityData(this.buyer.receiver_district_id, 'town')
                }
            }
        },
        watch: {
            visable(v) {
                console.log(this.id)
                this.dialogStatus = v;
                if (!!this.id) {
                    this.getReceiverInfo();
                }
            },
            dialogStatus(v) {
                this.$emit('update:visable', v)
            },
        }
    }
</script>

<style scoped>

</style>
