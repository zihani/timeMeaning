<script  setup lang="ts">
import { ref, type Ref, watch } from "vue";
import TodoList from '@/components/public/TodoList/index.vue'
import { useBackgroundTheme } from '@/stores/useBackgroundTheme';
const backgroundTheme = useBackgroundTheme();
const backgroundColor: Ref<string> = ref(backgroundTheme[backgroundTheme.backgroundColor]);
//监听backgroundColor 变化
watch(() => backgroundTheme.backgroundColor,
    (newVal, oldVal) => {
        backgroundColor.value = backgroundTheme[backgroundTheme.backgroundColor]
    },
    {
        deep: true // 开启深度监听
    })
</script>
<template>
    <div id="layout-body" :style="`background-color:${backgroundColor}`">
        <router-view></router-view>
        <TodoList></TodoList>
    </div>
</template>
<style scoped>
#layout-body{
    /* header = 80px */
    min-height: -moz-calc(100vh - 80px);
    min-height: -webkit-calc(100vh - 80px);
    min-height: calc(100vh - 80px);
}
</style>
