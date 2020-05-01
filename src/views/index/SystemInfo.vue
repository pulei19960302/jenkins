<template>
    <div class="system-info">
        <ul>
            <li>
                <p>服务器操作系统:</p>
                <p>Linux (114.55.34.251)</p>
                <p>Web 服务器:</p>
                <p>nginx/1.10.2</p>
            </li>
            <li>
                <p>PHP 版本:</p>
                <p>5.6.30</p>
                <p>MySQL 版本:</p>
                <p>5.5.56</p>
            </li>
            <li>
                <p>安全模式:</p>
                <p>是</p>
                <p>安全模式GID:</p>
                <p>否</p>
            </li>
            <li>
                <p>Socket 支持:</p>
                <p>是</p>
                <p>时区设置:</p>
                <p>nginx/1.10.2</p>
            </li>
            <li>
                <p>GD 版本:</p>
                <p>GD2 ( JPEG GIF PNG)</p>
                <p>WZlib 支持:</p>
                <p>是</p>
            </li>
            <li>
                <p>IP 库版本:</p>
                <p>20071024</p>
                <p>文件上传的最大大小:</p>
                <p>40M</p>
            </li>
            <li>
                <p>程序版本:</p>
                <p>v2.2.2 RELEASE 20170629</p>
                <p>W安装日期:</p>
                <p>2018-11-3</p>
            </li>
            <li>
                <p>编码:</p>
                <p>utf-8</p>
                <p></p>
                <p></p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SystemInfo"
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/variables";
    .system-info {
        margin: 0 auto;
        font-size: 14px;
        background: #fff;
        ul {
            border: 1px solid $border;
            li {
                display: flex;
                justify-content: space-between;
                &:not(:last-child) {
                    border-bottom: 1px solid $border;
                }
                p {
                    text-align: center;
                    width: 600px;
                    padding: 10px 20px;
                    &:nth-of-type(1), &:nth-of-type(3) {
                        background: #f9fafc;
                        font-weight: 500;
                        width: 400px;
                    }
                    &:not(:last-child) {
                        border-right: 1px solid $border;
                    }
                }
            }
        }
    }
</style>
