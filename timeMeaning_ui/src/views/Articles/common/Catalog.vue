<script setup lang="ts">
import type { link } from 'fs';
import { ref,onMounted,defineProps,defineEmits ,type Ref} from 'vue'
const html = ref()
const articleType:any = ref({
    name:ref(""),
    fileName:ref(""),
})
const emit = defineEmits(['link'])

const props = defineProps({
    titles:Array
})
const catalogref:Ref<any> = ref(null);
window.addEventListener('scroll', function() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight = window.innerHeight;
        if(scrollTop > 388){
            catalogref.value.style.position = "fixed";
            catalogref.value.style.top = "0";
            catalogref.value.style.width = "300px";
        }else{
            catalogref.value.style.position = "";
            catalogref.value.style.top = "";
        }
});
const openlink = ((name)=>{
   let link =  document.createElement("a")
    link.href = "#"+name
    link.click();
})
onMounted(() => {
    // 访问 query 参数  
});
</script>
<template>
    <div class="Catalog" ref="catalogref">
        <!-- 目录 -->
        <el-aside style="width: 100%;">
        <el-scrollbar>
            <el-menu :default-openeds="['1', '3']">
            <el-sub-menu index="1" style="overflow-y: scroll; height: 100vh;">
                <template #title>
                    <el-icon><message /></el-icon>目录
                </template>
                <el-menu-item-group>
                <el-menu-item v-for="(item,index ) in props.titles" @click="openlink(item)"><strong>{{item}}</strong></el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            </el-menu>
        </el-scrollbar>
    </el-aside>
    </div>
</template>
<style scoped lang="less">
</style>
