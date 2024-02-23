import axios, { AxiosError, type Method } from 'axios'
import { useUserStore } from '../stores'
import { showToast } from 'vant'
import router from '@/router'
const instance = axios.create({
    //  1. 基础地址，超时时间
    baseURL: 'https://consult-api.itheima.net/',
    timeout: 5000,
})

instance.interceptors.request.use(
    (config) => {
        // TODO 2. 携带token
        const store = useUserStore()
        config.headers.Authorization = `Bearer ${store.userInfo?.token}`
        return config
    },
    (err) => Promise.reject(err)
)

instance.interceptors.response.use(
    (res) => {
        if (res.data.code !== 10000) {
            showToast(res.data.message || '业务失败')
        }
        //3. 处理业务失败
        //4. 摘取核心响应数据
        return res.data
    },
    (err: AxiosError) => {
        // 5. 处理401错误
        if (err.response?.status == 401) {
            // 删除用户信息
            const store = useUserStore()
            store.removeUserInfo()
            // 跳转到登录页
            console.log(router.currentRoute.value.fullPath);
            router.push({
                path: '/login',
                query: {
                    returnUrl: router.currentRoute.value.fullPath
                }
            })
        }

        return Promise.reject(err)
    }
)
type Data<T> ={
    code:number,
    message:string,
    data:T
}
export default instance
// export {  instance }
export const request = <T> (url: string, method: Method = "GET", submitData?: object) => {
    return instance.request<any,Data<T>>({
      url,
      method,
      [method.toLowerCase() === "get" ? "params" : "data"]: submitData
    })

}