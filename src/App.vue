<script lang="ts" setup>
import { Button as vantButton } from 'vant';
import { useUserStore } from './stores'
import { request } from './utils/requets'
import type { User } from './types/user'
const store = useUserStore()
const getUser = () => {
    request('/patient/myUser', 'GET')
}
const login = () => {
    request<User>('/login/password', 'post', {
        mobile: '13211112222',
        password: 'abc12345'
    })
        .then(res => {
            store.setUserInfo(res.data)
        })
}
</script>
<template>
    {{ store.userInfo }}
    <vant-button type="primary"
        @click="store.setUserInfo({ id: '1', mobile: '1', account: '1', avatar: '1', token: '1' })">登录</vant-button>
    <vant-button type="primary" @click="store.removeUserInfo">退出</vant-button>
    <vant-button type="primary" @click="getUser"></vant-button>
    <vant-button type="primary" @click="login">登录</vant-button>
</template>

<style lang="less" scoped></style>