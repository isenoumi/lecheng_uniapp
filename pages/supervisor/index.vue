<template>
    <view class="content">
        <view class="u-m-t">
            <u-cell-group>
                <!-- <u-cell title="录入用户" @click="goRegister" :isLink="true"></u-cell> -->
                <u-cell title="我的任务" @click="goTask" :isLink="true"></u-cell>
            </u-cell-group>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {

            };
        },
        methods: {
            goRegister() {
                uni.navigateTo({
                    url: '/pages/supervisor/register'
                })
            },
            goTask() {
                uni.navigateTo({
                    url: '/pages/supervisor/task'
                })
            }
        }
    }
</script>
