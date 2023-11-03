const createScript = (text)=>{
    switch(text)
        {
            case "tinymce":
                return new Promise(function (resolve, reject) {
                    debugger
                    var s = document.createElement('script')
                    s.setAttribute('type', "text/javascript")
                    s.setAttribute('src', window.location.origin + "/tinymce/js/tinymce/tinymce.min.js")
                    document.head.appendChild(s)
                    s.onload = resolve
                    s.onerror = reject
                })
            case "onlyoffice":
                return new Promise(function (resolve, reject) {
                    var s = document.createElement('script')
                    s.setAttribute('type', "text/javascript")
                    // s.setAttribute('src', "http://192.168.199.128:8888/web-apps/apps/api/documents/api.js")
                    document.head.appendChild(s)
                    s.onload = resolve
                    s.onerror = reject
                })
            case "axios":
                return new Promise(function (resolve, reject) {
                    var s = document.createElement('script')
                    s.setAttribute('type', "text/javascript")
                    s.setAttribute('src', window.location.origin + "/static/tinymce/utils/axios/dist/axios.js")
                    document.head.appendChild(s)
                    s.onload = resolve
                    s.onerror = reject
                })
        }
}
export default createScript 