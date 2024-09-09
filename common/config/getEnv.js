import config from './index'
import devEnv from './dev.env.js'
import ProdEnv from './prod.env.js'
import LocalEnv from './local.env.js'
//便捷获取方法
const EnvList = {
    dev: devEnv,
    prod: ProdEnv,
    local: LocalEnv
}
export function getEnv(key) {
    if (!key) {
        return ''
    }
    return EnvList[config.CURRENT_ENV][key]

}
