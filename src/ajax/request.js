import axios from 'axios'
import Vue from 'vue'
import { RES_URL } from './Url'

export const requst = (options) => {
  return new Promise(reslove => {
    const insta = axios.create({
      baseURL: RES_URL
    })
    let toastLoad
    // 请求拦截
    insta.interceptors.request.use(config => {
      config.headers.Authorization = sessionStorage.getItem('token')
      toastLoad = Vue.prototype.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      return config
    })

    // 响应拦截
    insta.interceptors.response.use(res => {
      toastLoad.clear()
      return res.data.data
    })

    insta(options).then(res => {
      reslove(res)
    })
  })
}