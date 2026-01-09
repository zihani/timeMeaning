<script setup lang="ts">
import { onMounted, ref,nextTick,type Ref,watch } from "vue";
import { useBannerStore } from "@/stores/useBannerStore"
import { useBackgroundTheme } from "@/stores/useBackgroundTheme";
const backgroundTheme = useBackgroundTheme();
const backgroundColor:Ref<string> = ref(backgroundTheme[backgroundTheme.backgroundColor])
const color:Ref<string> = ref(backgroundTheme.backgroundColor === "dark" ? backgroundTheme.white : backgroundTheme.dark);
const links1 = ref([{
        title:"vue3文档",
        href: "https://cn.vuejs.org/"
    },{
        title: "vue3优秀项目",
        href: "https://github.com/vue3-club/vue3-docs/issues/45"
    },{
        title: "vue2迁移vue3工具",
        href: "https://github.com/vuejs/rfcs"
    },{
        title: "pinia文档",
        href: "https://pinia.vuejs.org/zh/"
    },{
        title: "antdvVue文档",
        href: "https://antdv.com/components/overview"
    },{
        title: "查询css、js 浏览器兼容性",
        href: "https://caniuse.com/"
    },{
        title: "css布局工具",
        href: "https://layout.bradwoods.io/customize"
}])
const links2 = ref([{
        title: "element-plus",
        href: "https://element-plus.org/"
    },{
        title: "vitejs",
        href: "https://www.vitejs.net/"
    },{
        title: "sass",
        href: "https://www.sass.hk/"
    },{
        title: "husky",
        href:"https://typicode.github.io/husky/"
    },{
        title: "typescript",
        href:"https://www.typescriptlang.org/"
    },{
        title: "w3cschool--javaScript",
        href:"https://www.w3cschool.cn/javascript/dict"
    },{
        title: "node release",
        href:"https://nodejs.org/en/blog/release"
}])
const links3 = ref([{
        title: "github",
        href: "https://github.com/"
    }
    ,{
        title: "gitee",
        href: "https://gitee.com/"
    },{
        title: "掘金",
        href: "https://juejin.cn/"
    },{
        title: "知乎",
        href: "https://www.zhihu.com/"
    },{
        title: "gemini",
        href: "https://gemini.google.com/app"
    },{
        title: "deepseek",
        href: "https://www.deepseek.com/"
    },{
        title: "openai",
        href: "https://openai.com/zh-Hans-CN/"
    }
])
//监听pinia 的变化重新渲染
watch(() => backgroundTheme.backgroundColor,  
(newVal, oldVal) => {
    backgroundColor.value = backgroundTheme[backgroundTheme.backgroundColor]
    color.value = backgroundTheme.backgroundColor === "dark" ? backgroundTheme.white : backgroundTheme.dark;
},  
{
    deep: true // 开启深度监听  
})
const banner = useBannerStore()
</script>
<template>
    <div id="layout-footer" :style="`background-color:${backgroundColor}; color:${color};  border-top: 1px solid ${color};`">
        <div id="layout-footer">
            <div class="footer-main">
                <div class="footer-item">
                    <div v-for="(item,i) in links1" :key="i"><a :href="item.href" target="_blank">{{item.title}}</a></div>
                </div>
                <div class="footer-item">
                    <div v-for="(item,i) in links2" :key="i"><a :href="item.href" target="_blank">{{item.title}}</a></div>
                </div>
                <div class="footer-item">
                    <div v-for="(item,i) in links3" :key="i"><a :href="item.href" target="_blank">{{item.title}}</a></div>
                </div>
            </div>
            <div class="copyright">Copyright © 2023 by <a target="_blank" class="out-link" href=""></a> . All rights reserved. | <a target="_blank" class="out-link" href="http://www.beian.miit.gov.cn">京ICP备2023036653号-1</a></div>
        </div>
    </div>
</template>
<style scoped>
#layout-footer{
    padding: 2%;
    font-size: 13px;
    a {
        color: inherit;
        text-decoration: none;
        transition: color 0.3s ease;
        &:hover {
            color: #ff6d6d;
        }
    }
    a.out-link:hover{
        color: #ff6d6d;
    }
    .footer-main{
        max-width: 800px;
        margin: 0 auto 20px auto;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        .footer-item{
            flex: 1;
            & > div:not(:last-child){
                margin-bottom: 10px;
            }
            i{
                margin-right: 10px;
            }
        }
    }
    .copyright{
        text-align: center;
    }
}
    /*****/
    @media (max-width: 800px){
        #layout-footer{
            .footer-main .footer-item:nth-child(3){
                flex: 2;
            }
        }
    }
    @media (max-width: 600px){
        #layout-footer{
            .footer-main {
                display: block;
                .footer-item{
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    flex-wrap: wrap;
                    & > div{
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
    /*****/
</style>