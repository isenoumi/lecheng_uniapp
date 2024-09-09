<template>
    <view class="z-card3">
        <view class="z-card__content">
            <view class="z-card__image">
                <u--image :showLoading="true" :src="item.Knowledge.bgurl" mode="aspectFit" width="100%" height="80px" radius="8">
                </u--image>
            </view>
            <view class="z-card__info">
                <view class="z-card__info--title">
                    <u--text :lines="2" bold :text="item.Knowledge.title||''"></u--text>
                </view>
                <view class="z-card__info--desc">
                    <view class="z-card__info--desc--left">
                        <u--text :type="item.Knowledge.study?'info':'error'" size="13" :text="item.study?'已学习':'暂未学习'">
                        </u--text>

                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            item: {
                default: null,
                type: Object
            }
        },
        data() {
            return {

            }
        },
        computed: {

        },
        onLoad() {

        },
        methods: {



        }

    }
</script>
<style>
    page {
        background-color: #F7F7F7 !important;
    }
</style>
<style scoped lang="scss">
    .z-card3 {
        margin-bottom: 10px;
    }
</style>
