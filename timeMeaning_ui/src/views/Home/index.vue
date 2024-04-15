<script setup lang="ts">
import { defineComponent ,ref ,onMounted ,createApp,watch} from 'vue';
import Banner from "@/components/public/Banner/index.vue";
import { useArticleListStore } from "@/stores/useArticleListStore";
import ArticleItem from "@/components/ArticleItem/index.vue";
import { marked }  from 'marked';
import { useBannerStore ,useBannerSetopStore } from "@/stores/useBannerStore";
import 'element-plus/dist/index.css';
import { useRouter } from 'vue-router';
import axios from "axios";
import type { Ref } from "vue";
import{ useBackgroundTheme } from "@/stores/useBackgroundTheme";
const baseURl = import.meta.env;
const banner = useBannerStore();
const container:Ref<any> = ref(null);
const backgroundTheme = useBackgroundTheme();
const backgroundColor:Ref<string> = ref(backgroundTheme[backgroundTheme.backgroundColor]);
const color:Ref<string> = ref(backgroundTheme.backgroundColor === "dark"?backgroundTheme.white:backgroundTheme.dark);

const articleListStore = useArticleListStore(); //这是个函数
watch(() => backgroundTheme.backgroundColor,  
    (newVal, oldVal) => {
        backgroundColor.value = backgroundTheme[backgroundTheme.backgroundColor]
        color.value = backgroundTheme.backgroundColor === "dark"?backgroundTheme.white:backgroundTheme.dark
    },  
    {
        deep: true // 开启深度监听  
})


//**
// 图片列表
// */
const articleList:Ref<any> = ref()
function initArticleList(){
    axios.get("/md/json/directory.json").then(res =>{
        articleListStore.initArticleList = res.data
        articleList.value = res.data
    })
};
onMounted(() => {
    initArticleList()
}); 

//**
// 跳转
// */
const router = useRouter(); 
const openArticles = ((item:any)=>{
    router.push({ path: '/article', query: { name: item.name,fileName:item.fileName } });
})
</script>
<template>
    <div class="Home">
        <Banner></Banner>
        <div :style="`background-color:${backgroundColor}; color:${color};`">
            <el-container>
                <el-aside width="200px"></el-aside>
                <el-container>
                    <el-main>
                        <div class="container">
                           <el-row :gutter="10">
                                <el-col :span="6" v-for="(item,index) in articleList" :key="index">
                                    <div class='container-item' @click="openArticles(item)">
                                       <div class="item-img"> 
                                          <el-image class="el-image-class" :src="item.src" fit="cover"/>
                                       </div>
                                       <div class="item-lable">
                                          <h4>{{ item.name }}</h4>  
                                       </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-main>
                </el-container>
                <el-aside width="200px"></el-aside>
            </el-container>
        </div>
    </div>
</template>
<style scoped lang="less">
.container-item {
    border-radius: 3px;
    height: auto;
    width: 100%;
    margin-top: 3px;
    margin-bottom: 3px;
}
.el-image-class {
    width: 100%; 
    height: 100%;
}
.item-img{
    width: 100%; 
    height: 200px;
    border-radius: 33px;
}
.item-lable{
    width: 100%; 
    height: 20%;
    text-align: center;
}
/******/
@media (max-width: 800px) {
  
}
</style>

