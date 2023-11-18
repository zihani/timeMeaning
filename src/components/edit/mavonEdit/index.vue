<template>
    <div class="index">
        <el-row :gutter="20">
            <el-col :span="2">
                <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="title"
                  label="标题"
                  width="180">
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="22">
                <el-button type="primary" @click="save">保存</el-button>
                <el-input v-model="title" placeholder="标题"></el-input>
                <el-input v-model="summary" placeholder="summary"></el-input>
                <mavonEdit @onchange="editChange"></mavonEdit>
            </el-col>
       </el-row>
    </div>
</template>
<script>
import mavonEdit from './mavonEdit.vue'
import Banner from '@/components/banner'
import {getStorage,setStorage} from '@/utils/localforage'

export default {
    name: 'index',
    data(){
        return{
            isTop:true,
            banner:"https://s1.ax1x.com/2020/05/14/YDhagx.jpg", // 封面图
            isHot:true,
            pubTime:294095007045, //日期
            title:"看一遍闭着眼都会安装Lua了", //大标题
            summary:"Lua 是一种轻量小巧的脚本语言，能为应用程序提供灵活的扩展和定制功能。", //详情
            content:this.html, //正文
            viewsCount:4045,
            commentsCount:99,
            article:{},
            html:'',
            tableData: []
        }
    },
    components: {
        mavonEdit,Banner
    },
    computed:{
       
    },
    methods: {
       editChange(html){
        this.html = html
       },
       // 保存
       save(){
            let id = 1
            if(this.tableData.length > 0){
             id = this.tableData[this.tableData.length - 1].id + 1
            }
            this.tableData.push({
                id:id,
                isTop:true,
                banner:"https://s1.ax1x.com/2020/05/14/YDhagx.jpg", // 封面图
                isHot:true,
                pubTime:294095007045, //日期
                title:"看一遍闭着眼都会安装Lua了", //大标题
                summary:"Lua 是一种轻量小巧的脚本语言，能为应用程序提供灵活的扩展和定制功能。", //详情
                content:this.html, //正文
                viewsCount:4045,
                commentsCount:99
            })
            console.log(this.tableData)
            setStorage("postList",this.tableData)
       },
       inittable(){
        this.tableData = getStorage("postList")
       }
    },
    mounted(){
        this.inittable();
    },
    created() {
    }
}
</script>
<style scoped>
.index {
    margin: 60px 0;
}
</style>
