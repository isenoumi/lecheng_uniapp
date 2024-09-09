<template>
    <view class="latter-list">
        <view class="latter-list-item" v-for="(v, k) in data" :key="k">
            <!-- <view class="latter-list-latter">{{ v }}</view> -->
            <view class="plist">
                <view class="plist-item" :class="{ disabled: (v.hasOwnProperty('disabled')&&v.disabled) }"
                    @click="selectHandler(v)">
                    <view>
                        <u--text :type="(v.hasOwnProperty('disabled')&&v.disabled)?'info':''" size="16" :text="v.name">
                        </u--text>
                    </view>
                    <view v-if="(v.hasOwnProperty('disabled')&&v.disabled) ">
                        <u--text type="info" size="14" text="暂未开放">
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
            data: {
                type: [Array, Object],
                required: true
            },
            selected: Object,


        },
        methods: {
            selectHandler(v) {
                if (v.hasOwnProperty('disabled') && v.disabled) {
                    return;
                }
                this.$emit('select', v)
            }
        }
    }
</script>

<style lang="scss">
    $lee-spacing-base: 30upx;
    $lee-spacing-large: 40upx;
    $lee-font-size-caption: 28upx;
    $lee-text-height: 60upx;

    .latter-list {
        &-item {
            display: flex;

            &:not(:last-child) {
                margin-bottom: $lee-spacing-large;
            }
        }

        &-latter {
            $width: 60upx;
            width: $width;
            font-size: $lee-font-size-caption;
            color: $uni-text-color-grey;
            line-height: $lee-text-height;
        }
    }

    .plist {
        flex: 1;
        width: 0;

        &-item {
            height: $lee-text-height;
            line-height: $lee-text-height;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &:not(:last-child) {
                margin-bottom: $lee-spacing-base;
            }


        }
    }
</style>
