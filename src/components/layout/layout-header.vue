<template>
    <div id="layout-header" :class="{'fixed':fixed,'hidden':hidden}" @click.stop="mobileShow=false">
        <div class="site-logo">
            天气预报log
            <router-link to="/">
                <!-- <img src="@/assets/img/touxiang.jpg" alt=""> -->
            </router-link>
        </div>
        <div class="menus-btn" @click.stop="mobileShow=!mobileShow">
            <!-- 导航 -->
            <img style="width: 20px; height: 20px;" :src="iconUrl">
        </div>
        <div class="site-menus" :class="{'mobileShow':mobileShow}" @click.stop="mobileShow=!mobileShow">
            <div class="menu-item header-search"><header-search/></div>
            <div class="menu-item"><router-link to="/">首页</router-link></div>
            <div class="menu-item hasChild">
                <a href="#" @click="openUrl({href:`https://www.yuque.com/dashboard`})">语雀文章</a>
                <div class="childMenu" v-if="category.length">
                    <div class="sub-menu" v-for="item in category" :key="item.id">
                        <span @click="openUrl(item)"><a>{{item.title}}</a></span>
                    </div>
                </div>
            </div>
            <div class="menu-item hasChild">
                <a href="#" @click="openArticle">文章</a>
            </div>
            <div class="menu-item hasChild">
                <a href="#" @click="openGallery">画廊</a>
            </div>
        </div>
    </div>
</template>
<script>
    import HeaderSearch from '@/components/header-search'
    import axios from 'axios'
    export default {
        name: "layout-header",
        components: {HeaderSearch},
        data() {
            return {
                imgPath: require("../../assets/img/setup.svg"),
                lastScrollTop: 0,
                fixed: false,
                hidden: false,
                category: [
                    {
                        href:"https://www.yuque.com/u1261089/va0mph/gr8vg4gzg0akzvz0",
                        id:1,
                        title:"js的常用函数"
                    },
                    {
                        href:"https://www.yuque.com/u1261089/va0mph/ldegnme3ilhqmvtc",
                        id:2,
                        title:"vue组件和方法"
                    },
                    {
                        href:"https://www.yuque.com/u1261089/va0mph/ldegnme3ilhqmvtc",
                        id:3,
                        title:"vue组件和方法"
                    }
                ],
                mobileShow: false,
                iconUrl:'/icon/movenavbar.svg'
                // window.location.host + 
            }
        },
        mounted(){
            // console.log(process.env.VIEW_BASE_API)
            window.addEventListener('scroll', this.watchScroll)
        },
        beforeDestroy () {
            window.removeEventListener("scroll", this.watchScroll)
        },
        methods: {
            inittianqi(){
                axios.get('https://devapi.qweather.com/v7/weather/now').then(res =>{
                    res
                })
            },
            openGallery(){
               this.$router.push({ path:"/gallery"})
            },
            openArticle(){
               this.$router.push({ path: "/articlelist" });
            },
            openUrl(item){
                window.open(item.href)
            },
            watchScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if (scrollTop===0){
                    this.fixed = false;
                } else if (scrollTop>=this.lastScrollTop){
                    this.fixed = false;
                    this.hidden = true;
                } else {
                    this.fixed = true
                    this.hidden = false
                }
                this.lastScrollTop = scrollTop
            },
        }
    }
</script>

<style scoped lang="less">
    #layout-header {
        position: fixed;
        top: 0;
        z-index: 9;
        width: 100%;
        height: 80px;
        padding: 0 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: .3s all ease;
        -webkit-transition: .3s all ease;
        -moz-transition: .3s all linear;
        -o-transition: .3s all ease;
        -ms-transition: .3s all ease;
        &.hidden{
            top: -100px;
        }
        &.fixed{
            background-color: #FFFFFF;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
    }

    .site-logo {
        text-align: center;

        img {
            width: 60px;
            height: 60px;
        }

        p.site-name {
            font-size: 15px;
            font-weight: bold;
            position: relative;
            top: -10px;
        }
    }
    .menus-btn{
        display: none;
        visibility: hidden;
    }
    .site-menus {
        display: flex;
        align-items: center;

        .menu-item {
            min-width: 60px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            position: relative;
            a{
                padding: 12px 10px;
                color: #545454;
                font-weight: 500;
                font-size: 16px;
                &:hover {
                    color: #ff6d6d;
                }
            }
            &:not(:last-child) {
                margin-right: 15px;
            }
            &.hasChild:hover .childMenu{
                opacity:1;
                visibility: visible;
                transform: translateY(-5px);
            }
        }
        .childMenu{
            width: 130px;
            background-color: #FDFDFD;
            border-radius: 3px;
            border: 1px solid #ddd;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            position: absolute;
            top: 55px;
            z-index: 2;
            opacity: 0;
            visibility: hidden;
            transition: .7s all ease;
            -webkit-transition: .6s all ease;
            -moz-transition: .6s all linear;
            -o-transition: .6s all ease;
            -ms-transition: .6s all ease;
            &:before,&:after{
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-bottom: 8px solid white;
                top: -8px;
                left: 20px;
            }
            &:before {
                top: -9px;
                border-bottom: 8px solid #ddd;
            }
            .sub-menu{
                height: 40px;
                line-height: 40px;
                position: relative;
                &:not(:last-child):after{
                    /*position: absolute;*/
                    content: '';
                    width: 50%;
                    height: 1px;
                    color: #ff6d6d;
                    bottom: 0;
                    left: 25%;
                    z-index: 99;
                }
            }
        }
    }
    @media (max-width: 960px){
        #layout-header{
            padding: 0 20px;
        }
    }
    @media (max-width: 600px){
        #layout-header{
            padding: 0 10px;
        }
        .menus-btn{
            display: block;
            visibility: visible;
        }
        .site-menus{
            position: absolute;
            display: none;
            visibility: hidden;
            background-color: #F9F9F9;
            width: 100%;
            left: 0;
            top: 80px;
            z-index: -9;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            .menu-item{
                position: relative;
                height: unset;
                &:not(:last-child) {
                    margin-right: 0;
                }
            }
            .childMenu{
                position: relative;
                width: 100%;
                top: 0;
                background-color: #F3F3F3;
                opacity: 1;
                visibility: visible;
                border: none;
                box-shadow: none;
                &:before,&:after{
                    content: '';
                    position: relative;
                    width: 0;
                    height: 0;
                    border-left: 0;
                    border-right: 0;
                    border-bottom: 0;
                }
            }
        }
        .site-menus.mobileShow{
            display: inline-block;
            visibility: visible;
            z-index: 99;
        }
    }
</style>
