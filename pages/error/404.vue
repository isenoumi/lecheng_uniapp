<template>
    <view class="noData u-flex-col u-row-center u-col-center">
        <u-icon :name="image" size="160" imgMode="widthFit" class="u-no__error-icon"></u-icon>
        <text class="u-no__tips">页面不存在</text>
        <text class="u-no__app__setting">请检查网络，或者回到首页</text>

    </view>

</template>

<script>
    export default {
        props: {

        },
        computed: {

        },
        data() {
            return {
                image: uni.$u.props.noNetwork.image,

            };
        },
        methods: {
            toHome() {
                uni.$u.route({
                    type: 'switchTab',
                    url: 'pages/index/index',
                })
            },

        }
    };
</script>

<style lang="scss" scoped>
    .u-no {
        justify-content: center;
        align-items: center;
        margin-top: -100px;

        &__tips {
            color: $u-main-color;
            font-size: 14px;
            margin-top: 15px;
        }

        &__app {

            margin-top: 6px;

            &__setting {
                color: $u-tips-color;
                font-size: 13px;
            }

            &__to-setting {
                font-size: 13px;
                margin-left: 3px;
            }
        }

        &__retry {
            justify-content: center;
            margin-top: 15px;
        }
    }
</style>
