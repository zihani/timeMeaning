<script setup lang="ts">
import { ref,onMounted, type Ref } from 'vue';
import Banner from "@/components/public/Banner/index.vue";
import { useRoute } from 'vue-router'; 
import { getHtml } from "@/utils/convertHtml";
import "highlight.js/styles/atom-one-dark.css";
import Catalog from "./common/Catalog.vue";
import Content from "./common/Content.vue";
import { useBackgroundTheme } from '@/stores/useBackgroundTheme';
const backgroundTheme = useBackgroundTheme()
const route = useRoute();
const html = ref()
const articleType:any = ref({
    name:ref(""),
    fileName:ref(""),
})
const contentRef:Ref<any> = ref(null);
const layoutContainer:Ref<any> = ref(null);
let titles:Ref<Array<string>> = ref([]);
// .md 转html 
const initArticles = function(){
     getHtml(articleType).then(res =>{
        html.value = res
        setTimeout(function(){
            debugger
            contentRef.value.querySelectorAll("h2").forEach(element => {
                element.id = element.innerText
                titles.value.push(element.innerText)
            });
            debugger
            backgroundTheme.domUpdate(layoutContainer)
        },1000)
     })
}
const menuArticles = function(value:string){
    return value
}
onMounted(() => {
    // 获取 query 参数  
    if (route.query.name) {
       articleType.name = route.query.name
       articleType.fileName =  route.query.fileName
       initArticles();
    }  
});

</script>
<template>
    <div class="Articles" >
        <Banner></Banner>
        <el-container class="layout-container" ref="layoutContainer" >
            <el-row :gutter="90">
                <el-col :span="6">
                    <div class="catalog" >
                        <catalog v-if="titles.length > 0"  :titles="titles"> </catalog> 
                        <el-skeleton v-else :rows="100" animated />
                    </div>
                </el-col>
                <el-col :span="18">
                    <div ref="contentRef" class="site-content">
                       <Content  v-if="html" :html="html"></Content>
                    </div>
                </el-col>
            </el-row>
        </el-container>
    </div>
</template>
<style scoped lang="less">
.catalog{
    width: 300px;
}
.site-content {
    width:800px;
}
/******/
@media (max-width: 800px) {
    .site-content {
        
    }
}
/******/
</style>
<style scoped>
@import 'highlight.js/styles/github.css';
</style>