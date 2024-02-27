import CpNavBar from "@/components/CpNavBar.vue";

// 声明组件类型转换
declare module "@vue/runtime-core" {
    instance GlobalComponents {
        CpNavBar: typeof CpNavBar
    }
}