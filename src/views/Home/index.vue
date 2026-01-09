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
import { getRandomSpecificColor }   from "@/utils/getRandomSpecificColor.ts";
const baseURl = import.meta.env;
const bannerStore = useBannerStore();
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
//    console.log() 
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
        <div v-if="bannerStore.isHome" class="home-content" :style="`background-color:${backgroundColor}; color:${color};`">
            <el-container class="home-container">
                <el-main class="home-main">
                    <div class="container">
                        <el-row :gutter="{ xs: 8, sm: 12, md: 16, lg: 20, xl: 24 }">
                            <el-col 
                                :xs="24" 
                                :sm="12" 
                                :md="8" 
                                :lg="6" 
                                :xl="6"
                                v-for="(item,index) in articleList" 
                                :key="index"
                            >
                                <div class='container-item' @click="openArticles(item)">
                                    <div class="item-img"> 
                                        <el-image class="el-image-class" :src="item.src" fit="cover" lazy>
                                             <template #error>
                                                <div class="image-slot" :style="`background-color:${getRandomSpecificColor()};color:#ffffff;`">
                                                     <h2>{{ item.name }}</h2>
                                                </div>
                                             </template>
                                        </el-image>
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
        </div>
    </div>
</template>
<style scoped lang="less">
.Home {
    min-height: calc(100vh - 160px);
    width: 100%;
}

.home-content {
    width: 100%;
    min-height: calc(100vh - 160px);
    padding: clamp(1rem, 3vw, 3rem) 0;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.home-container {
    width: 100%;
    margin: 0 auto;
}

.home-main {
    padding: 0 !important;
    width: 100%;
    max-width: 100%;
}

.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 1rem;
    
    h2 {
        font-size: clamp(1rem, 3vw, 1.5rem);
        font-weight: 600;
        text-align: center;
        word-break: break-word;
        margin: 0;
    }
}

.container {
    margin: 0 auto;
    width: 90%;
    max-width: 1400px;
    padding: 0 1rem;
    
    @media (min-width: 1200px) {
        width: 85%;
    }
    
    @media (min-width: 1600px) {
        width: 80%;
    }
}

.container-item {
    border-radius: clamp(8px, 1.5vw, 16px);
    height: auto;
    width: 100%;
    margin-bottom: clamp(1rem, 2vw, 2rem);
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
}

.el-image-class {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.item-img {
    width: 100%;
    aspect-ratio: 16 / 9;
    min-height: clamp(150px, 20vw, 250px);
    max-height: clamp(200px, 25vw, 300px);
    border-radius: clamp(12px, 2vw, 24px);
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.05);
}

.item-lable {
    width: 100%;
    padding: clamp(0.75rem, 1.5vw, 1.25rem) 0;
    text-align: center;
    
    h4 {
        font-size: clamp(0.875rem, 1.8vw, 1.125rem);
        font-weight: 500;
        margin: 0;
        color: inherit;
        line-height: 1.5;
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}

.el-row {
    margin: 0 !important;
}

.el-col {
    padding: 0 clamp(0.5rem, 1vw, 1rem) !important;
}

// 响应式布局
@media (max-width: 768px) {
    .container {
        width: 95%;
        padding: 0 0.5rem;
    }
    
    .item-img {
        aspect-ratio: 16 / 9;
        min-height: 180px;
    }
    
    .item-lable h4 {
        font-size: clamp(0.875rem, 4vw, 1rem);
    }
    
    .el-col {
        padding: 0 0.5rem !important;
        margin-bottom: 1rem;
    }
}

@media (max-width: 576px) {
    .Home {
        padding: 1rem 0;
    }
    
    .container {
        width: 100%;
        padding: 0 0.75rem;
    }
    
    .item-img {
        min-height: 160px;
        border-radius: 12px;
    }
    
    .container-item {
        margin-bottom: 1.5rem;
    }
}

@media (min-width: 1920px) {
    .container {
        width: 75%;
    }
    
    .item-img {
        min-height: 280px;
    }
}
</style>

