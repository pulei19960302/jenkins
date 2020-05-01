<template>
    <div class="CityPopover">
        <el-checkbox-group
            @change="handleChange"
            v-model="cityChecked">
            <el-checkbox :label="val" class="province"  v-for="val in cityData" :key="val.id">
                {{ val.name }}
            </el-checkbox>
        </el-checkbox-group>
        <el-button type="text" size="mini" @click="handleCancel" style="float: right;margin-top: 10px;">关闭</el-button>
    </div>
</template>

<script>
    export default {
        name: 'CityPopover',
        props: {
            cityData: {
                type: Array
            },
            cityCheckedDefault: {
                type: Array
            }
        },
        components: {},
        data() {
            return {
                cityChecked: []
            }
        },
        computed: {},
        watch: {
            cityCheckedDefault(val) {
                console.log(val, 'cityCheckedDefault')
                // if(val.length > 0) {
                //     this.cityChecked = this.cityCheckedDefault;
                // }
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            handleChange(val) {
                this.$emit('changeCBK', val);
            },
            handleCancel() {
                this.$emit('update:activeId', null);
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../styles/variables";
    .CityPopover {
        position: absolute;
        width: 180px;
        max-height: 200px;
        overflow-x: hidden;
        overflow-y: scroll;
        background: $border;
        padding: 10px;
        flex-wrap: wrap;
        z-index: 1;
        .province {
            display: block;
        }
        .el-checkbox + .el-checkbox {
            margin-left: 0;
        }
    }
</style>
