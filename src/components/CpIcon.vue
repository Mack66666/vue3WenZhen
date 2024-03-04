<template>
    <svg aria-hidden="true" class="cp-icon">
          <use :href="'#icon-'+name"></use>
        </svg>
</template>
<script lang="ts" setup>
defineProps<{
    name:string
}>()
</script>
<style lang="scss" scoped>
.cp-icon{
    width: 1em;
    height: 1em;
}
</style>