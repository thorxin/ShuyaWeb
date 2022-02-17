import axios from 'axios';

import { base_URL } from './api';
import { BEARER } from './header';
import { refresh_token } from '../modules/action.auth';

const lang = localStorage.getItem("i18nextLng")

const httpService = axios.create({
    baseURL: base_URL
});

/**
 * request config
 */
httpService.interceptors.request.use(config => {
    config.headers['Authorization'] = BEARER;
    config.headers['Lang'] = lang;
    if (config.method === 'POST')
        config.headers['Content-Type'] = 'application/json-patch+json'
    return config;
});

/**
 * response confing
 * token will be refresh when status 401 unAuthorizate
 */
httpService.interceptors.response.use(config => {
    return config
}, (error) => {

    const statusCode = error.request.status;
    if (statusCode === 401) {
        // TODO - tsa - implement or call refresh token action here
        refresh_token();
        // window.location.reload(true)
    }

    return error;
});

export default httpService;