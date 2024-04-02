<script setup lang="ts">
import type { link } from 'fs';
import { ref,onMounted,defineProps,defineEmits } from 'vue'
const html = ref()
const articleType:any = ref({
    name:ref(""),
    fileName:ref(""),
})
const emit = defineEmits(['link'])

const props = defineProps({
    titles:Array
})
debugger
props.titles

onMounted(() => {
    // 访问 query 参数  
 
});
let link = (() => {
    emit('link',"超链接")
})
</script>
<template>
    <div class="Catalog">
        <!-- 目录 -->
        <el-aside width="200px">
        <el-scrollbar>
            <el-menu :default-openeds="['1', '3']">
            <el-sub-menu index="1">
                <template #title>
                <el-icon><message /></el-icon>目录
                </template>
                <el-menu-item-group>
                <el-menu-item v-for="(item,index ) in props.titles" @click="link()">{{item}}</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            </el-menu>
        </el-scrollbar>
    </el-aside>
    </div>
</template>
<style scoped lang="less">

</style>
