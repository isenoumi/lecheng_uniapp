import {
    getEnv
} from '@/common/config/getEnv';

module.exports = {
    baseUrl: getEnv('BASE_API_URL')
}
