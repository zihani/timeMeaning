<template>
    <ul class="menus">
        <!-- 菜单three -->
        <li v-for="item in menus" :key="item.id">
            <span  @click="openMenu(item.id)">{{item.title}}</span>
            <ul v-if="item[childLabel]" class="child">
                <menu-tree :menus="item[childLabel]" :child-label="childLabel">
                </menu-tree>
            </ul>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "menuTree",
        props: {
            menus: {
                type: [Object,Array],
                required: true
            },
            childLabel: {
                type: String,
                default: 'child'
            }
        },
        data() {
            return{
            }
        },
        methods: {
            openMenu(id){
                alert(id)
            }
        }
    }
</script>

<style scoped lang="less">
    .menus{ 
        line-height: 1.7em;
    }
    .child{
        padding-left: 15px;
    }
</style>
