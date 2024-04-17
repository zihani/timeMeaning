<script setup lang="ts">
import { ref,onMounted, type Ref,watch, registerRuntimeCompiler } from 'vue';
import Banner from "@/components/public/Banner/index.vue";
import { useRoute } from 'vue-router'; 
import { getHtml } from "@/utils/convertHtml";
import "highlight.js/styles/atom-one-dark.css";
import Catalog from "./common/Catalog.vue";
import Content from "./common/Content.vue";
import { useBackgroundTheme } from '@/stores/useBackgroundTheme';
import rain from "@/components/public/Banner/common/rain.vue";
const backgroundTheme = useBackgroundTheme();
const backgroundColor:Ref<string> = ref(backgroundTheme[backgroundTheme.backgroundColor]);
const color:Ref<string> = ref(backgroundTheme.backgroundColor === "dark"?backgroundTheme.white:backgroundTheme.dark);
const route = useRoute();
const html:Ref<any> = ref();
const articleType:any = ref({
    name:ref(""),
    fileName:ref(""),
});
const title:any = ref("");
const contentRef:Ref<any> = ref(null);

watch(() => backgroundTheme.backgroundColor,  
(newVal, oldVal) => {
    backgroundColor.value = backgroundTheme[backgroundTheme.backgroundColor];
    color.value = backgroundTheme.backgroundColor === "dark"?backgroundTheme.white:backgroundTheme.dark
},  
{
    deep: true // 开启深度监听  
})
let titles:Ref<Array<string>> = ref([]);
// .md 转html 
const initArticles = function(){
     getHtml(articleType).then(res =>{
        html.value = res;
        setTimeout(function(){
            contentRef.value.querySelectorAll("h2").forEach(element => {
                element.id = element.innerText;
                titles.value.push(element.innerText);
            });
        },1000);
     });
};
const menuArticles = function(value:string){
    return value;
}
onMounted(() => {
    // 获取 query 参数  
    if (route.query.name) {
       title.value = route.query.name;
       articleType.name = route.query.name;
       articleType.fileName =  route.query.fileName;
       initArticles();
    };  
});
</script>
<template>
    <div class="Articles" >
        <div style="width:100%;">
            <rain></rain>
        </div>
        <el-container  :style="`background-color:${backgroundColor};color:${color};width:100%;`">
             <el-row style="width:100%;">
                <el-col :span="6" :xs="0">
                    <div class="catalog" >
                        <catalog v-if="titles.length > 0"  :titles="titles"> </catalog> 
                        <el-skeleton v-else :rows="100" animated />
                    </div>
                </el-col>
                <el-col :span="18" :xs="24">
                    <div class="content">
                        <h1>{{ title }}</h1> 
                    </div>
                    <div class='content-html'  ref="contentRef">
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
    width:70vw;
}
.content{
    height: 80px;
    margin-left: auto;
    margin-right: auto;
    width: 80%; /* 或者你需要的宽度 */
}
.Articles{
   width:90vw;
}
.content-html{
  margin-left: auto;
  margin-right: auto;
  width: 80%; /* 或者你需要的宽度 */
}
/******/
@media (max-width: 800px) {
    .Articles{
        font-size: 8px;
    }
    .catalog{
        width: 100%;
    }
}
/******/
</style>
<style scoped>
@import 'highlight.js/styles/github.css';
</style>