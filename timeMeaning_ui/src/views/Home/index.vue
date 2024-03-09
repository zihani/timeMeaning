<script setup lang="ts">
import { defineComponent ,ref ,onMounted ,createApp} from 'vue'
import Banner from "@/components/public/Banner/index.vue"
import { useArticleListStore } from "@/stores/useArticleListStore"
import ArticleItem from "@/components/ArticleItem/index.vue"
import { marked }  from 'marked';
import {useBannerStore ,useBannerSetopStore} from "@/stores/useBannerStore"
import 'element-plus/dist/index.css';
const banner = useBannerStore();
// import ElementPlus from 'element-plus'
// const app = createApp(App);    debugger
marked
const articleListStore = useArticleListStore(); //这是个函数
articleListStore.articleTable
const markdownText = ref('# Hello, **Vue 3**!\n\nThis is a **Markdown** text.');
onMounted(() => {
    marked
      // 使用 marked 将 Markdown 转换为 HTML
     debugger
});
</script>
<template>
    <div class="Home">
        <Banner></Banner>
        <div v-if='banner.isHome'>
            <el-container>
                <el-aside width="200px"></el-aside>
                <el-container>
                    <el-main>
                        <div class="container">
                           <el-row :gutter="2">
                                <el-col :span="6">
                                    <div class='container-item'>

                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class='container-item'>

                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class='container-item'>

                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class='container-item'>

                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class='container-item'>

                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class='container-item'>

                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class='container-item'>

                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class='container-item'>

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
    height: 100px;
    width: 100%;
    border: 2px solid; 
    border-color:blue;
    margin-top: 1px;
    margin-bottom: 1px;
}
/******/
@media (max-width: 800px) {
  
}
</style>

