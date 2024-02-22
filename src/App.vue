<script lang="ts" setup>
import { Button as vantButton} from 'vant';
import {useUserStore} from './stores'
const store = useUserStore()
console.log(store.userInfo);
</script>
<template>
    {{ store.userInfo }}
    <vant-button type="primary" @click="store.setUserInfo({ id: '1', mobile: '1', account: '1', avatar: '1', token: '1' })">登录</vant-button>
    <vant-button type="primary" @click="store.removeUserInfo">退出</vant-button>
</template>

<style lang="less" scoped></style>./stores/modules/user