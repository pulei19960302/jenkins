<!--<template>-->
<!--    <div class="login-container">-->
<!--        <el-form-->
<!--            :model="loginForm"-->
<!--            :rules="loginRules"-->
<!--            ref="loginForm"-->
<!--            label-position="left"-->
<!--            label-width="0px"-->
<!--            class="card-box login-form">-->
<!--            <h3 class="title">-->
<!--                &lt;!&ndash;<img src="/static/imgs/logo.png" alt="logo">&ndash;&gt;-->
<!--                社交电商一体化云平台-->
<!--            </h3>-->
<!--            <el-form-item prop="username">-->
<!--                <span class="svg-container svg-container_login">-->
<!--                    <svg-icon icon-name="user" />-->
<!--                </span>-->
<!--                <el-input-->
<!--                    name="username"-->
<!--                    type="text"-->
<!--                    v-model="loginForm.username"-->
<!--                    placeholder="请输入用户名称" />-->
<!--            </el-form-item>-->
<!--            <el-form-item prop="password">-->
<!--                <span class="svg-container">-->
<!--                    <svg-icon icon-name="password"></svg-icon>-->
<!--                </span>-->
<!--                <el-input-->
<!--                    name="password"-->
<!--                    :type="pwdType"-->
<!--                    @keyup.enter.native="handleLogin"-->
<!--                    v-model="loginForm.password"-->
<!--                    placeholder="请输入登录密码">-->
<!--                </el-input>-->
<!--                <span-->
<!--                    class="show-pwd"-->
<!--                    @click="showPwd">-->
<!--                    <svg-icon :icon-name="eye"/>-->
<!--                </span>-->
<!--            </el-form-item>-->
<!--            <el-form-item>-->
<!--                <el-button-->
<!--                    type="primary"-->
<!--                    style="width:100%;"-->
<!--                    :loading="loading"-->
<!--                    @click.native.prevent="handleLogin">-->
<!--                    登 录-->
<!--                </el-button>-->
<!--            </el-form-item>-->
<!--        </el-form>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import { mapActions } from 'vuex';-->

