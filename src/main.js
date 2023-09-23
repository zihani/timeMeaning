import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/style.less'
import './assets/font/iconfont.css'
require('./Mock')
import {parseTime} from './utils'
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'	//样式
// import  "nes.css/css/nes.min.css";
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})
// App.use(Antd);
Vue.config.productionTip = false
Vue.filter('parseTime', (v) => parseTime(v,'{y}-{m}-{d}'))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
