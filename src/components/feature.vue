<template>
    <div class="feature">
        <router-link :to="`/article/${data.id}`">
            <div ><span class="foverlay">{{data.title}}</span></div>
            <img :src="data.img">
        </router-link>
    </div>
</template>
<script>
    export default {
        name: "feature",
        props: {
            data: {
                type: Object,
                default: () =>{
                    return{
                        title: 'Akina',
                        img: 'https://cdn.zhebk.cn/usr/themes/Akina//images/feature/feature1.jpg',
                        href: 'https://zhebk.cn/Web/Akina.html'
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .feature {
        margin: 4px;
        width: 150px;
        height:100px;
        float:left;
        img {
            height: 100px;
            width: 150px;
            object-fit: cover;
            border-radius: 5px;
        }
        & a:hover .foverlay{
            opacity:1;
        }
        .foverlay {
            position: absolute;
            z-index: 2;
            width: 150px;
            height: 100px;
            text-align: center;
            line-height: 150px;
            background: #BBE2DB;
            color: white;
            font-size: 16px;
            opacity: 0;
            border-radius: 5px;
            -moz-transition: opacity .4s ease-out;
            -o-transition: opacity .4s ease-out;
            -webkit-transition: opacity .4s ease-out;
            transition: opacity .4s ease-out;
        }
    }
    @media (max-width:800px) {
        .feature {
            margin: 4px;
            width: 100%;
            height:50%;
            float:left;
            img {
                height: 50%;
                width: 100%;
                object-fit: cover;
                border-radius: 5px;
            }
            & a:hover .foverlay{
                opacity:1;
            }
            .foverlay {
                position: absolute;
                z-index: 2;
                width: 100%;
                height: 50%;
                text-align: center;
                line-height: 50%;
                background: #BBE2DB;
                color: white;
                font-size: 16px;
                opacity: 0;
                border-radius: 5px;
                -moz-transition: opacity .4s ease-out;
                -o-transition: opacity .4s ease-out;
                -webkit-transition: opacity .4s ease-out;
                transition: opacity .4s ease-out;
            }
        }
    }
</style>