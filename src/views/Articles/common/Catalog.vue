<script setup lang="ts">
import { ref,onMounted,defineProps,defineEmits ,type Ref,watch} from 'vue';
import { useBackgroundTheme } from '@/stores/useBackgroundTheme';
const backgroundTheme=useBackgroundTheme();
const backgroundColor:Ref<string> = ref(backgroundTheme[backgroundTheme.backgroundColor]);
const color:Ref<string> = ref(backgroundTheme.backgroundColor === "dark" ? backgroundTheme.white : backgroundTheme.dark);
watch(()=>backgroundTheme.backgroundColor,(newVal,oldVal)=>{
   backgroundColor.value = backgroundTheme[backgroundTheme.backgroundColor];
   color.value = backgroundTheme.backgroundColor === "dark" ? backgroundTheme.white : backgroundTheme.dark;
},{
    deep:true
});
const html = ref();
const articleType:any = ref({
    name:ref(""),
    fileName:ref(""),
});
const emit = defineEmits(['emit']);
const props = defineProps({
    titles:Array
});
const catalogref:Ref<any> = ref(null);
const menuItemGroup:Ref<any> = ref(null);
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
        };
});
const openlink = ((name)=>{
   let link =  document.createElement("a");
    link.href = "#"+name;
    link.click();
});
onMounted(() => {
    // 访问 query 参数  
});
</script>
<template>
    <div class="Catalog" :style="`background-color:${backgroundColor}; color:${color};`" ref="catalogref">
        <!-- 目录 -->
        <el-aside style="width: 100%;" ref="scrollbar">
            <el-scrollbar>
                <el-menu :default-openeds="['1', '3']" :style="`background-color:${backgroundColor}; color:${color};`">
                <el-sub-menu  index="1" :style="`overflow-y: scroll; height: 70vh;background-color:${backgroundColor}; color:${color};`">
                    <template #title :style="`color:${color};`">
                        <el-icon><message /></el-icon>目录
                    </template>
                    <el-menu-item-group :style="`background-color:${backgroundColor}; color:${color};`"> 
                        <el-menu-item v-for="(item,index ) in props.titles" :key="index" @click="openlink(item)" :style="`color:${color};`"><strong>{{item}}</strong></el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </el-aside>
    </div>
</template>
<style scoped lang="less">
:deep(.el-menu) {
    background-color: transparent !important;
    border-right: none;
}
:deep(.el-sub-menu__title) {
    color: inherit !important;
}
:deep(.el-menu-item) {
    color: inherit !important;
    &:hover {
        background-color: rgba(255, 255, 255, 0.1) !important;
    }
    &.is-active {
        color: #ff6d6d !important;
    }
}
:deep(.el-menu-item-group__title) {
    color: inherit !important;
}
</style>
