<template>
    <view class="content">
        <u--form labelPosition="left" :model="form" ref="form" labelWidth="80">
            <u-form-item label="姓名" prop="name" borderBottom ref="name" required>
                <u--input :disabled="disabledForm" v-model="form.name" border="none" placeholder="姓名,只能为中文" clearable>
                </u--input>
            </u-form-item>
            <u-form-item label="手机号" prop="phone" borderBottom ref="phone" required>
                <u--input :disabled="disabledForm" v-model="form.phone" border="none" placeholder="请输入联系电话" clearable>
                </u--input>
            </u-form-item>
            <u-form-item label="性别" prop="gender" borderBottom @click="showgender = !disabledForm; hideKeyboard()"
                required>
                <u--input v-model="form.gender_text" disabled disabledColor="#ffffff" placeholder="请选择性别" border="none">
                </u--input>
                <u-icon slot="right" name="arrow-right"></u-icon>
            </u-form-item>
            <u-form-item label="所在地区" prop="region" borderBottom ref="region" required>
                <selfPicker disabled level="3" :defaultIds="regionIdx" @change="regionChange" idKey="value" name="name"
                    children="children" :columnData="cityDataTree"></selfPicker>
                <u-icon slot="right" name="arrow-right"></u-icon>
            </u-form-item>
            <u-form-item label="所在小区" prop="community" borderBottom ref="community" required>
                <selfPicker level="1" disabled :defaultIds="communityIdx" @change="communitychange" idKey="id"
                    name="name" :columnData="communityData"></selfPicker>
                <u-icon slot="right" name="arrow-right"></u-icon>
            </u-form-item>
            <u-form-item label="所在楼栋" prop="floor" borderBottom ref="floor" required>
                <selfPicker level="1" :defaultIds="floorIdx" @change="floorchange" idKey="id" name="floornumber"
                    :columnData="floorData"></selfPicker>
                <u-icon slot="right" name="arrow-right"></u-icon>
            </u-form-item>
            <u-form-item label="所在单元" prop="unit" borderBottom ref="unit" required>
                <selfPicker level="1" :defaultIds="unitIdx" @change="unitchange" idKey="id" name="unitnumber"
                    :columnData="unitData"></selfPicker>
                <u-icon slot="right" name="arrow-right"></u-icon>
            </u-form-item>
            <u-form-item label="所在房号" prop="number" borderBottom ref="number" required>
                <u--input :disabled="disabledForm" type="number" v-model="form.number" border="none"
                    placeholder="请输入所在房号" clearable>
                </u--input>
            </u-form-item>


        </u--form>
        <u-action-sheet :show="showgender" :actions="genderActions" title="请选择性别" @close="showgender = false"
            @select="genderSelect"> </u-action-sheet>
        <view class="margin-top-lg">
            <u-button type="primary" :loading="btnLoading" text="提交" @click="submit()">
            </u-button>
        </view>

    </view>
</template>

