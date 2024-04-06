<script setup lang="ts">
import { ref,onMounted,defineProps,defineEmits ,type Ref} from 'vue'
import { useBackgroundTheme } from '@/stores/useBackgroundTheme';
const backgroundTheme = useBackgroundTheme()
const props = defineProps({
    html:String
})
const html = props.html
const content:Ref<any> = ref(null);
setTimeout(function(){
    backgroundTheme.domUpdate(content);
},1000);
onMounted(() => {
    // 访问 query 参数  
});
</script>
<template>
    <div class="Content">
         <div ref="content" v-if="html" v-html="html"> </div>
         <el-skeleton v-else :rows="100" animated />
    </div>
</template>
<style scoped lang="less">
</style>