<!--    export default {-->
<!--        name: 'Login',-->
<!--        data() {-->
<!--            const validateUsername = (rule, value, callback) => {-->
<!--                if (!value) {-->
<!--                    callback(new Error('请输入用户名'));-->
<!--                    return;-->
<!--                }-->
<!--                callback();-->
<!--            };-->
<!--            const validatePass = (rule, value, callback) => {-->
<!--                if (value.length < 6) {-->
<!--                    callback(new Error('密码不能小于6位'));-->
<!--                    return;-->
<!--                }-->
<!--                callback();-->
<!--            };-->
<!--            return {-->
<!--                loginForm: {-->
<!--                    username: '',-->
<!--                    password: ''-->
<!--                },-->
<!--                loginRules: {-->
<!--                    username: [{ required: true, trigger: 'blur', validator: validateUsername }],-->
<!--                    password: [{ required: true, trigger: 'blur', validator: validatePass }]-->
<!--                },-->
<!--                loading: false,-->
<!--                pwdType: 'password'-->
<!--            };-->
<!--        },-->
<!--        computed: {-->
<!--            eye() {-->
<!--                if (this.pwdType === 'password') return 'eye-off';-->
<!--                return 'eye-on';-->
<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            ...mapActions('user', ['Login']),-->
<!--            showPwd() {-->
<!--                if (this.pwdType === 'password') {-->
<!--                    this.pwdType = '';-->
<!--                    return;-->
<!--                }-->
<!--                this.pwdType = 'password';-->
<!--            },-->
<!--            handleLogin() {-->
<!--                this.$refs.loginForm.validate(async valid => {-->
<!--                    if (valid) {-->
<!--                        this.loading = true;-->
<!--                        try {-->
<!--                            await this.Login(this.loginForm);-->
<!--                            this.$nextTick(_ => {-->
<!--                                this.$router.push({ name: 'Index' });-->
<!--                                this.loading = false;-->
<!--                            })-->
<!--                        } catch (err) {-->
<!--                            this.loading = false;-->
<!--                        }-->
<!--                    }-->
<!--                });-->
<!--            }-->
<!--        }-->
<!--    };-->
<!--</script>-->

<!--<style rel="stylesheet/scss" lang="scss">-->
<!--    $dark_gray: #889aa4;-->
<!--    $light_gray: #eee;-->
<!--    .login-container {-->
<!--        background: #2d3a4b;-->
<!--        position: fixed;-->
<!--        height: 100%;-->
<!--        width: 100%;-->
<!--        display: flex;-->
<!--        justify-content: center;-->
<!--        align-items: center;-->
<!--        input {-->
<!--            background: transparent;-->
<!--            border: 0;-->
<!--            -webkit-appearance: none;-->
<!--            border-radius: 0;-->
<!--            padding: 12px 5px 12px 15px;-->
<!--            color: $light_gray;-->
<!--            height: 47px;-->
<!--            &:-webkit-autofill {-->
<!--                -webkit-box-shadow: 0 0 0 1000px #293444 inset !important;-->
<!--                -webkit-text-fill-color: #fff !important;-->
<!--            }-->
<!--        }-->
<!--        .el-input {-->
<!--            display: inline-block;-->
<!--            vertical-align: -2px;-->
<!--            width: 85%;-->
<!--        }-->
<!--        .svg-container {-->
<!--            padding: 6px 5px 6px 15px;-->
<!--            color: $dark_gray;-->
<!--            vertical-align: middle;-->
<!--            width: 30px;-->
<!--            display: inline-block;-->
<!--            &_login {-->
<!--                font-size: 20px;-->
<!--            }-->
<!--            svg {-->
<!--                font-size: 15px;-->
<!--            }-->
<!--        }-->
<!--        .title {-->
<!--            font-size: 24px;-->
<!--            color: $light_gray;-->
<!--            margin: 0 auto 40px auto;-->
<!--            text-align: center;-->
<!--            font-weight: bold;-->
<!--            img {-->
<!--                width: 70px;-->
<!--                vertical-align: -4px;-->
<!--                margin-right: 10px;-->
<!--            }-->
<!--        }-->
<!--        .login-form {-->
<!--            width: 400px;-->
<!--            padding: 0 15px;-->
<!--        }-->
<!--        .el-form-item {-->
<!--            border: 1px solid rgba(255, 255, 255, 0.1);-->
<!--            background: rgba(0, 0, 0, 0.1);-->
<!--            border-radius: 5px;-->
<!--            color: #454545;-->
<!--        }-->
<!--        .show-pwd {-->
<!--            position: absolute;-->
<!--            right: 10px;-->
<!--            top: 7px;-->
<!--            font-size: 16px;-->
<!--            color: $dark_gray;-->
<!--            cursor: pointer;-->
<!--            user-select: none;-->
<!--        }-->
<!--        .thirdparty-button {-->
<!--            position: absolute;-->
<!--            right: 35px;-->
<!--            bottom: 28px;-->
<!--        }-->
<!--    }-->
<!--</style>-->

<template>
    <div class="login-container">
        <!--        <el-form-->
        <!--            :model="loginForm"-->
        <!--            :rules="loginRules"-->
        <!--            ref="loginForm"-->
        <!--            label-position="left"-->
        <!--            label-width="0px"-->
        <!--            class="card-box login-form">-->
        <!--            <h3 class="title">-->
        <!--                &lt;!&ndash;<img src="/static/imgs/logo.png" alt="logo">&ndash;&gt;-->
        <!--                社交电商一体化云平台-->
        <!--            </h3>-->
        <!--            <el-form-item prop="username">-->
        <!--                <span class="svg-container svg-container_login">-->
        <!--                    <svg-icon icon-name="user" />-->
        <!--                </span>-->
        <!--                <el-input-->
        <!--                    name="username"-->
        <!--                    type="text"-->
        <!--                    v-model="loginForm.username"-->
        <!--                    placeholder="请输入用户名称" />-->
        <!--            </el-form-item>-->
        <!--            <el-form-item prop="password">-->
        <!--                <span class="svg-container">-->
        <!--                    <svg-icon icon-name="password"></svg-icon>-->
        <!--                </span>-->
        <!--                <el-input-->
        <!--                    name="password"-->
        <!--                    :type="pwdType"-->
        <!--                    @keyup.enter.native="handleLogin"-->
        <!--                    v-model="loginForm.password"-->
        <!--                    placeholder="请输入登录密码">-->
        <!--                </el-input>-->
        <!--                <span-->
        <!--                    class="show-pwd"-->
        <!--                    @click="showPwd">-->
        <!--                    <svg-icon :icon-name="eye"/>-->
        <!--                </span>-->
        <!--            </el-form-item>-->
        <!--            <el-form-item>-->
        <!--                <el-button-->
        <!--                    type="primary"-->
        <!--                    style="width:100%;"-->
        <!--                    :loading="loading"-->
        <!--                    @click.native.prevent="handleLogin">-->
        <!--                    登 录-->
        <!--                </el-button>-->
        <!--            </el-form-item>-->
        <!--        </el-form>-->

        <div class="logo-main">
            <div class="logo-header">
                <div class="logo-header-img"></div>
<!--                <div class="icon">-->
<!--                </div>-->
                <div class="title">欢迎使用</div>
            </div>
            <div class="logo-form">
                <div class="logo-form-label">
<!--                    <div class="h1">-->
<!--                        你自己觉得有，别人感觉不到你有，你就是没有-->
<!--                    </div>-->

<!--                    <div class="h2" style="margin-top: 32px">-->
<!--                        3分钟搭建移动商城-->
<!--                    </div>-->
<!--                    <div class="h2">-->
<!--                        系统化管理客户-->
<!--                    </div>-->
<!--                    <div class="h2">-->
<!--                        分销拓展销售渠道-->
<!--                    </div>-->

<!--                    <div class="line"></div>-->

<!--                    <div class="des" style="margin-top: 56px">-->
<!--                        ©2019 微折购 使用前必读 增值电信业务经营许可证：B1.B2-20100266-->
<!--                    </div>-->
<!--                    <div class="des" style="margin-top: 8px">-->
<!--                        <span style="display: inline-block;margin-right: 24px">-->
<!--                        川ICP证030173-->
<!--                        </span>-->
<!--                        <span>-->
<!--                            隐私政策-->
<!--                        </span>-->
<!--                    </div>-->

                </div>
                <div class="logo-form-submit">
                    <div class="form-title">
                        账密登录
                    </div>
                    <div class="input-box" style="margin-top: 32px">
                        <el-form
                            :model="loginForm"
                            :rules="loginRules"
                            ref="loginForm"
                        >
                            <el-form-item prop="username">
                                <div class="input">
                                    <el-input v-model="loginForm.username" placeholder="请输入用户名称"/>
                                </div>
                            </el-form-item>
                            <el-form-item>
                                <div class="input">
                                    <el-input
                                        v-model="loginForm.password"
                                        @keyup.enter.native="handleLogin"
                                        type="password" placeholder="请输入登录密码"/>
                                </div>
                            </el-form-item>
                        </el-form>
                        <el-button
                            type="primary"
                            style="width:100%;margin-top: 6px"
                            :loading="loading"
                            @click.native.prevent="handleLogin">
                            登 录
                        </el-button>
                    </div>
                </div>
                <div class="footer-img">
<!--                    <img src="../../assets/logo/decoration2@2x.png" alt="">-->
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: 'Login',
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入用户名'));
                    return;
                }
                callback();
            };
            const validatePass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能小于6位'));
                    return;
                }
                callback();
            };
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur', validator: validateUsername}],
                    password: [{required: true, trigger: 'blur', validator: validatePass}]
                },
                loading: false,
                pwdType: 'password'
            };
        },
        computed: {
            eye() {
                if (this.pwdType === 'password') return 'eye-off';
                return 'eye-on';
            }
        },
        methods: {
            ...mapActions('user', ['Login']),
            showPwd() {
                if (this.pwdType === 'password') {
                    this.pwdType = '';
                    return;
                }
                this.pwdType = 'password';
            },
            handleLogin() {
                this.$refs.loginForm.validate(async valid => {
                    if (valid) {
                        this.loading = true;
                        try {
                            await this.Login(this.loginForm);
                            this.$nextTick(_ => {
                                this.$router.push({name: 'Index'});
                                this.loading = false;
                            })
                        } catch (err) {
                            this.loading = false;
                        }
                    }
                });
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    $dark_gray: #889aa4;
    $light_gray: #eee;
    .login-container {
        min-width: 1200px;
        overflow-x: auto;
        height: 100%;
        width: 100%;
        background: url("../../assets/logo/bgimg.png") no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        .logo-main {
            width: 1150px;
            height: 100%;

            .logo-header {
                padding-bottom: 160px;
                width: 100%;
                position: relative;

                .logo-header-img {
                    position: absolute;
                    left: -195px;
                    display: inline-block;
                    width: 166px;
                    height: 178px;
                    background: url("../../assets/logo/decoration1@2x.png") no-repeat 0;
                    background-size: cover;
                }

                .title {
                    position: absolute;
                    top: 95px;
                    right: 0;
                    font-size: 24px;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                }
            }

            .logo-form {
                position: relative;
                height: 430px;
                display: flex;

                .logo-form-label {
                    flex: 1;
                    background: transparent;
                }

                .logo-form-label {
                    padding-top: 42px;

                    .h1 {
                        width: 487px;
                        font-size: 30px;
                        font-weight: bold;
                        color: rgba(46, 52, 64, 1);
                    }

                    .h2 {
                        width: 487px;
                        margin-top: 16px;
                        font-size: 16px;
                        font-weight: 500;
                        color: rgba(130, 134, 143, 1);
                    }

                    .line {
                        margin-top: 48px;
                        width: 455px;
                        height: 1px;
                        background: rgba(226, 232, 235, 1);
                    }

                    .des {
                        width: 382px;
                        font-size: 12px;
                        font-weight: 400;
                        color: rgba(116, 121, 129, 1);
                        line-height: 17px;
                    }
                }

                .logo-form-submit {
                    border-radius: 4px;
                    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.05);
                    background: #ffffff;
                    width: 364px;
                    padding: 40px 24px 0 24px;

                    .form-title {
                        font-size: 24px;
                        font-weight: bold;
                        color: rgba(46, 52, 64, 1);
                        border-bottom: 1px solid #e9e9e9;
                        padding-bottom: 16px;
                        text-indent: 8px;
                    }

                    .input-box {
                        padding: 0 8px;

                        .input {
                            /deep/ .el-input--small {
                                /deep/ .el-input__inner {
                                    border-radius: 0 !important;
                                    height: 36px !important;
                                    line-height: 36px !important;
                                }
                            }

                        }
                        /deep/ .el-form-item--small.el-form-item {
                            margin-bottom: 20px !important;
                        }

                        /deep/ .el-button {
                            height: 40px;
                            border-radius: 20px;
                            font-size: 14px !important;
                        }
                    }

                }

                .footer-img {
                    position: absolute;
                    right: 143px;
                    bottom: -80px;

                    img {
                        width: 125px;
                        height: 42px;
                    }
                }
            }
        }


    }

    @media only screen and (max-width: 1920px) and (min-width: 1600px) {
        .logo-main {
            width: 1150px !important;
        }
    }

    @media only screen and (max-width: 1600px) {
        .logo-main {
            width: 930px !important;
        }
    }
</style>
