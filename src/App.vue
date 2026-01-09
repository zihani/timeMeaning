<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import Body from '@/components/layout/Body.vue'
import Footer from '@/components/layout/Footer.vue'

</script>
<template>
    <Header></Header>
    <Body></Body>
    <Footer></Footer>
</template>
<style scoped lang="less">
#app {
  font-size: clamp(14px, 1.2vw, 17px);
  color: #6f6f6f;
  line-height: 1.6;
}
</style>
