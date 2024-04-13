import { defineStore } from "pinia";
import { reactive, ref ,computed} from "vue";

// 定义用户状态仓库
export const useTablePetStore = defineStore(
  "tablePet",()=>{
    const show = ref(false);
    function increment() {
      show.value = !show.value;
    };
    return { show, increment };
});