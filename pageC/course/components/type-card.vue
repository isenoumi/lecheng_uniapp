<template>

    <uni-card spacing="0">
        <image slot='cover' style="width: 100%;max-height: 140px;" :src="item.bgurl"></image>
		<view class="name">
			<u--text :lines="2" bold :text="item.name||''"></u--text>
			<view class="points"><image style="width: 28rpx;height: 28rpx;margin-right: 8rpx;" src="@/static/assets/center/5.png" mode="scaleToFill"></image> {{item.points}}</view>
		</view>
    </uni-card>


</template>

<script>
    import {
        mapState
    } from 'vuex'
    export default {
        props: {
            item: {
                default: null,
                type: Object
            }
        },
        data() {
            return {
                dataList: [],
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

<style scoped lang="scss">
	.name{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.points{
			display: flex;
			align-items: center;
			margin-right: 10rpx;
		}
	}

</style>
