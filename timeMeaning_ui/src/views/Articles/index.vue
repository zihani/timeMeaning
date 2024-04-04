<script setup lang="ts">
import { ref,onMounted, type Ref } from 'vue';
import Banner from "@/components/public/Banner/index.vue";
import { useRoute } from 'vue-router'; 
import { getHtml } from "@/utils/convertHtml";
import "highlight.js/styles/atom-one-dark.css";
import  Catalog  from "./common/Catalog.vue";
const route = useRoute();
const html = ref()
const articleType:any = ref({
    name:ref(""),
    fileName:ref(""),
})
const htmlContainer:Ref<any> = ref(null);
let titles:Ref<Array<string>> = ref([]);
// .md 转html 
const initArticles = function(){
     getHtml(articleType).then(res =>{
        html.value = res
        setTimeout(function(){
            htmlContainer.value.querySelectorAll("h2").forEach(element => {
                element.id = element.innerText
                titles.value.push(element.innerText)
            });
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
    <div class="Articles">
        <Banner></Banner>
        <el-container class="layout-container" style="height: 500px">
            <el-row :gutter="90">
                <el-col :span="6">
                    <div class="catalog" >
                        <catalog v-if="titles.length > 0"  :titles="titles"> </catalog> 
                        <el-skeleton v-else :rows="100" animated />
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="site-content">
                        <div v-if="html" v-html="html" ref="htmlContainer"> </div>
                        <el-skeleton v-else :rows="100" animated />
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