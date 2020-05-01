<template>
    <div class="permissionsSettings">
        <p class="title">权限设置</p>
        <div class="detail">
            <el-checkbox v-model="checkeAll" class="mt20">全选</el-checkbox>
            <div class="card" v-for="(val, index) in permissions" :key="index">
                <div class="row-title">
                    <el-checkbox
                        @change="handleFirstChange($event, val.key)"
                        :indeterminate="isIndeterminate"
                        v-model="val.checked">
                        {{ val.name }}
                    </el-checkbox>
                </div>
                <div class="row" v-for="(curr, idx) in val.items" :key="idx">
                    <div class="row-left">
                        <el-checkbox
                            @change="handleSecondChange($event, val.key, curr.key)"
                            :indeterminate="isIndeterminate"
                            v-model="curr.checked">
                            {{ curr.name }}
                        </el-checkbox>
                    </div>
                    <div class="row-right">
                        <span v-for="item in curr.items" :key="item.key">
                            <el-checkbox-group v-model="item.checked">
                                <el-checkbox
                                    :label="item.key"
                                    :key="item.key">
                                    {{ item.name }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </span>
                    </div>
                </div>
            </div>
            <div style="text-align: center;margin: 20px 0">
                <el-button type="primary" @click="roleAssign">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    // 权限设置
    export default {
        name: "permissions",
        data() {
            const { id } = this.$route.params;
            return {
                id,
                checkeAll: false,
                checkAll: false,
                isIndeterminate: false,
                permissions: []
            }
        },
        watch: {
            checkeAll(bool) {
                this.recursiveSetAll(this.permissions, bool);
            }
        },
        created() {
            this.getData();
        },
        methods: {
            handleFirstChange(bool, key) {
                this.permissions = this.recursiveSet(this.permissions, key, bool, 1);
            },
            handleSecondChange(bool, key, key2) {
                this.permissions = this.recursiveSet2(this.permissions, key, bool, key2);
            },
            /**
             * 选中所有
             * @param arr  需要选中数据
             * @param bool 是否选中
             */
            recursiveSetAll(arr, bool) {
                arr.map(val => {
                    if(val.items && val.items.length > 0) {
                        this.recursiveSetAll(val.items, bool);
                    }
                    val.checked = bool;
                })
            },
            /**
             * 递归第一层批量设置
             * @param arr  需要选中数据
             * @param key  第一层key
             * @param bool 是否选中
             * @param flag 第一层以后flag(flag > 1表示对应子集)
             * @returns {*}
             */
            recursiveSet(arr, key , bool, flag) {
                arr.map(val => {
                    if(val.items && val.items.length > 0 && (val.key === key || flag > 1)) {
                        this.recursiveSet(val.items, key, bool, 2);
                    }
                    if(val.key === key || flag > 1) val.checked = bool;
                })
                return arr;
            },
            /**
             * 第二层批量设置
             * @param arr  需要选中数据
             * @param key  第一层key
             * @param bool 是否选中
             * @param key2 第二层key
             * @returns {*}
             */
            recursiveSet2(arr, key , bool, key2) {
                arr.map(val => {
                    if(val.key === key) {
                        val.items.map(c => {
                            if(c.key === key2) {
                                c.items.map(v => v.checked = bool)
                            }
                        })
                    }
                })
                return arr;
            },
            // 获取对应权限数据
            async getData() {
                try {
                    const { data } = await this.$api.jurisdiction.roleDetail({ name: this.id });
                    this.permissions = data.items;
                } catch (e) {
                    throw new Error(e);
                }
            },
            // 设置权限
            async roleAssign() {
                // 筛选第三层真实key
                const checkedPermissionsFirst = [];
                const checkedPermissionsSecond = [];
                const checkedPermissionsThird = [];
                this.permissions.map(val => {
                    if(val.checked) {
                        checkedPermissionsFirst.push(val.key);
                    }
                    if(val.items && val.items.length > 0) {
                        val.items.map(curr => {
                            if(curr.checked) {
                                checkedPermissionsFirst.push(val.key);
                                checkedPermissionsSecond.push(curr.key);
                            }
                            if(curr.items && curr.items.length > 0) {
                                curr.items.map(c => {
                                    if(c.checked) {
                                        checkedPermissionsThird.push(c.key);
                                    }
                                })
                            }
                        })
                    }
                })
                // 去重
                const permissions = [...new Set([...checkedPermissionsSecond, ...checkedPermissionsThird, ...checkedPermissionsFirst])]
                try {
                    await this.$api.jurisdiction.roleAssign({
                        role: this.id,
                        permissions
                    });
                    this.$router.push({ name: 'roleManagement' });
                } catch (e) {
                    throw new Error(e);
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .permissionsSettings {
        border-radius: 4px;
        background: #fff;
        padding-bottom: 16px;
    }
    .permissionsSettings .title {
        padding: 0 24px;
        height: 56px;
        font-size: 16px;
        font-weight: 500;
        line-height: 56px;
        border-bottom: 1px solid #E4E7ED;
    }
    .detail {
        margin: 20px;
        margin-top: 0
    }
    /*表格*/
    .card {
        display: flex;
        flex-direction: column;
        border: 1px solid #E4E4E4;
        border-right: 0;
        border-bottom: 0;
        margin-top: 20px
    }
    .card .row {
        display: flex;
        flex-direction: row;
        flex: 1;
        align-items: stretch;
    }
    .row-left {
        width: 150px;
        display: flex;
        align-items: center;
        justify-content: start;
        border-right: 1px solid #E4E4E4;
        border-bottom: 1px solid #E4E4E4;
        padding-left: 30px;
    }
    .row-right {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        flex: 1;
        border-right: 1px solid #E4E4E4;
        border-bottom: 1px solid #E4E4E4;
    }
    .row-right div {
        min-width: 20%;
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        // border-bottom: 1px solid #E4E4E4;
        padding-left: 10px;
    }
    .card div {
        min-height: 60px;
        align-items: center;
        box-sizing: border-box;
    }
    .row-title {
        align-items: center;
        padding-left: 10px;
        display: flex;
        border-bottom: 1px solid #E4E4E4;
        border-right: 1px solid #E4E4E4;
        font-weight: bold;
    }
    .bottom-select {
        height: 45px;
        text-align: center;
        border: 1px solid #E4E4E4;
        margin-top: 20px;
        line-height: 45px
    }
</style>
<style lang="scss">
    .permissionsSettings {
        .el-checkbox + .el-checkbox {
            margin-left: 0;
        }
        .el-checkbox {
            margin-right: 30px;
        }
    }
</style>
