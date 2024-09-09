import cityData from 'china-area-data/data-array.json'

export function hideKeyboard() {
    uni.hideKeyboard()
}

export function priceFormat(val) {
    return uni.$u.priceFormat(val)

}

export function cityToTree(items) {
    let res = [] // 存放结果集
    let map = {}
    // 寻找省
    for (const i in items['86']) {
        res.push({
            name: items['86'][i],
            value: i,
            children: []
        })

    }
    delete items['86']
    // 寻找市
    for (const i of res) {
        if (items[i.value]) {
            for (const ii in items[i.value]) {
                i.children.push({
                    name: items[i.value][ii],
                    value: ii,
                    children: []
                })
            }
            delete items[i.value]
        }

    }
    // 寻找区
    for (const i of res) {
        for (const ii of i.children) {
            if (items[ii.value]) {
                for (const iii in items[ii.value]) {
                    ii.children.push({
                        name: items[ii.value][iii],
                        value: iii,
                        children: []
                    })
                }
                delete items[ii.value]
            }
        }
    }
    return res
}
export function findCityALLByUnit(unit) {
    const location = []
    // 寻找区
    const findDistrict = cityData.find(item => {
        if (item.value == unit && item.hasOwnProperty('parent')) {
            return true;
        }
        return false;
    })
    if (findDistrict) {
        location.unshift({
            name: findDistrict.name,
            value: findDistrict.value
        })
        //寻找市
        const findCity = cityData.find(
            item => {
                if (item.value == findDistrict.parent && item.hasOwnProperty('parent')) {
                    return true;
                }
                return false;
            })

        if (findCity) {
            location.unshift({
                name: findCity.name,
                value: findCity.value
            })
            //寻找区
            const findProvince = cityData.find(
                item => {
                    if (item.value == findCity.parent) {
                        return true;
                    }
                    return false;
                })

            if (findProvince) {
                location.unshift({
                    name: findProvince.name,
                    value: findProvince.value
                })
            }
        }
    }

    if (location.length >= 2) {
        return location
    }
    return false;
}

/**
 * 计算百分比
 * @param   {number} num   分子
 * @param   {number} total 分母
 * @returns {number} 返回数百分比
 */
export function percentage(num, total) {
    if (num == 0 || total == 0) {
        return 0;
    }
    const returnNum = (Math.round(num / total * 10000) / 100.00);
    return returnNum > 100 ? 100 : returnNum; // 小数点后两位百分比
}
export default {
    hideKeyboard,
    priceFormat,
    findCityALLByUnit,
    percentage
}
