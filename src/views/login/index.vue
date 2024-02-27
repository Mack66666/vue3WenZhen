<script setup lang="ts">
import { ref } from 'vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { showToast } from 'vant';
import { passwordLogin, getPhoneCode,codeLogin } from '@/services/user'
import { useUserStore } from '@/stores/modules/user'
import { useRoute, useRouter } from 'vue-router';
import { onUnmounted } from 'vue';

const form = ref({
  mobile: '',
  password: '',
  code: '',
  agree: false
})
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const time = ref(0)
let timer :number
const toPass = ref(true)
const getCode = async () => {
  const toSubmit = testFrom('code')
  if (toSubmit == 'true') {
    const res = await getPhoneCode(form.value.mobile,'login')
    if(res.code == 10000){
      const data = res.data as any
      form.value.code = data.code
      time.value = 60
      clearInterval(timer)
      timer = setInterval(() => {
        time.value--
        if (time.value <= 0) {
           time.value = 0
          clearInterval(timer)
        }
      },1000)
     
    }
  } else {
    showToast(toSubmit)
  }
}

const onSubmit = async () => {
  const toSubmit = testFrom()
  if (toSubmit == 'true') {
    console.log(toPass.value);
    const res = toPass.value? await passwordLogin(form.value.mobile, form.value.password) : await codeLogin(form.value.mobile, form.value.code)
    if (res.code == 10000) {
      userStore.setUserInfo(res.data)
      showToast({
        message: '登录成功',
        onClose: () => {
          router.push(route.query.returnUrl as string || '/user')
        }
      })
    }
  } else {
    showToast(toSubmit)
  }

}
const testFrom = (type?:string) => {
  if (!/^1[3-9]\d{9}$/.test(form.value.mobile)) return '手机号格式错误'
  if (type == 'code') {
    return 'true'
  }
  if (toPass.value) {
    if (!form.value.mobile || !form.value.password) return '手机号或密码不能为空'
    if (! /^\w{8,24}$/.test(form.value.password)) return '密码格式错误'
  } else {
    if (!form.value.mobile || !form.value.code) return '手机号或验证码不能为空'
    if (! /^\d{6}$/.test(form.value.code)) return '验证码格式错误'
  }
  if (!form.value.agree) return '请勾选协议'
  return 'true'
}
onUnmounted(()=>{
  clearInterval(timer)
})
</script>

<template>
  <div class="login-page">
    <cp-nav-bar right-text="注册" title="登录" @click-right="$router.push('/register')"></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ toPass ? '账号密码登录' : '验证码登录' }}</h3>
      <a href="javascript:;" @click="toPass = !toPass">
        <span>{{ toPass ? '短信验证码登录' : '账号密码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off">
      <van-field placeholder="请输入手机号" type="tel" v-model="form.mobile" :rules="mobileRules" maxlength="11"></van-field>
      <van-field v-if="toPass" placeholder="请输入密码" type="password" v-model="form.password"
        :rules="passwordRules"></van-field>
      <van-field v-else placeholder="请输入验证码" type="number" v-model="form.code" :rules="codeRules" maxlength="6">
        <template #button>
          <van-button size="small" type="primary" @click="getCode" :disabled="time!=0">{{time<=0?'发送验证码':time+'S 后再次发送'}}</van-button>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="form.agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit" @click="onSubmit">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }

  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;

    h3 {
      font-weight: normal;
      font-size: 24px;
    }

    a {
      font-size: 15px;
    }
  }

  &-other {
    margin-top: 60px;
    padding: 0 30px;

    .icon {
      display: flex;
      justify-content: center;

      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 14px;

  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }

  .btn-send {
    color: var(--cp-primary);

    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
