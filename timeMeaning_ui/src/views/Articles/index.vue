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
            <el-row :gutter="10">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                    <div class="catalog" >
                        <catalog v-if="titles.length > 0"  :titles="titles"> </catalog> 
                        <el-skeleton v-else :rows="100" animated />
                    </div>
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" >
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
    width: 189px;
}
.top-feature {
    width: 100%;
    height: auto;
    margin-top: 30px;

    .feature-content {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        position: relative;

        .feature-item {
            width: 32.9%;
        }
    }
}

.site-main {
    padding-top: 80px;

    &.search {
        padding-top: 0;
    }
}

.more{
    margin: 50px 0;
    .more-btn{
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #ADADAD;
        border: 1px solid #ADADAD;
        border-radius: 20px;
        margin: 0 auto;
        cursor: pointer;
        &:hover{
            color: #8fd0cc;
            border: 1px dashed #8fd0cc;
        }
    }
}

/******/
@media (max-width: 800px) {
    .top-feature {
        display: none;
    }

    .site-main {
        padding-top: 40px;
    }

    .site-content {
        .notify {
            margin: 30px 0 0 0;
        }

        .search-result {
            margin-bottom: 20px;
            font-size: 16px;
        }
    }
}
/******/
</style>
<style scoped>
@import 'highlight.js/styles/github.css';
</style>