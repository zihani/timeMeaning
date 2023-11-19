const GetQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
const createScript = (text)=>{
        switch(text)
            {
                case "tinymce":
                    return new Promise(function (resolve, reject) {
                        var s = document.createElement('script')
                        s.setAttribute('type', "text/javascript")
                        s.setAttribute('src', window.location.origin + "/static/tinymce/tinymce.js")
                        document.head.appendChild(s)
                        s.onload = resolve
                        s.onerror = reject
                    })
                case "onlyoffice":
                    return new Promise(function (resolve, reject) {
                        var s = document.createElement('script')
                        s.setAttribute('type', "text/javascript")
                        s.setAttribute('src', "http://43.138.54.217:4000/web-apps/apps/api/documents/api.js")
                        document.head.appendChild(s)
                        s.onload = resolve
                        s.onerror = reject
                    })
            }
}

createScript("onlyoffice")