<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { patientList, addPatient } from '@/type/user'
import { getPatientList, postPatient, updataPatient,delPatient } from '@/services/user'
import { nameRules, idCardRules } from '@/utils/rules'
import { showSuccessToast, type FormInstance, showConfirmDialog } from 'vant';
const patientList = ref<patientList>([])
onMounted(() => {
    init()
})
const init = async () => {
    const res = await getPatientList()
    patientList.value = res.data
}
const form = ref<FormInstance>()
const genderData = [
    { label: '男', value: 1 },
    { label: '女', value: 0 },
]
const initData = ref<addPatient>({
    name: '',
    gender: 1,
    defaultFlag: 0,
    idCard: '',
})
const formData = ref()
const show = ref(false)
const showPopup = () => {
    show.value = true
    formData.value = { ...initData.value }
}
const changeIDCar = () => {
    form.value?.validate('idCard').then(() => {
        // 获取字符串倒数第二位
        formData.value.gender = +formData.value.idCard.substring(16, 17) % 2 === 0 ? 0 : 1
    }).catch(() => { })
}
const onSubmit = () => {
    form.value?.validate().then(async () => {
        const res = formData.value.id ? await updataPatient(formData.value) : await postPatient(formData.value)
        if (res.code === 10000) {
            show.value = false
            init()
            showSuccessToast(formData.value.id ? '修改成功' : '添加成功')
        }
    }).catch(() => { })
}
const defaultFlag = computed({
    get() {
        return formData.value.defaultFlag == 1 ? true : false
    },
    set(val) {
        formData.value.defaultFlag = val ? 1 : 0
    }
})
const editMsg = (item: addPatient) => {
    formData.value = item
    show.value = true
}
const deletePatient = (id: number) => {
    showConfirmDialog({
        title: '提示',
        message: '确定要删除该患者吗？',
    }).then(() => {
        delPatient(id).then(res => {
            if (res.code === 10000) {
                init()
                show.value = false
                showSuccessToast('删除成功')
            }
        })
    }).catch(() => { })
}
</script>

<template>
    <div class="patient-page">
        <cp-nav-bar title="家庭档案"></cp-nav-bar>
        <div class="patient-list">
            <div class="patient-item" v-for="item in patientList" :key="item.id">
                <div class="info">
                    <span class="name">{{ item.name }}</span>
                    <span class="id">{{ item.idCard.replace(/^(.{6}).+(.{4})$/, '$1********$2') }}</span>
                    <span>{{ item.genderValue }}</span>
                    <span>{{ item.age }}岁</span>
                </div>
                <div class="icon"><cp-icon name="user-edit" @click="editMsg(item)" /></div>
                <div class="tag" v-if="item.defaultFlag == 1">默认</div>
            </div>
            <div class="patient-add" v-if="patientList?.length < 6" @click="showPopup">
                <cp-icon name="user-add" />
                <p>添加患者</p>
            </div>
            <div class="patient-tip">最多可添加 6 人</div>
            <van-popup v-model:show="show" position="right">
                <cp-nav-bar :back="() => { show = false }" showLeftBtn :title="formData.id ? '编辑患者信息' : '添加患者信息'"
                    right-text="保存" @onClickRight="onSubmit"></cp-nav-bar>
                <van-form autocomplete="off" ref="form">
                    <van-field label="真实姓名" placeholder="请输入真实姓名" v-model="formData.name" :rules="nameRules" />
                    <van-field name="idCard" label="身份证号" placeholder="请输入身份证号" v-model="formData.idCard"
                        :rules="idCardRules" @blur="changeIDCar" />
                    <van-field label="性别" class="pb4">
                        <!-- 单选按钮组件 -->
                        <template #input>
                            <cp-radio-btn v-model="formData.gender" :options="genderData"></cp-radio-btn>
                        </template>
                    </van-field>
                    <van-field label="默认就诊人">
                        <template #input>
                            <van-checkbox v-model="defaultFlag" :icon-size="18" round />
                        </template>
                    </van-field>
                    <van-action-bar v-if="formData.id">
                        <van-action-bar-button @click="deletePatient(formData.id)">删除</van-action-bar-button>
                    </van-action-bar>
                </van-form>
            </van-popup>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// .patient-page {
//     padding: 46px 0 80px;
// }

.patient-list {
    padding: 15px;
}
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
.patient-item {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: var(--cp-bg);
    border-radius: 8px;
    margin-bottom: 15px;
    position: relative;
    border: 1px solid var(--cp-bg);
    transition: all 0.3s;
    overflow: hidden;

    .info {
        display: flex;
        flex-wrap: wrap;
        flex: 1;

        span {
            color: var(--cp-tip);
            margin-right: 20px;
            line-height: 30px;

            &.name {
                font-size: 16px;
                color: var(--cp-text1);
                width: 80px;
                margin-right: 0;
            }

            &.id {
                color: var(--cp-text2);
                width: 180px;
            }
        }
    }

    .icon {
        color: var(--cp-tag);
        width: 20px;
        text-align: center;
    }

    .tag {
        position: absolute;
        right: 60px;
        top: 21px;
        width: 30px;
        height: 16px;
        font-size: 10px;
        color: #fff;
        background-color: var(--cp-primary);
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &.selected {
        border-color: var(--cp-primary);
        background-color: var(--cp-plain);

        .icon {
            color: var(--cp-primary);
        }
    }
}

.patient-add {
    background-color: var(--cp-bg);
    color: var(--cp-primary);
    text-align: center;
    padding: 15px 0;
    border-radius: 8px;

    .cp-icon {
        font-size: 24px;
    }
}

.patient-tip {
    color: var(--cp-tag);
    padding: 12px 0;
}

.pb4 {
    padding-bottom: 4px;
}

.patient-page {
    padding: 46px 0 80px;

    :deep() {
        .van-popup {
            width: 100% !important;
            height: 100% !important;
            top: 49.98% !important;
            padding-top: 46px;
            box-sizing: border-box;
        }
    }
}
</style>
