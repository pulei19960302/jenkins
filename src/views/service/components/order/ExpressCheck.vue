<template>
    <div class="express-check">
        <p class="title">物流信息</p>
        <iframe frameborder="0" width="100%" class="express-iframe"></iframe>
    </div>
</template>

<script>
    const iframeSrc = 'http://m.kuaidi100.com/result.jsp?nu=';
    export default {
        name: 'ExpressCheck',
        props: {
            logistics_sn:[String],
        },
        data() {
            return {
                // logistics_sn: '640011936184' // 测试单号
            }
        },
        watch:{
            'logistics_sn'(val){
                this.lookFor();
            }
        },
        mounted() {
        },
        methods: {
            lookFor(){
                // iframe加载完毕后，强制隐藏部分内容
                if (this.logistics_sn != '') {
                    const iframe = document.querySelector('.express-iframe');
                    iframe.src = `${iframeSrc}${this.logistics_sn}`;
                    iframe.onload = function () {
                        const iframeDocument = document.querySelector('.express-iframe').contentWindow.document;
                        const comInfo = iframeDocument.querySelector('.com-info');
                        const downloadNav = iframeDocument.querySelector('.download-nav');
                        const commonHeader = iframeDocument.querySelector('.common-header');
                        const aChangecom = iframeDocument.querySelector('.result-btn');
                        const resultRedpacket = iframeDocument.querySelector('#m_result_redpacket');
                        [comInfo, downloadNav, commonHeader].map(c => {
                            c.style.display = 'none';
                        })
                        // 隐藏查询失败后，切换公司按钮
                        if (aChangecom) aChangecom.style.display = 'none';
                        // 隐藏偶尔出现的红包
                        if (resultRedpacket) resultRedpacket.style.display = 'none';
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .express-check {
        height: 100%;
        .title {
            padding: 17px;
            font-size: 16px;
            font-weight: bold;
            border-bottom: 1px solid;
        }
        .express-iframe {
            height: 100%;
        }
    }
</style>
