<template>
    <div class="layout">
        <router-view></router-view>
        <van-tabbar v-model="active" route>
            <van-tabbar-item v-for="(item, index) in tabbarList" :key="index" :to="item.path">
                {{ item.text }}
                <template #icon="current">
                  <cp-icon :name="`${item.icon}${current.active?'active':'default'}`"></cp-icon>
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const active = ref(0)
const tabbarList = [
    {
        icon: 'home-index-',
        text: '首页',
        path: '/home'
    },
    {
        icon: 'home-article-',
        text: '健康百科',
        path: '/article'
    },
    {
        icon: 'home-notice-',
        text: '消息中心',
        path: '/notify'
    },
    {
        icon: 'home-mine-',
        text: '我的',
        path: '/user'
    },
]
</script>
<style lang="scss" scoped>
.layout-page {
  :deep() {
    .van-tabbar-item {
      &__icon {
        font-size: 21px;
      }
      &__text {
        font-size: 11px;
      }
      &:not(.van-tabbar-item--active) {
        color: var(--cp-text3);
      }
    }
  }
}</style>