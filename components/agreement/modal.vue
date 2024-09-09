<template>
    <u-modal v-model="shows" title="用户协议及隐私政策" show-cancel-button cancel-text="暂不同意" @cancel="checkedCancel"
        @confirm="checkedConfirm" confirm-text="同意并接受">
        <view class="u-m-30 p-indent" >
            欢迎来到金忠配送！<br/>我们根据最新的法律法规、监管政策要求,特向您推送本提示,请您仔细阅读并充分理解<span @click="handleWebview('https://jzsport.xyz/protocol.html')" class="jz-href">《用户协议》</span>和<span @click="handleWebview('https://jzsport.xyz/private.html')"  class="jz-href">《隐私政策》</span>。<br/>
            金忠配送通过《隐私政策》帮助您了解我们收集、使用、存储个人信息的情况,以及您享有的相关权利。<br/>
            点击【同意并接受】,表示您已阅读并同意相关协议条款,金忠配送将尽全力保障您的合法权益并继续为您提供优质的产品和服务。<br/>
            在使用过程中,金忠配送将可能申请并使用到以下权限:存储/摄像头/麦克风/相册权限:上传用户头像、门禁照片，分享冰圈图片、视频；设备信息（包括设备MAC地址、唯一设备识别码等）：用于消息推送需要获取权限<br/>
            未经您的授权,我们不会与任何第三方共享或者提供您的信息,为方便您查阅,可在登录APP后,找到“我的一关于我们”中查看完整版隐私政策内容。
            
        </view>
    </u-modal>
</template>

<script>
    export default {
        name: "agreementModal",
        model: {
            prop: 'show',
            event: 'change'
        },
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                shows: this.show,
            };
        },
        watch: {
            shows(newVal) {
                this.$emit('change', newVal)
            },
            show(newVal) {
                this.shows = newVal
            }
        },
        methods: {
            handleWebview(url) {
                this.$u.route({
                    url: `pages/webview/webview?url=${url}`,
                })
            },
            checkedCancel() {
                this.$emit('checkedCancel', false)
            },
            checkedConfirm() {
                this.$emit('checkedConfirm', true)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .p-indent{
        p{
            text-indent: 2em;
        }
        p:first-child{
            text-indent: 0;
        }
    }
</style>
