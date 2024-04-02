// import './assets/main.css'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import pinia from "./stores/index";
// import {create} from '@/utils/created';
import VueShortkey from 'vue-shortkey';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import App from './App.vue';
import hljsVuePlugin from "@highlightjs/vue-plugin"
// console.log("import.meta.env");
// console.log(import.meta.env);
// console.log("import.meta.env");

// import Home from '@/views/Home/index.vue'
// import App2 from './App2.vue'
import  "nes.css/css/nes.min.css";
import router from './router';
import 'primevue/resources/themes/lara-light-green/theme.css';
//createApp 根组件选择
const app = createApp(App);
// const home = createApp(Home);
// home.use(ElementPlus);
app.directive('tooltip', Tooltip); //directive 注册指令
app.use(VueShortkey);
app.use(ElementPlus);
app.use(pinia);
app.use(router);
app.use(PrimeVue, { unstyled: false }); //是否开启PrimeVue无样式模式
app.use(hljsVuePlugin,{

})
//注册组件
app.mount('#app'); // 挂载到#app
// app.mount('#app2') // 可以创建多个挂在点
// create()