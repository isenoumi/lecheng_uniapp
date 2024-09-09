<template>
    <view class="icon" :class='{
        "default":status==3, "error" :status==1, "success" :status==2 }'>
        <view class="text">
            <u--text :size="size" :text="text" color="#fff">
            </u--text>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            status: {
                type: [String, Number],
                default: 1
            },

            size: {
                type: [String, Number],
                default: 14
            }

        },
        computed: {
            text() {
                if (this.status == 1) {
                    return '待处理'
                } else if (this.status == 2) {
                    return '进行中'
                }
                return '已完成'
            }

        },

        methods: {

        },
    };
</script>

<style lang="scss" scoped>
    .icon {
        width: 100px;
        height: 40px !important;
        margin: 0px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: left;
        display: flex;
        justify-content: center;
        align-items: center;

        &.default {
            background-image: url('@/static/assets/task/status3.png');
        }

        &.error {
            background-image: url('@/static/assets/task/status2.png');
        }

        &.success {
            background-image: url('@/static/assets/task/status1.png');
        }
    }
</style>
