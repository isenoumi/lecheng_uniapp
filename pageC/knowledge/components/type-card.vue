<template>
  <uni-card spacing="0">
    <image
      slot="cover"
      style="width: 100%; max-height: 140px"
      :src="item.url"></image>
    <!-- <u--text :lines="2" bold :text="item.title||''"></u--text> -->
  </uni-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    item: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {
      dataList: [],
    }
  },
  computed: {},
  onLoad() {},
  methods: {},
}
</script>

<style scoped lang="scss"></style>
