<template>
  <picker
    :disabled="disabled"
    :mode="mode"
    @columnchange="columnchange"
    @change="change"
    :range="pickerRange"
    :value="selectItem.value"
    :range-key="name">
    <u--text v-if="selectItem.name" :text="selectItem.name" size="15"></u--text>
    <u--text v-else :text="placeholder" size="15" color="#c0c4cc"></u--text>
  </picker>
</template>

<script>
export default {
  props: {
    level: {
      type: [String, Number],
      default: 1,
    },
    defaultIds: {
      type: Array,
      default: [],
    },
    columnData: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    idKey: {
      type: String,
      required: true,
    },
    children: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mode: 'multiSelector', // 默认多列
      pickerRange: undefined,
      selectItem: {
        value: '',
        name: '',
      },
      areaData: [],
    }
  },
  watch: {
    columnData: {
      handler: function (newData) {
        this.$nextTick(this.dealData(newData))
      },
      immediate: true,
      deep: true,
    },
    defaultIds: {
      handler: function (newData) {
        console.log('defaultIds', newData)
        if (newData.length === 0) {
          this.$set(this.selectItem, 'value', '')
          this.$set(this.selectItem, 'name', '')
        }
      },
      immediate: true,
      deep: true,
    },
    selectItem: {
      handler: function (newData, oldv) {
        console.log('selectItem', newData, oldv)
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    console.log(this.defaultIds, this.columnData, this.level, 'piceker')
  },
  methods: {
    // 1:一列选择器  2：两列选择器  3：三列选择器
    dealData(newData) {
      console.log('newData', newData)
      this.areaData = Object.freeze(newData)
      let result = ''
      switch (+this.level) {
        case 1:
          this.mode = 'selector' // 普通单列选择器
          result = this.areaData.map((item, index) => {
            if (+item[this.idKey] === +this.defaultIds[0]) {
              this.$set(this.selectItem, 'value', index)
              this.$set(this.selectItem, 'name', item[this.name])
            }
            return {
              [this.idKey]: item[this.idKey],
              [this.name]: item[this.name],
            }
          })
          this.pickerRange = Object.freeze(result)
          break
        case 2:
        case 3:
          this.mode = 'multiSelector' // 默认多列
          this.pickerRange = []
          this.$set(this.selectItem, 'value', [])
          for (let i = 0; i < +this.level; i++) {
            this.pickerRange.push([])
          }
          result = this.areaData.map((item, index) => {
            if (+item[this.idKey] === +this.defaultIds[0]) {
              this.$set(
                this.pickerRange,
                1,
                Object.freeze(item?.[this.children] ?? [])
              )
              this.$set(this.selectItem, 'value', [
                ...this.selectItem.value,
                index,
              ])
              this.$set(
                this.selectItem,
                'name',
                this.selectItem.name + `${item[this.name]}`
              )
              this.pickerRange[1].forEach((item, index) => {
                if (+item[this.idKey] === +this.defaultIds[1]) {
                  this.$set(this.selectItem, 'value', [
                    ...this.selectItem.value,
                    index,
                  ])
                  this.$set(
                    this.selectItem,
                    'name',
                    this.selectItem.name + `-${item[this.name]}`
                  )

                  if (+this.level === 3) {
                    this.$set(
                      this.pickerRange,
                      2,
                      Object.freeze(item?.[this.children] ?? [])
                    )

                    this.pickerRange[2].forEach((item, index) => {
                      if (+item[this.idKey] === +this.defaultIds[2]) {
                        this.$set(this.selectItem, 'value', [
                          ...this.selectItem.value,
                          index,
                        ])
                        this.$set(
                          this.selectItem,
                          'name',
                          this.selectItem.name + `-${item[this.name]}`
                        )
                      }
                    })
                  }
                }
              })
            }
            return {
              [this.idKey]: item[this.idKey],
              [this.name]: item[this.name],
              [this.children]: item[this.children],
            }
          })
          this.pickerRange[0] = Object.freeze(result)
          if (this.pickerRange[1].length <= 0) {
            this.$set(
              this.pickerRange,
              1,
              Object.freeze(this.pickerRange[0][0][this.children])
            )
          }
          if (+this.level === 3 && this.pickerRange[2].length <= 0) {
            this.$set(
              this.pickerRange,
              2,
              Object.freeze(this.pickerRange[1][0][this.children])
            )
          }
          break
      }
    },
    columnchange(event) {
      const { column, value } = event.detail
      switch (+column) {
        case 0:
          if (+this.level === 2) {
            this.$set(
              this.pickerRange,
              1,
              Object.freeze(
                this.pickerRange[column][value]?.[this.children] ?? []
              )
            )
            this.selectItem.value = [value, 0]
          }
          if (+this.level === 3) {
            this.$set(
              this.pickerRange,
              1,
              Object.freeze(
                this.pickerRange[column][value]?.[this.children] ?? []
              )
            )
            this.$set(
              this.pickerRange,
              2,
              Object.freeze(this.pickerRange[1][0]?.[this.children] ?? [])
            )
            this.selectItem.value = [value, 0, 0]
          }

          break
        case 1:
          if (+this.level === 3) {
            this.$set(
              this.pickerRange,
              2,
              Object.freeze(
                this.pickerRange[column][value]?.[this.children] ?? []
              )
            )
            this.selectItem.value[2] = 0
          }
          break
      }
    },
    change(e) {
      const { value } = e.detail

      if (typeof value === 'number' || typeof value === 'string') {
        let ids = this.pickerRange[value]?.[this.idKey]
        let iname = this.pickerRange[value]?.[this.name]
        if (ids == undefined) {
          return
        }
        this.$emit('change', {
          value: [ids],
          detail: [
            {
              value: ids,
              name: iname,
            },
          ],
        })
        this.$set(this.selectItem, 'name', this.pickerRange[value]?.[this.name])
        return
      }
      let returnData = {
        value: [],
        detail: [],
      }
      let name = ''
      value.forEach((item, index) => {
        let ids = this.pickerRange[index][item]?.[this.idKey]
        let iname = this.pickerRange[index][item]?.[this.name]
        if (ids == undefined) {
          return
        }
        if (iname == undefined) {
          iname = ''
        }
        returnData.value.push(this.pickerRange[index][item]?.[this.idKey])
        returnData.detail.push({
          value: ids,
          name: iname,
        })
        if (name) {
          name += `-${iname}`
        } else {
          name += `${iname}`
        }
      })
      this.$set(this.selectItem, 'name', name)
      this.$emit('change', returnData)
    },
  },
}
</script>

<style></style>
