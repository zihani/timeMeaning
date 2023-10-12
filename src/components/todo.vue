<template>
    <div  class="setup" >
        <div class="frame"  v-if="show" >
            <div style="width:440px; height: 400px; overflow-x:hidden;">
                <div style="padding:2px;" v-for="item in todolist" :key="item.id">
                    <input style="float: left;margin-top: 6px;margin-left: 10px;" type="checkbox" name="name" value="1" @change="ontodoChange">
                    <div style="width: 100%; border-bottom: 1px solid; color:#ffff;"><span style="text-decoration: line-through;"> {{ item.text }} </span> </div> 
                    <div style="width:50px" @click="deltodo"><span>删除</span></div>
                </div>
            </div>
            <div style="width:420px; height: 30px;">
                <input style=" width: 440px;
                height: 30px;
                background-color: #faf4f4;
                border-radius: 10px;" type="text" v-model="todotext">
                <div style="width: 440px;" @click="addtodo"> 确定 </div>
            </div>
        </div>
        <div style="position: fixed; bottom: 0.7rem; right: 1.7rem; width: 55px; height: 25px;" @click="setup">
             <strong>  To Do </strong>
        </div>
    </div>
</template>
<script>
import { setStorage,getStorage } from "@/utils/localforage"
    export default {
        name: "todo",
        components: {},
        data() {
            return{
                imgPath: require("../assets/img/setup.svg"),
                show:false,
                todolist:[], //status 0 删除 1 正常
                todotext:''
            }
        },
        methods:{
            inittodolist(){
                getStorage("todoList").then(res =>{
                   this.todolist = res
                    debugger
                })
            },
            addtodo(){
                if(!this.todotext){
                    return
                }
                let id = 1
                if(this.todolist.length > 0){
                    id = this.todolist[this.todolist.length - 1].id + 1
                }
                this.todolist.push({id:id,text:this.todotext,status:1})
                setStorage("todoList",this.todolist)
                this.todotext = ""
            },
            deltodo(e){
                e 
                alert(1)
                debugger
            },
            ontodoChange(e){
                e.target.checked
               debugger
            },
            setup(){
                this.show = !this.show
            }
        },
        mounted(){
            this.inittodolist();
        }
           
    }
</script>
<style scoped lang="less">

.setup {
    position: fixed;
    width: 520px;
    height: 550px;
    right: -5rem;
    bottom: -3rem;
    border-radius: 25px;
    cursor: pointer;
    transition: .3s;
    text-align: center;
    z-index: 99;
    img{
        width: 60px;
        height: 60px;
    }
    .imgico{
        position: fixed;
        bottom: 0.7rem;
        right: 1.7rem;
    }
    .bubble {
        position: fixed;
        width: 100%;
        height: 100px;
        background-color: rgb(0, 0, 0);
        color: #1f0404;
        opacity:0.9;
    }
    .frame{
        width:440px;
        height: 500px;
        background-color: rgb(6, 6, 6);
        border-radius: 10px;
        position: fixed;
        opacity:0.8;
    }
    .triangle{
        width: 20px;
        height: 20px;
        display: block;
        position: absolute;
        bottom: -10px;
        right: 30px;
        background-color:rgb(158, 154, 154);
        opacity:0.8;
        transform:rotate(225deg);
        -ms-transform: rotate(225deg);
        -moz-transform: rotate(225deg);
        -webkit-transform: rotate(225deg);
        -o-transform: rotate(225deg);
    }
    .img2{
        display: none;
    }
    &:hover img.img1{
        display: none;
    }
    &:hover img.img2{
        display: unset;
    }
}
@media (max-width: 600px){
    .setup{
        display: none;
    }
}
</style>