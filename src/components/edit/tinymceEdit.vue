<template>
    <div class="tinymce">
        <div id="editable">
        </div>
    </div>
</template>
<script>
export default {
    name: 'tinymceEdit',
    data(){
        return{
            
        }
    },
    components: {
    },
    methods: {
        initTinymceEdit(){
            debugger
            //延迟初始化tiny
            setTimeout(function(){
                debugger
                tinymce.init({
                    selector:"textarea",
                });
            },2000);
        },
    },
    mounted(){
        this.initTinymceEdit()
    },
    created() {
    }
}
</script>
<style scoped>

</style>
