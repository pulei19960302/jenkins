<template>
    <div class="emoji">
        <!--<ul class="emoji-controller">-->
            <!--<li-->
                <!--v-for="(pannel,index) in pannels"-->
                <!--:key="index"-->
                <!--@click="changeActive(index)"-->
                <!--:class="{'active': index === activeIndex}">-->
                <!--{{ pannel }}-->
            <!--</li>-->
        <!--</ul>-->
        <!--<ul class="emoji-container">-->
            <!--<li-->
                <!--v-for="(emojiGroup, index) in emojis"-->
                <!--style="padding: 0"-->
                <!--:key="index"-->
                <!--v-if="index === activeIndex">-->
                <!--<a-->
                    <!--href="javascript:;"-->
                    <!--v-for="(emoji, index) in emojiGroup"-->
                    <!--:key="index" @click="selectItem(emoji)">-->
                    <!--<span-->
                       <!--class="emoji-item"-->
                       <!--:title="emoji"-->
                       <!--:class="'sprite-' + getPureName(emoji)">-->
                    <!--</span>-->
                <!--</a>-->
            <!--</li>-->
        <!--</ul>-->
        <ul class="emoji-container">
            <!--{{emojis}}-->
            <li
                v-for="(emoji, index) in emojis"
                style="padding: 0"
                :key="index">
                <!--<a-->
                    <!--href="javascript:;"-->
                    <!--v-for="(emoji, index) in emojiGroup"-->
                    <!--:key="index" @click="selectItem(emoji)">-->
                    <!--<span-->
                        <!--class="emoji-item"-->
                        <!--:title="emoji"-->
                        <!--:class="'sprite-' + getPureName(emoji)">-->
                    <!--</span>-->
                <!--</a>-->
                <a href="javascript:;" @click="selectItem(emoji)"><span class="emoji-item">{{emoji}}</span></a>
            </li>
        </ul>
    </div>
</template>
<script>
    import data from '../config/emojiData.js';

    export default {
        name: 'Emoji',
        props: {
            showEmoji: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                emojiData: data,
                // pannels: ['表情', '自然', '物品'],
                pannels: ['hot'],
                activeIndex: 0
            }
        },
        computed: {
            // emojis() {
            //     return this.pannels.map(item => {
            //         return Object.keys(this.emojiData[item]);
            //     })
            // }
            emojis() {
                return this.emojiData.people
            }
        },
        methods: {
            changeActive(index) {
                this.activeIndex = index;
            },
            getPureName(name) {
                return name.replace(/:/g, '');
            },
            selectItem(emoji) {
                this.$emit('select', emoji);
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../static/css/emoji-sprite';

    .emoji {
        position: absolute;
        width: 380px;
        height: 186px;
        bottom: 40px;
        background: #fff;
        z-index: 10;
        padding: 10px;
        margin-right: 10px;
        .emoji-controller {
            height: 36px;
            overflow: hidden;
            margin-bottom: 0;
            li {
                float: left;
                width: 76px;
                font-size: 12px;
                line-height: 36px;
                cursor: pointer;
                text-align: center;
                position: relative;
                &.active::after {
                    content: '';
                    width: 100%;
                    height: 1px;
                    background: #0689dd;
                    left: 0;
                    bottom: 4px;
                    position: absolute;
                }
            }
        }
        .emoji-container {
            height: 140px;
            overflow-y: auto;
            overflow-x: hidden;
            position: relative;
            li {
                font-size: 16px;
                padding: 5px;
                a {
                    float: left;
                    overflow: hidden;
                    height: 35px;
                    transition: all ease-out .2s;
                    border-radius: 4px;
                    &:hover {
                        background-color: #d8d8d8;
                        border-color: #d8d8d8;
                    }
                    span {
                        width: 25px;
                        height: 25px;
                        display: inline-block;
                        border: 1px solid transparent;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>
