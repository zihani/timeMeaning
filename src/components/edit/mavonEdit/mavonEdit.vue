<template>
    <div class="mavonEditor">
        <mavon-editor
        style="position:absolute; 
        width: 100%;min-height: 300px;min-width: 300px;" :value="initValue" 
        :language="language" 
        :fontSize="fontSize" 
        :scrollStyle="scrollStyle" 
        :boxShadow="boxShadow"
        :toolbarsBackground="toolbarsBackground" v-model="value" @change="Change"/>
    </div>
</template>
<script>
// import marked from 'marked'
export default {
    name: '',
    data(){
        return{
            initValue:"",
            value:"",
            language:"zh-CN",//语言选择，暂支持 zh-CN: 简体中文, zh-TW: 正体中文 ， en: 英文 ， fr: 法语， pt-BR: 葡萄牙语， ru: 俄语， de: 德语， ja: 日语
            fontSize:"14px",//编辑区域文字大小
            scrollStyle:true,//开启滚动条样式(暂时仅支持chrome)
            boxShadow:true,//开启边框阴影
            boxShadowStyle:"0 2px 12px 0 rgba(0, 0, 0, 0.1)",//边框阴影样式
            transition:true,//是否开启过度动画
            toolbarsBackground:"#ffff00",//工具栏背景颜色
            previewBackground:"#fbfbfb",//预览框背景颜色
            subfield:true,//true： 双栏(编辑预览同屏)， false： 单栏(编辑预览分屏)
            defaultOpen:"",//在单栏（subfield=false）时默认展示区域. edit： 默认展示编辑区域，preview： 默认展示预览区域 其他 = edit
            placeholder:"",//输入框为空时默认提示文本
            editable:true,//是否允许编辑
            codeStyle:"code-github",//markdown样式： 默认github, 可选配色方案
            toolbarsFlag:true,//工具栏是否显示
            navigation:false,//默认展示目录
            shortCut:true,//是否启用快捷键
            autofocus:true,//自动聚焦到文本框
            ishljs:true,//代码高亮
            imageFilter: function(){},//图片过滤函数，参数为一个File Object，要求返回一个Boolean, true表示文件合法，false表示文件不合法
            imageClick: function(){},//图片点击事件，默认为预览，可覆盖
            tabSize:"\t", //tab转化为几个空格，默认为\t
            html:true, //启用HTML标签，因为历史原因这个标记一直默认为true，但建议不使用HTML标签就关闭它，它能彻底杜绝安全问题。
            xssOptions:{}, //xss规则配置, 默认开启，设置false可以关闭，开启后会对HTML标签进行过滤，默认过滤所有HTML标签属性，建议按需配置白名单减少被攻击的可能。
            mdfile:""
        }
    },
    components: {

    },
    computed:{
         compiledMarkdown: function(){
            // return marked(this.mdfile)
         }
    },
    methods: {
        Change(value){
            this.$emit("onchange",value)
        }
    },
    mounted(){
    },
    created() {
    }
}
</script>
<style scoped>
   .mavonEditor {
     position:absolute; 
     height:100%;
     width: 100%;
     z-index: 99999;
   }
</style>
