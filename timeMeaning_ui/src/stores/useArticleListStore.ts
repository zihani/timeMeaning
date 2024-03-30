import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
export const useArticleListStore = defineStore(
    'articleList', () => {
    const articleTable: Ref<Array<object>> = ref([{name:""}]);
    const articleList :Ref<Array<object>> = ref([])
    return { articleTable,articleList }
})
