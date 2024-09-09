<template>
    <view class="lee-select-city" :style="{ height }">
        <!-- 选择提示 -->
        <view class="lee-select-display" v-if="currentSelected.length">
            <view class="lee-select-display-item" v-for="(v, k) of currentSelected" :key="k"
                :class="{ active: currentLevel >= k }" @click="skipLevel(k)">{{ v.name }}</view>
            <view class="lee-select-display-item" v-if="placeholder">{{ placeholder }}</view>
        </view>
        <!-- 选择提示END -->

        <view class="swiper">
            <view class="swiper-wrapper" :style="{
				transform: `translateX(-${100 * currentLevel/3}%)`
			}">
                <!-- 省级 -->
                <scroll-view class="swiper-item" scroll-y>
                    <view class="swiper-content">
                        <!-- 当前定位 -->
                        <block>
                            <view class="caption">
                                <text>当前定位</text>
                                <!-- <text class="action" @click="getNewPosition" >重新定位</text> -->
                                <!--    <view class="action">
                                    <u--text :type="positionStatus?'info':''" size="14"
                                        :text="positionStatus?'重新定位':'重新定位'" @click="getNewPosition">
                                    </u--text>
                                </view> -->

                            </view>

                            <view v-if="currentPosition" class="current-position" @click="selectCurrentPosition">
                                {{ currentPosition.simple.join(',') }}
                            </view>
                        </block>
                        <!-- 当前定位END -->

                        <!-- 热门城市 -->
                        <!--   <block v-if="hotCities.length">
                            <view class="caption">热门城市</view>
                            <view class="gird">
                                <view class="gird-item" v-for="(v, k) of hotCities" :key="k">
                                    <view @click="hotCitySelectHandler(v)">{{ v[0] }}</view>
                                </view>
                            </view>
                        </block> -->
                        <!-- 热门城市END -->
                        <view class="caption">选择省份/地区</view>
                        <lee-latter-list :data="dataByLetter" :selected="currentSelected[0]" @select="selectPro" />
                    </view>
                </scroll-view>
                <!-- 省级END -->

                <!-- 市级 -->
                <scroll-view class="swiper-item" scroll-y>
                    <view class="swiper-content">
                        <view class="caption">选择城市</view>
                        <lee-latter-list :data="level2Data" :selected="currentSelected[1]" @select="selectCity" />
                    </view>
                </scroll-view>
                <!-- 市级END -->

                <!-- 区级 -->
                <scroll-view class="swiper-item" scroll-y>
                    <view class="swiper-content">
                        <view class="caption">选择区/县</view>
                        <lee-latter-list :data="level3Data" :selected="currentSelected[2]" @select="selectQu" />
                    </view>
                </scroll-view>
                <!-- 区级END -->
            </view>
        </view>
    </view>
</template>

<script>
    import LeeLatterList from './lee-latter-list.vue'
    import hotCities from './hot-cities.json'

    import {
        mapState
    } from 'vuex'
    export default {
        components: {
            LeeLatterList
        },
        props: {
            // 容器高度
            height: {
                type: String,
                default: '100%'
            },

            // 城市级联数据
            cityData: {
                type: Array,
                default: () => []
            },

            // 热门城市
            hotCities: {
                type: Array,
                default: () => JSON.parse(JSON.stringify(hotCities))
            },
            // 默认选择
            defaultSelected: {
                type: Array,
                default: () => []
            },
            // 开放区域
            regions: {
                type: Array,
                default: () => []
            },
        },
        data() {
            return {
                currentLevel: Math.min(2, this.defaultSelected.length),
                currentSelected: [],
                showPlaceholder: true,
                currentPosition: '',
                positionStatus: false

            }
        },
        computed: {
            ...mapState({
                location: state => state.location
            }),
            // 获取按Letter分组后的一级列表
            dataByLetter() {
                return this.cityData
            },

            // 当前二级列表
            level2Data() {
                const lastLevel = this.currentSelected[0]

                if (!lastLevel) return []
                lastLevel.children.map(item => {
                    if (item.children.length > 0) {
                        return item
                    }
                    if (this.regions.indexOf(item.value) > -1) {
                        item.disabled = false
                    } else {
                        item.disabled = true
                    }
                    return item;
                })
                return lastLevel.children || []
            },

            // 当前三级列表
            level3Data() {
                const lastLevel = this.currentSelected[1]
                if (!lastLevel) return []
                if (lastLevel.children.length <= 0) return []
                return lastLevel.children.map(item => {
                    if (this.regions.indexOf(item.value) > -1) {
                        item.disabled = false
                    } else {
                        item.disabled = true
                    }
                    return item;
                }) || []

            },

            placeholder() {
                const ln = this.currentSelected.length
                if (ln === 0) return '请选择地区'
                if (ln === 1) return '请选择城市'
                if (ln === 2 && this.level3Data.length > 0) return '请选择县'
                return ''
            }
        },
        watch: {
            location: {
                handler: function(val) {
                    if (val != null) {
                        this.currentPosition = val

                    }

                },
                immediate: true
            }
        },
        async created() {
            if (this.location == '') {
                await this.getNewPosition()
            }

        },

        methods: {

            // 选择省份
            selectPro(item) {
                this.currentSelected = [item]
                if (this.level2Data.length) {
                    this.currentLevel = 1
                } else {
                    this.submit()
                }
            },

            // 选择城市
            selectCity(item) {
                this.currentSelected.splice(1)
                this.$set(this.currentSelected, 1, item)
                if (this.level3Data.length) {
                    this.currentLevel = 2
                } else {
                    this.submit()
                }
            },

            // 选择区/县
            selectQu(item) {
                this.currentSelected.splice(2)
                this.$set(this.currentSelected, 2, item)
                this.submit()
            },

            // 跳转到指定级数
            skipLevel(level) {
                this.currentLevel = level
                this.currentSelected.splice(level + 1)
            },

            // 提交当前选择
            submit() {
                const selected = this.currentSelected.map(v => {
                    return {
                        name: v.name,
                        value: v.value
                    }
                })
                const simple = selected.map(v => v.name)
                this.$emit('submit', {
                    selected,
                    simple

                })
            },

            // 点击热门城市
            hotCitySelectHandler(item) {
                let current = this.data
                const selected = []
                for (const v of item[1]) {
                    const node = current.find(m => m.name === v)
                    if (!node) return
                    current = node.children
                    if (!current || current.length === 0) return
                    selected.push(node)
                }
                this.currentSelected = selected
                const nextLevel = selected.length
                if (
                    (nextLevel === 1 && this.level2Data.length) ||
                    (nextLevel === 2 && this.level3Data.length)
                ) {
                    this.currentLevel = nextLevel
                } else {
                    this.submit()
                }
            },

            // 使用当前定位
            selectCurrentPosition() {
                this.$emit('select-current', this.currentPosition)
            },
            // 重新定位
            async getNewPosition() {
                if (this.positionStatus) {
                    return
                }
                this.positionStatus = true;
                this.$emit('getPosition')
                setTimeout(() => {
                    this.positionStatus = false;
                }, 3000)
            },


        }
    }
