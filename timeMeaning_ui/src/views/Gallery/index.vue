<script setup lang="ts">
import { ref } from 'vue'
import Galleria from 'primevue/galleria';
import src from '@/assets/img/1.jpg'
import src2 from '@/assets/img/touxiang.jpg'
// {
//     itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg',
//     thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg',
//     alt: 'Description for Image 1',
//     title: 'Title 1'
// },
const images = ref([
    {src:src},
    {src:src}
]);
const responsiveOptions = ref([
    {
        breakpoint: '550px',
        numVisible: 4
    },
    {
        breakpoint: '25px',
        numVisible: 1
    }
]);
</script>
<template>
    <div class="Gallery">
        <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 640px">
            <template #item="slotProps">
               <img :src="src"  style="width: 100%" />
            </template>
        </Galleria>
    </div>
</template>
<style scoped lang="less">
</style>
