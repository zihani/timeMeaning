<script setup lang="ts">
import { ref,onMounted,defineProps,defineEmits ,type Ref,watch} from 'vue';
import { useBackgroundTheme } from '@/stores/useBackgroundTheme';
const backgroundTheme=useBackgroundTheme();
const backgroundColor:Ref<string> = ref(backgroundTheme[backgroundTheme.backgroundColor]);
watch(()=>backgroundTheme.backgroundColor,(newVal,oldVal)=>{
   backgroundColor.value = backgroundTheme[backgroundTheme.backgroundColor];
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
    <div class="Catalog" :style="`background-color:${backgroundColor}`" ref="catalogref">
        <!-- 目录 -->
        <el-aside style="width: 100%;" ref="scrollbar">
            <el-scrollbar>
                <el-menu :default-openeds="['1', '3']">
                <el-sub-menu  index="1" :style="`overflow-y: scroll; height: 70vh;background-color :${backgroundTheme[backgroundTheme.backgroundColor]};`">
                    <template #title>
                        <el-icon><message /></el-icon>目录
                    </template>
                    <el-menu-item-group :style="`background-color :${backgroundTheme[backgroundTheme.backgroundColor]};`"> 
                        <el-menu-item v-for="(item,index ) in props.titles" :key="index" @click="openlink(item)"><strong>{{item}}</strong></el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </el-aside>
    </div>
</template>
<style scoped lang="less">
// .el-sub-menu {  
//     background-color:rgb(35, 24, 69)!important;  
//     color: #ffff!important;
// }
// .el-menu {
//     background-color:rgb(35, 24, 69)!important;  
//     color: #ffff!important;
// }
// .el-menu-item-group{
//     background-color:rgb(35, 24, 69)!important;  
//     color: #ffff!important;
// }
</style>