</script>

<style lang="scss">
    $lee-spacing-small: 10rpx;
    $lee-spacing-base: 30rpx;
    $lee-spacing-large: 40rpx;
    $lee-font-size-caption: 28rpx;
    $lee-text-height: 60rpx;

    .lee-select-city {
        display: flex;
        flex-direction: column;
        position: relative;
        background-color: $uni-bg-color;
    }

    .swiper {
        flex: 1;
        width: 100%;
        height: 0;
        overflow: hidden;
        position: relative;

        &-wrapper {
            width: 300%;
            height: 100%;
            display: flex;
            position: relative;
        }

        &-item {
            width: calc(100% / 3);
            height: 100%;
            position: relative;
            box-sizing: border-box;
        }

        &-content {
            position: relative;
            box-sizing: border-box;
            padding: $lee-spacing-base;

            >.caption {
                color: $uni-text-color-grey;
                font-size: $lee-font-size-caption;
                margin-bottom: $lee-spacing-base;

                >.action {
                    float: right;
                }
            }
        }
    }

    // 已选择显示
    .lee-select-display {
        padding: $lee-spacing-base;
        box-shadow: 0 2rpx 2rpx rgba(0, 0, 0, .15);

        &-item {
            $height: 80rpx;
            height: $height;
            line-height: $height;
            box-sizing: border-box;
            padding: 0 $lee-spacing-base;
            font-size: $lee-font-size-caption;
            border-left: 2px solid $u-primary;
            position: relative;


            &.active {
                color: $u-primary;
            }

            &::before {
                content: '';
                top: 0;
                left: -10rpx;
                width: 20rpx;
                height: 50%;
                background-color: $uni-bg-color;
                position: absolute;
                display: none;
            }

            &:first-child::before,
            &:last-child::before {
                display: block;
            }

            &:last-child::before {
                top: 50%;
            }

            &::after {
                $size: 20rpx;
                top: 50%;
                left: -1px;
                content: '';
                width: $size;
                height: $size;
                border-radius: 50%;
                position: absolute;
                background-color: $u-primary;
                transform: translate(-50%, -50%);
            }

            &:last-child::after {
                background-color: $uni-text-color-grey;
            }
        }
    }

    // 热门城市
    .gird {
        $height: 80rpx;

        display: flex;
        flex-wrap: wrap;
        position: relative;
        margin-bottom: $lee-spacing-base;

        &-item {
            width: 20%;
            height: $height;
            box-sizing: border-box;
            padding: $lee-spacing-small;

            >view {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: $lee-font-size-caption;
                background-color: $uni-bg-color-hover;
                border-radius: 8rpx;
            }
        }
    }

    // 当前定位
    .current-position {
        $height: 80rpx;
        height: $height;
        line-height: $height;
        text-align: center;
        font-size: $lee-font-size-caption;
        margin-bottom: $lee-spacing-base;
        color: #ffffff;
        background-color: $u-primary;
        border-radius: 8rpx;
    }
</style>
