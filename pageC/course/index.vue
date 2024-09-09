<template>
    <view class="content">

        <view class="u-nav">
            <navbar :safeAreaInsetTop="true" height="55" placeholder leftIconColor="#fff" autoBack>
                <view class="u-nav-slot" slot="center">
                    <u--text text="课程栏目" color="#fff"></u--text>
                </view>
            </navbar>
        </view>
        <view class="u-p">
            <typeCard v-for="(item, index) in dataList" :key="index" :item="item" @click.native="gocourselist(item)">
            </typeCard>

        </view>
    </view>

</template>

<script>
    import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'


    import typeCard from './components/type-card.vue'


    import {
        courselistbycustomer
    } from '@/common/api.js'
    export default {
        components: {
            typeCard,

        },
        mixins: [ZPMixin],
        data() {
            return {
                dataList: [],

            }
        },
        computed: {


        },
        watch: {

        },
        onShow() {



        },
        methods: {
            gocourselist(item) {
				console.log(item,'我是item')
                uni.$u.route({
                    url: 'pageC/course/list',
                    params: {
                        id: item.id,
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
