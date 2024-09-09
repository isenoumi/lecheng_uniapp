<template>

    <view class="mainBox bg-white">
        <view class="padding text-center margin-top-xl">
            <view class="padding-xl radius bg-white margin-top">
                <view class="title text-bold text-black text-xl ">{{title}}</view>
                <view class="describe u-m-b-10">

                </view>
                <u-button type="primary" text="授权登录" @click="getUserProfile()">
                </u-button>
                <view class="info">
                    <u--text align="center" type="info" text="授权信息仅用于小程序登录"></u--text>
                </view>

            </view>
        </view>



    </view>
</template>

<script>
    import authorize from "@/common/auth.js"

    export default {
        data() {
            return {
                title: getApp().globalData.systemName
            }
        },
        computed: {


        },
        onLoad(option) {

        },
        onReady() {


        },
        methods: {

            goBack() {
                uni.$u.route({
                    url: 'pages/index/index',
                    type: 'switchTab'
                })
            },
            getUserProfile(e) {
                authorize.getUserProfile().then((res) => {
					console.log(res,'登录')
                    uni.showToast({
                        title: res.msg,
                        icon: 'success',
                    });
                    this.goBack()

                })

            },


        }
    }
</script>

<style lang="scss" scoped>
    .mainBox {
        height: 100vh;

        .title {
            margin-bottom: 5em;
        }

        .info {
            margin-top: 1em;
        }
    }
</style>
