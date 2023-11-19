<template>
    <div>
        <banner isHome="true"></banner>
         <div style="height: 30px;">
         </div>
        <div class="site-content">
            <!--焦点图-->
            <div class='articlesList'>
                <section-title>
                    <div style="display: flex;align-items: flex-end;">笔记<small-ico></small-ico></div>
                </section-title>
                <div>
                    <div  v-for="item in features" :key="item.title">
                        <Feature :data="item"></Feature>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Feature from '@/components/feature'
import {getStorage,setStorage} from '@/utils/localforage'
import Banner from '@/components/banner'
export default {
    metaInfo: {
        meta: [{
            name: 'keyWords',
            content: "拾壹博客,开源博客,www.shiyit.com"  //变量或字符串
        }, {
            name: 'description',
            content: "一个专注于技术分享的博客平台,大家以共同学习,乐于分享,拥抱开源的价值观进行学习交流"
        }]
    },
    components:{
        Feature,
        Banner
    },
    data() {
        return {
            photoAlbumList: [],
            pageData: {
                pageNo: 1,
                pageSize: 30,
                photoAlbumId: null
            },
            photoList: [],
            imgList: [],
            pageTotal: 0,
            features:[
                {id: 1, title: 'Akina', img: 'https://s1.ax1x.com/2020/05/14/YDfRnU.jpg'},
                {id: 2, title: '使用说明', img: 'https://s1.ax1x.com/2020/05/14/YDf4AJ.jpg'},
                {id: 3, title: '文章归档', img: 'https://s1.ax1x.com/2020/05/14/YDfT91.jpg'},
                {id: 4, title: '文章归档', img: 'https://s1.ax1x.com/2020/05/14/YDfT91.jpg'},
                {id: 5, title: '文章归档', img: 'https://s1.ax1x.com/2020/05/14/YDfT91.jpg'},
                {id: 6, title: '文章归档', img: 'https://s1.ax1x.com/2020/05/14/YDfT91.jpg'},
                {id: 7, title: '文章归档', img: 'https://s1.ax1x.com/2020/05/14/YDfT91.jpg'},
            ]
        }
    },
    created() {
        this.getPhotoAlbum()
        this.getPhotoList()
    },
    methods: {
        setdbStorage(){
            setStorage("add","啦啦啦啦")

        },
        getdbStorage(){
            getStorage("add").then(res =>{
                res
            })
        },
        setdb(){
            setStage("add",{name:"name"})
        },
        previewImg(img) {
            this.$imagePreview({
                images: this.imgList,
                index: this.imgList.indexOf(img)
            });
        },
        getPhotoAlbum() {
            // featchPhotoAlbum().then(res => {
            //     this.photoAlbumList = res.data
            //     let photoAlbum = {
            //         id: null,
            //         name: "全部"
            //     }
            //     this.photoAlbumList.unshift(photoAlbum)
            // })
        },
        getPhotoList() {
            // featchPhoto(this.pageData).then(res => {
            //     this.photoList = res.data.records
            //     this.pageTotal = res.data.pages
            //     for (var i = 0; i < this.photoList.length; i++) {
            //         this.imgList.push(this.photoList[i].url);
            //     }
            // })
        },
        handleClike(phtotAlbumId, index) {
            for (var i = 0; i < this.$refs.photo.length; i++) {
                this.$refs.photo[i].className = "name"
            }
            this.$refs.photo[index].className = "active"
            this.pageData.photoAlbumId = phtotAlbumId;
            this.getPhotoList()
        }

    }
}
</script>
<style scoped lang="less">
.articlesList{
    margin-bottom: 300px;
    padding-bottom: 300px;
}
.site-content {
    // .notify {
    //     margin: 60px 0;
    //     border-radius: 3px;
    //     & > div {
    //         padding: 20px;
    //     }
    // }
    // .search-result {
    //     padding: 15px 20px;
    //     text-align: center;
    //     font-size: 20px;
    //     font-weight: 400;
    //     border: 1px dashed #ddd;
    //     color: #828282;
    // }
}
@media(max-width:800px){
    ///
}
</style>