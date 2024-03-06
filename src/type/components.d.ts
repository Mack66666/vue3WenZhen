import CpNavBar from "@/components/CpNavBar.vue";
import CpIcon from "@/components/CpIcon.vue";
import CpRadioBtn from "@/components/CpRadioBtn.vue";
// 声明组件类型转换
declare module "@vue/runtime-core" {
    instance GlobalComponents {
        CpNavBar: typeof CpNavBar
        CpIcon: typeof CpIcon
        CpRadioBtn : typeof CpRadioBtn
    }
}