import { count } from 'console'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const countOptionStore = defineStore('counter-option', {
    state: () => {
        return {
            count:0
        }
    },
    getters: {
        doubleCount:state=>state.count*2
    },
    actions: {
        increment() {
            this.count++
        }
    }
})
