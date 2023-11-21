<template>
    <div id="onlyoffice">
    </div>
</template>
<script>
export default {
    name: 'tinymceEdit',
    data(){
        return{
            config:{},
            officeconfig:{
                model: {
                    document: {
                        info: {
                            owner: "Me",
                            favorite: null,
                            uploaded: "Tue Nov 21 2023"
                        },
                        permissions: {
                            chat: true,
                            comment: true,
                            copy: true,
                            download: true,
                            edit: true,
                            print: true,
                            fillForms: true,
                            modifyContentControl: true,
                            review: true,
                            reviewGroups: null,
                            commentGroups: {
                                view: "",
                                edit: [
                                    "测试机构"
                                ],
                                remove: [
                                    "测试机构"
                                ]
                            },
                            userInfoGroups: null,
                            deleteCommentAuthorOnly: false,
                            editCommentAuthorOnly: false,
                            protect: true
                        },
                        fileType: "docx",
                        key: "1425930879",
                        urlUser: "http://192.168.42.163:8888/document/zihan.docx",
                        title: "简历.docx",
                        url: "http://192.168.42.163:8888/document/zihan.docx",
                        directUrl: null
                    },
                    documentType: "word",
                    editorConfig: {
                    actionLink: null,
                    callbackUrl: "",
                    createUrl: "",
                    customization: {
                        logo: {
                            image: "",
                            url: "",
                            imageDark: ""
                        },
                        goback: {
                            url: "",
                            blank: true,
                            text: "返回个人稿件"
                        },
                        comments: true,
                        forcesave: false,
                        submitForm: false,
                        feedback: {
                        visible: false,
                        url: ""
                        },
                        compatibleFeatures: false,
                        help: false
                    },
                    embedded: {
                        embedUrl: null,
                        saveUrl: null,
                        shareUrl: null,
                        toolbarDocked: "top"
                    },
                    lang: "zh",
                    region: "zh-CN",
                    location: "cn",
                    mode: "edit",
                    user: {
                        id: "1576",
                        name: "杨子汉",
                        group: "测试"
                    },
                    templates: null,
                    canCoAuthoring: true,
                    fileChoiceUrl: ""
                    },
                    token: "u6frXWXifw8xktNEzrC13IYoaVDQvyDg",
                    type: "desktop"
                },
                fileHistory: [
                ],
                docserviceApiUrl: null,
                dataInsertImage: null,
                dataCompareFile: null,
                dataMailMergeRecipients: null,
                usersForMentions: null,
                width: null,
                height: "800px"
            }
        }
    },
    components: {
    },
    methods: {
        initOnlyoffice(){
            let _this = this
            setTimeout(function(){
                let docEditor
                _this.config.events = {
                    onRequestHistory: function() {
                        // docEditor.refreshHistory(JSON.parse(hist));
                    },
                    onRequestHistoryData: function(event) {
                        debugger
                        // const ver = event.data
                        // docEditor.setHistoryData(JSON.parse(historyData)[ver - 1])
                    },
                    onAppReady: function() {
                        // axios.get(_url+"api/ability/office/check",{  
                        //     headers: {
                        //         Authorization: token
                        //     }
                        // }).then(res =>{
                        //     res.data
                        // })
                    },
                    onReady: function(){
                    },
                    onRequestHistoryClose: function() {
                        document.location.reload();
                    },
                    onInfo: function(){
                    },
                    onPluginsReady:function(){
                    }
                }
                debugger
                // _this.officeconfig.model
                _this.config = _this.officeconfig.model
                debugger
                if (typeof DocsAPI === 'object') {
                    debugger
                    docEditor = new DocsAPI.DocEditor("onlyoffice", _this.config);
                }
            },2000);
        },
    },
    mounted(){
        this.initOnlyoffice()
    },
    created() {
    }
}
</script>
<style scoped>
#onlyoffice{
    height:100%; 
    width: 100%;
}
</style>
