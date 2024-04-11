import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import { createDate }  from "@/utils/newDate";
export const useBackgroundTheme = defineStore(
    'backgroundTheme', () => {
        let backgroundColor: Ref<string> = ref("");
        const white: Ref<string> = ref("#ffffff");
        const dark: Ref<string> = ref("#000000");
        // 6 - 19 白 white
        // 19 - 6 夜 dark
        let timeWhite:number[] = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,];
        let timeDark:number[]= [19, 20, 21, 22, 23, 24, 0, 1, 2, 3, 4, 5, 6, 7];
        if (timeWhite.indexOf(createDate().hour) > -1) {
            backgroundColor.value = "white";
        };
        if (timeDark.indexOf(createDate().hour) > -1) {
            backgroundColor.value = "dark";
        };
        function updateBackgroundColor(bool: boolean) {
            if (bool) {
               backgroundColor.value = "dark"
            } else {
               backgroundColor.value = "white"
            };
        };
        return {updateBackgroundColor,backgroundColor,white, dark};
    });
