import { defineStore } from "pinia";
import type { User } from "../type/user";
import { ref } from "vue";
export const useUserStore = defineStore('userStore', () => {
    const userInfo = ref<User>()
    // 设置用户信息，登录使用
    const setUserInfo = (user: User) => {
        userInfo.value = user
        console.log(userInfo);
    }
    // 删除用户，推出登录
    const removeUserInfo = () => {
        userInfo.value = undefined
    }
    return { userInfo, setUserInfo, removeUserInfo }
})