<template>
    <van-nav-bar :title="title" fixed :right-text="rightText" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import router from '../router'
defineProps<{ rightText?: string, title?: string }>()
const emit  = defineEmits<{ (e: 'onClickRight'): void }>()
const onClickLeft = () => {
    // 返回上一页
    // history.back();
    // history：可以获取到路由的历史信息，包括当前页面的URL、前一个页面的URL等。
    // console.log(history);
    if(history.state?.back){
        history.back()
    }else{
        router.push('/')
    }
}
const onClickRight = () => {
    emit('onClickRight')
}
</script>
<style lang="scss" scoped>
:deep() {
    .van-icon {
        font-size: 5.3vw;
        color: var(--cp-text1);
    }

    .van-nav-bar__title {
        font-size: 4vw;
    }
}
</style>