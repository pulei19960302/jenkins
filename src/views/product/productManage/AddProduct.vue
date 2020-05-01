<template>
    <div class="add-product">
        <!-- <AddProductStep1
            :id="id"
            :editData="step1EditData"
            @step1CBK="step1CBK"
            v-if="step === 0"
            :active.sync="step">
        </AddProductStep1> -->
        <AddProductStep2
            :id="id"
            :editData="step2EditData"
            :step1Data="{}"
            v-if="!id || id && step"
            :active.sync="step">
        </AddProductStep2>
    </div>
</template>
<script>
    import AddProductStep1 from './components/AddProductStep1';
    import AddProductStep2 from './components/AddProductStep2';

    export default {
        name: 'AddProduct',
        components: {
            AddProductStep1,
            AddProductStep2,
        },
        data() {
            const { type, id } = this.$route.params;
            return {
                type, id,
                step: 0,
                region: '',
                options: [],
                step1Data: {},
                step1EditData: {},
                step2EditData: {}
            }
        },
        /**
         * 多页面同时存在编辑与新增时，新增重置，编辑回填
         */
        watch: {
            '$route'(val) {
                // const { id } = val.params;
                // if(!id) {
                //     this.id = null;
                //     this.step1Data = {};
                //     this.step = 0;
                // } else {
                //     this.id = id;
                //     this.getdetail()
                //         .then(bool => {
                //             if(bool) this.step = 1;
                //         })
                // }
                this.$refreshTab()
            }
        },
        created() {
            if(this.id) {
                this.getdetail()
                    .then(bool => {
                        if(bool) this.step = 1;
                    })
            }
        },
        methods: {
            step1CBK(step1Data) {
                this.step1Data = step1Data;
            },
            async getdetail() {
                try {
                    const { data } = await this.$api.product.getdetail({ id: this.id });
                    this.step1Data.cat1 = {
                        id: data.detail.cat_id1,
                        label: data.detail.cat1_name
                    }
                    this.step1Data.cat2 = {
                        id: data.detail.cat_id2,
                        label: data.detail.cat2_name
                    }
                    this.step1Data.cat3 = {
                        id: data.detail.cat_id3,
                        label: data.detail.cat3_name
                    }
                    this.step2EditData = data;
                    return Promise.resolve(true);
                } catch (e) {
                    throw new Error(e);
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .add-product {
        // background: #fff;
        width: 100%;
        margin: 0 auto;
        // padding-top: 10px;
        padding-bottom: 50px;
    }
</style>
<style lang="scss">
    .add-product {
        .el-step {
            &__icon {
                width: 50px;
                height: 50px;
                &-inner {
                    font-size: 28px;
                }
            }
            &__line {
                top: 25px !important;
            }
        }
    }
</style>
