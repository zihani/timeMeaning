<template>
    <div  class="setup" >
         <!-- <div class="bubble"> 气泡</div> -->
        <!-- <div class="bubble" v-if="show" >
            添加定时时间
            <span class="triangle"></span>
        </div> -->
        <div class="frame"  v-if="show">
        定时设置：   <div class="switch-container">
                        <input id="switch" type="checkbox" class="switch" />
                        <label for="switch" onclick="test()"></label>
                    </div>
            显示桌宠：
            切换桌宠：
            <span class="triangle"></span>
        </div>
        <img class="imgico" style="width: 25px; height: 25px;" :src="imgPath" alt="" @click="setup">
    </div>
</template>
<script>
    export default {
        name: "setup",
        components: {},
        data() {
            return{
                imgPath: require("../assets/img/setup.svg"),
                show:false
            }
        },
        methods:{
            setup(){
                this.show = !this.show
            }
        }
           
    }
</script>
<style scoped lang="less">
    /*开关的大小*/
    .switch-container {
        height: 15px;
        width: 30px;
    }
    /*设置checkbox不显示*/
    .switch {
        display: none;
    }
    /*设置label标签为椭圆状*/
    label {
        display: block;
        background-color: #EEEEEE;
        height: 100%;
        width: 100%;
        cursor: pointer;
        border-radius: 25px;
    }
    /*在label标签内容之前添加如下样式，形成一个未选中状态*/
    label:before {
        content: '';
        display: block;
        border-radius: 25px;
        height: 100%;
        width: 15px;
        background-color: white;
        opacity: 1;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
        -webkit-transition: all 0.2s ease;
    }
    /*在label标签内容之后添加如下样式，形成一个选中状态*/
    label:after {
        position: relative;
        top: -15px;
        left: 15px;
        content: '';
        display: block;
        border-radius: 25px;
        height: 100%;
        width: 15px;
        background-color: white;
        opacity: 0;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
        -webkit-transition: all 0.2s ease;
    }
    /* ~ 兄弟选择符。
    p~ul ：位于 p 元素之后的所有 ul 元素
    */
    /*选中后，选中样式显示*/
    #switch:checked~label:after {
        opacity: 1;
    }
    /*选中后，未选中样式消失*/
    #switch:checked~label:before {
        opacity: 0;
    }
    /*选中后label的背景色改变*/
    #switch:checked~label {
        background-color: green;
    }
.setup {
    position: fixed;
    width: 520px;
    height: 200px;
    right: -5rem;
    bottom: -3rem;
    border-radius: 25px;
    cursor: pointer;
    transition: .3s;
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
        background-color: rgb(158, 154, 154);
        color: #1f0404;
        opacity:0.9;
    }
    .frame{
        width:440px;
        height: 100px;
        background-color: rgb(158, 154, 154);
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