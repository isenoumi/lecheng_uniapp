import dayjs from 'dayjs';
import {
	actStatus
} from '@/common/enums/activity.js'
export default {
	filters: {
		dateFormat(date) {
			return uni.$u.timeFrom(dayjs(date).valueOf());
		},
		minTime(min) {
			let minTime = "";
			let h = Math.floor(min / 60);
			min -= h * 60;
			if (min == 0) {
				minTime = h ? "0" + h + ":00" : "";
			} else {
				if (min < 10) {
					min = "0" + min;
				}
				if (h < 10) {
					h = "0" + h;
				}
				minTime = (h ? h + ":" : "00:") + (min ? min + "" : "");
			}
			return `${minTime}`;

		},
		activityStatusText(val) {
			if (val == actStatus.unaccept) {
				return '待接受'
			} else if (val == actStatus.popular) {
				return '已接受'
			} else if (val == actStatus.underway) {
				return '进行中'
			} else if (val == actStatus.success) {
				return '已完成'
			}
			return ''

		},
		activityTypeText(val) {
			let attr = '';
			if (val == 10) {
				attr = '线上活动'
			} else if (val == 20) {
				attr = '线下活动'

			}
			return attr

		}
	},
	data() {
		return {

		}
	},
	mounted() {

	},
	methods: {
		hideKeyboard() {
			uni.hideKeyboard()
		},
		uniPickerFilter(val) {
			return val.map(item => {
				return item.text
			}).join('-')
		}
	}

}
