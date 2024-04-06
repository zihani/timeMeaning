
<script  setup lang="ts">
import { onMounted,onUnmounted, ref,type Ref,watch } from "vue";
import TablePet from '@/components/public/TablePet.vue'
import TodoList from '@/components/public/TodoList/index.vue'
import { useBackgroundTheme } from '@/stores/useBackgroundTheme';
const backgroundTheme=useBackgroundTheme()
const body:Ref<any> = ref(null);
function styleUpdate(){
    backgroundTheme.domUpdate(body)
}
 onMounted(()=>{
        styleUpdate()
 })
</script>
<template>
    <div id="layout-body" ref='body'>
        <router-view></router-view>
        <!-- <TablePet></TablePet> -->
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
