import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Toast } from 'antd-mobile';


export interface IresponseData {
    code: string,
    result: {},
    msg: string
}

Axios.interceptors.request.use((config: AxiosRequestConfig) => {
    Toast.loading('加载中', 0)
    return config;
}, function (err) {
    return Promise.reject(err)
});

Axios.interceptors.response.use((response: AxiosResponse) => {
    Toast.hide()
    return response;
}, (err) => {
    Toast.hide()
    return Promise.reject(err)
});

