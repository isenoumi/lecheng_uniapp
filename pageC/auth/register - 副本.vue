<template>
    <view class="content">
        <u-steps :current="current" v-if="current<3" :activeColor="globalData.theme['$u-primary']">
            <u-steps-item title="授权登录"></u-steps-item>
            <u-steps-item title="实名认证"></u-steps-item>
            <u-steps-item title="信息填写"></u-steps-item>

        </u-steps>
        <view class="u-p">
            <view class="margin-top-lg" v-if="current==0">
                <u-button type="primary" text="授权登录" @click="getUserProfile()">
                </u-button>
            </view>
            <view class="margin-top-lg" v-if="current==1">
                <u-button type="primary" text="获取手机" @getphonenumber="getPhoneNumber" open-type="getPhoneNumber">
                </u-button>
            </view>
            <view class="margin-top-lg" v-if="current==2||current==3">
                <bindinfoform @success="submit" ref="bindinfoform">

                </bindinfoform>
            </view>




            <!--        <view v-if="current==3" class="u-success-panel">
                <view class="u-success-panel__circle">
                    <u-icon name="checkbox-mark" color="#fff" size="30"></u-icon>
                </view>
                <text class="u-success-panel__normal">已完成认证</text>
            </view> -->

        </view>



    </view>
</template>

<script>
    import authorize from "@/common/auth.js"
    import {
        bindinfo
    } from '@/common/api.js';
    import {
        mapState
    } from 'vuex'
    import bindinfoform from './components/bindinfo.vue'

    export default {
        components: {
            bindinfoform
        },
        data() {
            return {
                globalData: getApp().globalData,
                btnLoading: false,

                task_id: null

            }
        },
        computed: {
            ...mapState({
                user: state => state.user,
                cityDataTree: state => state.cityDataTree
            }),
            current() {
                if (!this.$store.state.user.nick_name) {
                    return 0;
                } else if (!this.$store.state.user.phone) {
                    return 1;
                } else if (!this.$store.state.user.reg_status) {
                    return 2;
                } else {
                    return 3;
                }
                return 0;
            },

        },
        onLoad(option) {
            if (option.current) {
                this.current = option.current
            }
            if (option.task_id) {
                this.task_id = option.task_id
            }
        },

        methods: {
            submit(params) {
                if (this.task_id) {
                    params.task_id = this.task_id
                }
                this.$refs.bindinfoform.btnLoading = true;
                bindinfo(params).then(({
                    data,
                    msg
                }) => {
                    this.$store.commit('refreshUser',
                        data)

                    this.goBack()
                    uni.showToast({
                        title: msg,
                        icon: 'success',
                    });
                }).finally(() => {
                    this.$refs.bindinfoform.btnLoading = false;
                })

            },
            goBack() {
                uni.navigateBack({
                    delta: 1
                })
            },
            getUserProfile(e) {
                authorize.getUserProfile().then((res) => {
                    uni.showToast({
                        title: res.msg,
                        icon: 'success',
                    });

                })
            },
            getPhoneNumber(e) {
                authorize.bindPhone(e.detail).then((res) => {
                    uni.showToast({
                        title: res.msg,
                        icon: 'success',
                    });
                })
            }

        }
    }
</script>

<style lang="scss" scoped>

</style>
