<template>
    <div class="moreRules-content">
        <div class="card">
            <div class="left">
                <div class="left-gary">
                    <!--<i class="iconfont icon-tianchongxing-"></i>-->
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon_favorite"></use>
                    </svg>
                    <p>成长值规则设置</p>
                </div>
            </div>
            <div class="right">
                <div class="row">
                    <span class="word">每连续签到：</span>
                    <el-input placeholder="请输入天数"><template slot="append">天</template></el-input>
                    <span class="supplement">额外奖励：</span>
                    <el-input placeholder="请输入分数"><template slot="append">分</template></el-input>
                </div>
                <div class="row">
                    <span class="word">购物消费：</span>
                    <el-input placeholder="请输入元"><template slot="append">元</template></el-input>
                    <span class="supplement">奖励1分成长值（不含运费）</span>
                </div>
                <div class="row">
                    <span class="word">商品单价低于：</span>
                    <el-input placeholder="请输入元"><template slot="append">元</template></el-input>
                    <span class="supplement">评价不送成长值</span>
                </div>
                <div class="row">
                    <span class="word">订单实际支付金额低于：</span>
                    <el-input placeholder="请输入元"><template slot="append">元</template></el-input>
                    <span class="supplement">不送成长值</span>
                </div>
                <div class="row">
                    <span class="word">单件商品最高可获得：</span>
                    <el-input placeholder="请输入分"><template slot="append">分</template></el-input>
                    <span class="supplement">成长值</span>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="left">
                <div class="left-gary">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon_favorite"></use>
                    </svg>
                    <p>优币规则设置</p>
                </div>
            </div>
            <div class="right">
                <div class="row">
                    <span class="word">每连续签到：</span>
                    <el-input placeholder="请输入天数"><template slot="append">天</template></el-input>
                    <span class="supplement">额外奖励：</span>
                    <el-input placeholder="请输入个数"><template slot="append">个</template></el-input>
                </div>
                <div class="row">
                    <span class="word">购物消费：</span>
                    <el-input placeholder="请输入元"><template slot="append">元</template></el-input>
                    <span class="supplement">奖励1个优币（不含运费）</span>
                </div>
                <div class="row">
                    <span class="word">商品单价低于：</span>
                    <el-input placeholder="请输入元"><template slot="append">元</template></el-input>
                    <span class="supplement">评价不送成长值</span>
                </div>
                <div class="row">
                    <span class="word">订单实际支付金额低于：</span>
                    <el-input placeholder="请输入元"><template slot="append">元</template></el-input>
                    <span class="supplement">不送成长值</span>
                </div>
                <div class="row">
                    <span class="word">单件商品最高可获得：</span>
                    <el-input placeholder="请输入分"><template slot="append">分</template></el-input>
                    <span class="supplement">成长值</span>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="left">
                <div class="left-gary">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon_favorite"></use>
                    </svg>
                    <p>优币消费设置</p>
                </div>
            </div>
            <div class="right">
                <div class="row">
                    <span class="word">抵扣订单金额每：</span>
                    <el-input placeholder="请输入个数"><template slot="append">个</template></el-input>
                    <span class="supplement">抵扣1元</span>
                </div>
                <div class="row">
                    <span class="word">最高可抵扣订单金额比例：</span>
                    <el-input placeholder="请输入数字"><template slot="append">%</template></el-input>
                </div>
                <div class="row">
                    <span class="word">商品单价低于：</span>
                    <el-input placeholder="请输入元"><template slot="append">元</template></el-input>
                    <span class="supplement">评价不送成长值</span>
                </div>
                <div class="row">
                    <span class="word">使用时的倍数：</span>
                    <el-input placeholder="请输入数字"></el-input>
                </div>
                <div class="row">
                    <span class="word">与优惠券同时使用：</span>
                    <el-switch
                        v-model="value2">
                    </el-switch>
                </div>
                <div class="bottom">
                    <el-button type="primary">提交</el-button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "moreRules",
        data() {
            return {
                value2:''
            }
        }
    }
</script>

<style scoped>
    .moreRules-content{border: 1px solid #E4E4E4;
        background: #fff;}
    .moreRules-content .left{  border-right: 1px solid #E4E4E4;width: 180px;padding-top: 50px}
    .moreRules-content .icon{color: #fff;font-size: 20px;}
    .left-gary{background-color: #9EA7B4;color: #fff;width: 180px;height: 50px;display: flex;flex-direction: row;
        justify-content: center;text-align: center;align-items: center;position: relative;
    }
    .card{display: flex;}
    .left-gary p{margin-left: 5px}
    .left-gary:after{
        content: '';
        width: 0;
        height: 0;
        border-top: 25px solid transparent;
        border-left: 20px solid #9EA7B4;
        border-bottom: 25px solid transparent;
        position: absolute;
        right: -20px;
    }
    .right{display: flex;flex-direction: column;margin: 60px 50px 0;display: flex;justify-content: center;width: 100%}
    .right .row{display: flex;flex-direction: row;align-items: center;margin-bottom: 20px}
    .right .row .word{display: flex;width: 200px;justify-content: flex-end}
    .right .el-input{width: 200px}
    .right .row .supplement{margin-left: 10px}
    .bottom{margin: 10px 0 10px 200px}
</style>
