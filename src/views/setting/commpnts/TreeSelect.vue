<template>
    <el-select style="width:100%" size="medium" :value="valueTitle" :clearable="false" multiple @clear="clearHandle"
               @change="onSelectChange">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="padding: 5px 10px" v-if="isFilter"/>
        <el-option :value="valueTitle" :label="valueTitle">
            <el-tree
                id="tree-option"
                ref="selectTree"
                :accordion="accordion"
                node-key="id"
                show-checkbox
                :data="options"
                :props="props"
                :filterNodeMethod="filterNode"
                @check="onCheck"
                :current-node-key="defaultCheckedKey"
                :default-checked-keys="defaultCheckedKey"
                :expand-on-click-node="false">
            </el-tree>
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: "el-tree-select",
        props: {
            /* 配置项 */
            props: {
                type: Object,
                default: () => {
                    return {
                        value: 'id',             // ID字段名
                        label: 'title',         // 显示名称
                        children: 'children'    // 子级字段名
                    }
                }
            },
            /* 选项列表数据(树形结构的对象数组) */
            options: {
                type: Array,
                default: () => {
                    return []
                }
            },
            /* 初始值 */
            value: {
                type: Number,
                default: () => {
                    return null
                }
            },
            /* 自动收起 */
            accordion: {
                type: Boolean,
                default: () => {
                    return false
                }
            },

            isFilter: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                filterText: '',
                valueId: this.value.map(v => v.id),    // 初始值
                valueTitle: [],
                defaultCheckedKey: []
            }
        },
        mounted() {
            this.initHandle()
        },
        methods: {
            // 初始化值
            initHandle() {
                if (this.valueId) {
                    this.valueTitle = this.getTitle(this.valueId)
                    console.log(this.valueId)
                    this.$refs.selectTree.setCurrentKey(this.valueId)       // 设置默认选中
                    this.defaultCheckedKey = this.valueId      // 设置默认展开
                }
                this.$nextTick(() => {
                    let scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
                    let scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
                    scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
                    scrollBar.forEach(ele => ele.style.width = 0)
                })

            },

            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },

            // 切换选项
            onCheck(v, node) {
                let options = this.options
                let keys = node.checkedKeys
                let valueTitle = []
                let valueKeys = [...keys]
                let loop = (node) => {
                    let hasNotChecked = false
                    node.forEach((v, i) => {
                        if (v.id && keys.indexOf(v.id) === -1) {
                            hasNotChecked = true
                        }
                        let isSelect = keys.indexOf(v.id) !== -1 && v.id
                        if (v.items && v.items.length) {
                            let _hasNotChecked = loop(v.items)
                            if (isSelect) {
                                if (!_hasNotChecked) {
                                    v.items.forEach(itemV => {
                                        valueKeys.splice(valueKeys.indexOf(itemV.id), 1)
                                    })
                                }
                            } else {
                                hasNotChecked = _hasNotChecked
                            }
                        }
                    })
                    return hasNotChecked
                }
                loop(options)
                valueTitle = this.getTitle(valueKeys)
                for (let i = valueKeys.length - 1; i >= 0; i--) {
                    if (!valueKeys[i]) {
                        valueKeys.splice(i, 1)
                    }
                }
                this.valueTitle = valueTitle
                this.defaultCheckedKey = keys
                this.valueId = valueKeys
                this.$emit('getValue', valueKeys)
            },
            getTitle(valueKeys) {
                let valueTitle = []
                let loop_title = (node) => {
                    node.forEach((v, i) => {
                        let isSelect = valueKeys.indexOf(v.id) !== -1 && v.id
                        if (isSelect) {
                            valueTitle.push(v.name)
                        } else {
                            if (v.items && v.items.length) {
                                loop_title(v.items)
                            }
                        }
                    })
                }
                loop_title(this.options)
                return valueTitle
            },
            getId(valueTitle) {
                let valueId = []
                let loop_title = (node) => {
                    node.forEach((v, i) => {
                        let isSelect = valueTitle.indexOf(v.name) !== -1 && v.name
                        if (isSelect) {
                            valueId.push(v.id)
                        } else {
                            if (v.items && v.items.length) {
                                loop_title(v.items)
                            }
                        }
                    })
                }
                loop_title(this.options)
                return valueId
            },
            // 清除选中
            clearHandle() {
                this.valueTitle = []
                this.valueId = []
                this.defaultCheckedKey = []
                this.$refs.selectTree.setCheckedKeys([])
                this.clearSelected()
                this.$emit('getValue', null)
            },
            /* 清空选中样式 */
            clearSelected() {
                let allNode = document.querySelectorAll('#tree-option .el-tree-node')
                allNode.forEach((element) => element.classList.remove('is-current'))
            },
            onSelectChange(valueTitle) {
                this.valueTitle = valueTitle
                let ids = this.getId(valueTitle)
                this.valueId = ids
                this.defaultCheckedKey = ids
                this.clearSelected()
                this.$refs.selectTree.setCheckedKeys(ids)
                this.$emit('getValue', ids)
            }
        },
        watch: {
            value() {
                this.valueId = this.value.map(v => v.id)
                this.initHandle()
            },

            filterText(val) {
                this.$refs.selectTree.filter(val);
            }

        },
    };
</script>
<style scoped lang="scss">
    .el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
        height: auto;
        max-height: 274px;
        padding: 0;
        overflow: hidden;
        overflow-y: auto;
    }

    .el-select-dropdown__item.selected {
        font-weight: normal;
    }

    ul li > > > .el-tree .el-tree-node__content {
        height: auto;
        padding: 0 20px;
    }

    .el-tree-node__label {
        font-weight: normal;
    }

    .el-tree > > > .is-current .el-tree-node__label {
        color: #409EFF;
        font-weight: 700;
    }

    .el-tree > > > .is-current .el-tree-node__children .el-tree-node__label {
        color: #606266;
        font-weight: normal;
    }

    /deep/ .el-input--small {
        .el-input__inner {
            height: none !important;
            line-height: none !important;
        }
    }
</style>
