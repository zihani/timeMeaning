<template>
    <div id="layout-body">
        <router-view></router-view>
        <!-- <back-top></back-top> -->
        <menu-left></menu-left>
        <table-pet></table-pet>
        <todo></todo>
    </div>
</template>

<script>
    import backTop from '@/components/global/back-top'
    import menuLeft from '@/components/global/menu-left'
    import tablePet from '@/components/global/table-pet'
    import todo from '@/components/global/todo'

    export default {
        name: "layout-body",
        data(){
          return{
              minHeight: 600
          }
        },
        components: { backTop ,tablePet,todo,menuLeft},
        
    }
</script>

<style scoped>
#layout-body{
    /* header = 80px */
    min-height: -moz-calc(100vh - 80px);
    min-height: -webkit-calc(100vh - 80px);
    min-height: calc(100vh - 80px);
}
</style>
