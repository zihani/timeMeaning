<script setup lang="ts">
import { ref,onMounted,defineProps,defineEmits ,type Ref,watch} from 'vue';
import { useBackgroundTheme } from '@/stores/useBackgroundTheme';
const backgroundTheme = useBackgroundTheme();
const backgroundColor:Ref<string> = ref(backgroundTheme[backgroundTheme.backgroundColor]);
const color:Ref<string> = ref(backgroundTheme.backgroundColor === "dark" ? backgroundTheme.white : backgroundTheme.dark);
const props = defineProps({
    html:String
});
watch(() => backgroundTheme.backgroundColor,  
(newVal, oldVal) => {
    backgroundColor.value = backgroundTheme[backgroundTheme.backgroundColor];
    color.value = backgroundTheme.backgroundColor === "dark" ? backgroundTheme.white : backgroundTheme.dark;
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
         <div :style="`background-color:${backgroundColor}; color:${color};`"  v-if="html" v-html="html"> </div>
         <el-skeleton v-else :rows="100" animated />
    </div>
</template>
<style scoped lang="less">
.Content {
    width: 100%;
    :deep(h1),
    :deep(h2),
    :deep(h3),
    :deep(h4),
    :deep(h5),
    :deep(h6),
    :deep(p),
    :deep(li),
    :deep(span),
    :deep(div),
    :deep(code),
    :deep(pre),
    :deep(a) {
        color: inherit;
    }
    :deep(a:hover) {
        color: #ff6d6d;
    }
    :deep(code) {
        background-color: rgba(0, 0, 0, 0.1);
    }
}
</style>
