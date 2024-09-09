<template>
    <view class="cu-card article margin-bottom">
        <view class="cu-item shadow borderBottom">
            <view class="content">
                <!-- <view class="image">
                      <u--image :showLoading="true"
                          src="https://img2.baidu.com/it/u=2335637867,3697443124&fm=253&fmt=auto&app=138&f=JPG?w=864&h=335"
                          mode="aspectFit" width="240rpx" height="6.4em" radius="6">
                      </u--image>
 
                  </view> -->
                <view class="desc">
                    <view class="title">
                        <u--text :lines="2" bold :text="item.name||''"></u--text>
                    </view>
                    <view class="margin-top-xs">
                        <u--text type="info" size="13" :text="item.create_time|dateFormat">
                        </u--text>

                    </view>
                </view>
            </view>
        </view>
    </view>
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

</style>
