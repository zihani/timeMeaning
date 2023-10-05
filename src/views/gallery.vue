<template>
    <div class="photo-main">
        <div class="containner">
            <!--焦点图-->
            <div class="top-feature" v-if="!hideSlogan">
                <section-title>
                    <div style="display: flex;align-items: flex-end;">聚焦<small-ico></small-ico></div>
                </section-title>
                <div class="feature-content">
                    <div class="feature-item" v-for="item in features" :key="item.title">
                        <Feature :data="item"></Feature>
                    </div>
                </div>
            </div>
            <div class="photoBox">
                <a href="javascript:;" @click="previewImg(item.url)" v-for="item in photoList" :key="item.id">
                    <img class="" v-lazy="item.url" :key="item.url" />
                    <span class="overlay"></span>
                    <span class="desc">
                        {{ item.info }}
                    </span>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import Feature from '@/components/feature'
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
        Feature
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
                {id: 3, title: '文章归档', img: 'https://s1.ax1x.com/2020/05/14/YDfT91.jpg'}
            ]
        }
    },
    created() {
        this.getPhotoAlbum()
        this.getPhotoList()
    },
    methods: {
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
<style scoped>
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
     
    .photo-main {
        display: flex;
        justify-content: center;

        @media screen and (max-width: 1118px) {
            .containner {
                width: 100%;
                margin-top: 80px;
            }
        }

        @media screen and (min-width: 1119px) {
            .containner {
                width: 65%;
                margin-top: 80px;
            }
        }
    }
</style>