<script>
    import {
        supervisorbindinfo,
        community
    } from '@/common/api.js';
    import {
        mapState
    } from 'vuex'
    import selfPicker from '@/components/picker.vue'
    const defaultForm = {
        phone: '',
        name: '',
        gender: '',
        gender_text: '',
        region: '',
        region_json: null,
        community: '',
        floor: '',
        unit: '',
        number: '',
    }
    export default {
        components: {
            selfPicker
        },
        props: {
            detail: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                globalData: getApp().globalData,
                btnLoading: false,
                showgender: false,
                genderActions: [{
                        name: '男',
                        value: 1,
                    },
                    {
                        name: '女',
                        value: 2
                    },

                ],
                regionIdx: [],
                communityIdx: [],
                floorIdx: [],
                unitIdx: [],

                communityData: [],

                form: uni.$u.deepClone(defaultForm),
                rules: {
                    name: [{
                        type: 'string',
                        required: true,
                        message: '请填写姓名',
                        trigger: ['blur', 'change']
                    }, {
                        // 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
                        validator: (rule, value, callback) => {
                            // 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
                            return uni.$u.test.chinese(value);
                        },
                        message: "姓名必须为中文",
                        // 触发器可以同时用blur和change，二者之间用英文逗号隔开
                        trigger: ["change", "blur"],
                    }],
                    gender: {
                        type: 'number',
                        required: true,
                        message: '请选择男或女',
                        trigger: ['blur', 'change']
                    },
                    phone: [{
                            required: true,
                            message: '请填写联系电话',
                            trigger: ['change', 'blur'],
                        },
                        {
                            // 自定义验证函数，见上说明
                            validator: (rule, value, callback) => {
                                // 上面有说，返回true表示校验通过，返回false表示不通过
                                // uni.$u.test.mobile()就是返回true或者false的
                                return uni.$u.test.mobile(value);
                            },
                            message: '手机号码不正确',
                            // 触发器可以同时用blur和change
                            trigger: ['change', 'blur'],
                        }
                    ],
                    region: {
                        type: 'string',
                        required: true,
                        message: '请选择所在地区',
                        trigger: ['change']
                    },
                    community: {
                        type: "integer",
                        required: true,
                        message: '请选择所在小区',
                        trigger: ['change']
                    },
                    floor: {
                        type: "integer",
                        required: true,
                        message: '请选择所在楼栋',
                        trigger: ['change']
                    },
                    unit: {
                        type: "integer",
                        required: true,
                        message: '请选择所在单元',
                        trigger: ['change']
                    },
                    number: [{
                            required: true,
                            message: '请填写房号',
                            trigger: ['change', 'blur'],
                        },
                        {
                            // 自定义验证函数，见上说明
                            validator: (rule, value, callback) => {
                                // 上面有说，返回true表示校验通过，返回false表示不通过
                                // uni.$u.test.mobile()就是返回true或者false的
                                if (value <= 0) {
                                    return false
                                }
                                return uni.$u.test.digits(value);
                            },
                            message: '请输入整数',
                            // 触发器可以同时用blur和change
                            trigger: ['change', 'blur'],
                        }
                    ],
                },

            }
        },
        computed: {
            ...mapState({
                user: state => state.user,
                cityDataTree: state => state.cityDataTree,
            }),
            floorData() {
                if (this.form.community == '' || this.communityData.length <= 0) {
                    return []
                }
                const communityIndex = this.communityData.findIndex(item => {
                    if (item.id == this.form.community) {
                        return true;
                    }
                    return false;
                })
                if (communityIndex >= 0) {
                    return this.communityData[communityIndex].floor;
                } else {
                    return []
                }
            },
            unitData() {
                if (this.form.floor == '' || this.floorData.length <= 0) {
                    return []
                } else {
                    //设置单元数据
                    const floorIndex = this.floorData.findIndex(item => {
                        if (item.id == this.form.floor) {
                            return true;
                        }
                        return false;
                    })
                    if (floorIndex >= 0) {
                        return this.floorData[floorIndex].unit;
                    } else {
                        return []
                    }

                }
            },
            disabledForm() {
                if (!this.detail.region) {
                    return true
                }
                return false
            }
        },

        watch: {
            detail: {
                handler: function(val) {
                    if (val) {
                        this.$set(this.form, 'region', val.region.toString())
                        this.setRegion(val.region)
                        this.community(val.region)
                    }
                },
                deep: true,
                immediate: true
            }
        },
        mounted() {
            this.$refs['form'] && this.$refs['form'].setRules(this.rules);
        },
        methods: {
            community(val, status = false) {
                community({
                    region: val
                }).then((res) => {
                    this.communityData = res.data
                    const findcommunity = this.communityData.find(item => {

                        if (item.id == this.detail.community_id) {
                            return true;
                        }
                        return false;
                    })

                    if (findcommunity) {
                        this.communityIdx = [findcommunity.id]
                        this.form.community = findcommunity.id
                        this.$refs.form.validateField('community')
                    }

                })
            },

            genderSelect(e) {
                this.form.gender = e.value
                this.form.gender_text = e.name
                this.$refs.form.validateField('gender')
            },
            setRegion(region) {
                const location = this.$public.findCityALLByUnit(region)
                if (location) {
                    this.regionIdx = location.map(item => item.value)
                    this.form.region_json = location
                }
            },
            // 地区选择变化
            regionChange(e) {
                this.form.region = e.value[e.value.length - 1]
                this.regionIdx = e.detail.map(item => item.value)
                this.form.region_json = e.detail
                this.$refs.form.validateField('region')
                this.resetCommunity()
                this.community(this.form.region)
            },
            resetRegion() {
                this.form.region = '';
                this.regionIdx = [];
            },
            communitychange(e) {
                this.form.community = e.value[0]
                this.communityIdx = [e.value[0]]
                this.$refs.form.validateField('community')
                this.resetFloor()
            },
            resetCommunity(validate = true) {
                this.form.community = '';
                this.communityIdx = [];
                this.resetFloor(validate)
                validate && this.$refs.form.validateField('community')
            },
            floorchange(e) {
                this.form.floor = e.value[0]
                this.floorIdx = [e.value[0]]
                this.$refs.form.validateField('floor')
                this.resetUnit()
            },
            resetFloor(validate = true) {
                this.form.floor = '';
                this.floorIdx = [];
                this.resetUnit(validate)

                validate && this.$refs.form.validateField('floor')
            },
            unitchange(e) {
                this.form.unit = e.value[0]
                this.unitIdx = [e.value[0]]
                this.$refs.form.validateField('unit')
            },
            resetUnit(validate = true) {
                this.form.unit = '';
                this.unitIdx = [];
                validate && this.$refs.form.validateField('unit')
            },
            realodForm() {
                const defaultForms = uni.$u.deepClone(defaultForm)
                defaultForms.region = this.detail.region.toString();
                defaultForms.region_json = this.form.region_json
                this.form = defaultForms
                this.resetCommunity(false)
            },
            submit() {

                // 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
                this.$refs.form.validate().then(res => {
                    this.btnLoading = true;
                    const params = {
                        task_id: this.detail.id,
                        phone: this.form.phone,
                        name: this.form.name,
                        region: this.form.region,
                        region_json: this.form.region_json,
                        gender: this.form.gender,
                        community: this.form.community,
                        floor: this.form.floor,
                        unit: this.form.unit,
                        number: this.form.number,
                    }
                    this.$emit('success', params)

                }).catch(errors => {


                })
            },

        }
    }
</script>

<style lang="scss" scoped>

</style>
