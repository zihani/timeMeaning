<script setup lang="ts">
import { ref,onMounted,defineProps,defineEmits ,type Ref,watch} from 'vue';
import { useBackgroundTheme } from '@/stores/useBackgroundTheme';
const backgroundTheme = useBackgroundTheme();
const backgroundColor:Ref<string> = ref(backgroundTheme[backgroundTheme.backgroundColor]);
const props = defineProps({
    html:String
});
watch(() => backgroundTheme.backgroundColor,  
(newVal, oldVal) => {
    backgroundColor.value = backgroundTheme[backgroundTheme.backgroundColor];
},  
{
    deep: true // 开启深度监听  
})
const html = props.html;
onMounted(() => {
});
</script>
<template>
    <div class="Content">
         <div :style="`background-color:${backgroundColor};`"  v-if="html" v-html="html"> </div>
         <el-skeleton v-else :rows="100" animated />
    </div>
</template>
<style scoped lang="less">
.Content {
    width: 100%;
}
</style>
