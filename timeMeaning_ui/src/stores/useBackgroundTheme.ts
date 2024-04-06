import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import { createDate }  from "@/utils/newDate";
export const useBackgroundTheme = defineStore(
    'backgroundTheme', () => {
        const headerFixed:Ref<boolean> = ref(false);
        let backgroundColor:Ref<string>= ref(""); 
        let white:string = "rgb(255, 255, 255)";
        let dark:string = "#000000";
        // 6 - 19 白 white
        // 19 - 6 夜 dark
        let timeWhite:Ref<number> = [6,7,8,9,10,11,12,13,14,15,16,17,18,]
        let timeDark:Ref<number> = [19,20,21,22,23,24,0,1,2,3,4,5,6,7]

        if(timeWhite.indexOf(createDate().hour) > -1){
            backgroundColor.value = "white"
        }
        if(timeDark.indexOf(createDate().hour) > -1){
            backgroundColor.value = "dark"
        }
        function domUpdate (dom:any){
            if(backgroundColor.value === "dark"){
                dom.value.style.backgroundColor = dark;
                dom.value.style.color = white;
            }
            if(backgroundColor.value === "white"){
                dom.value.style.backgroundColor = white;
                dom.value.style.color = dark;
            }
        }
    return {domUpdate,backgroundColor,headerFixed}
})
