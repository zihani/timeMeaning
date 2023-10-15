<template>
    <div  class="setup"  >
        <div class="frame" v-if="show">
            <div style="width: 440px;height: 40px;border-bottom: 1px solid;padding-top: 8px;float: left;padding-right: 360px;"> 
               <span @click='todoedit'> edit </span>
            </div>
            <div style="width:440px; height: 360px; overflow-x:hidden;">
                <div style="padding:2px;" v-for="item in todolist" :key="item.id">
                    <input ref="todoinput" v-if='!removeshow' style="float: right;margin-top: 6px;margin-left: 10px;" type="checkbox" name="name" value="1" @change="ontodoChange(item)">
                    <div v-if='removeshow' style="float: right;" @click="deltodo(item)"><span>remove</span></div>
                    <div style="width: 100%; border-bottom: 1px solid; color:#ffff;">
                        <span v-if="item.status == 0"  style="text-decoration: line-through;"> {{ item.text }} </span> 
                        <span v-if="item.status == 1" > {{ item.text }} </span> 
                    </div>
                </div>
            </div>
            
            <div style="width:420px; height: 50px;  border-top: 1px solid;">
                <input style=" width: 430px;
                height: 30px;
                background-color:rgb(6, 6, 6);
                color:#ffff;
                border:1px solid rgb(6, 6, 6);
                outline:none;
                margin-left: 20px;
                " type="text" placeholder="insertToDo" v-model="todotext" @keyup.enter="addtodo">
                <div v-if='!removeshow' style="width: 440px;" @click="addtodo"> 确定 </div>
                <div v-if='removeshow' style="width: 440px;" @click="removeAll" >
                     removeALL
                </div>
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
                removeshow:false,
                imgPath: require("../assets/img/setup.svg"),
                show:false,
                todolist:[], //status 0 删除 1 正常
                todotext:''
            }
        },
        methods:{
            removeAll(){
               this.todolist = []
            },
            todoedit(){
                this.removeshow = !this.removeshow
            },
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
                debugger
                this.todotext
                let id = 1
                this.todolist = this.todolist ?? []
                if(this.todolist.length > 0){
                    id = this.todolist[this.todolist.length - 1].id + 1
                }
                this.todolist.push({id:id,text:this.todotext,status:1})
                debugger
                setStorage("todoList",this.todolist)
                this.todotext = ""
            },
            deltodo(item){
                item.id
                debugger
                this.todolist = this.todolist.filter(
                (row) => row.id != item.id
                );
                console.log( this.todolist)
            },
            ontodoChange(item){
                console.log(item.id)
                // let todolist =  this.todolist.filter((item) => item.id === item.id);
                for (const row of this.todolist) {
                    if(row.id === item.id){
                        item.status = item.status == 0?1:0
                    }
                }
                // this.$set(this.todolist,item.id -1,todolist[0])
            },
            setup(){
                this.show = !this.show
                this.$refs.todoinput.focus();
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