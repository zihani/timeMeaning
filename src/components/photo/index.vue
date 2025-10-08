<script setup lang="ts">
import { ref } from 'vue'
const images = ref([
  { url: 'image1.jpg', title: '风景1' },
  // 更多图片数据...
])
const previewVisible = ref(false)
const previewImage = ref('')

const openPreview = (url) => {
  previewImage.value = url
  previewVisible.value = true
}
</script>
<template>
    <div class="Gallery">
        <div style="padding-top: 80px;">
             <el-row :gutter="20">
                <el-col 
                v-for="(img, index) in images" 
                :key="index" 
                :xs="12" :sm="8" :md="6" :lg="4"
                >
                <el-card :body-style="{ padding: '0px' }">
                    <img v-lazy="img.url" class="image" @click="openPreview(img.url)">
                    <div class="image-title">{{ img.title }}</div>
                </el-card>
                </el-col>
            </el-row>

            <el-dialog v-model="previewVisible" title="图片预览">
                <img :src="previewImage" style="width: 100%">
            </el-dialog>
        </div>
    </div>
</template>
<style scoped lang="less">
.image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.image-title {
  padding: 10px;
  text-align: center;
}
</style>
