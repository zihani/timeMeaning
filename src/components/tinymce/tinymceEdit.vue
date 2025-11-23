<script setup lang="ts">
import { type Ref,ref, computed , onMounted } from 'vue'
// import { TinyMCE } from '@/components/tinymce7.5.1/js/tinymce/tinymce'
function createTinymceScript(){
    let script =  document.createElement('script')
    script.src = window.location.origin + 'tinymce7.5.1/js/tinymce/tinymce.min.js'
    // script.id = 'tinymce'
    let head =  document.querySelector('head')
    head.appendChild(script)
}
function initTinymce (){
   if(document.getElementById('tinymce')) {
    try {
        if(window.tinymce.init) {
            console.log(document.getElementById('tinymceEditor'))
            window.tinymce.init({
                selector:'#tinymceEditor',
                language: 'zh_CN',
                browser_spellcheck: true,
                branding: false, // 去水印,
                statusbar: false, // 隐藏编辑器底部的状态栏
                menubar:false,
                inline: false,
                media_live_embeds: true,
                min_height: 400,
                sandbox_iframes: false,
                paste_data_images: true,
                toolbar:'undo redo formatpainter blocks',
                font_size_formats: '默认 12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 40px 44px 48px 52px 56px 60px',
                font_family_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;宋体=simsun,serif,sans-serif;仿宋体=FangSong,serif,sans-serif;楷体=KaiTi,serif,sans-serif;黑体=SimHei,sans-serif;隶书=LiSu,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Times New Roman=Times New Roman,helvetica,sans-serif;',
                block_formats: '标题1=h1; 标题2=h2; 标题3=h3; 标题4=h4; 标题5=h5; 标题6=h6; 正文=p;',
                toolbar_mode: 'wrap',
                toolbar_sticky: true,
                custom_ui_selector: 'body',
                advlist_bullet_styles: 'square',
                init_instance_callback: (editor:any) =>{
                    // console.log(editor.getBody().querySelectorAll('h1, h2, h3, h4, h5, h6'))
                },
                editimage_cors_hosts:'' , //  跨域地址
                setup: function (editor:any) {
                    editor.on('input', function() {
                        // _this.$emit('update:modelValue', editor.getBody().innerHTML)
                    });
                    editor.on('click', function() {
                        
                    });
                    editor.on('init', function(){
                        alert(1)
                        // editor.setContent(_this.modelValue)
                    });
                    editor.on('EditorContentLoaded', function () {

                    });
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
    //  const _this = this
    // if(window.tinymce.init) {
   
    // } else {
    //     initTinymce ()
    // }
   } else {
    initTinymce ()
   }
}
onMounted(() => {
    createTinymceScript()
    initTinymce()
})
</script>
<template>
    <div id="tinymceEditor"></div>
</template>
<style scoped>
/* 组件样式 */
</style>