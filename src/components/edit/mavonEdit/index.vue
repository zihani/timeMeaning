<template>
    <div class="index">
        <el-row :gutter="20">
            <el-col :span="2">
                <button type="button" class="button nes-btn is-primary" @click="save">保存</button>
            </el-col>
            <el-col :span="2">
                <button type="button" class="button nes-btn is-primary" @click="downloadJson">导出json</button>
            </el-col>
            <el-col :span="2">
                <div class="nes-select">
                    <select v-model="articleType" required id="请选择文章类型">
                        <option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </option>
                    </select>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="nes-select">
                   <select v-model="imgCover" required id="请选择文章类型">
                        <option
                            v-for="item in optionsCover"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </option>
                    </select>
                </div>
            </el-col>
            <!-- <el-col :span="2">
                <button type="button" class="nes-btn is-primary" @click="upload">上传封面</button>
            </el-col> -->
            <el-col :span="12">
            </el-col>
       </el-row>
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
                <div class="nes-field">
                    <input type="text" id="name_field" class="nes-input"  placeholder="标题" v-model="title">
                </div>
                <div class="nes-field">
                    <input type="text" id="name_field" class="nes-input"  placeholder="小标题" v-model="summary">
                </div>
                <mavonEdit @onchange="editChange"></mavonEdit>
            </el-col>
       </el-row>
    </div>
</template>
<script>
import mavonEdit from './mavonEdit.vue'
import Banner from '@/components/banner'
import {getStorage,setStorage} from '@/utils/localforage'
import axios from "axios"
export default {
    name: 'index',
    data(){
        return{
            isTop:true,
            banner:"https://s1.ax1x.com/2020/05/14/YDhagx.jpg", // 封面图
            isHot:true,
            pubTime: new Date().getTime(), //日期
            title:"", //大标题
            summary:"", //详情
            content:this.html, //正文
            viewsCount:4045,
            commentsCount:99,
            article:{},
            html:'',
            tableData: [],
            articleType:'',
            options: [{
                value: 'Vue',
                label: 'Vue'
            }, {
                value: 'Nodejs',
                label: 'Nodejs'
            }, {
                value: 'javaScript',
                label: 'javaScript'
            }, {
                value: 'React',
                label: 'React'
            }, {
                value: 'Liunx',
                label: 'Liunx'
            }],
            file:"" ,
            imgCover:"",
            optionsCover:[
                {
                    value: require("@/assets/articlejson/ice/Vue.svg"),
                    label: 'Vue'
                }, {
                    value: require("@/assets/articlejson/ice/Nodejs.svg"),
                    label: 'Nodejs'
                }, {
                    value: 'javaScript',
                    label: 'javaScript'
                }, {
                    value: 'React',
                    label: 'React'
                }, {
                    value: 'Liunx',
                    label: 'Liunx'
                }
            ]
        }
    },
    components: {
        mavonEdit,Banner
    },
    computed:{
       
    },
    methods: {
        handleFileUpload(event){
            this.file = event.target.files[0]; // 获取用户选择的文件信息  
        },
        upload(){
            if (!this.file) {  
                alert("请选择要上传的文件"); // 如果用户没有选择文件，给出提示  
                return;  
            }  
            // 创建一个FormData对象来存储文件信息  
            const formData = new FormData();  
            formData.append("file", this.file); // 将文件添加到FormData对象中  
            // 使用Vue的axios插件发送上传请求  
            axios.post("/upload", formData).then(response => {  
                debugger
                // 处理上传成功的响应，可以根据实际情况进行相应的处理，比如显示上传成功的消息等。  
                console.log("文件上传成功");  
            })  
            .catch(error => {  
                // 处理上传失败的情况，可以显示错误消息等。  
                console.error("文件上传失败", error);  
            });  

        },
        downloadJson(){
            getStorage("postList").then(res =>{
                let jsonStr =  JSON.stringify(res ?? []); 
                let blob = new Blob([jsonStr], { type: "application/json" }); // 创建 Blob 对象  
                let url = URL.createObjectURL(blob); // 创建 Blob 对象的 URL  
                let link = document.createElement("a"); // 创建链接元素  
                link.href = url; // 设置链接元素的 href 属性为 Blob 对象的 URL  
                link.download = "Articlelist.json"; // 设置要下载的文件名  
                document.body.appendChild(link); // 将链接元素添加到文档中  
                link.click(); // 触发链接元素的点击事件，下载 JSON 文件
            })
        },
        editChange(html){
            this.html = html
        },
        // 保存
        save(){
                if(!this.title){
                    this.$message({
                        message: '请填写标题！',
                        type: 'warning'
                    });
                    return
                } 
                if(!this.summary){
                    this.$message({
                        message: '请填写小标题！',
                        type: 'warning'
                    });
                    return
                } 
                if(!this.html){
                    this.$message({
                        message: '请填写正文！',
                        type: 'warning'
                    });
                    return
                } 
                if(!this.imgCover){
                    this.$message({
                        message: '请选择封面！',
                        type: 'warning'
                    });
                    return
                } 
                if(!this.articleType){
                    this.$message({
                        message: '请文章类型！',
                        type: 'warning'
                    });
                    return
                } 
                //正文
                let id = 1
                if(this.tableData.length > 0){
                id = this.tableData[this.tableData.length - 1].id + 1
                }
                this.tableData.push({
                    id:id,
                    isTop:true, //是否置顶
                    banner:this.imgCover, // 封面图
                    pubTime:this.pubTime, //日期
                    title:this.title, //大标题
                    summary:this.summary, //详情
                    content:this.html, //正文
                    articleType:this.articleType,
                    viewsCount:4045,//文章点击量
                    commentsCount:99 //评论数
                })
                setStorage("postList",this.tableData)
        },
        inittable(){
            getStorage("postList").then(res =>{
                this.tableData = res ?? []
            })
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
.button{
    width:100%
}
.index {
    margin: 60px 0;
}
</style>
