<template>

    <u-popup :show="show" :round="10" mode="bottom" :closeable="true" :closeOnClickOverlay="true" @close="close">

        <view class="u-popup-slot">
            <text class="u-m-b">请授权登录以及手机号</text>
            <u-button type="primary" text="点击前往" customStyle="width: 300rpx" @click="goCenter"></u-button>
        </view>
    </u-popup>

</template>

<script>
    export default {
        props: {
            // show: {
            //     type: Boolean,
            //     default: false
            // }
        },
        data() {
            return {
                show: false
            }
        },
        mounted() {

        },
        methods: {
            close() {
                this.show = false;
            },
            goCenter() {
                uni.switchTab({
                    url: '/pages/center/index'
                })
            }
        }

    }
</script>
<style lang="scss" scoped>
    .u-popup-slot {
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
