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
        }else{
             catalogref.value.style.position = "";
            catalogref.value.style.top = "";
        }
});
onMounted(() => {
    // 访问 query 参数  
});

</script>
<template>
    <div class="Catalog" ref="catalogref">
        <!-- 目录 -->
        <el-aside width="100%">
        <el-scrollbar>
            <el-menu :default-openeds="['1', '3']">
            <el-sub-menu index="1">
                <template #title>
                <el-icon><message /></el-icon>目录
                </template>
                <el-menu-item-group>
                <el-menu-item v-for="(item,index ) in props.titles" ><a :href="'#'+item">{{item}}</a></el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            </el-menu>
        </el-scrollbar>
    </el-aside>
    </div>
</template>
<style scoped lang="less">
</style>
