<script setup lang="ts">
import { defineComponent ,ref ,onMounted ,createApp} from 'vue'
import Banner from "@/components/public/Banner/index.vue"
import { useArticleListStore } from "@/stores/useArticleListStore"
import ArticleItem from "@/components/ArticleItem/index.vue"
import { marked }  from 'marked';
import { useBannerStore ,useBannerSetopStore } from "@/stores/useBannerStore"
import 'element-plus/dist/index.css';
import { useRouter } from 'vue-router';
import axios from "axios";
import type { Ref } from "vue";
const baseURl = import.meta.env;
const banner = useBannerStore();
// import ElementPlus from 'element-plus'
// const app = createApp(App);  
const articleListStore = useArticleListStore(); //这是个函数
function initArticleList(){
    axios.get("/md/json/directory.json").then(res =>{ 
        articleListStore.initArticleList = res.data
    })
}
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
//**
// 图片列表
// */
const articleList = articleListStore.initArticleList
</script>
<template>
    <div class="Home">
        <Banner></Banner>
       {{baseURl}}
        <!-- <div v-html="strSvg"></div>
        <img :src="logo" alt=""> -->
        <div v-if='banner.isHome'>
            <el-container>
                <el-aside width="200px"></el-aside>
                <el-container>
                    <el-main>
                        <div class="container">
                           <el-row :gutter="2">
                                <el-col :span="6" v-for="(item,index) in articleListStore.initArticleList" :key="index">
                                    <div class='container-item' @click="openArticles(item)">
                                       <el-image class="el-image-class" :src="item.src" fit="cover"/>
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
    height: 20vh;
    width: 100%;
    border: 1px solid; 
    border-color:rgb(18, 18, 31);
    margin-top: 1px;
    margin-bottom: 1px;
}
.el-image-class {
    width: 100%; 
    height: 100%;
}
/******/
@media (max-width: 800px) {
  
}
</style>

