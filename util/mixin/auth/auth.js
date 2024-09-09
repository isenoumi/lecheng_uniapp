export default {

    data() {
        return {
            show: false
        }
    },
    mounted() {

    },
    methods: {
        commonCheckAuth(status = false) {
            if (!this.$store.state.user.phone) {
                this.$refs['auth'].show = true;
                return false;
            }
            return true;
        }
    }

}
