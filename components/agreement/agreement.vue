<template>
      <u-checkbox v-model="check" label-size="24">
           <view @click.stop="handleTask">
               <view class="jz-href">同意《用户协议及隐私政策》</view>
           </view>
       </u-checkbox>
</template>

<script>
    export default {
        name: "agreement",
        model: {
            prop: 'checked',
            event: 'change'
        },
        props: {
            checked: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                check: this.checked,
            };
        },
        watch: {
            check(newVal) {
                this.$emit('change', newVal)
            },
            checked(newVal){
               this.check =newVal
            }
        },
        methods: {
            handleTask() {
                this.$emit('handleTask')
            },
    
        }
    }
</script>

<style lang="scss">

</style>
