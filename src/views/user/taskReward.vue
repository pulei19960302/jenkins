<template>
    <div class="taskReward-content">
        <p class="title">任务奖励设置</p>
        <div class="card">
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon_favorite"></use>
                </svg>
                <span class="f16">新手任务</span>
                <span class="color-ccc">新手任务每个用户只奖励一次，相关值必须为大于0的整数</span>
                <div class="table-content">
                    <div class="table-row">
                        <div class="table-left">新手欢迎奖励</div>
                        <div class="table-right">
                            <span class="s1">成长值:</span>
                            <el-input placeholder="请输入分数"><template slot="append">分</template></el-input>
                            <span class="s1">优币:</span>
                            <el-input placeholder="请输入个数"><template slot="append">个</template></el-input>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">设置头像</div>
                        <div class="table-right">
                            <span class="s1">成长值:</span>
                            <el-input placeholder="请输入分数"><template slot="append">分</template></el-input>
                            <span class="s1">优币:</span>
                            <el-input placeholder="请输入个数"><template slot="append">个</template></el-input>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">设置昵称</div>
                        <div class="table-right">
                            <span class="s1">成长值:</span>
                            <el-input placeholder="请输入分数"><template slot="append">分</template></el-input>
                            <span class="s1">优币:</span>
                            <el-input placeholder="请输入个数"><template slot="append">个</template></el-input>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">完善个人信息</div>
                        <div class="table-right">
                            <span class="s1">成长值:</span>
                            <el-input placeholder="请输入分数"><template slot="append">分</template></el-input>
                            <span class="s1">优币:</span>
                            <el-input placeholder="请输入个数"><template slot="append">个</template></el-input>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">成功关注1位达人</div>
                        <div class="table-right">
                            <span class="s1">成长值:</span>
                            <el-input placeholder="请输入分数"><template slot="append">分</template></el-input>
                            <span class="s1">优币:</span>
                            <el-input placeholder="请输入个数"><template slot="append">个</template></el-input>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">首次分享商品或专题</div>
                        <div class="table-right">
                            <span class="s1">成长值:</span>
                            <el-input placeholder="请输入分数"><template slot="append">分</template></el-input>
                            <span class="s1">优币:</span>
                            <el-input placeholder="请输入个数"><template slot="append">个</template></el-input>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">首次收藏商品或专题</div>
                        <div class="table-right">
                            <span class="s1">成长值:</span>
                            <el-input placeholder="请输入分数"><template slot="append">分</template></el-input>
                            <span class="s1">优币:</span>
                            <el-input placeholder="请输入个数"><template slot="append">个</template></el-input>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">首次购物成功</div>
                        <div class="table-right">
                            <span class="s1">成长值:</span>
                            <el-input placeholder="请输入分数"><template slot="append">分</template></el-input>
                            <span class="s1">优币:</span>
                            <el-input placeholder="请输入个数"><template slot="append">个</template></el-input>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">首次完成评价</div>
                        <div class="table-right">
                            <span class="s1">成长值:</span>
                            <el-input placeholder="请输入分数"><template slot="append">分</template></el-input>
                            <span class="s1">优币:</span>
                            <el-input placeholder="请输入个数"><template slot="append">个</template></el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon_favorite"></use>
                </svg>
                <span class="f16">日常任务</span>
                <span class="color-ccc">日常任务可以奖励多次，相关值必须为大于0的整数</span>
                <div class="table-content">
                    <div class="table-row">
                        <div class="table-left">每日登录</div>
                        <div class="table-right">
                            <span class="s1">成长值:</span>
                            <el-input placeholder="请输入分数"><template slot="append">分</template></el-input>
                            <span class="s1">优币:</span>
                            <el-input placeholder="请输入个数"><template slot="append">个</template></el-input>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">每日签到</div>
                        <div class="table-right">
                            <span class="s1">成长值:</span>
                            <el-input placeholder="请输入分数"><template slot="append">分</template></el-input>
                            <span class="s1">优币:</span>
                            <el-input placeholder="请输入个数"><template slot="append">个</template></el-input>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">分享商品或专题</div>
                        <div class="table-right">
                            <span class="s1">成长值:</span>
                            <el-input placeholder="请输入分数"><template slot="append">分</template></el-input>
                            <span class="s1">优币:</span>
                            <el-input placeholder="请输入个数"><template slot="append">个</template></el-input>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">邀请好友</div>
                        <div class="table-right">
                            <span class="s1">成长值:</span>
                            <el-input placeholder="请输入分数"><template slot="append">分</template></el-input>
                            <span class="s1">优币:</span>
                            <el-input placeholder="请输入个数"><template slot="append">个</template></el-input>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">好友首次下单成功</div>
                        <div class="table-right">
                            <span class="s1">成长值:</span>
                            <el-input placeholder="请输入分数"><template slot="append">分</template></el-input>
                            <span class="s1">优币:</span>
                            <el-input placeholder="请输入个数"><template slot="append">个</template></el-input>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">购买天数达标</div>
                        <div class="table-right">
                            <span class="s1">成长值:</span>
                            <el-input placeholder="请输入分数"><template slot="append">分</template></el-input>
                            <span class="s1">优币:</span>
                            <el-input placeholder="请输入个数"><template slot="append">个</template></el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <el-button type="primary">提交</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "taskReward"
    }
</script>

<style scoped>
    .taskReward-content{border: 1px solid #E4E4E4;
        background: #fff;}
    .taskReward-content .title{padding: 10px;border-bottom:1px solid #E4E4E4; }
    .taskReward-content .f16{font-size: 16px}
    .taskReward-content .card{margin: 20px}
    /*表格*/
    .table-content{display: flex;flex-direction: column;border: 1px solid #E4E4E4;border-bottom: 0;margin-top: 15px}
    .table-content .table-row{display: flex;flex-direction: row;align-items: center;border-bottom: 1px solid #E4E4E4}
    .table-content .table-left{padding: 0 10px;width: 200px;text-align: right}
    .table-content .table-right{display: flex;flex-direction: row;align-items: center;padding: 10px 20px 10px 0;border-left: 1px solid #E4E4E4}
    .table-content .table-right .s1{width: 150px;display: inline-block;margin:0 10px;text-align: right;}
    .color-ccc{color: #ccc}
    .bottom{text-align: center;width: 100%;margin: 10px 0}
    .card .icon{color: #666;font-size: 18px}
</style>
