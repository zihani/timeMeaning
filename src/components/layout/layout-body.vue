<template>
    <div id="layout-body">
        <router-view></router-view>
        <back-top></back-top>
        <menu-right></menu-right>
        <table-pet></table-pet>
        <setup></setup>
    </div>
</template>

<script>
    import backTop from '@/components/back-top'
    // import menuRight from '@/components/menu-right'
    import tablePet from '@/components/table-pet'
    import setup from '@/components/setup'

    export default {
        name: "layout-body",
        data(){
          return{
              minHeight: 600
          }
        },
        components: { backTop ,tablePet,setup},
        
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
